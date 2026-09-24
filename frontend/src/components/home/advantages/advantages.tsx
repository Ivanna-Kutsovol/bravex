import React from "react";
import stl from "./advantages.module.scss";
import Image from "next/image";

export default function AdvantagesSection() {
  const items = [
    ["icon0.svg", "Trusted materials", "We use premium European materials for lasting quality and style"],
    ["icon1.svg", "Skilled craftsmen", "Our experts craft furniture with precision and attention to detail"],
    ["icon2.svg", "Quality assurance", "Every project includes an official warranty and service support"],
    ["icon3.svg", "Transparent pricing", "Clear pricing with no hidden costs or unexpected fees"],
    ["icon4.svg", "Innovative design", "We design using advanced tools and 3D visualization"],
    ["icon5.svg", "On-time delivery", "We deliver and install your furniture right on schedule"],
    ["icon6.svg", "Personalized solutions", "Each project is tailored to your taste, budget, and lifestyle"],
    ["icon7.svg", "Free consultation", "Get expert advice on planning and furniture selection"],
  ];

  return (
    <section id="advantages" className={stl.advantages}>
      <div className={stl.block__header}>
        <h2 className={stl.block__title}>Our <span className={stl["block__title--block"]}>Advantages</span></h2>
        <div className={stl.block__logo}><Image width={100} height={100} src="/img/logo.svg" alt="BRAVEX" /></div>
      </div>

      <div className={stl["advantages__cards-container"]}>
        <div id="advantagesCards" className={stl.advantages__cards}>
          {items.map(([icon, title, text]) => (
            <div className={stl.advantages__card} key={icon}>
              <div className={stl["advantages__card--circle"]}>
                <Image width={100} height={100} className={stl.advantages__icon} src={`/img/advantages/${icon}`} alt="advantages" />
              </div>
              <div className={stl.context__card}>
                <p className={stl["advantages__card--title"]}>{title}</p>
                <p className={stl["advantages__card--text"]}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
