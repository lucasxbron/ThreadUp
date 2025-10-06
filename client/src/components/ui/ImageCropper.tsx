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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const createCroppedImage = useCallback(async () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Set canvas size to square (400x400 for avatars)
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    // Calculate crop dimensions
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Draw cropped image
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      crop.x,
      crop.y,
      size,
      size
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `avatar-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            resolve(file);
          }
        },
        "image/jpeg",
        0.9
      );
    });
  }, [crop]);

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
        {/* Image Preview */}
        <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {imageSrc && (
            <>
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                className="max-w-full max-h-full object-contain"
                style={{
                  transform: `scale(${zoom}) translate(${crop.x}px, ${crop.y}px)`,
                }}
              />

              {/* Crop overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute border-4 border-white rounded-full shadow-lg"
                  style={{
                    width: "200px",
                    height: "200px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              Zoom
            </label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-foreground)" }}
              >
                Position X
              </label>
              <input
                type="range"
                min={-50}
                max={50}
                value={crop.x}
                onChange={(e) =>
                  setCrop((prev) => ({ ...prev, x: Number(e.target.value) }))
                }
                className="w-full"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-foreground)" }}
              >
                Position Y
              </label>
              <input
                type="range"
                min={-50}
                max={50}
                value={crop.y}
                onChange={(e) =>
                  setCrop((prev) => ({ ...prev, y: Number(e.target.value) }))
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Hidden canvas for cropping */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        <div className="flex space-x-3 justify-end pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors border"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-secondary-foreground)",
              borderColor: "var(--color-border)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
