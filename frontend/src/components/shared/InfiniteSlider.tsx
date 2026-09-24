"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Direction = "left" | "right";

type InfiniteSliderProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  containerClassName: string;
  trackClassName: string;
  slideClassName: string;
  headerClassName?: string;
  title?: string;
  titleClassName?: string;
  arrowGroupClassName: string;
  arrowClassName: string;
  leftArrowClassName: string;
  rightArrowClassName: string;
  activeArrowClassName: string;
  arrowIconSrc: string;
  arrowIconAlt?: string;
  gap?: number;
  containerId?: string;
};

export default function InfiniteSlider<T>({
  items,
  renderItem,
  containerClassName,
  trackClassName,
  slideClassName,
  headerClassName,
  title,
  titleClassName,
  arrowGroupClassName,
  arrowClassName,
  leftArrowClassName,
  rightArrowClassName,
  activeArrowClassName,
  arrowIconSrc,
  arrowIconAlt = "arrow",
  gap = 20,
  containerId,
}: InfiniteSliderProps<T>) {
  const slides = useMemo(() => [...items, ...items, ...items], [items]);
  const [currentSlide, setCurrentSlide] = useState(items.length);
  const [activeArrow, setActiveArrow] = useState<Direction>("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateTrack, setAnimateTrack] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const firstCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!firstCardRef.current) return;
      setCardWidth(firstCardRef.current.offsetWidth + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [gap]);

  const goNext = () => {
    if (isAnimating || !cardWidth) return;
    setIsAnimating(true);
    setAnimateTrack(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const goPrev = () => {
    if (isAnimating || !cardWidth) return;
    setIsAnimating(true);
    setAnimateTrack(true);
    setCurrentSlide((prev) => prev - 1);
  };

  const onTransitionEnd = () => {
    let nextPosition = currentSlide;

    if (currentSlide >= items.length * 2) {
      nextPosition = items.length;
    }
    if (currentSlide < items.length) {
      nextPosition = items.length * 2 - 1;
    }

    if (nextPosition !== currentSlide) {
      setAnimateTrack(false);
      setCurrentSlide(nextPosition);
      requestAnimationFrame(() => setIsAnimating(false));
      return;
    }

    setIsAnimating(false);
  };

  const trackStyle = {
    transform: `translateX(-${cardWidth * currentSlide}px)`,
    transition: animateTrack ? "transform 0.5s" : "none",
  } as const;

  const arrows = (
    <div className={arrowGroupClassName}>
      <button
        type="button"
        className={`${arrowClassName} ${leftArrowClassName} ${activeArrow === "left" ? activeArrowClassName : ""}`}
        onClick={() => {
          setActiveArrow("left");
          goPrev();
        }}
      >
        <img src={arrowIconSrc} alt={arrowIconAlt} width={14} height={14} decoding="async" />
      </button>

      <button
        type="button"
        className={`${arrowClassName} ${rightArrowClassName} ${activeArrow === "right" ? activeArrowClassName : ""}`}
        onClick={() => {
          setActiveArrow("right");
          goNext();
        }}
      >
        <img src={arrowIconSrc} alt={arrowIconAlt} width={14} height={14} decoding="async" />
      </button>
    </div>
  );

  return (
    <>
      {headerClassName ? (
        <div className={headerClassName}>
          {title ? <h2 className={titleClassName}>{title}</h2> : null}
          {arrows}
        </div>
      ) : (
        arrows
      )}

      <div className={containerClassName}>
        <div
          id={containerId}
          className={trackClassName}
          style={trackStyle}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((item, index) => (
            <div
              key={`slide-${index}`}
              ref={index === 0 ? firstCardRef : null}
              className={slideClassName}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
