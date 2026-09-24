"use client";

import { useEffect, useRef, useState } from "react";
import stl from "./catalog.module.scss";
import Link from "next/link";

const catalogVideos = [
  "/video/catalog/catalog0.mp4",
  "/video/catalog/catalog1.mp4",
  "/video/catalog/catalog2.mp4",
  "/video/catalog/catalog3.mp4",
];

const catalogTabs = [
  "Living Room Collections",
  "Bedroom Inspirations",
  "Dining & Kitchen Spaces",
  "Complete Interior Packages",
];

export default function CatalogSection() {
  const [activeTab, setActiveTab] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeTab) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeTab, isVisible]);

  return (
    <section id="catalog" className={stl.catalog} ref={sectionRef}>
      <h2 className={stl.catalog__title}>Catalog</h2>

      <div className={stl["slider-container"]}>
        {catalogVideos.map((videoSrc, i) => (
          <video
            key={videoSrc}
            ref={(el) => { videoRefs.current[i] = el; }}
            className={`${stl.catalog__video} ${activeTab === i ? stl.block : ""}`}
            muted
            autoPlay={isVisible && activeTab === i}
            loop
            playsInline
            preload={isVisible && activeTab === i ? "metadata" : "none"}
            poster="/img/hero/slide1.svg"
          >
            {isVisible && activeTab === i ? <source src={videoSrc} type="video/mp4" /> : null}
          </video>
        ))}
      </div>

      <div className={`${stl.block__content} ${stl.catalog__content}`}>
        <h3 className={`${stl.block__mainText} ${stl.catalog__mainText}`}>
          Discover your next favorite piece - Browse the catalog
        </h3>

        <div className={stl.block__container}>
          <img className={stl.catalog__img} src="/img/logo.svg" alt="logo" />
          <span className={stl.line}></span>
          <p className={stl.container__text}>
            Explore our curated collections and discover furniture that defines modern living
          </p>
        </div>
      </div>

      <div className={stl["block__content--main"]}>
        <div className={stl["container-btn"]}>
          <Link href="/category/all" className={stl["btn-text"]}>View catalog</Link>
          <img className={stl["btn-img"]} src="/img/arrow.svg" alt="arrow" />
        </div>

        <div className={stl.block__cards}>
          {catalogTabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`${stl.block__card} ${stl.catalog__card} ${activeTab === i ? stl.catalog__active : ""}`}
              onClick={() => setActiveTab(i)}
            >
              <p className={stl.block__text}>{tab}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
