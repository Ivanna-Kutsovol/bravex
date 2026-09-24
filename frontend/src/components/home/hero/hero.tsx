"use client";

import { useEffect, useRef, useState } from "react";
import stl from "./hero.module.scss";
import Link from "next/link";

const heroVideos = [
  "/video/hero/hero0.mp4",
  "/video/hero/hero1.mp4",
  "/video/hero/hero2.mp4",
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [readySlides, setReadySlides] = useState<boolean[]>(() => heroVideos.map(() => false));
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setVideoEnabled(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroVideos.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (videoEnabled && i === activeSlide) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeSlide, videoEnabled]);

  return (
    <section id="hero" className={stl.hero}>
      <div className={stl.hero__slider} id="slider-container">
        <img
          className={stl.hero__poster}
          src="/img/hero/slide1.webp"
          alt=""
          width={1280}
          height={807}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className={stl.hero__content}>
          <h1 className={stl.hero__title}>Explore Our Furniture Collection</h1>
          <p className={stl.hero__text}>
            We create bespoke furniture solutions that seamlessly blend design, functionality, and craftsmanship. Every piece is tailored to the unique needs of the space.
          </p>
          <div className={stl["container-btn"]}>
            <Link href="/category/all" className={stl["btn-text"]}>View catalog</Link>
            <img className={stl["btn-img"]} src="/img/arrow.svg" alt="arrow" />
          </div>
        </div>

        {heroVideos.map((src, i) => (
          <video
            key={src}
            ref={(el) => { refs.current[i] = el; }}
            className={`${stl.hero__video} ${activeSlide === i && readySlides[i] ? `${stl.block}` : ""}`}
            muted
            autoPlay={videoEnabled && activeSlide === i}
            loop
            playsInline
            preload={videoEnabled && activeSlide === i ? "metadata" : "none"}
            poster="/img/hero/slide1.webp"
            onCanPlay={() => {
              setReadySlides((current) => {
                const next = [...current];
                next[i] = true;
                return next;
              });
            }}
          >
            {videoEnabled && activeSlide === i ? <source src={src} type="video/mp4" /> : null}
          </video>
        ))}

        <div className={stl.bottom} id="bottom">
          {heroVideos.map((_, index) => (
            <div
              key={`dot-${index}`}
              className={`${stl["pagination-circle"]} ${activeSlide === index ? `${stl.active}` : ""}`}
              onClick={() => setActiveSlide(index)}
            ></div>
          ))}
        </div>
      </div>
      <div className={stl.hero__shadow}></div>
    </section>
  );
}
