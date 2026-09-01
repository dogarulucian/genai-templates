import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import egyptImg from "@/assets/egypt-old.png";
import englandImg from "@/assets/modern-london.jpg";
import chinaImg from "@/assets/modern-china.jpg";
import { BookingDrawer } from "@/components/BookingDrawer";


type DeckData = {
  title: string;
  kicker: string;
  blurb: string;
  image: string;
  alt: string;
  places: [string, string][];
};

const DECKS: Record<string, DeckData> = {
  egypt: {
    title: "EGYPT",
    kicker: "Deck 01 · The old kingdom",
    blurb:
      "Four thousand years of silence, and the desert still keeps every secret. Camels at dawn, the Nile at dusk.",
    image: egyptImg,
    alt: "The Great Pyramid of Giza at golden hour, desert haze",
    places: [
      ["Giza", "The last wonder standing. Go before the crowds wake."],
      ["Luxor", "Temples on the east bank, tombs on the west."],
      ["Aswan", "Feluccas, Nubian light and the slow river."],
    ],
  },
  england: {
    title: "ENGLAND",
    kicker: "Deck 02 · The fog capital",
    blurb:
      "Gas lamps, wet cobblestones and a bell that keeps the city's time. London rewards those who walk slowly.",
    image: englandImg,
    alt: "Modern London skyline at sunset with Big Ben and a red double-decker bus",
    places: [
      ["London", "Fog, carriages and the great clock over Westminster."],
      ["Bath", "Roman waters and honey-coloured stone."],
      ["York", "Medieval lanes best explored at dusk."],
    ],
  },
  china: {
    title: "CHINA",
    kicker: "Deck 03 · The long wall",
    blurb:
      "A stone dragon sleeping on the mountain ridges. Mist below, dynasties above, silence everywhere.",
    image: chinaImg,
    alt: "Modern Hong Kong skyline at night with a red-sailed junk boat on the harbour",
    places: [
      ["Beijing", "Gates, courtyards and the wall at first light."],
      ["Xi'an", "Terracotta armies guarding an emperor's dream."],
      ["Guilin", "Karst peaks drifting on a slow green river."],
    ],
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travelisimo — Retro Voyages Since 1974" },
      {
        name: "description",
        content:
          "Travelisimo books sun-soaked, slow-travel escapes: coastlines, dunes and alpine air, curated the old-fashioned way.",
      },
      { property: "og:title", content: "Travelisimo — Retro Voyages Since 1974" },
      {
        property: "og:description",
        content:
          "Sun-soaked, slow-travel escapes: coastlines, dunes and alpine air, curated the old-fashioned way.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Marquee() {
  const words = [
    "NO ITINERARIES",
    "REAL POSTCARDS",
    "SUNSET GUARANTEED",
    "EST. 1974",
  ];
  return (
    <div className="overflow-hidden border-y border-cream/10 bg-ink/70 py-3 backdrop-blur-md">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10">
            {words.map((w) => (
              <span
                key={w}
                className="font-display text-xl tracking-wide text-cream sm:text-2xl"
              >
                {w} <span className="text-sun">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Deck({
  deck,
  open,
  onClose,
}: {
  deck: DeckData;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [booking, setBooking] = useState<{ label: string; price: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setVisible(false);
      document.body.style.overflow = "";
      const t = setTimeout(() => setMounted(false), 900);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-ink transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
      aria-hidden={!open}
    >
      {/* parallax image layer */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto"
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        <div className="relative">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <img
              src={deck.image}
              alt={deck.alt}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{
                transform: `scale(1.15) translate(${parallax.x * -18}px, ${
                  parallax.y * -12 + scrollY * 0.35
                }px)`,
                filter: "saturate(1.1) contrast(1.05) sepia(0.15)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.18 0.04 45 / 0.55) 0%, transparent 30%, transparent 60%, oklch(0.18 0.04 45 / 0.8) 100%)",
              }}
            />

            <div className="relative flex h-full flex-col justify-between px-6 py-8 sm:px-12">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-script text-3xl font-medium italic tracking-wide text-cream">
                  <Plane className="h-5 w-5 text-sun sm:h-6 sm:w-6" />
                  <span>Travelisimo</span>
                </span>
                <button
                  onClick={onClose}
                  className="rounded-full border border-cream/40 px-6 py-2 font-body text-xs uppercase tracking-[0.3em] text-cream transition-colors hover:bg-cream hover:text-ink"
                >
                  Close
                </button>
              </div>

              <div
                className="will-change-transform"
                style={{ transform: `translateY(${scrollY * -0.15}px)` }}
              >
                <p className="font-body text-xs uppercase tracking-[0.55em] text-sun">
                  {deck.kicker}
                </p>
                <h2
                  onClick={onClose}
                  className="mt-4 cursor-pointer font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] text-cream transition-opacity duration-300 hover:opacity-60"
                >
                  {deck.title}
                </h2>
                <p className="mt-6 max-w-md font-body text-lg text-cream/85">
                  {deck.blurb}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setBooking({ label: "Buy 3 nights package", price: "$690" })}
                    className="rounded-full border border-cream/40 bg-transparent px-6 py-2.5 font-body text-sm uppercase tracking-[0.25em] text-cream transition-colors hover:bg-cream hover:text-ink"
                  >
                    Buy 3 nights package
                  </button>
                  <button
                    onClick={() => setBooking({ label: "Buy 7 nights package", price: "$1,450" })}
                    className="rounded-full border border-cream/40 bg-transparent px-6 py-2.5 font-body text-sm uppercase tracking-[0.25em] text-cream transition-colors hover:bg-cream hover:text-ink"
                  >
                    Buy 7 nights package
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* scrollable content below the fold */}
          <div className="relative bg-ink px-6 py-24 sm:px-12">
            <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
              {deck.places.map(([name, blurb]) => (
                <div key={name} className="border-t border-cream/30 pt-4">
                  <h3 className="font-display text-3xl text-cream">{name}</h3>
                  <p className="mt-3 font-body text-sm text-cream/70">{blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BookingDrawer
        open={booking !== null}
        onOpenChange={(o: boolean) => { if (!o) setBooking(null); }}
        destination={deck.title}
        packageLabel={booking?.label ?? ""}
        price={booking?.price ?? ""}
      />
    </div>
  );
}

function Hero({ onOpenDeck }: { onOpenDeck: (deck: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="retro-grain relative isolate min-h-[100svh] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{
          transform: `scale(1.08) translateY(${scroll * 0.25}px)`,
          filter: "saturate(1.25) contrast(1.08) sepia(0.22)",
        }}
        src="/tourism_agency.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-dusk)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.04 45 / 0.55) 0%, transparent 32%, transparent 55%, oklch(0.18 0.04 45 / 0.72) 100%)",
        }}
      />

      <div
        aria-hidden
        className="sun-rays absolute -right-40 -top-40 -z-10 h-[40rem] w-[40rem] rounded-full opacity-20 mix-blend-soft-light"
      />

      <nav className="relative flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-12">
        <span className="inline-flex items-center gap-2 font-script text-3xl font-medium italic tracking-wide text-cream sm:text-4xl">
          <Plane className="h-5 w-5 text-sun sm:h-6 sm:w-6" />
          <span>Travelisimo</span>
        </span>
        <div className="hidden items-center gap-8 font-body text-sm uppercase tracking-[0.25em] text-cream md:flex">
          {(["egypt", "england", "china"] as const).map((d) => (
            <button
              key={d}
              onClick={() => onOpenDeck(d)}
              className="uppercase tracking-[0.25em] transition-colors hover:text-sun"
            >
              {d}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative mx-auto flex min-h-[74svh] max-w-6xl flex-col justify-center px-6 pb-24 sm:px-12">
        <p className="font-body text-xs uppercase tracking-[0.55em] text-sun">
          Est. 1974 · Agency of unhurried voyages
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] text-cream">
          Look for a journey{" "}
          <span className="italic text-sun">not just a destination</span>
        </h1>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-[0.65rem] uppercase tracking-[0.4em] text-cream/70">
        scroll · reel 01
      </div>
    </header>
  );
}

function Index() {
  const [activeDeck, setActiveDeck] = useState<string | null>(null);

  return (
    <main className="bg-cream">
      <Hero onOpenDeck={setActiveDeck} />
      <Marquee />
      {Object.entries(DECKS).map(([key, deck]) => (
        <Deck
          key={key}
          deck={deck}
          open={activeDeck === key}
          onClose={() => setActiveDeck(null)}
        />
      ))}
    </main>
  );
}
