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
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

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

    if (!image) return;

    // Use a fixed max dimension
    const maxDimension = 400;
    const imageAspect = image.naturalWidth / image.naturalHeight;

    let displayWidth, displayHeight;

    // Fit image inside max dimension while maintaining aspect ratio
    if (imageAspect > 1) {
      // Image is wider - fit to width
      displayWidth = maxDimension;
      displayHeight = displayWidth / imageAspect;
    } else {
      // Image is taller or square - fit to height
      displayHeight = maxDimension;
      displayWidth = displayHeight * imageAspect;
    }

    setImageSize({ width: displayWidth, height: displayHeight });
    setContainerSize({
      width: displayWidth,
      height: displayHeight,
    });
    setImageOffset({ x: 0, y: 0 });

    setImageLoaded(true);

    // Initialize crop area as square in the center of the image
    const minDimension = Math.min(displayWidth, displayHeight);
    const cropSize = Math.min(200, minDimension * 0.6);

    setCropArea({
      x: (displayWidth - cropSize) / 2,
      y: (displayHeight - cropSize) / 2,
      width: cropSize,
      height: cropSize,
    });
  };

  // Handle mouse down on crop area
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDragStart({ x, y });
    setIsDragging(true);
    setIsResizing(false);
    setResizeHandle("");
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

      if (isDragging && !isResizing) {
        // Move crop area - keep it within image bounds
        setCropArea((prev) => {
          const minX = imageOffset.x;
          const minY = imageOffset.y;
          const maxX = imageOffset.x + imageSize.width - prev.width;
          const maxY = imageOffset.y + imageSize.height - prev.height;

          const newX = Math.max(minX, Math.min(maxX, prev.x + deltaX));
          const newY = Math.max(minY, Math.min(maxY, prev.y + deltaY));

          return { ...prev, x: newX, y: newY };
        });

        setDragStart({ x, y });
      } else if (isResizing && !isDragging && resizeHandle) {
        // Resize crop area maintaining square aspect ratio
        setCropArea((prev) => {
          const newCrop = { ...prev };
          const minSize = 50;
          const maxWidth = imageSize.width;
          const maxHeight = imageSize.height;

          switch (resizeHandle) {
            case "se": {
              // Southeast: expand right and down
              const maxSizeFromRight = imageOffset.x + imageSize.width - prev.x;
              const maxSizeFromBottom =
                imageOffset.y + imageSize.height - prev.y;
              const newSize = Math.max(
                minSize,
                Math.min(
                  maxWidth,
                  maxHeight,
                  maxSizeFromRight,
                  maxSizeFromBottom,
                  prev.width + Math.min(deltaX, deltaY)
                )
              );
              newCrop.width = newSize;
              newCrop.height = newSize;
              break;
            }

            case "sw": {
              // Southwest: expand left and down
              const maxSizeFromLeft = prev.x + prev.width - imageOffset.x;
              const maxSizeFromBottom =
                imageOffset.y + imageSize.height - prev.y;
              const sizeDelta = Math.min(-deltaX, deltaY);
              const newSize = Math.max(
                minSize,
                Math.min(
                  maxWidth,
                  maxHeight,
                  maxSizeFromLeft,
                  maxSizeFromBottom,
                  prev.width + sizeDelta
                )
              );
              if (newSize >= minSize) {
                newCrop.x = prev.x + prev.width - newSize;
                newCrop.width = newSize;
                newCrop.height = newSize;
              }
              break;
            }

            case "ne": {
              // Northeast: expand right and up
              const maxSizeFromRight = imageOffset.x + imageSize.width - prev.x;
              const maxSizeFromTop = prev.y + prev.height - imageOffset.y;
              const sizeDelta = Math.min(deltaX, -deltaY);
              const newSize = Math.max(
                minSize,
                Math.min(
                  maxWidth,
                  maxHeight,
                  maxSizeFromRight,
                  maxSizeFromTop,
                  prev.width + sizeDelta
                )
              );
              if (newSize >= minSize) {
                newCrop.y = prev.y + prev.height - newSize;
                newCrop.width = newSize;
                newCrop.height = newSize;
              }
              break;
            }

            case "nw": {
              // Northwest: expand left and up
              const maxSizeFromLeft = prev.x + prev.width - imageOffset.x;
              const maxSizeFromTop = prev.y + prev.height - imageOffset.y;
              const sizeDelta = Math.min(-deltaX, -deltaY);
              const newSize = Math.max(
                minSize,
                Math.min(
                  maxWidth,
                  maxHeight,
                  maxSizeFromLeft,
                  maxSizeFromTop,
                  prev.width + sizeDelta
                )
              );
              if (newSize >= minSize) {
                newCrop.x = prev.x + prev.width - newSize;
                newCrop.y = prev.y + prev.height - newSize;
                newCrop.width = newSize;
                newCrop.height = newSize;
              }
              break;
            }
          }

          return newCrop;
        });

        setDragStart({ x, y });
      }
    },
    [isDragging, isResizing, dragStart, imageSize, imageOffset, resizeHandle]
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

    // Calculate crop coordinates relative to the image (not container)
    const cropX = (cropArea.x - imageOffset.x) * scaleX;
    const cropY = (cropArea.y - imageOffset.y) * scaleY;
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
  }, [cropArea, imageLoaded, imageSize, imageOffset]);

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
          className="relative mx-auto rounded-lg overflow-hidden select-none"
          style={{
            width: imageLoaded ? `${imageSize.width}px` : "400px",
            height: imageLoaded ? `${imageSize.height}px` : "400px",
            backgroundColor: "transparent",
          }}
        >
          {imageSrc && (
            <>
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={handleImageLoad}
                className="w-full h-full"
                style={{
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
                draggable={false}
              />

              {/* Crop Overlay */}
              {imageLoaded && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Crop area with handles */}
                  <div
                    className="absolute border-2 border-white pointer-events-auto cursor-move"
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`,
                      boxShadow: `
                        0 0 0 9999px rgba(0,0,0,0.5),
                        inset 0 0 0 1px rgba(0,0,0,0.3)
                      `,
                    }}
                    onMouseDown={handleMouseDown}
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
