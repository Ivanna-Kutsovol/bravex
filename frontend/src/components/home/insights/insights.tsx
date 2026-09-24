"use client";

import InfiniteSlider from "@/src/components/shared/InfiniteSlider";
import stl from "./insights.module.scss";
import Image from "next/image";
import Arrow from "@/public/img/insights/arrow.svg";

type InsightCard = {
  img: string;
  title: string;
  description: string;
};

const insightCards: InsightCard[] = [
  { img: "/img/insights/insights0.avif", title: "New collection", description: "of sofas from a global brand" },
  { img: "/img/insights/insights1.avif", title: "New collection", description: "of sofas from a global brand" },
  { img: "/img/insights/insights2.avif", title: "New collection", description: "of sofas from a global brand" },
  { img: "/img/insights/insights3.avif", title: "New collection", description: "of sofas from a global brand" },
];

export default function InsightsSection() {
  return (
    <section id="insights" className={stl.insights}>
      <InfiniteSlider<InsightCard>
        items={insightCards}
        gap={20}
        headerClassName={stl.block__header}
        title="Explore our recent insights"
        titleClassName={stl.block__title}
        arrowGroupClassName={stl.block__arrows}
        arrowClassName={stl.block__arrow}
        leftArrowClassName={stl.left}
        rightArrowClassName={stl.right}
        activeArrowClassName={stl.block__active}
        arrowIconSrc="/img/arrow.svg"
        containerClassName={stl["insights__cards-container"]}
        trackClassName={stl.insights__cards}
        slideClassName={stl.insights__card}
        containerId="insightsCards"
        renderItem={(card) => (
          <>
            <img
              className={stl.insights__img}
              src={card.img}
              alt={card.title}
              width={380}
              height={450}
              loading="lazy"
              decoding="async"
            />
            <div className={stl.insights__content}>
              <span className={stl.insights__title}>{card.title}</span>
              <span className={stl.insights__description}>{card.description}</span>
            </div>
            <a className={stl.insights__arrow} href="#"><Image width={14} height={14} src={Arrow} alt="arrow" /></a>
          </>
        )}
      />
    </section>
  );
}
