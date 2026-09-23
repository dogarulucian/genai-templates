import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, X } from "lucide-react";
import { useState } from "react";

import commercial from "@/assets/video.mp4";
import spriteB from "@/assets/de88859e-6d0d-4d77-ba1e-a2e5c8474bfe.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sparkle Fresh — Make brushing the best part of bedtime" },
      { name: "description", content: "Discover Sparkle Fresh kids toothpaste in Mint Sensation, Fresh Citrus, and Berry Blast." },
      { property: "og:title", content: "Sparkle Fresh Kids Toothpaste" },
      { property: "og:description", content: "Three smile-powered flavors. One sparkling brushing routine." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SparkleFresh,
});

const flavors = [
  { name: "Mint Sensation", short: "MINT", variant: "mint" as const, note: "Cool & gentle", index: 0 },
  { name: "Fresh Citrus", short: "CITRUS", variant: "citrus" as const, note: "Zesty & bright", index: 1 },
  { name: "Berry Blast", short: "BERRY", variant: "berry" as const, note: "Juicy & fun", index: 2 },
];

type Flavor = (typeof flavors)[number];
const initialFlavor: Flavor = { name: "Mint Sensation", short: "MINT", variant: "mint", note: "Cool & gentle", index: 0 };
const productPositions = ["translate-x-[1%]", "-translate-x-[30.5%]", "-translate-x-[62.5%]"];
const productClipPaths = ["inset(0 66.6667% 0 0)", "inset(0 33.3333% 0 33.3333%)", "inset(0 0 0 66.6667%)"];

function SparkleFresh() {
  const [selected, setSelected] = useState(initialFlavor);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [complete, setComplete] = useState(false);

  const chooseFlavor = (flavor: Flavor) => {
    setSelected(flavor);
    window.setTimeout(() => setCheckoutOpen(true), 280);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <video className="absolute inset-0 h-full w-full object-cover" src={commercial} autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-foreground/25" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <div className="font-display text-2xl font-extrabold text-primary-foreground drop-shadow-lg md:text-3xl">SPARKLE FRESH</div>
        <Button variant="glass" size="icon" className="size-14" aria-label="Open shopping bag" onClick={() => setCheckoutOpen(true)}>
          <span className="relative flex flex-col items-center gap-0.5">
            <ShoppingBag className="size-6 translate-y-0.5" />
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-extrabold text-primary-foreground shadow-sm">
              {quantity}
            </span>
          </span>
        </Button>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-end gap-6 px-5 pb-7 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-10 md:px-10 md:pb-10">
        <div className="z-10 self-center pt-6 text-primary-foreground md:pt-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-xs font-extrabold uppercase backdrop-blur-xl">
            <Sparkles className="size-4" /> Make brushing magic
          </div>
          <h1 className="font-display max-w-2xl text-5xl font-extrabold leading-[.9] tracking-normal drop-shadow-xl sm:text-6xl md:text-7xl lg:text-8xl">
            Big smiles.<br />Bright flavors.
          </h1>
          <p className="mt-5 max-w-lg text-base font-bold leading-relaxed drop-shadow-md md:text-lg">
            A kid-approved sparkle with three delicious flavors that turn every brush into an adventure.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative flex min-h-[310px] w-full items-end justify-center md:min-h-[500px]">
            <span className="sparkle-pop absolute left-[14%] top-[18%] text-4xl text-primary-foreground">✦</span>
            <span className="sparkle-pop absolute right-[12%] top-[30%] text-2xl text-primary-foreground [animation-delay:800ms]">✦</span>
            <div className="float-pack relative w-full max-w-[690px]">
              <img src={spriteB} alt="Sparkle Fresh Mint, Citrus and Berry toothpaste flavors" className="w-full drop-shadow-2xl" />
            </div>
          </div>

          <div className="w-full max-w-[690px]">
            <p className="mb-3 text-center text-xs font-extrabold uppercase text-foreground">Pick your flavor · $7 each</p>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {flavors.map((flavor) => (
                <Button key={flavor.name} variant={flavor.variant} size="lg" onClick={() => chooseFlavor(flavor)} className="h-auto min-h-20 flex-col gap-0.5 px-2 py-3">
                  <span className="font-display text-base font-extrabold md:text-xl">{flavor.short}</span>
                  <span className="hidden text-[11px] font-bold opacity-75 sm:block">{flavor.note}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-3 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <div className="cart-enter relative grid max-h-[94vh] w-full max-w-4xl overflow-auto rounded-2xl border border-glass-border bg-glass-strong shadow-glass backdrop-blur-2xl md:grid-cols-[.9fr_1.1fr]">
            <Button variant="glass" size="icon" className="absolute right-3 top-3 z-10" onClick={() => { setCheckoutOpen(false); setComplete(false); }} aria-label="Close cart"><X className="size-5" /></Button>

            <div className="relative flex min-h-64 items-center justify-start overflow-hidden bg-background/35 p-5 md:min-h-[620px]">
              <Button variant="glass" size="icon" className="absolute left-3 top-3" onClick={() => { setCheckoutOpen(false); setComplete(false); }} aria-label="Back to flavors"><ChevronLeft className="size-5" /></Button>
              <img
                src={spriteB}
                alt={selected.name}
                style={{ clipPath: productClipPaths[selected.index] ?? productClipPaths[0] }}
                className={`w-[300%] max-w-none drop-shadow-2xl transition-transform duration-500 ${productPositions[selected.index] ?? "translate-x-0"}`}
              />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              {complete ? (
                <div className="text-center">
                  <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="size-10" /></div>
                  <h2 className="font-display text-4xl font-extrabold">Looking fresh!</h2>
                  <p className="mt-3 font-bold text-muted-foreground">This is a checkout preview. No payment was taken.</p>
                  <Button size="lg" className="mt-7 w-full" onClick={() => { setComplete(false); setCheckoutOpen(false); }}>Keep exploring</Button>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold uppercase text-muted-foreground">Your sparkle pick</span>
                  <h2 className="font-display mt-1 text-4xl font-extrabold md:text-5xl">{selected.name}</h2>
                  <p className="mt-2 font-bold text-muted-foreground">Kids toothpaste · 75 ml · Qty {quantity}</p>
                  <div className="my-7 flex items-center justify-between border-y border-border py-5">
                    <span className="font-display text-3xl font-extrabold">${(7 * quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-4 rounded-xl bg-muted p-1">
                      <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus className="size-4" /></Button>
                      <span className="w-5 text-center font-extrabold">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus className="size-4" /></Button>
                    </div>
                  </div>
                  <Button variant="apple" size="lg" className="w-full text-lg" onClick={() => setComplete(true)}>
                    <span className="text-xl">●</span> Pay
                  </Button>
                  <div className="my-5 flex items-center gap-3 text-xs font-extrabold uppercase text-muted-foreground"><span className="h-px flex-1 bg-border" />or pay with card<span className="h-px flex-1 bg-border" /></div>
                  <div className="space-y-3">
                    <input aria-label="Email address" placeholder="Email address" className="h-12 w-full rounded-lg border border-input bg-background/70 px-4 font-bold outline-none focus:ring-4 focus:ring-ring/20" />
                    <input aria-label="Card number" placeholder="Card number" inputMode="numeric" className="h-12 w-full rounded-lg border border-input bg-background/70 px-4 font-bold outline-none focus:ring-4 focus:ring-ring/20" />
                    <div className="grid grid-cols-2 gap-3">
                      <input aria-label="Expiry date" placeholder="MM / YY" className="h-12 rounded-lg border border-input bg-background/70 px-4 font-bold outline-none focus:ring-4 focus:ring-ring/20" />
                      <input aria-label="Security code" placeholder="CVC" inputMode="numeric" className="h-12 rounded-lg border border-input bg-background/70 px-4 font-bold outline-none focus:ring-4 focus:ring-ring/20" />
                    </div>
                  </div>
                  <Button size="lg" className="mt-4 w-full" onClick={() => setComplete(true)}>Pay ${`${(7 * quantity).toFixed(2)}`}</Button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-bold text-muted-foreground"><ShieldCheck className="size-4" /> Checkout preview · no payment will be charged</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
