"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Modal } from "./Modal";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File;
  onCropComplete: (croppedFile: File) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  isOpen,
  onClose,
  imageFile,
  onCropComplete,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Crop area in pixels, always maintains square aspect ratio
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setImageLoaded(false);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleImageLoad = () => {
    const image = imageRef.current;
    const container = containerRef.current;

    if (!image || !container) return;

    const containerRect = container.getBoundingClientRect();
    const containerAspect = containerRect.width / containerRect.height;
    const imageAspect = image.naturalWidth / image.naturalHeight;

    let displayWidth, displayHeight;

    if (imageAspect > containerAspect) {
      displayWidth = containerRect.width;
      displayHeight = displayWidth / imageAspect;
    } else {
      displayHeight = containerRect.height;
      displayWidth = displayHeight * imageAspect;
    }

    setImageSize({ width: displayWidth, height: displayHeight });
    setContainerSize({
      width: containerRect.width,
      height: containerRect.height,
    });
    setImageLoaded(true);

    // Calculate image offset within container
    const imageOffsetX = (containerRect.width - displayWidth) / 2;
    const imageOffsetY = (containerRect.height - displayHeight) / 2;

    // Initialize crop area as square in the center
    const minDimension = Math.min(displayWidth, displayHeight);
    const cropSize = Math.min(200, minDimension * 0.6); // 60% of smaller dimension, max 200px

    setCropArea({
      x: imageOffsetX + (displayWidth - cropSize) / 2,
      y: imageOffsetY + (displayHeight - cropSize) / 2,
      width: cropSize,
      height: cropSize,
    });
  };

  // Handle mouse down on crop area
  const handleMouseDown = (e: React.MouseEvent, handle?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDragStart({ x, y });

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      setIsDragging(false);
    } else {
      setIsDragging(true);
      setIsResizing(false);
      setResizeHandle("");
    }
  };

  // Handle resize handle mouse down
  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDragStart({ x, y });
    setIsResizing(true);
    setResizeHandle(handle);
    setIsDragging(false);
  };

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;

      // Get image position within container
      const imageOffsetX = (containerSize.width - imageSize.width) / 2;
      const imageOffsetY = (containerSize.height - imageSize.height) / 2;

      if (isDragging && !isResizing) {
        // Move crop area - keep it within image bounds
        setCropArea((prev) => {
          const newX = Math.max(
            imageOffsetX,
            Math.min(
              imageOffsetX + imageSize.width - prev.width,
              prev.x + deltaX
            )
          );
          const newY = Math.max(
            imageOffsetY,
            Math.min(
              imageOffsetY + imageSize.height - prev.height,
              prev.y + deltaY
            )
          );
          return { ...prev, x: newX, y: newY };
        });

        setDragStart({ x, y });
      } else if (isResizing && !isDragging && resizeHandle) {
        // Resize crop area maintaining square aspect ratio
        setCropArea((prev) => {
          const newCrop = { ...prev };
          const minSize = 50; // Minimum crop size
          const maxSize = Math.min(imageSize.width, imageSize.height);

          switch (resizeHandle) {
            case "se": // Southeast corner
              const newSize = Math.max(
                minSize,
                Math.min(
                  maxSize,
                  prev.width + deltaX,
                  prev.height + deltaY,
                  imageOffsetX + imageSize.width - prev.x, // Max width within image
                  imageOffsetY + imageSize.height - prev.y // Max height within image
                )
              );
              newCrop.width = newSize;
              newCrop.height = newSize;
              break;

            case "sw": // Southwest corner
              const swSize = Math.max(
                minSize,
                Math.min(
                  maxSize,
                  prev.width - deltaX,
                  prev.height + deltaY,
                  prev.x - imageOffsetX, // Can't go beyond left edge
                  imageOffsetY + imageSize.height - prev.y // Max height within image
                )
              );
              if (
                swSize >= minSize &&
                prev.x - (swSize - prev.width) >= imageOffsetX
              ) {
                newCrop.x = prev.x - (swSize - prev.width);
                newCrop.width = swSize;
                newCrop.height = swSize;
              }
              break;

            case "ne": // Northeast corner
              const neSize = Math.max(
                minSize,
                Math.min(
                  maxSize,
                  prev.width + deltaX,
                  prev.height - deltaY,
                  imageOffsetX + imageSize.width - prev.x, // Max width within image
                  prev.y - imageOffsetY // Can't go beyond top edge
                )
              );
              if (
                neSize >= minSize &&
                prev.y - (neSize - prev.height) >= imageOffsetY
              ) {
                newCrop.y = prev.y - (neSize - prev.height);
                newCrop.width = neSize;
                newCrop.height = neSize;
              }
              break;

            case "nw": // Northwest corner
              const nwSize = Math.max(
                minSize,
                Math.min(
                  maxSize,
                  prev.width - deltaX,
                  prev.height - deltaY,
                  prev.x - imageOffsetX, // Can't go beyond left edge
                  prev.y - imageOffsetY // Can't go beyond top edge
                )
              );
              if (
                nwSize >= minSize &&
                prev.x - (nwSize - prev.width) >= imageOffsetX &&
                prev.y - (nwSize - prev.height) >= imageOffsetY
              ) {
                newCrop.x = prev.x - (nwSize - prev.width);
                newCrop.y = prev.y - (nwSize - prev.height);
                newCrop.width = nwSize;
                newCrop.height = nwSize;
              }
              break;
          }

          return newCrop;
        });

        setDragStart({ x, y });
      }
    },
    [isDragging, isResizing, dragStart, imageSize, containerSize, resizeHandle]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle("");
  }, []);

  // Add event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const createCroppedImage = useCallback(async () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image || !imageLoaded) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Set canvas size to square (400x400 for avatars)
    const outputSize = 400;
    canvas.width = outputSize;
    canvas.height = outputSize;

    // Calculate crop area in original image coordinates
    const scaleX = image.naturalWidth / imageSize.width;
    const scaleY = image.naturalHeight / imageSize.height;

    // Get image offset within container
    const imageOffsetX = (containerSize.width - imageSize.width) / 2;
    const imageOffsetY = (containerSize.height - imageSize.height) / 2;

    // Calculate crop coordinates relative to the image (not container)
    const cropX = (cropArea.x - imageOffsetX) * scaleX;
    const cropY = (cropArea.y - imageOffsetY) * scaleY;
    const cropWidth = cropArea.width * scaleX;
    const cropHeight = cropArea.height * scaleY;

    // Clear canvas with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outputSize, outputSize);

    // Draw cropped image
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      outputSize,
      outputSize
    );

    return new Promise<File>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `avatar-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            resolve(file);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        "image/jpeg",
        0.9
      );
    });
  }, [cropArea, imageLoaded, imageSize, containerSize]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const croppedFile = await createCroppedImage();
      if (croppedFile) {
        onCropComplete(croppedFile);
        onClose();
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crop Profile Picture"
      size="lg"
    >
      <div className="space-y-4">
        {/* Image Preview with Crop Overlay */}
        <div
          ref={containerRef}
          className="relative mx-auto bg-gray-100 rounded-lg overflow-hidden select-none"
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: "var(--color-muted, #f1f5f9)",
          }}
        >
          {imageSrc && (
            <>
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={handleImageLoad}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${imageSize.width}px`,
                  height: `${imageSize.height}px`,
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
                draggable={false}
              />

              {/* Crop Overlay */}
              {imageLoaded && (
                <div className="absolute inset-0">
                  {/* Dark overlay using proper positioning */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                    }}
                  />

                  {/* Clear crop area */}
                  <div
                    className="absolute"
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`,
                      background: "transparent",
                      boxShadow: `
                        0 0 0 9999px rgba(0,0,0,0.5),
                        inset 0 0 0 2px white,
                        inset 0 0 0 3px rgba(0,0,0,0.3)
                      `,
                    }}
                  />

                  {/* Crop area with handles */}
                  <div
                    className="absolute border-2 border-white cursor-move"
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`,
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                    }}
                    onMouseDown={(e) => handleMouseDown(e)}
                  >
                    {/* Corner resize handles */}
                    <div
                      className="absolute w-4 h-4 bg-white border border-gray-400 cursor-nw-resize -top-2 -left-2 rounded-sm"
                      onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-gray-400 cursor-ne-resize -top-2 -right-2 rounded-sm"
                      onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-gray-400 cursor-sw-resize -bottom-2 -left-2 rounded-sm"
                      onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
                    />
                    <div
                      className="absolute w-4 h-4 bg-white border border-gray-400 cursor-se-resize -bottom-2 -right-2 rounded-sm"
                      onMouseDown={(e) => handleResizeMouseDown(e, "se")}
                    />

                    {/* Grid lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div
                        className="absolute border-l border-white opacity-30"
                        style={{ left: "33.33%", top: 0, height: "100%" }}
                      />
                      <div
                        className="absolute border-l border-white opacity-30"
                        style={{ left: "66.66%", top: 0, height: "100%" }}
                      />
                      <div
                        className="absolute border-t border-white opacity-30"
                        style={{ top: "33.33%", left: 0, width: "100%" }}
                      />
                      <div
                        className="absolute border-t border-white opacity-30"
                        style={{ top: "66.66%", left: 0, width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Instructions */}
        {imageLoaded && (
          <div
            className="text-center text-sm p-3 rounded-lg"
            style={{
              backgroundColor: "var(--color-muted, #f1f5f9)",
              color: "var(--color-muted-foreground, #64748b)",
            }}
          >
            Drag the crop area to reposition. Drag corners to resize.
          </div>
        )}

        {/* Hidden canvas for cropping */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        <div
          className="flex space-x-3 justify-end pt-4 border-t"
          style={{ borderColor: "var(--color-border, #e2e8f0)" }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors border"
            style={{
              backgroundColor: "var(--color-secondary, #f1f5f9)",
              color: "var(--color-secondary-foreground, #0f172a)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !imageLoaded}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            style={{
              backgroundColor: "var(--color-primary, #3b82f6)",
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save Avatar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
