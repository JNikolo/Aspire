import React, { useEffect, useState } from "react";

/**
 * AutoScrollCarousel Component
 * @param {Array} items - Array of items for the carousel
 * @param {number} interval - Time in milliseconds for auto-scroll (default: 3000ms)
 */
const AutoScrollCarousel = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const autoScroll = setInterval(handleNext, interval);
    return () => clearInterval(autoScroll);
  }, [interval, items.length]);

  return (
    <div className="relative w-full lg:w-1/2 h-[32rem] lg:h-[40rem]">
      {/* Carousel Wrapper */}
      <div className="relative w-full h-full overflow-hidden flex justify-center items-center">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <div className="mockup-phone border-primary flex justify-center">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1 bg-base-200">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm lg:btn-md bg-gray-700 text-white hover:bg-gray-900 z-10"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm lg:btn-md bg-gray-700 text-white hover:bg-gray-900 z-10"
        aria-label="Next Slide"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-gray-800"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
