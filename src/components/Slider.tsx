import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildSrcset, getImageData, type StrapiImage } from "../utils/imageHelpers";

interface SlideImage {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    large?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
  };
}

interface Slide {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  image?: SlideImage[];
}

interface SliderData {
  id: number;
  title: string;
  subtitle: string;
  slides: Slide[];
}

interface ImageCarouselProps {
  lang: "es" | "de";
  sliderData: SliderData;
}

export default function ImageCarousel({
  lang,
  sliderData,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = sliderData?.slides || [];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (!sliderData || slides.length === 0) {
    return null;
  }

  return (
    <section className="py-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {sliderData.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {sliderData.subtitle}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white border border-slate-200">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide) => {
                const slideImage = slide.image?.[0] as StrapiImage | undefined;
                const imageData = getImageData(slideImage);
                const srcset = buildSrcset(slideImage);

                return (
                  <div key={slide.id} className="w-full flex-shrink-0 relative">
                    <div className="relative h-96 md:h-[500px]">
                      {imageData ? (
                        <img
                          src={imageData.url}
                          srcSet={srcset}
                          sizes="100vw"
                          alt={imageData.alternativeText || slide.title}
                          width={imageData.width}
                          height={imageData.height}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-brand-blue to-brand-blue/80" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                          <div className="max-w-2xl text-white">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                              {slide.title}
                            </h3>
                            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                              {slide.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group z-10"
              aria-label={lang === "de" ? "Vorheriges Bild" : "Imagen anterior"}
              type="button"
            >
              <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group z-10"
              aria-label={lang === "de" ? "Nächstes Bild" : "Siguiente imagen"}
              type="button"
            >
              <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`${
                    lang === "de" ? "Gehe zu Bild" : "Ir a imagen"
                  } ${index + 1}`}
                  type="button"
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={toggleAutoPlay}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                aria-label={
                  isAutoPlaying
                    ? lang === "de"
                      ? "Auto-Play pausieren"
                      : "Pausar auto-play"
                    : lang === "de"
                    ? "Auto-Play starten"
                    : "Iniciar auto-play"
                }
                type="button"
              >
                {isAutoPlaying ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                ) : (
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-blue to-brand-blue/80 transition-all duration-500 ease-in-out"
              style={{
                width: `${((currentIndex + 1) / slides.length) * 100}%`,
              }}
            />
          </div>

          {/* Slide counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
