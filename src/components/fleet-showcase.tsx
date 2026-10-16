"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

type Vehicle = {
  name: string;
  type: string;
  image: string;
  description: string;
  position: string;
};

export function FleetShowcase({
  vehicles,
  reducedMotion = false,
}: {
  vehicles: Vehicle[];
  reducedMotion?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(
    () => {
      if (reducedMotion) return;
      const media = gsap.matchMedia();
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            `.fleet-slide[data-active="true"] img`,
            { scale: 0.94 },
            { scale: 1, duration: 1.2, ease: "power2.out" },
          );
          gsap.fromTo(
            ".vehicle-description",
            { y: 15, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.65,
              ease: "power3.out",
            },
          );
        },
        root,
      );
      return () => media.revert();
    },
    {
      scope: root,
      dependencies: [active, reducedMotion],
      revertOnUpdate: true,
    },
  );

  function select(index: number) {
    if (!viewport.current) return;
    const next = Math.max(0, Math.min(vehicles.length - 1, index));
    viewport.current.scrollTo({
      left: next * viewport.current.clientWidth,
      behavior:
        reducedMotion ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  }

  return (
    <div className="fleet-grid" ref={root}>
      <div className="fleet-stage">
        <div
          className="fleet-image-wrap"
          ref={viewport}
          role="region"
          aria-roledescription="karusel"
          aria-label="Araç filosu; kaydırın veya ok tuşlarını kullanın"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              select(active + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
          onScroll={() => {
            if (viewport.current)
              setActive(
                Math.round(
                  viewport.current.scrollLeft / viewport.current.clientWidth,
                ),
              );
          }}
        >
          {vehicles.map((vehicle, index) => (
            <div
              className="fleet-slide"
              key={vehicle.name}
              data-active={active === index}
              role="group"
              aria-roledescription="slayt"
              aria-label={`${index + 1} / ${vehicles.length}: ${vehicle.name}`}
            >
              <Image
                src={`/images/fleet/${vehicle.image}`}
                alt={`${vehicle.name} — Arazöz Otomotiv’in gerçek filosundan`}
                fill
                sizes="(max-width: 800px) 92vw, 63vw"
                style={{ objectPosition: "center" }}
              />
              <span className="image-caption">
                <span className="status-dot" /> ARAZÖZ OTOMOTİV FİLOSU
              </span>
              <span className="fleet-image-number">0{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="fleet-toolbar">
          <span>SAHADAN. OLDUĞU GİBİ.</span>
          <span className="fleet-count" aria-live="polite">
            0{active + 1} <i>/ 0{vehicles.length}</i>
          </span>
          <div className="carousel-controls">
            <button
              onClick={() => select(active - 1)}
              disabled={active === 0}
              aria-label="Önceki araç"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              onClick={() => select(active + 1)}
              disabled={active === vehicles.length - 1}
              aria-label="Sonraki araç"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
      <div className="fleet-selector">
        <p className="small-label">İŞİNİZE UYGUN GÜÇ</p>
        {vehicles.map((vehicle, index) => (
          <button
            key={vehicle.name}
            className={active === index ? "is-active" : ""}
            onClick={() => select(index)}
            aria-pressed={active === index}
          >
            <span className="fleet-select-number">0{index + 1}</span>
            <span>
              <small>{vehicle.type}</small>
              <strong>{vehicle.name}</strong>
              <span className="vehicle-description" hidden={index !== active}>
                {vehicle.description}
              </span>
            </span>
            <ArrowUpRight size={19} />
          </button>
        ))}
        <a href="tel:+905434302010" className="text-link sage-action">
          İşinize uygun aracı konuşalım
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
