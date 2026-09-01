import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

function VisaMark() {
  return (
    <span className="rounded bg-cream px-1.5 py-0.5 font-body text-[0.7rem] font-bold italic tracking-tight text-[#1434CB]">
      VISA
    </span>
  );
}

function MastercardMark() {
  return (
    <span className="relative inline-flex h-4 w-7 items-center" aria-hidden>
      <span className="absolute left-0 h-4 w-4 rounded-full bg-[#EB001B]" />
      <span className="absolute right-0 h-4 w-4 rounded-full bg-[#F79E1B] opacity-90" />
    </span>
  );
}

function PaypalMark() {
  return (
    <span className="rounded bg-cream px-1.5 py-0.5 font-body text-[0.7rem] font-bold italic text-[#003087]">
      Pay<span className="text-[#009cde]">Pal</span>
    </span>
  );
}

type Method = "card" | "paypal";

export type BookingDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination: string;
  packageLabel: string;
  price: string;
};

export function BookingDrawer({
  open,
  onOpenChange,
  destination,
  packageLabel,
  price,
}: BookingDrawerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [method, setMethod] = useState<Method>("card");
  const [showCardFields, setShowCardFields] = useState(false);
  const [paid, setPaid] = useState(false);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });

  useEffect(() => {
    if (open) return undefined;
    const t = setTimeout(() => {
      setShowCardFields(false);
      setPaid(false);
    }, 400);
    return () => clearTimeout(t);
  }, [open]);

  const outlineBtn =
    "rounded-full border border-cream/40 bg-transparent px-6 py-2.5 font-body text-sm uppercase tracking-[0.25em] text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-cream";

  const fieldClass =
    "w-full rounded-xl border border-cream/25 bg-cream/5 px-4 py-2.5 font-body text-sm text-cream placeholder:text-cream/40 focus:border-cream/60 focus:outline-none";

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="border-cream/15 bg-ink">
        <div className="flex h-full flex-col overflow-y-auto">
          <DrawerHeader className="px-6 pt-8 text-left">
            <p className="font-body text-xs uppercase tracking-[0.5em] text-sun">{destination}</p>
            <DrawerTitle className="font-display text-4xl font-normal text-cream">
              {packageLabel}
            </DrawerTitle>
            <DrawerDescription className="font-body text-sm text-cream/70">
              {price} per traveller · all transfers and postcards included.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 space-y-8 px-6 pb-6">
            {/* Date range */}
            <section className="space-y-3">
              <h3 className="font-body text-xs uppercase tracking-[0.35em] text-cream/60">
                Travel dates
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border border-cream/25 bg-cream/5 px-4 py-3 text-left font-body text-sm text-cream",
                      !range?.from && "text-cream/50",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 text-sun" />
                    {range?.from ? (
                      range.to ? (
                        <>
                          {format(range.from, "LLL dd, y")} – {format(range.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(range.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick your arrival and departure</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={1}
                    {...(range?.from ? { defaultMonth: range.from } : {})}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </section>

            {/* Payment method */}
            <section className="space-y-3">
              <h3 className="font-body text-xs uppercase tracking-[0.35em] text-cream/60">
                Payment method
              </h3>
              <div className="divide-y divide-cream/15 overflow-hidden rounded-2xl border border-cream/20">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-cream/5"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-cream/60">
                    {method === "card" && <span className="h-2.5 w-2.5 rounded-full bg-cream" />}
                  </span>
                  <span className="flex-1 font-body text-base text-cream">Credit card</span>
                  <VisaMark />
                  <MastercardMark />
                </button>

                <div>
                  <button
                    type="button"
                    onClick={() => setMethod("paypal")}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-cream/5"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-cream/60">
                      {method === "paypal" && <span className="h-2.5 w-2.5 rounded-full bg-cream" />}
                    </span>
                    <span className="flex-1 font-body text-base text-cream">Pay with PayPal</span>
                    <PaypalMark />
                  </button>
                  {method === "paypal" && (
                    <p className="px-4 pb-4 pl-12 font-body text-sm text-cream/60">
                      You will be redirected to PayPal to approve this booking securely.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Card fields */}
            {showCardFields && method === "card" && !paid && (
              <section className="space-y-3">
                <h3 className="font-body text-xs uppercase tracking-[0.35em] text-cream/60">
                  Card details
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="Card number"
                      value={card.number}
                      onChange={(e) =>
                        setCard({ ...card, number: e.target.value.replace(/[^0-9 ]/g, "") })
                      }
                      className={cn(fieldClass, "pr-24")}
                      aria-label="Card number"
                    />
                    <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                      <VisaMark />
                      <MastercardMark />
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM / YY"
                      maxLength={7}
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      className={fieldClass}
                      aria-label="Expiry date"
                    />
                    <input
                      placeholder="CVC"
                      maxLength={4}
                      inputMode="numeric"
                      value={card.cvc}
                      onChange={(e) =>
                        setCard({ ...card, cvc: e.target.value.replace(/[^0-9]/g, "") })
                      }
                      className={fieldClass}
                      aria-label="CVC"
                    />
                  </div>
                  <input
                    placeholder="Name on card"
                    maxLength={100}
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    className={fieldClass}
                    aria-label="Name on card"
                  />
                </div>
              </section>
            )}

            {paid && (
              <div className="flex items-center gap-3 rounded-2xl border border-cream/20 bg-cream/5 px-4 py-4">
                <CheckCircle2 className="h-5 w-5 text-sun" />
                <p className="font-body text-sm text-cream/80">
                  Booking confirmed. A postcard is already on its way.
                </p>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 space-y-3 border-t border-cream/15 bg-ink px-6 py-5">
            <button
              className={cn(outlineBtn, "w-full")}
              disabled={paid}
              onClick={() => {
                if (method === "card" && !showCardFields) {
                  setShowCardFields(true);
                  return;
                }
                setPaid(true);
              }}
            >
              {paid
                ? "Paid"
                : method === "paypal"
                  ? "Continue with PayPal"
                  : showCardFields
                    ? `Pay ${price}`
                    : "Proceed with payment"}
            </button>
            <button className={cn(outlineBtn, "w-full")} onClick={() => onOpenChange(false)}>
              Close
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
