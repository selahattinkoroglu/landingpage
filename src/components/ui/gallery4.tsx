"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  tag?: string;
}
export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  reducedMotion?: boolean;
}

export function Gallery4({
  title,
  description,
  items,
  reducedMotion = false,
}: Gallery4Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [snaps, setSnaps] = useState<number[]>([]);
  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSelected(api.selectedScrollSnap());
      setPrev(api.canScrollPrev());
      setNext(api.canScrollNext());
      setSnaps(api.scrollSnapList());
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);
  const jump = () =>
    reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <section
      className="gallery4"
      id="hizmetler"
      aria-labelledby="services-heading"
    >
      <div className="gallery4-heading">
        <div>
          <p className="gallery4-kicker">Hizmetlerimiz</p>
          <h2 id="services-heading">{title}</h2>
          <p className="gallery4-intro">{description}</p>
        </div>
        <div className="gallery4-arrows">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Önceki hizmet"
            disabled={!prev}
            onClick={() => api?.scrollPrev(jump())}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Sonraki hizmet"
            disabled={!next}
            onClick={() => api?.scrollNext(jump())}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          duration: reducedMotion ? 0 : 28,
          breakpoints: {
            "(max-width: 768px)": { dragFree: true },
            "(prefers-reduced-motion: reduce)": { duration: 0 },
          },
        }}
        className="gallery4-carousel"
        aria-label="Hizmet kartları"
        tabIndex={0}
      >
        <CarouselContent className="gallery4-track">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="gallery4-item"
              aria-label={item.title}
            >
              <a
                href={item.href}
                className="gallery4-card"
                aria-label={`${item.title} hakkında bilgi alın`}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} için Arazöz Otomotiv aracı`}
                  fill
                  sizes="(max-width: 600px) 85vw, (max-width: 1100px) 42vw, 380px"
                  draggable={false}
                />
                <div className="gallery4-shade" />
                <span className="gallery4-tag">{item.tag}</span>
                <div className="gallery4-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="gallery4-link">
                    Bilgi alın <ArrowUpRight size={19} />
                  </span>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="gallery4-bottom">
        <span>İşinize uygun hizmeti keşfedin</span>
        <div className="gallery4-dots" aria-label="Galeri konumu">
          {snaps.map((_, index) => (
            <button
              key={index}
              aria-label={`${index + 1}. kart grubuna git`}
              aria-current={selected === index ? "true" : undefined}
              onClick={() => api?.scrollTo(index, jump())}
            >
              <span />
            </button>
          ))}
        </div>
        <span className="gallery4-position" aria-live="polite">
          {selected + 1} / {snaps.length || 1}
        </span>
      </div>
    </section>
  );
}
