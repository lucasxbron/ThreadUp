"use client";

import React, { useState, useRef, useCallback } from "react";
import { Modal } from "./Modal";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File;
  onCropComplete: (croppedFile: File) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  isOpen,
  onClose,
  imageFile,
  onCropComplete,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
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
    setImageLoaded(true);
    // Reset crop and zoom when new image loads
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const createCroppedImage = useCallback(async () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image || !imageLoaded) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Set canvas size to square (400x400 for avatars)
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    // Calculate the crop area in the original image coordinates
    const cropSize = Math.min(image.naturalWidth, image.naturalHeight) / zoom;
    const cropX = (image.naturalWidth - cropSize) / 2 + (crop.x * cropSize) / 100;
    const cropY = (image.naturalHeight - cropSize) / 2 + (crop.y * cropSize) / 100;

    // Ensure crop area stays within image bounds
    const clampedCropX = Math.max(0, Math.min(cropX, image.naturalWidth - cropSize));
    const clampedCropY = Math.max(0, Math.min(cropY, image.naturalHeight - cropSize));
    const clampedCropSize = Math.min(cropSize, image.naturalWidth - clampedCropX, image.naturalHeight - clampedCropY);

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw cropped and scaled image
    ctx.drawImage(
      image,
      clampedCropX,
      clampedCropY,
      clampedCropSize,
      clampedCropSize,
      0,
      0,
      size,
      size
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
  }, [crop, zoom, imageLoaded]);

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

  const getImageDisplaySize = () => {
    const image = imageRef.current;
    if (!image) return { width: 0, height: 0 };

    const containerWidth = 300; // Max display width
    const containerHeight = 300; // Max display height
    
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    
    let displayWidth, displayHeight;
    
    if (aspectRatio > 1) {
      // Wide image
      displayWidth = Math.min(containerWidth, image.naturalWidth);
      displayHeight = displayWidth / aspectRatio;
    } else {
      // Tall or square image
      displayHeight = Math.min(containerHeight, image.naturalHeight);
      displayWidth = displayHeight * aspectRatio;
    }
    
    return { width: displayWidth, height: displayHeight };
  };

  const displaySize = getImageDisplaySize();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crop Profile Picture"
      size="lg"
    >
      <div className="space-y-4">
        {/* Image Preview */}
        <div 
          className="relative mx-auto bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ 
            width: '320px', 
            height: '320px',
            backgroundColor: 'var(--color-muted, #f1f5f9)'
          }}
        >
          {imageSrc && (
            <>
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={handleImageLoad}
                className="absolute"
                style={{
                  width: `${displaySize.width * zoom}px`,
                  height: `${displaySize.height * zoom}px`,
                  transform: `translate(${crop.x}px, ${crop.y}px)`,
                  objectFit: 'contain',
                  left: '50%',
                  top: '50%',
                  marginLeft: `${-(displaySize.width * zoom) / 2}px`,
                  marginTop: `${-(displaySize.height * zoom) / 2}px`,
                }}
              />

              {/* Crop overlay - circular guide */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute border-4 border-white rounded-full shadow-lg"
                  style={{
                    width: "200px",
                    height: "200px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 0 200px rgba(0, 0, 0, 0.5)",
                  }}
                />
                {/* Center crosshair */}
                <div
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: "20px",
                    height: "1px",
                    backgroundColor: "white",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: "1px",
                    height: "20px",
                    backgroundColor: "white",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        {imageLoaded && (
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                Zoom: {zoom.toFixed(1)}x
              </label>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-primary, #3b82f6) 0%, var(--color-primary, #3b82f6) ${((zoom - 0.5) / 2.5) * 100}%, var(--color-muted, #e2e8f0) ${((zoom - 0.5) / 2.5) * 100}%, var(--color-muted, #e2e8f0) 100%)`
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Horizontal Position
                </label>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={crop.x}
                  onChange={(e) =>
                    setCrop((prev) => ({ ...prev, x: Number(e.target.value) }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Vertical Position
                </label>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={crop.y}
                  onChange={(e) =>
                    setCrop((prev) => ({ ...prev, y: Number(e.target.value) }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setCrop({ x: 0, y: 0 });
                setZoom(1);
              }}
              className="text-sm px-3 py-1 rounded transition-colors"
              style={{
                color: "var(--color-primary, #3b82f6)",
                backgroundColor: "transparent",
                border: `1px solid var(--color-border, #e2e8f0)`,
              }}
            >
              Reset Position & Zoom
            </button>
          </div>
        )}

        {/* Hidden canvas for cropping */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        <div className="flex space-x-3 justify-end pt-4 border-t" style={{ borderColor: "var(--color-border, #e2e8f0)" }}>
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