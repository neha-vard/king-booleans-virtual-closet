import React, { useState, Children, cloneElement } from "react";
import "./carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children, width, onActiveIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = Children.count(children) - 1;
    } else if (newIndex >= Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    onActiveIndexChange(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {Children.map(children, (child, index) => {
          return cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button
          className="triangle-buttons"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          {" "}
          {/* &#8249; */}
          <div class="triangle-buttons__triangle triangle-buttons__triangle--l"></div>
        </button>

        <button
          className="triangle-buttons"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          {" "}
          {/* &#8250; */}
          <div class="triangle-buttons__triangle triangle-buttons__triangle--r"></div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
