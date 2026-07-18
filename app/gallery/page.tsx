"use client";

import { useState, useEffect, useCallback } from "react";
import { useContentConfig, useSiteConfig } from "@/hooks/useRuntimeConfig";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdFrame from "@/components/ui/AdFrame";

interface GalleryImage {
  src: string;
  name: string;
  folder: string;
}

const categories = ["All", "Welcome", "System", "Install", "PlayStore", "Branding"];

export default function GalleryPage() {
  const CONTENT = useContentConfig();
  const SITE = useSiteConfig();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data: GalleryImage[]) => { setImages(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => { setLightboxIndex(index); setZoom(1); };
  const closeLightbox = () => { setLightboxIndex(null); setZoom(1); };

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
    setZoom(1);
  }, [lightboxIndex, images.length]);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    setZoom(1);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, next, prev]);

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter((img) => img.name.toLowerCase().includes(activeCategory.toLowerCase()) || img.folder.toLowerCase().includes(activeCategory.toLowerCase()));

  const getImageMeta = (name: string) => {
    const screen = CONTENT.screens?.find((s) => name.includes(s.image?.replace(".png", "") || ""));
    if (screen) return { title: screen.title, desc: screen.desc };
    const clean = name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    return { title: clean.charAt(0).toUpperCase() + clean.slice(1), desc: "" };
  };

  return (
    <>
      {/* YouTube Video */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Screenshots &amp; Videos</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">
              See WSA Installer in action
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border-primary shadow-2xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/-h-YR-N5BrA"
                title="WSA Installer - Installation Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-10 md:py-14 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              {CONTENT.gallery?.title || "Screenshots"}
            </h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">
              {CONTENT.gallery?.description || "Browse through the WSA Installer interface"}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  activeCategory === cat
                    ? "bg-accent-primary/10 border-accent-primary text-accent-primary"
                    : "border-border-secondary text-text-secondary hover:text-text-primary hover:border-border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Ad */}
          <div className="mb-8">
            <AdFrame slot="sidebar-gallery" format="banner" />
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/2] rounded-xl bg-bg-tertiary animate-pulse" />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-24 text-text-secondary">
              <p>No images found.</p>
              <p className="mt-2 text-sm text-text-muted">Add images to public/demo-images/ to get started.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img, i) => {
                const meta = getImageMeta(img.name);
                return (
                  <button
                    key={img.src}
                    onClick={() => openLightbox(i)}
                    className="group text-left"
                  >
                    <div className="relative rounded-lg overflow-hidden border border-border-primary bg-bg-secondary transition-all group-hover:border-accent-primary/50 hover:shadow-glow-subtle">
                      <img
                        src={img.src}
                        alt={meta.title}
                        loading="lazy"
                        className="w-full h-auto transition-transform group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <span className="text-sm text-accent-primary font-medium">Click to enlarge</span>
                      </div>
                    </div>
                    <h3 className="mt-3 font-medium text-text-primary group-hover:text-accent-primary transition-colors">{meta.title}</h3>
                    {meta.desc && <p className="text-sm text-text-muted">{meta.desc}</p>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/features" className="text-accent-primary hover:underline">Explore all features →</a>
            <a href="/downloads" className="text-accent-primary hover:underline">Download WSA Installer →</a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute right-4 top-4 z-[100000] flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 z-[100000] flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 z-[100000] flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 mr-16">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100000] flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); setZoom(Math.max(0.5, zoom - 0.25)); }} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs text-white/60">{Math.round(zoom * 100)}%</span>
              <button onClick={(e) => { e.stopPropagation(); setZoom(Math.min(3, zoom + 0.25)); }} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
                <ZoomIn className="h-4 w-4" />
              </button>
              <span className="ml-4 text-xs text-white/60">{lightboxIndex + 1} / {filteredImages.length}</span>
            </div>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].name}
                className="max-h-[80vh] object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
