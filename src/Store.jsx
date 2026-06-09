import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, X, CheckCircle2, MessageCircle,
  ArrowRight, Clock, Shield, AlertTriangle, Trash2, Tag, Send,
} from "lucide-react";
import {
  ImgGuia, ImgChecklist, ImgMiniCurso, ImgConsulta, ImgPoliticaPrivacidad,
} from "./ProductImages";

/* ─── CONFIG ─── */
const WHATSAPP_NUMBER  = "51943740001";
const DOCTOR_EMAIL     = "dr.guevaramarin@gmail.com";

export const storeProducts = [
  {
    id: "guia-preanestesica",
    title: "Guía preanestésica para pacientes",
    subtitle: "PDF descargable",
    price: 29,
    badge: "Más popular",
    badgeColor: "#0ea5e9",
    Image: ImgGuia,
    shortDesc: "Todo lo que necesitas saber antes de tu cirugía en un solo documento.",
    description:
      "Guía educativa completa en formato PDF que explica qué información debes comunicar al anestesiólogo, cómo prepararte física y emocionalmente, cuáles son los errores más frecuentes antes de una cirugía y cómo evitarlos. Escrita en lenguaje claro para pacientes sin conocimientos médicos.",
    includes: [
      "Preguntas clave que debes hacerle al anestesiólogo",
      "Lista de información médica que debes tener lista",
      "Guía de ayuno preoperatorio por tipo de procedimiento",
      "Errores frecuentes que cometen los pacientes y cómo evitarlos",
      "Glosario de términos de anestesia en lenguaje simple",
    ],
    delivery: "PDF enviado por correo o WhatsApp en máx. 24 h hábiles tras confirmar el pago.",
    disclaimer: "Material educativo. No reemplaza la consulta médica presencial.",
  },
  {
    id: "checklist-cirugia",
    title: "Checklist para cirugía segura",
    subtitle: "PDF imprimible",
    price: 15,
    badge: "Económico",
    badgeColor: "#16a34a",
    Image: ImgChecklist,
    shortDesc: "Lista práctica para no olvidar nada antes del día de tu cirugía.",
    description:
      "Documento imprimible en formato PDF con una lista estructurada para que el paciente llegue organizado al día de su cirugía. Incluye control de documentos, medicamentos, tiempos de ayuno, coordinación del acompañante y preguntas importantes para el equipo médico.",
    includes: [
      "Lista de documentos médicos necesarios",
      "Control de medicamentos y alergias a declarar",
      "Guía de ayuno preoperatorio por tipo de anestesia",
      "Preguntas importantes para el día de la cirugía",
      "Sección para anotar instrucciones del médico",
    ],
    delivery: "PDF enviado por correo o WhatsApp en máx. 24 h hábiles tras confirmar el pago.",
    disclaimer: "Material educativo. No reemplaza la consulta médica presencial.",
  },
  {
    id: "minicurso-miedo",
    title: "Mini curso: Pierde el miedo a la anestesia",
    subtitle: "Videos + PDF complementario",
    price: 49,
    badge: "Más completo",
    badgeColor: "#7c3aed",
    Image: ImgMiniCurso,
    shortDesc: "Entiende la anestesia de principio a fin and llega tranquilo a tu procedimiento.",
    description:
      "Curso educativo en formato video y PDF dirigido a pacientes que sienten miedo o ansiedad ante la anestesia. Explica en lenguaje accesible los tipos de anestesia, qué ocurre durante el procedimiento, cómo es el despertar y el manejo del dolor postoperatorio.",
    includes: [
      "Videos explicativos en lenguaje simple y sin tecnicismos",
      "PDF complementario descargable",
      "Tipos de anestesia: local, regional, sedación y general",
      "Qué ocurre durante el procedimiento y el despertar",
      "Manejo del dolor y náuseas postoperatorias",
    ],
    delivery: "Enlace de acceso al curso por correo o WhatsApp en máx. 24 h hábiles.",
    disclaimer: "Material educativo. No reemplaza la consulta médica presencial.",
  },
  {
    id: "consulta-virtual",
    title: "Consulta preanestésica virtual",
    subtitle: "Sesión por Google Meet · 45 a 60 min",
    price: 99,
    badge: "Personalizado",
    badgeColor: "#059669",
    Image: ImgConsulta,
    shortDesc: "Orientación individualizada con el Dr. Jhonatan Guevara antes de tu cirugía.",
    description:
      "Sesión de orientación preanestésica virtual por Google Meet de 45 a 60 minutos. El Dr. Jhonatan Guevara revisa tus antecedentes, medicamentos, alergias y cirugías previas, y responde tus dudas sobre la anestesia y la preparación para el procedimiento. Al finalizar recibes un resumen o checklist personalizado.",
    includes: [
      "Sesión individual de 45 a 60 min por Google Meet",
      "Revisión de antecedentes médicos y medicamentos",
      "Orientación personalizada según tu tipo de cirugía",
      "Resolución de dudas sobre anestesia y preparación",
      "Resumen educativo o checklist personalizado al finalizar",
    ],
    delivery: "Enlace de Google Meet por WhatsApp tras verificar el pago y acordar el horario.",
    disclaimer:
      "Orientación educativa virtual. No reemplaza la evaluación presencial del anestesiólogo tratante. No se administra anestesia a distancia. No se atienden emergencias.",
    isConsultation: true,
  },
  {
    id: "pack-preparacion",
    title: "Pack preparación completa",
    subtitle: "Guía + Checklist + Consulta virtual",
    price: 119,
    badge: "Mejor valor",
    badgeColor: "#0f172a",
    Image: ImgPoliticaPrivacidad,
    shortDesc: "Todo lo que necesitas para llegar tranquilo, organizado e informado a tu cirugía.",
    description:
      "Paquete completo que combina la Guía preanestésica para pacientes (PDF), el Checklist para cirugía segura (PDF imprimible) y una consulta preanestésica virtual de 45-60 min por Google Meet. Ideal para pacientes que quieren prepararse de forma integral antes de un procedimiento quirúrgico.",
    includes: [
      "Guía preanestésica completa en PDF (valor S/ 29)",
      "Checklist para cirugía segura imprimible (valor S/ 15)",
      "Consulta virtual de 45-60 min por Google Meet (valor S/ 99)",
      "Resumen educativo personalizado al finalizar la consulta",
      "Ahorro de S/ 24 respecto a compra por separado",
    ],
    delivery: "PDFs enviados en máx. 24 h hábiles. Enlace de consulta coordinado por WhatsApp.",
    disclaimer:
      "Los materiales son educativos. La consulta es orientación virtual y no reemplaza la evaluación presencial del anestesiólogo tratante.",
    isPack: true,
  },
];

/* ─── HELPERS ─── */
function fmt(n) { return `S/ ${Number(n).toFixed(2)}`; }



/* ─── PRODUCT CARD ─── */
function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [expanded, setExpanded] = useState(false);
  const { Image } = product;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="flex flex-col rounded-[2rem] border border-white/80 bg-white/85 shadow-xl shadow-slate-200/60 backdrop-blur-xl overflow-hidden"
      aria-label={product.title}
    >
      {/* ── Product image (required by Culqi) ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "400/200" }}>
        <Image />
        {/* Badge overlay */}
        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow"
          style={{ background: product.badgeColor }}
        >
          {product.badge}
        </span>
        {/* Price overlay */}
        <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-950 shadow">
          {fmt(product.price)}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Subtitle */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-1">
          {product.subtitle}
        </p>
        {/* Title (required by Culqi) */}
        <h3 className="text-base font-semibold tracking-tight text-slate-950 leading-snug mb-2">
          {product.title}
        </h3>
        {/* Short description (required by Culqi) */}
        <p className="text-sm text-slate-500 leading-6 mb-3">{product.shortDesc}</p>

        {/* Expandable detail */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition text-left mb-2"
        >
          {expanded ? "Ocultar detalle ↑" : "Ver qué incluye ↓"}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-3"
            >
              <p className="text-sm leading-7 text-slate-600 mb-3">{product.description}</p>
              <ul className="space-y-2">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delivery */}
        <div className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 mb-3">
          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
          <p className="text-xs text-slate-500 leading-5">{product.delivery}</p>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] leading-5 text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mb-4">
          ⚠️ {product.disclaimer}
        </p>

        {/* Price + CTA (required visible price by Culqi) */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-slate-950">{fmt(product.price)}</p>
            <p className="text-[11px] text-slate-400">Precio en Soles (PEN)</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
              title="Agregar al carrito"
              aria-label="Agregar al carrito"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              onClick={() => onBuyNow(product)}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
            >
              Comprar <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── CART DRAWER ─── */
function CartDrawer({ cart, onClose, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <motion.div
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" /> Carrito
          <span className="ml-1 rounded-full bg-slate-950 px-2 py-0.5 text-xs text-white">
            {cart.reduce((s, i) => s + i.qty, 0)}
          </span>
        </h2>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 transition">
          <X className="h-5 w-5 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <ShoppingCart className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm">Tu carrito está vacío</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <item.Image />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-950 leading-snug">{item.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{fmt(item.price)}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500 transition p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t border-slate-100 px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Total</span>
            <span className="text-2xl font-semibold text-slate-950">{fmt(total)}</span>
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-xs text-amber-800 leading-5">
              Los productos digitales son materiales educativos y no reemplazan la consulta médica presencial.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hola Dr. Jhonatan, quiero adquirir:\n" +
              cart.map((i) => `• ${i.title} — ${fmt(i.price)}`).join("\n") +
              `\n\nTotal: ${fmt(total)}`
            )}`}
            target="_blank" rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-semibold text-white hover:bg-[#20bc5a] transition"
          >
            <MessageCircle className="h-4 w-4" />
            Confirmar pedido por WhatsApp (Yape / Plin)
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function Store() {
  const [cart, setCart]             = useState([]);
  const [cartOpen, setCartOpen]     = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (p) => {
    setCart((prev) => prev.find((i) => i.id === p.id) ? prev : [...prev, { ...p, qty: 1 }]);
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const handleCheckout = (items) => {
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = encodeURIComponent(
      "Hola Dr. Jhonatan, quiero adquirir:\n" +
      items.map((i) => `• ${i.title} — ${fmt(i.price)}`).join("\n") +
      `\n\nTotal: ${fmt(total)}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const handleBuyNow = (product) => {
    const msg = encodeURIComponent(
      `Hola Dr. Jhonatan, deseo adquirir el producto:\n• ${product.title} — ${fmt(product.price)}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <section id="tienda" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] border border-slate-200 bg-white/70 text-slate-500">
            Tienda · Productos y consultas
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Elige tu producto o agenda tu consulta.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
            Coordina tu pedido por WhatsApp para pagar con Yape o Plin.
            Precios expresados en Soles peruanos (PEN). Los materiales digitales son educativos.
          </p>
        </div>
        <button onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition">
          <ShoppingCart className="h-4 w-4" />
          Carrito
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Products grid — 5 productos visibles */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {storeProducts.map((product) => (
          <ProductCard key={product.id} product={product}
            onAddToCart={addToCart} onBuyNow={handleBuyNow} />
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Pedido directo por WhatsApp</span>
        <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Pagos con Yape / Plin</span>
        <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Entrega en máx. 24 h hábiles</span>
        <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> Precios en Soles peruanos (PEN)</span>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setCartOpen(false)} />
            <CartDrawer cart={cart} onClose={() => setCartOpen(false)}
              onRemove={removeFromCart} onCheckout={handleCheckout} />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
