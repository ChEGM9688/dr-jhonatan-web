import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  BookOpen,
  RefreshCw,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  Shield,
} from "lucide-react";

/* ─────────────────────── DATOS ─────────────────────── */
const DOCTOR_EMAIL = "dr.guevaramarin@gmail.com";
const WHATSAPP = "51943740001";

const refundPolicy = [
  {
    title: "1. Alcance de la política",
    body: "Esta política aplica a todos los productos digitales y servicios de orientación virtual ofrecidos por el Dr. Jhonatan Guevara Marín, médico anestesiólogo, CMP 074566, RNE 051391, a través de esta plataforma.",
  },
  {
    title: "2. Productos digitales (guías, checklists, cursos)",
    body: "Los productos digitales son entregados por correo electrónico o WhatsApp dentro de las 24 horas hábiles siguientes al pago confirmado. Una vez entregado y descargado el producto, no procede reembolso, ya que el contenido es de naturaleza digital e intangible. Si el archivo presenta un error técnico o está incompleto, se reemplazará sin costo en un plazo máximo de 48 horas hábiles.",
  },
  {
    title: "3. Consulta preanestésica virtual (Google Meet)",
    body: "La reserva queda confirmada tras verificar el pago. El paciente puede reprogramar la consulta sin costo con un mínimo de 24 horas de anticipación, comunicándose por WhatsApp al +51 943 740 001. Las cancelaciones realizadas con menos de 24 horas de anticipación no dan derecho a reembolso. En caso de cancelación por parte del prestador (fuerza mayor, emergencia), se ofrecerá reprogramación o reembolso total en un plazo de 5 días hábiles.",
  },
  {
    title: "4. Proceso para solicitar reembolso o reclamo",
    body: "El consumidor debe escribir al correo dr.guevaramarin@gmail.com o al WhatsApp +51 943 740 001 indicando: nombre completo, fecha de compra, producto adquirido, monto pagado y motivo de la solicitud. Se responderá en un plazo máximo de 5 días hábiles. Alternativamente, puede registrar su reclamo en el Libro de Reclamaciones disponible en esta misma página.",
  },
  {
    title: "5. Cambios de producto",
    body: "Si el consumidor adquirió un producto por error, puede solicitar el cambio por otro de igual o mayor valor dentro de las 24 horas siguientes a la compra, siempre que el producto original no haya sido entregado. Pasado ese plazo o una vez entregado el producto, no procede cambio.",
  },
  {
    title: "6. Medios de devolución",
    body: "Los reembolsos aprobados se realizarán por el mismo medio de pago utilizado en la compra (tarjeta de crédito/débito vía Culqi, Yape o Plin) en un plazo máximo de 10 días hábiles desde la aprobación de la solicitud.",
  },
  {
    title: "7. Marco legal aplicable",
    body: "Esta política se rige por el Código de Protección y Defensa del Consumidor del Perú (Ley N.° 29571) y las normas complementarias emitidas por INDECOPI. El consumidor puede presentar una queja ante INDECOPI en caso de no recibir respuesta satisfactoria.",
  },
];

const complaintTypes = [
  { value: "reclamo", label: "Reclamo (disconformidad con el producto o servicio recibido)" },
  { value: "queja", label: "Queja (mala atención o trato)" },
];

const productOptions = [
  "Guía preanestésica para pacientes (S/ 39)",
  "Checklist para cirugía segura (S/ 19)",
  "Mini curso: Pierde el miedo a la anestesia (S/ 79)",
  "Consulta preanestésica virtual (S/ 150)",
  "Otro",
];

/* ─────────────────────── LIBRO DE RECLAMACIONES ─────────────────────── */
function LibroReclamaciones() {
  const [form, setForm] = useState({
    tipo: "reclamo",
    nombres: "",
    apellidos: "",
    dni: "",
    correo: "",
    telefono: "",
    producto: "",
    fechaCompra: "",
    monto: "",
    detalle: "",
    pedido: "",
    aceptaTerminos: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [folio, setFolio] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombres.trim()) e.nombres = "Obligatorio";
    if (!form.apellidos.trim()) e.apellidos = "Obligatorio";
    if (!form.dni.trim() || form.dni.length < 8) e.dni = "Ingresa un DNI o pasaporte válido";
    if (!form.correo.trim() || !/\S+@\S+\.\S+/.test(form.correo)) e.correo = "Correo inválido";
    if (!form.telefono.trim()) e.telefono = "Obligatorio";
    if (!form.producto) e.producto = "Selecciona el producto o servicio";
    if (!form.detalle.trim() || form.detalle.trim().length < 30)
      e.detalle = "Describe el reclamo con al menos 30 caracteres";
    if (!form.pedido.trim()) e.pedido = "Indica qué solución esperas";
    if (!form.aceptaTerminos) e.aceptaTerminos = "Debes aceptar para continuar";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Generamos un folio único
    const folioNum = `LR-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(Math.random() * 90000 + 10000)}`;
    setFolio(folioNum);
    setSubmitted(true);
  };

  const waMsg = encodeURIComponent(
    `*Libro de Reclamaciones*\n` +
    `Folio: ${folio}\n` +
    `Tipo: ${form.tipo.toUpperCase()}\n` +
    `Nombre: ${form.nombres} ${form.apellidos}\n` +
    `DNI/Doc: ${form.dni}\n` +
    `Correo: ${form.correo}\n` +
    `Teléfono: ${form.telefono}\n` +
    `Producto: ${form.producto}\n` +
    `Fecha de compra: ${form.fechaCompra || "No indicada"}\n` +
    `Monto: ${form.monto || "No indicado"}\n` +
    `Detalle: ${form.detalle}\n` +
    `Pedido: ${form.pedido}`
  );

  const inputClass = (field) =>
    `mt-1.5 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors bg-white placeholder:text-slate-400 ${
      errors[field] ? "border-red-300" : "border-slate-200 focus:border-slate-400"
    }`;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h4 className="text-xl font-semibold text-slate-950 mb-1">
          {form.tipo === "reclamo" ? "Reclamo" : "Queja"} registrado
        </h4>
        <p className="text-sm text-slate-600 mb-2">
          Folio de referencia: <strong className="text-slate-950 font-mono">{folio}</strong>
        </p>
        <p className="text-sm leading-7 text-slate-600 mb-6">
          Tu {form.tipo} ha sido registrado. Recibirás una respuesta en el correo{" "}
          <strong>{form.correo}</strong> dentro de los{" "}
          <strong>15 días hábiles</strong> establecidos por INDECOPI (Ley N.° 29571).
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20bc5a] transition"
          >
            Enviar copia por WhatsApp
          </a>
          <a
            href={`mailto:${DOCTOR_EMAIL}?subject=Libro de Reclamaciones - Folio ${folio}&body=${encodeURIComponent(
              `Folio: ${folio}\nTipo: ${form.tipo}\nNombre: ${form.nombres} ${form.apellidos}\nDNI: ${form.dni}\nCorreo: ${form.correo}\nProducto: ${form.producto}\nDetalle: ${form.detalle}\nPedido: ${form.pedido}`
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Enviar copia por correo
          </a>
        </div>
        <button
          onClick={() => { setSubmitted(false); setForm({ tipo: "reclamo", nombres: "", apellidos: "", dni: "", correo: "", telefono: "", producto: "", fechaCompra: "", monto: "", detalle: "", pedido: "", aceptaTerminos: false }); setErrors({}); }}
          className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline transition"
        >
          Registrar otro reclamo
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Tipo */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">Tipo de registro *</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {complaintTypes.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                form.tipo === value
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              }`}
            >
              <input
                type="radio"
                name="tipo"
                value={value}
                checked={form.tipo === value}
                onChange={handleChange}
                className="mt-0.5 accent-white"
              />
              <span className="text-sm leading-6">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Datos del reclamante */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Datos del reclamante</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["nombres", "Nombres *", "text", "María"],
            ["apellidos", "Apellidos *", "text", "García López"],
            ["dni", "DNI / Pasaporte *", "text", "12345678"],
            ["correo", "Correo electrónico *", "email", "tu@correo.com"],
            ["telefono", "Teléfono *", "tel", "+51 999 999 999"],
          ].map(([name, label, type, placeholder]) => (
            <label key={name} className="text-sm font-medium text-slate-600">
              {label}
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClass(name)}
              />
              {errors[name] && <span className="mt-1 block text-xs text-red-600">{errors[name]}</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Datos del producto */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Producto o servicio involucrado</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-600 sm:col-span-2">
            Producto o servicio *
            <select
              name="producto"
              value={form.producto}
              onChange={handleChange}
              className={inputClass("producto")}
            >
              <option value="">Selecciona una opción...</option>
              {productOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.producto && <span className="mt-1 block text-xs text-red-600">{errors.producto}</span>}
          </label>
          <label className="text-sm font-medium text-slate-600">
            Fecha de compra (aprox.)
            <input
              type="date"
              name="fechaCompra"
              value={form.fechaCompra}
              onChange={handleChange}
              className={inputClass("fechaCompra")}
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            Monto pagado
            <input
              type="text"
              name="monto"
              value={form.monto}
              onChange={handleChange}
              placeholder="Ej.: S/ 39.00"
              className={inputClass("monto")}
            />
          </label>
        </div>
      </div>

      {/* Detalle del reclamo */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Detalle del {form.tipo}</p>
        <label className="text-sm font-medium text-slate-600 block">
          Describe con detalle lo ocurrido *
          <textarea
            name="detalle"
            value={form.detalle}
            onChange={handleChange}
            rows={4}
            placeholder="Describe el problema de forma clara y específica: qué ocurrió, cuándo, y cómo afectó tu experiencia..."
            className={`${inputClass("detalle")} resize-none`}
          />
          {errors.detalle && <span className="mt-1 block text-xs text-red-600">{errors.detalle}</span>}
          <span className="mt-1 block text-xs text-slate-400">{form.detalle.length} caracteres (mín. 30)</span>
        </label>
        <label className="text-sm font-medium text-slate-600 block mt-4">
          ¿Qué solución esperas? *
          <textarea
            name="pedido"
            value={form.pedido}
            onChange={handleChange}
            rows={2}
            placeholder="Ej.: Solicito el reembolso del monto pagado / Solicito que me entreguen el producto correctamente..."
            className={`${inputClass("pedido")} resize-none`}
          />
          {errors.pedido && <span className="mt-1 block text-xs text-red-600">{errors.pedido}</span>}
        </label>
      </div>

      {/* Aviso INDECOPI */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900 leading-7">
        <p>
          <strong>Aviso legal:</strong> El proveedor tiene un plazo de <strong>15 días hábiles</strong> para
          responder a reclamos y <strong>30 días hábiles</strong> para quejas, conforme al{" "}
          <strong>Código de Protección y Defensa del Consumidor (Ley N.° 29571)</strong> y los lineamientos
          de INDECOPI. Si no recibe respuesta satisfactoria, puede acudir a{" "}
          <strong>INDECOPI</strong> en{" "}
          <a
            href="https://www.indecopi.gob.pe"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-700"
          >
            www.indecopi.gob.pe
          </a>{" "}
          o llamar al <strong>224-7777</strong> desde Lima o al <strong>0-800-4-4040</strong> desde
          provincias (gratuito).
        </p>
      </div>

      {/* Consentimiento */}
      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:bg-slate-100 transition">
        <input
          type="checkbox"
          name="aceptaTerminos"
          checked={form.aceptaTerminos}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded accent-slate-950"
        />
        <span className="text-sm leading-7 text-slate-700">
          Declaro que los datos proporcionados son verídicos y autorizo su uso para gestionar este{" "}
          {form.tipo} conforme a la Ley N.° 29733 de Protección de Datos Personales.
        </span>
      </label>
      {errors.aceptaTerminos && (
        <span className="block text-xs text-red-600">{errors.aceptaTerminos}</span>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 text-sm font-semibold text-white hover:bg-slate-800 transition"
      >
        <Send className="h-4 w-4" />
        Registrar {form.tipo}
      </button>
    </form>
  );
}

/* ─────────────────────── MAIN LEGAL PAGE ─────────────────────── */
export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("terminos");

  const tabs = [
    { id: "terminos", label: "Términos y condiciones", icon: FileText },
    { id: "devoluciones", label: "Cambios y devoluciones", icon: RefreshCw },
    { id: "reclamaciones", label: "📋 Libro de reclamaciones", icon: BookOpen },
  ];

  return (
    <section id="legal" className="relative mx-auto max-w-5xl px-5 py-24 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] border border-slate-200 bg-white/70 text-slate-500">
          Legal · INDECOPI · Perú
        </div>
        <h2
          className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Condiciones, devoluciones y reclamaciones.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-500 max-w-2xl mx-auto">
          Documentos elaborados conforme al Código de Protección del Consumidor (Ley N.° 29571),
          la Ley N.° 29733 de Protección de Datos y los lineamientos de INDECOPI y Culqi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
              activeTab === id
                ? "bg-slate-950 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "terminos" && (
          <motion.div
            key="terminos"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-950">Términos y condiciones</h3>
                <p className="text-xs text-slate-400">Última actualización: {new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>
            <div className="space-y-5">
              {[
                ["1. Identidad del proveedor", "Dr. Jhonatan Guevara Marín, médico anestesiólogo. CMP 074566 · RNE 051391. Correo: dr.guevaramarin@gmail.com. WhatsApp: +51 943 740 001. País de operación: Perú."],
                ["2. Naturaleza y alcance del servicio", "Esta plataforma ofrece orientación preanestésica virtual y materiales educativos en anestesiología para pacientes. Consiste en educación médica personalizada, preparación preoperatoria y resolución de dudas. No constituye acto médico presencial, no administra anestesia a distancia, no emite indicaciones definitivas de cirugía y no atiende urgencias ni emergencias."],
                ["3. Limitaciones del servicio", "La orientación virtual: (a) no reemplaza la evaluación presencial del anestesiólogo tratante; (b) no autoriza ni suspende procedimientos quirúrgicos; (c) no emite recetas, indicaciones de medicamentos ni diagnósticos clínicos; (d) no garantiza resultados médicos específicos; (e) no atiende urgencias ni emergencias médicas de ningún tipo."],
                ["4. Responsabilidad del consumidor", "El paciente debe proporcionar información completa, veraz y actualizada. La omisión u ocultamiento de datos médicos relevantes puede limitar la utilidad de la orientación y exime al prestador de responsabilidad. El paciente es responsable de validar la información recibida con su equipo médico tratante."],
                ["5. Productos digitales", "Las guías, checklists y cursos son materiales educativos de carácter general. No constituyen consultas médicas individualizadas ni sustituyen las indicaciones del médico tratante. El contenido está elaborado con criterio profesional y lenguaje accesible."],
                ["6. Precios y pagos", "Los precios están expresados en Soles peruanos (PEN) e incluyen todos los cargos aplicables. El pago puede realizarse con tarjeta de crédito o débito mediante Culqi, o manualmente por Yape o Plin. La reserva se confirma únicamente tras verificar el pago."],
                ["7. Entrega de productos", "Los productos digitales se entregan por correo electrónico o WhatsApp dentro de las 24 horas hábiles siguientes al pago confirmado. El enlace de Google Meet para la consulta virtual se envía tras confirmar el pago y acordar el horario."],
                ["8. Emergencias", "Este servicio no atiende urgencias ni emergencias. Ante dolor intenso, dificultad respiratoria, sangrado, pérdida de conciencia u otro signo de alarma, acude al servicio de emergencias más cercano o llama a tu médico tratante. No uses este canal para situaciones de riesgo vital."],
                ["9. Propiedad intelectual", "Todos los contenidos (textos, guías, materiales, diseño) son propiedad del Dr. Jhonatan Guevara o sus licenciantes. Queda prohibida su reproducción, distribución o uso comercial sin autorización expresa y por escrito."],
                ["10. Jurisdicción", "Estos términos se rigen por la legislación de la República del Perú, incluyendo el Código de Protección y Defensa del Consumidor (Ley N.° 29571). Ante controversias, las partes se someten a la jurisdicción de los tribunales competentes de Juliaca, Puno, Perú."],
              ].map(([title, body]) => (
                <div key={title}>
                  <h4 className="font-semibold text-slate-800">{title}</h4>
                  <p className="mt-1.5 text-sm leading-7 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "devoluciones" && (
          <motion.div
            key="devoluciones"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-950">Política de cambios y devoluciones</h3>
                <p className="text-xs text-slate-400">Conforme a la Ley N.° 29571 · Última actualización: {new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>
            {/* Quick summary */}
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                ["📦 Productos digitales", "Sin reembolso tras entrega. Error técnico: reemplazo en 48h."],
                ["📹 Consulta virtual", "Reprogramación gratis con 24h de anticipación."],
                ["💳 Reembolsos aprobados", "Procesados en máx. 10 días hábiles por el mismo medio de pago."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-950 mb-1">{title}</p>
                  <p className="text-xs leading-6 text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              {refundPolicy.map(({ title, body }) => (
                <div key={title}>
                  <h4 className="font-semibold text-slate-800">{title}</h4>
                  <p className="mt-1.5 text-sm leading-7 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Dr. Jhonatan, quisiera solicitar información sobre devoluciones o cambios de producto.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20bc5a] transition"
              >
                Consultar por WhatsApp
              </a>
              <a
                href={`mailto:${DOCTOR_EMAIL}?subject=Solicitud de devolución o cambio`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Enviar correo
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === "reclamaciones" && (
          <motion.div
            key="reclamaciones"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl lg:p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white text-lg">
                📋
              </div>
              <div>
                <h3 className="font-semibold text-slate-950">Libro de Reclamaciones Virtual</h3>
                <p className="text-xs text-slate-400">Conforme al D.S. N.° 011-2011-PCM · Ley N.° 29571</p>
              </div>
            </div>
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-7">
              <strong>Importante:</strong> Este Libro de Reclamaciones está habilitado conforme al{" "}
              <strong>Decreto Supremo N.° 011-2011-PCM</strong> y los lineamientos del{" "}
              <strong>INDECOPI</strong>. Tu reclamo o queja será atendido en un plazo máximo de{" "}
              <strong>15 días hábiles</strong>. La presentación de un reclamo no impide que acudas
              a otras instancias, incluido INDECOPI.
            </div>
            <LibroReclamaciones />
          </motion.div>
        )}
      </AnimatePresence>

      {/* INDECOPI badge */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> Ley N.° 29571 · Código del Consumidor</span>
        <span className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5" /> Libro de reclamaciones integrado</span>
        <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> Ley N.° 29733 · Datos personales</span>
        <a href="https://www.indecopi.gob.pe" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-700 transition underline">
          INDECOPI: 224-7777 (Lima) / 0-800-4-4040 (provincias)
        </a>
      </div>
    </section>
  );
}
