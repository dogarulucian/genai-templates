import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import burgerClassic from "@/assets/burger-classic.jpg";
import burgerTruffle from "@/assets/burger-truffle.jpg";
import burgerSmoky from "@/assets/burger-smoky.jpg";
import burgerChili from "@/assets/burger-chili.jpg";
import burgerGarden from "@/assets/burger-garden.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Future Burger — One-Take Drone Delivery Film" },
      {
        name: "description",
        content:
          "An 8-second continuous macro-to-skyline film: gourmet burger textures, autonomous drone lift-off, golden-hour city flight, balcony hand-off.",
      },
      { property: "og:title", content: "Future Burger — One-Take Drone Delivery Film" },
      {
        property: "og:description",
        content:
          "Photorealistic commercial cinematography in a single seamless take: macro food textures to drone delivery at golden hour.",
      },
    ],
  }),
  component: Index,
});

type Burger = {
  id: string;
  price: string;
  title: string;
  img: string;
  copy: string;
  description: string;
  ingredients: string[];
};

const burgers: Burger[] = [
  {
    id: "classic",
    price: "€9.50",
    title: "Classic Smash",
    img: burgerClassic,
    copy: "Double smashed beef, aged cheddar, house pickles, toasted brioche.",
    description:
      "The burger that started it all. Two thin beef patties smashed onto a scorching flat-top until the edges shatter into lace, then layered with molten cheddar and house pickles on a glossy brioche bun.",
    ingredients: ["Double smashed beef patties", "Aged cheddar", "House pickles", "Toasted brioche bun", "Smash sauce"],
  },
  {
    id: "truffle",
    price: "€13.90",
    title: "Truffle Royale",
    img: burgerTruffle,
    copy: "Dry-aged patty, truffle aioli, caramelised onion, gruyère.",
    description:
      "Our most indulgent stack. A dry-aged patty cooked medium, draped in nutty gruyère and finished with black truffle aioli and slow-caramelised onions for a deep, savoury finish.",
    ingredients: ["Dry-aged beef patty", "Gruyère cheese", "Truffle aioli", "Caramelised onions", "Brioche bun"],
  },
  {
    id: "smoky",
    price: "€11.40",
    title: "Smoky BBQ Stack",
    img: burgerSmoky,
    copy: "Slow-smoked brisket, crispy onions, bourbon BBQ glaze.",
    description:
      "Twelve hours over hickory smoke. Slow-smoked brisket piled high with crispy fried onions and a sticky bourbon BBQ glaze that balances sweet, smoky and sharp.",
    ingredients: ["Slow-smoked brisket", "Crispy fried onions", "Bourbon BBQ glaze", "Smoked gouda", "Pretzel bun"],
  },
  {
    id: "chili",
    price: "€10.80",
    title: "Chili Inferno",
    img: burgerChili,
    copy: "Jalapeño relish, chipotle mayo, pepper jack, fresh lettuce.",
    description:
      "For the heat seekers. A juicy patty topped with pepper jack, a tangy jalapeño relish and a smoky chipotle mayo that builds a slow, satisfying burn.",
    ingredients: ["Beef patty", "Pepper jack cheese", "Jalapeño relish", "Chipotle mayo", "Fresh lettuce", "Sesame bun"],
  },
  {
    id: "garden",
    price: "€10.20",
    title: "Garden Future",
    img: burgerGarden,
    copy: "Plant-based patty, avocado, vine tomato, herb yoghurt.",
    description:
      "All the satisfaction, none of the meat. A protein-packed plant-based patty with ripe avocado, sun-ripened vine tomato and a bright herb yoghurt that keeps it fresh.",
    ingredients: ["Plant-based patty", "Avocado", "Vine tomato", "Herb yoghurt", "Baby spinach", "Whole-grain bun"],
  },
];

function DroneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden="true">
      <ellipse cx="10" cy="10" rx="9" ry="2.4" fill="currentColor" opacity="0.45" />
      <ellipse cx="54" cy="10" rx="9" ry="2.4" fill="currentColor" opacity="0.45" />
      <path d="M14 12 L26 20 M50 12 L38 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="18" width="16" height="9" rx="3" fill="currentColor" />
      <path d="M27 27 v4 h10 v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="26" y="31" width="12" height="6" rx="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Burger | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden">
        <video
          ref={videoRef}
          src="/future-burger.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end gap-6 px-6 pb-20 pt-32">
          <span className="w-fit rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Presto Burgers
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            From the center of the burger to your balcony.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Flame-kissed, stacked high and still sizzling — flown straight from our grill to your
            balcony in minutes. Hot buns, no waiting.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setMuted((m) => !m)}
              className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
              style={{ backgroundImage: "var(--gradient-golden)" }}
            >
              {muted ? "Unmute the film" : "Mute the film"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Burgers menu</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {burgers.map((b) => (
            <article
              key={b.id}
              onClick={() => setActive(b)}
              className="group relative isolate flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card p-6 transition-transform hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <DroneIcon className="drone-fly absolute left-1/2 top-1/2 h-16 w-24 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-[0_0_12px_rgba(0,0,0,0.4)]" />
              </div>
              <div className="mb-4 overflow-hidden rounded-[var(--radius-lg)] bg-muted/30">
                <img
                  src={b.img}
                  alt={`${b.title} burger`}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="h-36 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="font-mono text-xs text-primary">{b.price}</p>
              <h3 className="mt-3 text-xl font-medium">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.copy}</p>
              <button
                onClick={() => setCart((c) => ({ ...c, [b.id]: (c[b.id] ?? 0) + 1 }))}
                className="mt-6 w-fit rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
                style={{ backgroundImage: "var(--gradient-golden)" }}
              >
                {cart[b.id] ? `In cart · ${cart[b.id]}` : "Add to cart"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6 text-sm text-foreground">
          Future burgers 2026
        </div>
      </footer>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-glow)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-background"
            >
              ✕
            </button>
            <div className="overflow-hidden rounded-t-[var(--radius-2xl)] bg-muted/30">
              <img
                src={active.img}
                alt={`${active.title} burger`}
                className="h-56 w-full object-contain"
              />
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold">{active.title}</h3>
                <p className="font-mono text-sm text-primary">{active.price}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
              <div className="mt-5">
                <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ingredients</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {active.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-foreground"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  setCart((c) => ({ ...c, [active.id]: (c[active.id] ?? 0) + 1 }));
                  setActive(null);
                }}
                className="mt-6 w-full rounded-full px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                style={{ backgroundImage: "var(--gradient-golden)" }}
              >
                {cart[active.id] ? `Add another · ${cart[active.id]} in cart` : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
