"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { MoveRight, Sparkles, MapPin, ChevronDown, Check } from "lucide-react";

const dictionary = {
  ka: {
    academy: "სილამაზის აკადემია",
    bookNav: "დაჯავშნე ახლავე",
    heroTitle: "დაეუფლე სელფ-მეიქაფის ხელოვნებას",
    elite: "ელიტური მიღება",
    intensive: "3-დღიანი ინტენსიური კურსი",
    mastery: "სელფ-მეიქაფის მასტერკლასი",
    bookGlow: "დაჯავშნე შენი ადგილი",
    bookGlowSub: "პროფესიონალური შედეგის მისაღებად",
    tbilisi: "თბილისის მასტერკლასი",
    batumi: "ინტენსიური კურსი ბათუმში",
    kutaisi: "ქუთაისი: ადგილები შევსებულია",
  },
  en: {
    academy: "Beauty School",
    bookNav: "Book Now",
    heroTitle: "Self-Makeup Master",
    elite: "Elite Admission",
    intensive: "3-Day Intensive",
    mastery: "Self-Makeup Mastery",
    bookGlow: "Book Your Glow",
    bookGlowSub: "to achieve professional results",
    tbilisi: "Tbilisi Masterclass",
    batumi: "Batumi Intensive",
    kutaisi: "Kutaisi Sold Out",
  }
};

export default function SazinaFlagship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lang, setLang] = useState<"ka" | "en">("ka");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dragX = useMotionValue(50); // Start at 50%

  const t = dictionary[lang];
  const flags = { ka: "🇬🇪", en: "🇬🇧" };

  // Update drag handle on mouse/touch move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let newX = ((e.clientX - left) / width) * 100;
    newX = Math.max(0, Math.min(newX, 100)); // Clamp between 0-100
    dragX.set(newX);
  };

  const clipPathValue = useTransform(dragX, (val) => `polygon(${val}% 0%, 100% 0%, 100% 100%, ${val}% 100%)`);

  // Infinite Scroll Marquee State
  const [tickerPosition, setTickerPosition] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPosition((prev) => (prev <= -100 ? 0 : prev - 0.005));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#FDF5E6] font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden flex flex-col">
      
      {/* 1. BRUTALIST GLASS NAV */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex flex-col uppercase tracking-[0.3em] font-serif">
            <span className="text-sm text-[#D4AF37]">Sazina</span>
            <span className={`text-[0.6rem] text-white/50 ${lang === 'ka' ? 'tracking-[0.15em]' : 'tracking-[0.4em]'}`}>{t.academy}</span>
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative border-l border-white/10 pl-4 md:pl-6">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-[0.6rem] md:text-xs font-bold tracking-widest text-[#D4AF37] hover:text-white transition-colors"
            >
              <span>{flags[lang]}</span>
              <span className="uppercase">{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 bg-black/90 backdrop-blur-2xl border border-[#D4AF37]/30 min-w-[120px] shadow-2xl p-2 z-[60]"
                >
                  {(["ka", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-[0.6rem] tracking-[0.2em] uppercase hover:bg-[#D4AF37]/10 transition-colors ${lang === l ? 'text-[#D4AF37]' : 'text-white/60'}`}
                    >
                      <span className="flex items-center gap-2"><span>{flags[l]}</span> {l}</span>
                      {lang === l && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className={`text-xs uppercase whitespace-nowrap border border-[#D4AF37]/50 px-4 py-2 hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 ${lang === 'ka' ? 'tracking-wider' : 'tracking-widest'}`}>
          {t.bookNav}
        </button>
      </nav>

      {/* 2. THE KINETIC REVEAL HERO (SPLIT-SCREEN) */}
      <section 
        className="relative flex-grow h-[85vh] w-full select-none touch-none overflow-hidden"
        ref={containerRef}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        onPointerMove={handlePointerMove}
      >
        {/* 1. SOLID DARK BASE (BEFORE) */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Subtle Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* Layer 1: Raw Texture (Background) */}
        <div className="absolute inset-0 z-10">
          <img 
            src="/before.png" 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_100px_rgba(0,0,0,0.8)] saturate-[0.85] brightness-[0.75] contrast-[0.95]"
          />
          {/* Portrait Vignette Blend */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_40%,_#000000_100%)] pointer-events-none opacity-40" />
        </div>

        {/* Layer 2: Snatched Look (Clipped Foreground) */}
        <motion.div 
          className="absolute inset-0 z-10 origin-left border-l border-[#D4AF37]/50 overflow-hidden"
          style={{ clipPath: clipPathValue, WebkitClipPath: clipPathValue, filter: "saturate(1.1) contrast(1.05)" }}
        >
          {/* 1b. THEMATIC BACKDROP: AFTER (BRIGHT/VIBRANT) */}
          <div className="absolute inset-0 z-0 bg-[#F5F5F0]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[1.1] saturate-[1.1] blur-[8px]"
              style={{ backgroundImage: "url('/studio-background-warm.png')" }} 
            />
            {/* Vanity Lighting Effects */}
            <div className="absolute top-[20%] left-[15%] w-64 h-64 bg-[#FFF9E5]/50 blur-[80px] rounded-full animate-pulse duration-[4s]" />
            <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-[#FFF9E5]/50 blur-[80px] rounded-full animate-pulse duration-[5s]" />
            <div className="absolute inset-0 bg-[#D4AF37]/5" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 opacity-40" />
          </div>

          <img 
            src="/after1.png" 
            alt="After" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10"
          />
          {/* Portrait Vignette Blend */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_40%,_#000000_100%)] pointer-events-none opacity-40" />
          <div className="absolute inset-0 bg-black/20" /> {/* Mood lighting */}
        </motion.div>

        {/* The Symmetry HUD (Drag Handle) */}
        <motion.div 
          className="absolute top-0 bottom-0 w-12 -ml-6 z-40 flex items-center justify-center cursor-ew-resize group/handle"
          style={{ left: useTransform(dragX, (val) => `${val}%`) }}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            setIsDragging(true);
          }}
        >
          {/* Visible Line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6),0_0_40px_rgba(212,175,55,0.2)]">
            {/* Rim Light Effect on Line */}
            <div className="absolute inset-y-0 -left-1 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent blur-[1px]" />
          </div>

          <div className="w-16 h-16 rounded-full border border-[#D4AF37] bg-black/30 backdrop-blur-xl flex items-center justify-center pointer-events-none group-hover/handle:scale-110 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full border-[0.5px] border-[#D4AF37]/50 flex items-center justify-center relative">
               {/* Precision Crosshair */}
               <div className="absolute w-full h-[0.5px] bg-[#D4AF37]/70" />
               <div className="absolute h-full w-[0.5px] bg-[#D4AF37]/70" />
               <div className="absolute w-2 h-2 border border-[#D4AF37] rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 3. COMBINED HERO CONTENT (Title + Conversion Engine) */}
        <div className="absolute bottom-12 left-6 right-6 md:bottom-24 md:left-16 md:right-16 z-30 flex flex-col md:flex-row md:justify-between items-end pointer-events-none">
          
          {/* Hero Typography Overlay */}
          <div className="w-full md:max-w-[45vw] mb-12 md:mb-0 text-left">
            <h1 className={`${lang === 'ka' ? 'text-3xl md:text-7xl' : 'text-4xl md:text-7xl'} font-serif leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] uppercase transition-all duration-500`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FDF5E6] italic">{t.heroTitle}</span>
            </h1>
          </div>

          {/* GLASSMORPHIC CONVERSION ENGINE (Accordion on Mobile) */}
          <div className="w-full md:max-w-sm pointer-events-auto">
            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#D4AF37]/30 flex flex-col shadow-2xl relative overflow-hidden group">
              {/* Header / Trigger */}
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                disabled={typeof window !== 'undefined' && window.innerWidth >= 768}
                className="w-full p-4 md:p-6 flex items-center justify-between text-left group/trigger"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37]">
                  <Sparkles className="w-3 h-3" />
                  <span>{t.elite}</span>
                </div>
                <ChevronDown className={`md:hidden w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Accordion Body */}
              <motion.div 
                initial={false}
                animate={{ height: (typeof window !== 'undefined' && window.innerWidth >= 768) || isExpanded ? 'auto' : 0 }}
                className="overflow-hidden md:h-auto"
              >
                <div className="px-4 pb-6 md:px-6 md:pb-6 flex flex-col gap-4 border-t border-white/5 md:border-none">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-white">{t.intensive}</h3>
                    <p className="text-[0.65rem] md:text-xs text-white/50 tracking-wider mt-1">{t.mastery}</p>
                  </div>
                  <button className="mt-2 w-full bg-[#D4AF37] text-black py-3 px-6 text-xs font-bold uppercase tracking-[0.2em] flex flex-col items-center hover:bg-white transition-colors group">
                    <span className="flex justify-between items-center w-full">{t.bookGlow} <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                    <span className="text-[0.5rem] md:text-[0.6rem] opacity-70 normal-case mt-1">{t.bookGlowSub}</span>
                  </button>
                </div>
              </motion.div>
              
              {/* Shimmer Effect Background */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent group-hover:animate-shimmer pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TOUR INFINITE MARQUEE */}
      <section className="h-[10vh] border-y border-[#D4AF37]/20 bg-[#050505] flex items-center overflow-hidden whitespace-nowrap">
        <motion.div 
          className="flex items-center gap-12 text-sm md:text-lg uppercase tracking-[0.4em] font-light text-white/60"
          style={{ x: `${tickerPosition}%` }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#D4AF37]"/> {t.tbilisi}</span>
              <span className="text-[#D4AF37]">///</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#D4AF37]"/> {t.batumi}</span>
              <span className="text-[#D4AF37]">///</span>
              <span className="line-through opacity-50">{t.kutaisi}</span>
              <span className="text-[#D4AF37]">///</span>
            </React.Fragment>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
