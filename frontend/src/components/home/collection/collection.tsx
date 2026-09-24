import React from "react";
import stl from "./collection.module.scss";

export default function CollectionSection() {
  return (
    <section id="collection" className={stl.collection}>
      <div className={stl.block__header}>
        <h2 className={stl.block__title}>New Collection</h2>
        <div className={stl.block__logo}><img src="/img/logo.svg" alt="BRAVEX" width={103} height={10} decoding="async" /></div>
      </div>

      <div className={stl["img-container"]}>
        <img
          className={stl.collection__img}
          src="/img/collection.avif"
          alt="collection"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={stl.block__content}>
        <h3 className={`${stl.block__mainText} ${stl.collection__mainText}`}>Sofa Boco Room</h3>
        <div className={stl.block__container}>
          <p className={stl.collection__price}>1 700 EUR</p>
          <span className={stl.line}></span>
          <p className={`${stl.container__text} ${stl.collection__text}`}>The price includes delivery, installation, and VAT</p>
        </div>
      </div>

      <div className={stl["block__content--main"]}>
        <div className={stl["container-btn"]}>
          <button className={stl["btn-text"]}>Learn more</button>
          <img className={stl["btn-img"]} src="/img/arrow.svg" alt="arrow" width={14} height={14} decoding="async" />
        </div>
        <div className={stl.block__cards}>
          <div className={stl.block__card}><p className={stl.card__description}>Size</p><p className={stl.block__text}>100x150 CM</p></div>
          <div className={`${stl.block__card} ${stl["block__card--active"]}`}><p className={stl.card__description} >Collection</p><p className={stl.block__text}>Dragon</p></div>
          <div className={stl.block__card}><p className={stl.card__description}>Category</p><p className={stl.block__text}>Furniture</p></div>
        </div>
      </div>
    </section>
  );
}
