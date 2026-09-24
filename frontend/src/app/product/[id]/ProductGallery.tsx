"use client";

import { useMemo, useState } from "react";
import stl from "./page.module.scss";

type ProductGalleryProps = {
  name: string;
  mainImage: string;
  images: string[];
};

export default function ProductGallery({ name, mainImage, images }: ProductGalleryProps) {
  const gallery = useMemo(() => {
    if (images.length > 0) return images;
    if (mainImage) return [mainImage];
    return [];
  }, [images, mainImage]);

  const [selected, setSelected] = useState(mainImage || gallery[0] || "");
  const currentImage = selected || gallery[0] || "";

  return (
    <section className={stl.gallery}>
      {currentImage ? (
        <img className={stl.mainImage} src={currentImage} alt={name} />
      ) : (
        <div className={stl.emptyImage}>No image</div>
      )}

      {gallery.length > 1 ? (
        <div className={stl.thumbs}>
          {gallery.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              className={img === currentImage ? stl.thumbActive : stl.thumb}
              onClick={() => setSelected(img)}
            >
              <img src={img} alt={`${name} ${index + 1}`} />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
