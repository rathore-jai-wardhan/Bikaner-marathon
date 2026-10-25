"use client";

import { useState } from "react";
import { STATES } from "../lib/state";
import { citiesForState, OTHER_CITY_VALUE } from "../lib/cities";

type Category = {
  id: string;
  name: string;
  price_paise: number;
  max_age: number | null;
  tshirt_sizes: string[];
};

type Order = { orderId: string; amount: number; keyId: string };

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayWindow = new (options: Record<string, unknown>) => { open: () => void };

const EVENT_DATE = "2026-12-27";

const inputClass =
  "w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-black";
const labelClass = "block text-sm font-semibold mb-1";
const hintClass = "mt-1 text-xs text-black/60";

function ageOnRaceDay(dob: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const [by, bm, bd] = dob.split("-").map(Number);
  const [ey, em, ed] = EVENT_DATE.split("-").map(Number);
  let age = ey - by;
  if (em < bm || (em === bm && ed < bd)) age--;
  return age;
}

// Loads Razorpay's payment popup the first time it is needed
function loadRazorpay(): Promise<RazorpayWindow | null> {
  return new Promise((resolve) => {
    const w = window as unknown as { Razorpay?: RazorpayWindow };
    if (w.Razorpay) return resolve(w.Razorpay);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(w.Razorpay ?? null);
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
}

export default function RegisterForm({
  categories,
  initialCategoryId,
}: {
  categories: Category[];
  initialCategoryId: string;
}) {
  const firstCategory =
    categories.find((c) => c.id === initialCategoryId) ?? categories[0];

  const [form, setForm] = useState({
    categoryId: firstCategory.id,
    fullName: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    email: "",
    city: "",
    state: "Rajasthan",
    tshirtSize: firstCategory.tshirt_sizes[0] ?? "",
    emergencyName: "",
    emergencyPhone: "",
    bloodGroup: "",
    guardianName: "",
    guardianPhone: "",
    consentTerms: false,
    consentMessages: false,
    consentUpdates: false,
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "awaiting_payment" | "verifying" | "payment_issue" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [code, setCode] = useState("");
  const [errorField, setErrorField] = useState("");
  // true when the runner chose "Other" in the city list and types their own town
  const [cityOther, setCityOther] = useState(false);

  function set(name: string, value: string | boolean) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Picking a state clears the city, because the city list depends on the state
  function changeState(value: string) {
    setCityOther(false);
    setForm((f) => ({ ...f, state: value, city: "" }));
  }

  function changeCitySelect(value: string) {
    if (value === OTHER_CITY_VALUE) {
      setCityOther(true);
      set("city", "");
    } else {
      setCityOther(false);
      set("city", value);
    }
  }

  const selected = categories.find((c) => c.id === form.categoryId) ?? firstCategory;
  const sizes = selected.tshirt_sizes;
  const isKids = selected.max_age !== null && selected.max_age < 18;
  const age = ageOnRaceDay(form.dateOfBirth);
  const showGuardianBox = !isKids && age !== null && age < 18;
  const isPaid = selected.price_paise > 0;

  // City list for the chosen state. States with no list just get a text box.
  const cityOptions = citiesForState(form.state);
  const showCityInput = cityOther || cityOptions.length === 0;
  const citySelectValue = cityOther
    ? OTHER_CITY_VALUE
    : cityOptions.includes(form.city)
      ? form.city
      : "";

  // Highlights the field the server complained about and shows the message under it
  const inputFor = (name: string) =>
    errorField === name ? `${inputClass} ring-2 ring-red-500` : inputClass;
  const fieldError = (name: string) =>
    errorField === name && message ? (
      <p className="mt-1 text-sm text-red-700">{message}</p>
    ) : null;

  async function confirmPayment(r: RazorpaySuccess) {
    setStatus("verifying");
    try {
      const res = await fetch("/api/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: r.razorpay_order_id,
          paymentId: r.razorpay_payment_id,
          signature: r.razorpay_signature,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCode(data.registrationCode);
        setStatus("done");
      } else {
        setMessage(data.error ?? "We could not confirm your payment.");
        setStatus("payment_issue");
      }
    } catch {
      setMessage(
        "We could not confirm your payment yet. Please do not pay again. If money was deducted, your registration will be confirmed automatically, or contact the organisers."
      );
      setStatus("payment_issue");
    }
  }

  async function openCheckout(o: Order) {
    setMessage("");
    const Razorpay = await loadRazorpay();
    if (!Razorpay) {
      setMessage("Could not open the payment window. Please check your connection and try again.");
      setStatus("awaiting_payment");
      return;
    }
    const popup = new Razorpay({
      key: o.keyId,
      amount: o.amount,
      currency: "INR",
      name: "Bikaner Marathon",
      description: `${selected.name} registration`,
      order_id: o.orderId,
      prefill: {
        name: isKids ? form.guardianName : form.fullName,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#f97316" },
      handler: (response: RazorpaySuccess) => {
        confirmPayment(response);
      },
      modal: { ondismiss: () => setStatus("awaiting_payment") },
    });
    popup.open();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    setErrorField("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        setErrorField(data.field ?? "");
        if (data.field) {
          setTimeout(
            () =>
              document
                .getElementById(data.field)
                ?.scrollIntoView({ behavior: "smooth", block: "center" }),
            50
          );
        }
        return;
      }
      if (data.requiresPayment) {
        setOrder(data.order);
        setStatus("awaiting_payment");
        openCheckout(data.order);
        return;
      }
      setCode(data.registrationCode);
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Network problem. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl bg-green-100 p-5 text-green-900">
        <p className="font-semibold">You&apos;re registered! See you at the start line.</p>
        <p className="mt-2">Your registration ID: <strong>{code}</strong></p>
        <p className="mt-2 text-sm">A confirmation will be sent to your email.</p>
      </div>
    );
  }

  if (status === "verifying") {
    return (
      <p className="rounded-xl bg-white p-5 text-black">
        Confirming your payment. Please don&apos;t close this page.
      </p>
    );
  }

  if (status === "payment_issue") {
    return (
      <div className="rounded-xl bg-yellow-100 p-5 text-yellow-900">
        <p>{message}</p>
      </div>
    );
  }

  if (status === "awaiting_payment" && order) {
    return (
      <div className="space-y-4 rounded-2xl bg-white p-6 text-black">
        <p>
          Your spot is held for 15 minutes. Complete the payment to confirm your
          registration.
        </p>
        {message && <p className="rounded-lg bg-red-100 p-3 text-sm text-red-900">{message}</p>}
        <button
          type="button"
          onClick={() => openCheckout(order)}
          className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Pay ₹{order.amount / 100}
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setOrder(null);
            setMessage("");
          }}
          className="w-full text-sm underline"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 text-black">
      <div>
        <label className={labelClass}>Race category</label>
        <select
          className={inputClass}
          value={form.categoryId}
          onChange={(e) => {
            const chosen = categories.find((c) => c.id === e.target.value);
            setForm((f) => ({
              ...f,
              categoryId: e.target.value,
              tshirtSize: chosen?.tshirt_sizes[0] ?? "",
            }));
          }}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.price_paise === 0 ? "Free" : `₹${c.price_paise / 100}`})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>
          {isKids ? "Child's full name" : "Full name"}
        </label>
        <input id="fullName" className={inputFor("fullName")} value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)} />
        {fieldError("fullName")}
      </div>

      <div>
        <label className={labelClass}>
          {isKids ? "Child's date of birth" : "Date of birth"}
        </label>
        <input type="date" id="dateOfBirth" className={inputFor("dateOfBirth")} value={form.dateOfBirth}
          onChange={(e) => set("dateOfBirth", e.target.value)} />
        {fieldError("dateOfBirth")}
      </div>

      <div>
        <label className={labelClass}>{isKids ? "Child's gender" : "Gender"}</label>
        <select className={inputClass} value={form.gender}
          onChange={(e) => set("gender", e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {isKids && (
        <div>
          <label className={labelClass}>Parent or guardian&apos;s full name</label>
          <input id="guardianName" className={inputFor("guardianName")} value={form.guardianName}
            onChange={(e) => set("guardianName", e.target.value)} />
        {fieldError("guardianName")}
        </div>
      )}

      <div>
        <label className={labelClass}>
          {isKids ? "Parent or guardian's mobile number (WhatsApp)" : "Mobile number (WhatsApp)"}
        </label>
        <input type="tel" id="phone" className={inputFor("phone")} value={form.phone}
          onChange={(e) => set("phone", e.target.value)} />
        {fieldError("phone")}
        <p className={hintClass}>Your registration confirmation will be sent here.</p>
      </div>

      <div>
        <label className={labelClass}>
          {isKids ? "Parent or guardian's email" : "Email"}
        </label>
        <input type="email" id="email" className={inputFor("email")} value={form.email}
          onChange={(e) => set("email", e.target.value)} />
        {fieldError("email")}
      </div>

      <div>
        <label className={labelClass}>State</label>
        <select id="state" className={inputFor("state")} value={form.state}
          onChange={(e) => changeState(e.target.value)}>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {fieldError("state")}
      </div>

      <div>
        <label className={labelClass}>City</label>
        {cityOptions.length > 0 && (
          <select
            id={showCityInput ? "citySelect" : "city"}
            className={showCityInput ? inputClass : inputFor("city")}
            value={citySelectValue}
            onChange={(e) => changeCitySelect(e.target.value)}
          >
            <option value="">Select your city</option>
            {cityOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value={OTHER_CITY_VALUE}>Other (type your city)</option>
          </select>
        )}
        {showCityInput && (
          <input
            id="city"
            autoComplete="off"
            placeholder="Type your city or town"
            className={`${inputFor("city")} ${cityOptions.length > 0 ? "mt-2" : ""}`}
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
        )}
        {fieldError("city")}
      </div>

      <div>
        <label className={labelClass}>T-shirt size</label>
        <select id="tshirtSize" className={inputFor("tshirtSize")} value={form.tshirtSize}
          onChange={(e) => set("tshirtSize", e.target.value)}>
          {sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {fieldError("tshirtSize")}
      </div>

      {!isKids && (
        <>
          <div>
            <label className={labelClass}>Emergency contact name</label>
            <input id="emergencyName" className={inputFor("emergencyName")} value={form.emergencyName}
              onChange={(e) => set("emergencyName", e.target.value)} />
        {fieldError("emergencyName")}
          </div>

          <div>
            <label className={labelClass}>Emergency contact mobile</label>
            <input type="tel" id="emergencyPhone" className={inputFor("emergencyPhone")} value={form.emergencyPhone}
              onChange={(e) => set("emergencyPhone", e.target.value)} />
        {fieldError("emergencyPhone")}
          </div>
        </>
      )}

      <div>
        <label className={labelClass}>Blood group (optional)</label>
        <select className={inputClass} value={form.bloodGroup}
          onChange={(e) => set("bloodGroup", e.target.value)}>
          <option value="">Prefer not to say</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {showGuardianBox && (
        <fieldset className="rounded-lg border border-black/20 p-3">
          <legend className="px-1 text-sm font-semibold">
            Parent or guardian (required because the runner is under 18)
          </legend>
          <input id="guardianName" placeholder="Guardian name"
            className={`${inputFor("guardianName")} mb-2`}
            value={form.guardianName}
            onChange={(e) => set("guardianName", e.target.value)} />
          {fieldError("guardianName")}
          <input id="guardianPhone" placeholder="Guardian mobile" type="tel"
            className={inputFor("guardianPhone")}
            value={form.guardianPhone}
            onChange={(e) => set("guardianPhone", e.target.value)} />
          {fieldError("guardianPhone")}
        </fieldset>
      )}

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={form.consentTerms}
          onChange={(e) => set("consentTerms", e.target.checked)} />
        <span>
          I agree to the{" "}
          <a href="/terms_and_conditions" target="_blank" className="underline">Terms and Conditions</a>,{" "}
          <a href="/privacy_policy" target="_blank" className="underline">Privacy Policy</a> and{" "}
          <a href="/refund_policy" target="_blank" className="underline">Refund Policy</a>, and I confirm
          the health declaration{isKids ? " on behalf of my child" : ""}.
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={form.consentMessages}
          onChange={(e) => set("consentMessages", e.target.checked)} />
        <span>
          I agree to receive my registration confirmation and event messages on the
          WhatsApp number and email above.
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={form.consentUpdates}
          onChange={(e) => set("consentUpdates", e.target.checked)} />
        <span>Send me updates about future Bikaner Run Club and Marathon events (optional).</span>
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-900">{message}</p>
      )}

      <button type="submit" disabled={status === "sending"}
        className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-white disabled:opacity-60">
        {status === "sending"
          ? "Please wait..."
          : isPaid
            ? `Continue to payment (₹${selected.price_paise / 100})`
            : "Register"}
      </button>
    </form>
  );
}