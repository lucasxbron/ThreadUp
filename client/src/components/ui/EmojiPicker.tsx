"use client";

import React, { useState, useRef, useEffect } from "react";
import { EMOJI_CATEGORIES } from "@/data/emojiData";

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [activeCategory, setActiveCategory] = useState("Smileys & People");
  const [searchTerm, setSearchTerm] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // Don't render emoji picker on mobile devices - they should use native keyboard
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close picker on mobile (shouldn't be visible anyway)
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [isMobile, isOpen, onClose]);

  // Calculate position relative to trigger element and account for scroll
  useEffect(() => {
    if (isOpen && triggerRef?.current && !isMobile) {
      const updatePosition = () => {
        if (!triggerRef?.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const pickerWidth = 320;
        const pickerHeight = 400;

        // Calculate position relative to viewport + scroll position
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        let top = triggerRect.bottom + scrollTop + 8;
        let left = triggerRect.right + scrollLeft - pickerWidth;

        // Adjust if picker would go below viewport
        if (triggerRect.bottom + pickerHeight + 8 > viewportHeight) {
          top = triggerRect.top + scrollTop - pickerHeight - 8;
        }

        // Adjust if picker would go outside left edge
        if (left < scrollLeft + 8) {
          left = scrollLeft + 8;
        }

        // Adjust if picker would go outside right edge
        if (left + pickerWidth > scrollLeft + viewportWidth - 8) {
          left = scrollLeft + viewportWidth - pickerWidth - 8;
        }

        setPosition({ top, left });
      };

      // Calculate initial position
      updatePosition();
    }
  }, [isOpen, triggerRef, isMobile]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef, isMobile]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen && !isMobile) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, isMobile]);

  // Don't render on mobile or when closed
  if (!isOpen || isMobile) return null;

  // Filter emojis based on search
  const filteredEmojis = searchTerm
    ? Object.values(EMOJI_CATEGORIES)
        .flat()
        .filter(
          (emojiData) =>
            emojiData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emojiData.keywords.some((keyword) =>
              keyword.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    : EMOJI_CATEGORIES[activeCategory as keyof typeof EMOJI_CATEGORIES] || [];

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    onClose();
  };

  // Handle category change with proper event prevention
  const handleCategoryChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Global CSS for emoji picker scrollbars */}
      <style jsx>{`
        .emoji-picker-container ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .emoji-picker-container ::-webkit-scrollbar-track {
          background: var(--color-muted);
        }

        .emoji-picker-container ::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 9999px;
        }

        .emoji-picker-container ::-webkit-scrollbar-thumb:hover {
          background: var(--color-muted-foreground);
        }

        .emoji-picker-container ::-webkit-scrollbar-corner {
          background: var(--color-muted);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[150]"
        style={{ backgroundColor: "transparent" }}
        onClick={onClose}
      />

      {/* Emoji Picker */}
      <div
        ref={pickerRef}
        className="absolute z-[160] rounded-xl shadow-2xl border overflow-hidden emoji-picker-container"
        style={{
          top: position.top,
          left: position.left,
          width: "320px",
          height: "400px",
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Header with search */}
        <div
          className="p-3 border-b"
          style={{ borderColor: "var(--color-border, #e2e8f0)" }}
        >
          <input
            type="text"
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            style={{
              backgroundColor: "var(--color-muted, #f1f5f9)",
              borderColor: "var(--color-border, #e2e8f0)",
              color: "var(--color-foreground, #0f172a)",
            }}
          />
        </div>

        {/* Categories */}
        {!searchTerm && (
          <div
            className="flex overflow-x-auto border-b"
            style={{ borderColor: "var(--color-border, #e2e8f0)" }}
          >
            {Object.keys(EMOJI_CATEGORIES).map((category) => (
              <button
                key={category}
                type="button"
                onClick={(e) => handleCategoryChange(e, category)}
                className="flex-shrink-0 px-2 py-2 text-xs font-medium transition-colors whitespace-nowrap"
                style={{
                  backgroundColor:
                    activeCategory === category
                      ? "var(--color-primary, #3b82f6)"
                      : "transparent",
                  color:
                    activeCategory === category
                      ? "white"
                      : "var(--color-muted-foreground, #64748b)",
                }}
              >
                {category === "Smileys & People"
                  ? "😊"
                  : category === "Animals & Nature"
                  ? "🐶"
                  : category === "Food & Drink"
                  ? "🍎"
                  : category === "Activities"
                  ? "⚽"
                  : category === "Objects"
                  ? "💻"
                  : category === "Symbols & Hearts"
                  ? "❤️"
                  : // : category === "Flags"
                    // ? "🏁"
                    category.split(" ")[0]}
              </button>
            ))}
          </div>
        )}

        {/* Emoji Grid */}
        <div
          className="p-2 overflow-y-auto"
          style={{
            height: searchTerm ? "calc(100% - 80px)" : "calc(100% - 120px)",
          }}
        >
          <div className="grid grid-cols-8 gap-1">
            {filteredEmojis.map((emojiData, index) => (
              <button
                key={`${emojiData.emoji}-${index}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEmojiClick(emojiData.emoji);
                }}
                title={emojiData.name}
                className="w-8 h-8 flex items-center justify-center rounded transition-colors text-lg"
                style={{
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-muted, #f1f5f9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {emojiData.emoji}
              </button>
            ))}
          </div>

          {/* No results message */}
          {searchTerm && filteredEmojis.length === 0 && (
            <div className="text-center py-8">
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                No emojis found for &quot;{searchTerm}&quot;
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Try searching for: happy, love, fire, food, etc.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
