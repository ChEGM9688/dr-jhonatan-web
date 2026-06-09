import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Cookie, X, ChevronDown, CheckCircle2,
  Info, ExternalLink, Building2, Phone, Mail, MapPin, Clock,
} from "lucide-react";

/* ─── BANNER DE COOKIES (requerido por Culqi y buenas prácticas) ─── */
export function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try { return !localStorage.getItem("cookies_accepted"); }
    catch { return true; }
  });
  const [showDetail, setShowDetail] = useState(false);

  const accept = () => {
    try { localStorage.setItem("cookies_accepted", "1"); } catch {}
    setVisible(false);
  };
  const reject = () => {
    try { localStorage.setItem("cookies_accepted", "0"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-2xl shadow-slate-400/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3 items-start">
              <Cookie className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-950 mb-1">Usamos cookies</p>
                <p className="text-xs leading-6 text-slate-500 max-w-xl">
                  Utilizamos cookies esenciales para el funcionamiento del sitio.
                  Al continuar navegando, aceptas su uso conforme a nuestra{" "}
                  <a href="#legal" className="underline text-slate-700 hover:text-sky-700">Política de privacidad</a>.
                  {" "}
                  <button
                    onClick={() => setShowDetail((v) => !v)}
                    className="underline text-slate-700 hover:text-sky-700"
                  >
                    {showDetail ? "Ocultar detalle" : "Ver tipos de cookies"}
                  </button>
                </p>
                <AnimatePresence>
                  {showDetail && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {[
                          ["🔒 Esenciales", "Necesarias para el funcionamiento del sitio y navegación básica. No se pueden desactivar."],
                          ["📊 Analíticas", "Nos ayudan a entender cómo se usa el sitio (opcional)."],
                          ["🎯 Marketing", "Para mostrar contenido relevante (opcional)."],
                        ].map(([title, desc]) => (
                          <div key={title} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                            <p className="text-xs font-semibold text-slate-800 mb-1">{title}</p>
                            <p className="text-xs text-slate-500 leading-5">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 flex-wrap">
              <button
                onClick={reject}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Solo esenciales
              </button>
              <button
                onClick={accept}
                className="rounded-2xl bg-slate-950 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── SECCIÓN SOBRE NOSOTROS (requerido por Culqi) ─── */
export function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className="relative bg-white/50 backdrop-blur-xl py-16 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr]">

          {/* Quiénes somos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-slate-400" />
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Sobre nosotros</h3>
            </div>
            <p className="text-sm leading-7 text-slate-600">
              El <strong className="text-slate-950">Dr. Jhonatan Guevara Marín</strong> es médico anestesiólogo colegiado en Perú, con registro CMP 074566 y RNE 051391.
              Ofrece orientación preanestésica virtual para pacientes que desean llegar informados, tranquilos y mejor preparados a su cirugía o procedimiento.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <p>• Especialidad: Anestesiología</p>
              <p>• País de operación: Perú</p>
              <p>• Modalidad: Servicio virtual (Google Meet)</p>
              <p>• Moneda de cobro: Soles peruanos (PEN)</p>
            </div>
          </div>

          {/* Datos de contacto (requerido por Culqi) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-slate-400" />
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Contacto directo</h3>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <a href="https://wa.me/51943740001" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 hover:border-slate-300 transition group">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">WhatsApp</p>
                  <p className="font-medium text-slate-800 group-hover:text-slate-950">+51 943 740 001</p>
                </div>
              </a>
              <a href="mailto:dr.guevaramarin@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 hover:border-slate-300 transition group">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Correo electrónico</p>
                  <p className="font-medium text-slate-800 group-hover:text-slate-950">dr.guevaramarin@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Horario de atención</p>
                  <p className="font-medium text-slate-800">Lun – Vie · 9:00 – 18:00 (PET)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Ubicación</p>
                  <p className="font-medium text-slate-800">Juliaca, Puno, Perú</p>
                  <p className="text-xs text-slate-400">(Atención virtual a todo el país)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de pagos y seguridad (requerido por Culqi) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-slate-400" />
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Pagos y seguridad</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">Métodos de pago aceptados</p>
                <div className="flex flex-wrap gap-2">
                  {["Yape", "Plin", "Transferencia"].map((m) => (
                    <span key={m} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">{m}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-xs font-semibold text-slate-700 mb-1">SSL y seguridad</p>
                <p className="text-xs text-slate-500 leading-5">
                  Este sitio opera bajo certificado SSL (HTTPS). La navegación es segura y encriptada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


