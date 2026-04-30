import React, { useMemo, useState, useEffect } from "react";
import Store from "./Store";
import LegalPage from "./Legal";
import { CookieBanner, SobreNosotros, CulqiChecklist } from "./CulqiCompliance";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Download,
  FileText,
  HeartPulse,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UserRound,
  Video,
  X,
  ChevronDown,
  Phone,
  Clock,
  Award,
  Info,
} from "lucide-react";

/* ─────────────────────── DATA ─────────────────────── */
const doctor = {
  name: "Dr. Jhonatan Guevara",
  firstName: "Jhonatan",
  specialty: "Médico Anestesiólogo",
  country: "Perú",
  cmp: "074566",
  rne: "051391",
  whatsapp: "+51 943 740 001",
  whatsappUrl:
    "https://wa.me/51943740001?text=Hola%20Dr.%20Jhonatan%2C%20deseo%20consultar%20sobre%20la%20orientaci%C3%B3n%20preanest%C3%A9sica%20virtual.",
  email: "dr.guevaramarin@gmail.com",
  meet: "Google Meet",
  photo: "/dr-guevara.png",
};

const navItems = [
  ["Inicio", "#inicio"],
  ["Consulta", "#consulta"],
  ["Servicios", "#servicios"],
  ["Tienda", "#tienda"],
  ["Formulario", "#formulario"],
  ["Reclamaciones", "#legal"],
  ["Nosotros", "#sobre-nosotros"],
  ["Contacto", "#contacto"],
];

const services = [
  {
    icon: Video,
    title: "Consulta preanestésica virtual",
    description:
      "Orientación virtual por Google Meet para pacientes con una cirugía o procedimiento próximo. Resolvemos dudas, ordenamos información y preparamos preguntas clave.",
    color: "bg-sky-50 text-sky-700",
  },
  {
    icon: FileText,
    title: "Revisión educativa del caso",
    description:
      "Analizamos antecedentes médicos, medicamentos, alergias, cirugías previas y exámenes disponibles para que llegues mejor organizado.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: HeartPulse,
    title: "Orientación para el miedo a la anestesia",
    description:
      "Explicamos con claridad la sedación, tipos de anestesia, el despertar, el manejo del dolor y las medidas de seguridad habituales.",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: ShieldCheck,
    title: "Segunda opinión educativa",
    description:
      "Acompañamiento informativo para entender los riesgos generales de la anestesia y formular preguntas adecuadas para tu equipo médico tratante.",
    color: "bg-violet-50 text-violet-700",
  },
];

const products = [
  {
    title: "Guía preanestésica para pacientes",
    type: "PDF descargable",
    price: "S/ 39",
    priceNum: 39,
    description:
      "Qué contarle al anestesiólogo, cómo prepararte, qué preguntar y qué errores evitar antes de una cirugía. Material educativo, no reemplaza consulta médica.",
    badge: "Más popular",
    badgeColor: "bg-sky-500",
    highlight: true,
  },
  {
    title: "Checklist para cirugía segura",
    type: "PDF imprimible",
    price: "S/ 19",
    priceNum: 19,
    description:
      "Lista práctica para organizar documentos, medicamentos, tiempos de ayuno, acompañante y preguntas importantes antes del procedimiento.",
    badge: "Entrada económica",
    badgeColor: "bg-slate-600",
    highlight: false,
  },
  {
    title: "Mini curso: Pierde el miedo a la anestesia",
    type: "Video + PDF",
    price: "S/ 79",
    priceNum: 79,
    description:
      "Contenido educativo con lenguaje sencillo sobre los tipos de anestesia, recuperación, manejo del dolor y preguntas frecuentes de pacientes.",
    badge: "Curso completo",
    badgeColor: "bg-violet-500",
    highlight: false,
  },
];

const steps = [
  {
    icon: MessageCircle,
    title: "Escribe por WhatsApp",
    description: "Envía tus datos básicos, el tipo de cirugía y la fecha aproximada del procedimiento.",
  },
  {
    icon: ClipboardCheck,
    title: "Completa el formulario previo",
    description: "Ordena tus antecedentes, medicamentos, alergias, cirugías previas y exámenes disponibles.",
  },
  {
    icon: CreditCard,
    title: "Realiza el pago por Yape o Plin",
    description: "Pago manual inicial. Se verificará y se enviará confirmación de la cita.",
  },
  {
    icon: Video,
    title: "Recibe tu enlace de Google Meet",
    description: "Tendrás una orientación virtual clara, responsable y enfocada en tus dudas antes de la cirugía.",
  },
];

const faqs = [
  [
    "¿Se puede administrar anestesia por internet?",
    "No. La anestesia solo puede ser administrada de forma presencial por un profesional capacitado en el quirófano. Esta web ofrece exclusivamente orientación preanestésica virtual: educación médica, preparación del paciente y resolución de dudas antes del procedimiento.",
  ],
  [
    "¿Esta consulta virtual reemplaza mi evaluación presencial?",
    "No. La orientación virtual ayuda a resolver dudas, organizar información y preparar preguntas para el equipo médico. No reemplaza la evaluación presencial ni las indicaciones del equipo anestesiológico que realizará el procedimiento.",
  ],
  [
    "¿Qué información necesito tener lista para la consulta?",
    "Tipo de cirugía o procedimiento, diagnóstico, lista de medicamentos actuales, alergias conocidas, antecedentes médicos relevantes, cirugías o anestesias previas y exámenes recientes si los tienes disponibles.",
  ],
  [
    "¿Cómo se realiza la consulta virtual?",
    "Por Google Meet. El proceso es: (1) escribes por WhatsApp, (2) completas el formulario previo, (3) realizas el pago por Yape o Plin, (4) recibes el enlace de la videollamada y (5) tienes tu orientación en el horario acordado.",
  ],
  [
    "¿Qué pasa después de la orientación?",
    "Recibirás un resumen educativo o checklist con los puntos principales tratados. El material es educativo y deberás compartirlo y validarlo con el equipo médico que realizará tu cirugía.",
  ],
  [
    "¿Atienden emergencias médicas?",
    "No. Este servicio no atiende urgencias ni emergencias. Ante dolor intenso, dificultad respiratoria, reacción alérgica, sangrado, pérdida de conciencia u otro signo de alarma, acude inmediatamente a urgencias o llama a tu médico tratante.",
  ],
];

const privacySections = [
  {
    title: "1. Responsable del tratamiento",
    body: "El Dr. Jhonatan Guevara Marín, médico anestesiólogo, CMP 074566, RNE 051391, es el responsable del tratamiento de los datos personales recopilados a través de esta web y sus medios de contacto (WhatsApp, correo electrónico). Contacto: dr.guevaramarin@gmail.com.",
  },
  {
    title: "2. Marco legal aplicable",
    body: "El tratamiento de datos se realiza conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú y su Reglamento (D.S. 003-2013-JUS). Al ser datos de salud, se aplican las medidas de seguridad reforzadas que la norma establece para categorías especiales de datos.",
  },
  {
    title: "3. Datos que se recopilan",
    body: "Podemos recopilar: nombre completo, teléfono, correo electrónico, edad, ciudad, tipo de procedimiento o cirugía, antecedentes médicos, alergias, medicamentos en uso, cirugías previas y exámenes compartidos voluntariamente. Estos datos son necesarios para coordinar y brindar la orientación preanestésica virtual solicitada.",
  },
  {
    title: "4. Finalidades del tratamiento",
    body: "Los datos se utilizan para: (a) coordinar y realizar la consulta preanestésica virtual; (b) revisar la información previa enviada por el paciente; (c) gestionar pagos manuales (Yape/Plin); (d) entregar productos digitales adquiridos; (e) responder consultas y solicitudes; (f) mantener un registro administrativo del servicio.",
  },
  {
    title: "5. Tratamiento de datos de salud",
    body: "La información médica compartida es tratada con estricta confidencialidad. Su uso se limita exclusivamente a las finalidades indicadas. El paciente es responsable de compartir información veraz, completa y necesaria para la orientación solicitada.",
  },
  {
    title: "6. Base legal del consentimiento",
    body: "Al completar el formulario previo, enviar un mensaje por WhatsApp o comunicarse por correo electrónico, el paciente presta su consentimiento libre, informado y expreso para el tratamiento de sus datos personales, incluidos los datos de salud, conforme al artículo 13 de la Ley N.° 29733.",
  },
  {
    title: "7. Derechos del titular",
    body: "El titular puede ejercer sus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO) escribiendo a dr.guevaramarin@gmail.com. La solicitud debe incluir nombre completo, copia de DNI y descripción del derecho que desea ejercer. Se atenderá en el plazo establecido por la ley.",
  },
  {
    title: "8. Conservación de datos",
    body: "Los datos se conservarán durante el tiempo necesario para cumplir la finalidad del servicio y las obligaciones legales aplicables. Transcurrido ese plazo, los datos serán eliminados de forma segura o anonimizados.",
  },
  {
    title: "9. Terceros y herramientas utilizadas",
    body: "Para operar el servicio se emplean herramientas externas como WhatsApp Business (Meta), Google Meet y Gmail (Google LLC), Yape (BCP) y Plin (operadores bancarios). Cada proveedor cuenta con sus propias políticas de privacidad. No se transfieren ni venden datos a terceros para fines comerciales.",
  },
  {
    title: "10. Seguridad",
    body: "Se aplican medidas técnicas y organizativas razonables para proteger los datos personales contra acceso no autorizado, pérdida o divulgación indebida. Al tratarse de datos de salud (categoría especial), se adopta un nivel de protección reforzado conforme a la normativa peruana.",
  },
];

const termsSections = [
  {
    title: "1. Naturaleza y alcance del servicio",
    body: "Esta web ofrece orientación preanestésica virtual y materiales educativos en anestesiología para pacientes. El servicio consiste en educación médica personalizada, preparación preoperatoria y resolución de dudas. No constituye acto médico presencial, no administra anestesia a distancia, no emite indicaciones definitivas de cirugía y no atiende urgencias ni emergencias.",
  },
  {
    title: "2. Limitaciones del servicio",
    body: "La orientación virtual: (a) no reemplaza la evaluación presencial del anestesiólogo o del equipo médico tratante; (b) no autoriza ni suspende procedimientos quirúrgicos; (c) no emite recetas, indicaciones de medicamentos ni diagnósticos; (d) no garantiza resultados médicos específicos; (e) no establece una relación médico-paciente formal en el sentido legal de atención presencial.",
  },
  {
    title: "3. Responsabilidad del paciente",
    body: "El paciente debe proporcionar información completa, veraz y actualizada. La omisión, inexactitud u ocultamiento de datos médicos relevantes puede limitar la utilidad de la orientación virtual y exime al prestador de responsabilidad por las consecuencias de una orientación basada en información incompleta. El paciente es responsable de validar la información recibida con su equipo médico tratante.",
  },
  {
    title: "4. Productos digitales",
    body: "Las guías, checklists y cursos son materiales educativos de carácter general. No constituyen consultas médicas individualizadas ni sustituyen las indicaciones del médico tratante. El contenido está elaborado con criterio profesional y lenguaje accesible, pero no puede reemplazar la evaluación clínica de cada caso particular.",
  },
  {
    title: "5. Pagos, reservas y confirmaciones",
    body: "En la etapa inicial, los pagos se coordinan manualmente por Yape o Plin. La reserva queda confirmada únicamente cuando se verifica el pago y se envía el enlace de Google Meet al paciente. Los productos digitales se entregan por correo electrónico o WhatsApp una vez verificado el pago.",
  },
  {
    title: "6. Reprogramaciones y cancelaciones",
    body: "El paciente puede solicitar reprogramación con un mínimo de 24 horas de anticipación a través de WhatsApp. Las condiciones específicas de reembolso o reprogramación en caso de cancelación tardía serán informadas al momento de confirmar la reserva. Los productos digitales entregados no son reembolsables una vez descargados.",
  },
  {
    title: "7. Emergencias y urgencias",
    body: "Este servicio no atiende urgencias ni emergencias médicas de ningún tipo. Ante dolor intenso, dificultad respiratoria, reacción alérgica, sangrado, pérdida de conciencia, convulsiones u otro signo de alarma, el paciente debe acudir de inmediato al servicio de emergencias más cercano o llamar a su médico tratante. No utilice este canal para situaciones de riesgo vital.",
  },
  {
    title: "8. Propiedad intelectual",
    body: "Todos los contenidos de esta web (textos, guías, materiales educativos, diseño) son propiedad del Dr. Jhonatan Guevara o de sus licenciantes. Queda prohibida su reproducción, distribución o uso comercial sin autorización expresa y por escrito.",
  },
  {
    title: "9. Modificaciones",
    body: "El prestador se reserva el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta misma página y entrarán en vigor desde su publicación. El uso continuado del servicio implica la aceptación de los términos vigentes.",
  },
  {
    title: "10. Jurisdicción y legislación aplicable",
    body: "Estos términos se rigen por la legislación de la República del Perú. Ante cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Juliaca, Puno, Perú, salvo que la normativa aplicable disponga otra cosa.",
  },
];

/* ─────────────────────── COMPONENTS ─────────────────────── */

function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 select-none";
  const variants = {
    primary:
      "bg-slate-950 text-white shadow-md shadow-slate-950/20 hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0",
    secondary:
      "bg-white text-slate-950 ring-1 ring-slate-200 shadow-sm hover:-translate-y-0.5 hover:ring-slate-300 active:translate-y-0",
    whatsapp:
      "bg-[#25D366] text-white shadow-md shadow-green-700/20 hover:-translate-y-0.5 hover:bg-[#20bc5a] active:translate-y-0",
    darkGlass:
      "bg-white/10 text-white ring-1 ring-white/15 hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0",
    outlineDark:
      "bg-transparent text-white ring-1 ring-white/25 hover:bg-white/10 active:bg-white/5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <div
      className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
        dark
          ? "border border-white/10 bg-white/10 text-white/60"
          : "border border-slate-200 bg-white/70 text-slate-500"
      }`}
    >
      {children}
    </div>
  );
}

function AlertBox({ children, className = "" }) {
  return (
    <div className={`flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 ${className}`}>
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <p className="text-sm leading-7">{children}</p>
    </div>
  );
}

function InfoBox({ children, className = "" }) {
  return (
    <div className={`flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sky-900 ${className}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
      <p className="text-sm leading-7">{children}</p>
    </div>
  );
}

function LegalSection({ title, sections }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
      <div className="mt-6 space-y-5">
        {sections.map(({ title: heading, body }) => (
          <div key={heading}>
            <h4 className="font-semibold text-slate-800">{heading}</h4>
            <p className="mt-1.5 text-sm leading-7 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      role="region"
      aria-label={q}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-950 hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-7 text-slate-600 border-t border-slate-100 pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Intake form with validation ── */
function IntakeForm() {
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    correo: "",
    ciudad: "",
    fechaCirugia: "",
    tipoCirugia: "",
    clinica: "",
    antecedentes: "",
    medicamentos: "",
    alergias: "",
    cirugiasPrevias: "",
    dudas: "",
    aceptaTerminos: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.edad || isNaN(form.edad) || form.edad < 1 || form.edad > 120)
      newErrors.edad = "Ingresa una edad válida.";
    if (!form.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio.";
    if (!form.correo.trim() || !/\S+@\S+\.\S+/.test(form.correo))
      newErrors.correo = "Ingresa un correo válido.";
    if (!form.tipoCirugia.trim()) newErrors.tipoCirugia = "Describe el tipo de cirugía o procedimiento.";
    if (!form.aceptaTerminos) newErrors.aceptaTerminos = "Debes aceptar para continuar.";
    return newErrors;
  };

  const buildWhatsAppMessage = () => {
    const msg = [
      `*Formulario preanestésico*`,
      ``,
      `*Nombre:* ${form.nombre}`,
      `*Edad:* ${form.edad}`,
      `*Teléfono:* ${form.telefono}`,
      `*Correo:* ${form.correo}`,
      `*Ciudad:* ${form.ciudad || "No indicada"}`,
      `*Fecha aprox. de cirugía:* ${form.fechaCirugia || "No indicada"}`,
      `*Tipo de cirugía:* ${form.tipoCirugia}`,
      `*Clínica/hospital:* ${form.clinica || "No indicada"}`,
      `*Antecedentes:* ${form.antecedentes || "Ninguno indicado"}`,
      `*Medicamentos:* ${form.medicamentos || "Ninguno indicado"}`,
      `*Alergias:* ${form.alergias || "Ninguna indicada"}`,
      `*Cirugías previas:* ${form.cirugiasPrevias || "Ninguna indicada"}`,
      `*Dudas principales:* ${form.dudas || "Sin dudas adicionales"}`,
    ].join("\n");
    return encodeURIComponent(msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors bg-white placeholder:text-slate-400 ${
      errors[field]
        ? "border-red-300 focus:border-red-400"
        : "border-slate-200 focus:border-slate-400"
    }`;

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl shadow-slate-200/60 backdrop-blur-xl text-center">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">¡Formulario completado!</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Ahora envía la información por WhatsApp para confirmar tu cita y coordinar el pago.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row justify-center">
          <a
            href={`https://wa.me/51943740001?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="whatsapp">
              <MessageCircle className="h-4 w-4" />
              Enviar por WhatsApp
            </Button>
          </a>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            Editar información
          </Button>
        </div>
        <p className="mt-5 text-xs text-slate-400">
          Al presionar el botón se abrirá WhatsApp con tu información. El pago se coordina después de la confirmación.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Personal data */}
      <h3 className="text-lg font-semibold text-slate-950 mb-4">Datos personales</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["nombre", "Nombre completo *", "text", "María García López"],
          ["edad", "Edad *", "number", "35"],
          ["telefono", "Teléfono / WhatsApp *", "tel", "+51 999 999 999"],
          ["correo", "Correo electrónico *", "email", "tu@correo.com"],
          ["ciudad", "Ciudad y país", "text", "Lima, Perú"],
          ["fechaCirugia", "Fecha aproximada de cirugía", "date", ""],
        ].map(([name, label, type, placeholder]) => (
          <label key={name} className="text-sm font-medium text-slate-700">
            {label}
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={inputClass(name)}
              min={name === "edad" ? 1 : undefined}
              max={name === "edad" ? 120 : undefined}
            />
            {errors[name] && <span className="mt-1 block text-xs text-red-600">{errors[name]}</span>}
          </label>
        ))}
      </div>

      {/* Procedure */}
      <h3 className="text-lg font-semibold text-slate-950 mt-6 mb-4">Información del procedimiento</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Tipo de cirugía o procedimiento *
          <input
            name="tipoCirugia"
            value={form.tipoCirugia}
            onChange={handleChange}
            placeholder="Ej.: colecistectomía laparoscópica"
            className={inputClass("tipoCirugia")}
          />
          {errors.tipoCirugia && <span className="mt-1 block text-xs text-red-600">{errors.tipoCirugia}</span>}
        </label>
        <label className="text-sm font-medium text-slate-700">
          Clínica u hospital donde será atendido
          <input
            name="clinica"
            value={form.clinica}
            onChange={handleChange}
            placeholder="Ej.: Clínica San Borja"
            className={inputClass("clinica")}
          />
        </label>
      </div>

      {/* Medical history */}
      <h3 className="text-lg font-semibold text-slate-950 mt-6 mb-4">Historial médico</h3>
      <p className="text-xs text-slate-500 mb-3">Comparte solo la información relevante. Si no aplica, escribe "Ninguno".</p>
      {[
        ["antecedentes", "Antecedentes médicos relevantes", "Ej.: hipertensión, diabetes, asma…"],
        ["medicamentos", "Medicamentos que toma actualmente", "Ej.: metformina 850 mg/día, losartán 50 mg/día…"],
        ["alergias", "Alergias conocidas (medicamentos, látex, otros)", "Ej.: alergia a penicilina, ninguna conocida…"],
        ["cirugiasPrevias", "Cirugías o anestesias previas", "Ej.: apendicectomía 2015 sin complicaciones, ninguna…"],
        ["dudas", "Dudas principales sobre la anestesia o el procedimiento", "Ej.: tengo miedo de no despertar, ¿podré comer antes?…"],
      ].map(([name, label, placeholder]) => (
        <label key={name} className="mt-4 block text-sm font-medium text-slate-700">
          {label}
          <textarea
            name={name}
            value={form[name]}
            onChange={handleChange}
            rows="3"
            placeholder={placeholder}
            className={`${inputClass(name)} resize-none`}
          />
        </label>
      ))}

      {/* Disclaimer + consent */}
      <AlertBox className="mt-5">
        No envíes información falsa ni uses este formulario para urgencias. Ante signos de alarma (dolor intenso, dificultad respiratoria, sangrado), acude al servicio de emergencias más cercano.
      </AlertBox>

      <label className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:bg-slate-100 transition-colors">
        <input
          type="checkbox"
          name="aceptaTerminos"
          checked={form.aceptaTerminos}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded accent-slate-950"
        />
        <span className="text-sm leading-7 text-slate-700">
          Declaro que la información proporcionada es veraz y autorizo el tratamiento de mis datos personales, incluidos datos de salud, para coordinar la orientación preanestésica virtual, conforme a la{" "}
          <a href="#legal" className="underline text-slate-950 hover:text-sky-700">Política de privacidad</a>{" "}
          y la Ley N.° 29733. Entiendo que este servicio no reemplaza una evaluación médica presencial ni atiende emergencias.
        </span>
      </label>
      {errors.aceptaTerminos && (
        <span className="mt-1 block text-xs text-red-600">{errors.aceptaTerminos}</span>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="flex-1 sm:flex-none">
          Revisar y enviar formulario <ArrowRight className="h-4 w-4" />
        </Button>
        <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer">
          <Button type="button" variant="whatsapp">
            <MessageCircle className="h-4 w-4" />
            WhatsApp directo
          </Button>
        </a>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Los campos marcados con * son obligatorios. El formulario envía la información por WhatsApp de forma segura.
      </p>
    </form>
  );
}

/* ─────────────────────── MAIN APP ─────────────────────── */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on nav click
  const handleNavClick = () => setMobileOpen(false);

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-950 antialiased" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-9rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-9rem] h-[28rem] w-[28rem] rounded-full bg-emerald-100/60 blur-3xl" />
      </div>

      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/50 bg-[#f5f5f7]/85 shadow-sm shadow-slate-200/40 backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20 transition group-hover:bg-slate-800">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-slate-950">{doctor.name}</p>
              <p className="mt-1 text-xs text-slate-500">Anestesiología · CMP {doctor.cmp}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer">
              <Button variant="whatsapp">
                <MessageCircle className="h-4 w-4" />
                Agendar consulta
              </Button>
            </a>
          </div>

          <button
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 md:hidden transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {navItems.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={handleNavClick}
                    className="rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer" onClick={handleNavClick}>
                    <Button variant="whatsapp" className="w-full">
                      <MessageCircle className="h-4 w-4" />
                      Agendar consulta por WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="inicio" className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Orientación preanestésica virtual · Perú</SectionLabel>
            <h1
              className="max-w-4xl text-5xl tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Llega a tu cirugía tranquilo, informado y preparado.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Soy el {doctor.name}, médico anestesiólogo en Perú. Brindo{" "}
              <strong className="font-semibold text-slate-800">orientación preanestésica virtual</strong>{" "}
              por Google Meet para resolver dudas, organizar información y preparar mejor tu proceso quirúrgico.
            </p>

            {/* Credentials */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                ["CMP", doctor.cmp],
                ["RNE", doctor.rne],
                ["Modalidad", "Google Meet"],
                ["País", "Perú"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-sm text-slate-600 shadow-sm backdrop-blur">
                  <span className="font-semibold text-slate-950">{label}:</span> {value}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer">
                <Button variant="whatsapp">
                  <MessageCircle className="h-4 w-4" />
                  Agendar orientación virtual
                </Button>
              </a>
              <a href="#productos">
                <Button variant="secondary">
                  Ver guías digitales <Download className="h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["Google Meet", "Consulta virtual"],
                ["S/ 150", "Precio inicial"],
                ["Yape / Plin", "Forma de pago"],
              ].map(([val, label]) => (
                <div key={label} className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-lg shadow-slate-200/60 backdrop-blur text-center">
                  <div className="text-base font-semibold text-slate-950">{val}</div>
                  <div className="mt-1 text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[3rem] bg-white/50 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-white/80 bg-white/75 p-4 shadow-2xl shadow-slate-300/60 backdrop-blur-xl">
              <div className="relative min-h-[580px] overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-slate-50 via-white to-slate-100">
                <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.3),transparent_60%)]" aria-hidden="true" />
                <img
                  src={doctor.photo}
                  alt={`${doctor.name}, médico anestesiólogo en Perú`}
                  className="absolute bottom-0 left-1/2 h-[560px] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-2xl"
                  loading="eager"
                />
                {/* Top badge */}
                <div className="absolute left-4 right-4 top-4 rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Médico Anestesiólogo · Perú</p>
                      <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">{doctor.name}</h2>
                      <p className="mt-1 text-xs text-slate-500">CMP {doctor.cmp} · RNE {doctor.rne}</p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                {/* Bottom card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-xl backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950 text-sm">Consulta preanestésica virtual</h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">
                        Orientación por Google Meet para llegar tranquilo, informado y mejor preparado a tu procedimiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DISCLAIMER BANNER ── */}
      <div className="relative mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50/80 px-6 py-4 text-amber-900 shadow-sm">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-sm leading-7">
              <strong>Aviso importante:</strong> Este servicio ofrece <strong>orientación educativa preanestésica virtual</strong> para pacientes.{" "}
              <strong>No se administra anestesia a distancia</strong>, no se reemplaza la evaluación presencial del equipo médico, no se atienden emergencias y no se autorizan ni suspenden cirugías.
              Ante cualquier emergencia médica, acude de inmediato al servicio de urgencias más cercano.
            </p>
          </div>
        </div>
      </div>

      {/* ── CONSULTATION ── */}
      <section id="consulta" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>Oferta principal</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Consulta preanestésica virtual por Google Meet.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Una orientación médica virtual para pacientes con una cirugía o procedimiento próximo que desean resolver dudas sobre la anestesia, el ayuno, los medicamentos, los antecedentes relevantes y la preparación general antes de su atención presencial.
            </p>
            <div className="mt-8 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Precio inicial sugerido</p>
                  <p className="mt-2 text-5xl font-semibold tracking-tight">S/ 150</p>
                  <p className="mt-2 text-sm text-slate-500">Pago manual por Yape o Plin. Reserva confirmada tras verificar el pago.</p>
                </div>
                <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer">
                  <Button variant="whatsapp">
                    <MessageCircle className="h-4 w-4" />
                    Reservar ahora
                  </Button>
                </a>
              </div>
            </div>
            <InfoBox className="mt-4">
              Esta orientación no reemplaza la evaluación presencial del equipo anestesiológico que realizará el procedimiento. Es un espacio educativo para resolver dudas y prepararse mejor.
            </InfoBox>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Revisión educativa de antecedentes médicos",
              "Medicamentos, alergias y cirugías previas",
              "Orientación sobre el ayuno preoperatorio",
              "Preguntas clave para el equipo quirúrgico",
              "Explicación de los tipos de anestesia",
              "Resumen educativo o checklist posterior",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Servicios para pacientes</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Una orientación médica digital, cercana y fácil de entender.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Servicios diseñados para pacientes que desean llegar a su cirugía con menos incertidumbre, mejores preguntas y una preparación más ordenada.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description, color }) => (
            <motion.article
              key={title}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="productos" className="relative bg-slate-950 py-24 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(125,211,252,0.15) 0%, transparent 35%), radial-gradient(circle at bottom right, rgba(167,139,250,0.15) 0%, transparent 35%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel dark>Productos digitales educativos</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Educación médica para pacientes que quieren llegar preparados.
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/65">
              Guías, checklists y cursos con lenguaje claro y accesible. Todos los productos son materiales educativos de carácter general y no sustituyen la consulta médica individualizada ni las indicaciones del médico tratante.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {products.map((p) => (
              <motion.article
                key={p.title}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl ${
                  p.highlight
                    ? "border-sky-400/30 bg-sky-950/40 shadow-sky-900/30"
                    : "border-white/10 bg-white/[0.07] shadow-black/20"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <span className="text-sm text-white/50">{p.type}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 min-h-[96px] text-sm leading-7 text-white/60">{p.description}</p>
                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-3xl font-semibold">{p.price}</span>
                  <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer">
                    <Button variant="secondary">
                      Adquirir <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-white/40">
            * Los productos digitales son materiales educativos. No son consultas médicas ni reemplazan indicaciones del médico tratante. El pago se coordina por WhatsApp.
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="proceso" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel>Proceso de reserva</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
              De la duda a la tranquilidad en cuatro pasos.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              El proceso es simple, seguro y completamente virtual. La reserva se confirma tras verificar el pago por Yape o Plin.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Paso {index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="formulario" className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionLabel>Formulario previo</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Organiza tu información antes de la consulta.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Este formulario ayuda a preparar la orientación virtual. Completarlo antes de la cita permite aprovechar mejor el tiempo de consulta.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Solo 10-15 minutos para completarlo",
                "La información se envía de forma segura por WhatsApp",
                "Permite una orientación más personalizada",
                "Tus datos son confidenciales y se usan solo para la consulta",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
            <AlertBox className="mt-6">
              No uses este formulario para emergencias. Si tienes una urgencia médica, acude de inmediato al servicio de emergencias más cercano.
            </AlertBox>
          </div>
          <IntakeForm />
        </div>
      </section>

      {/* ── STORE ── */}
      <Store />

      {/* ── FAQ ── */}
      <section id="faq" className="relative bg-white/50 py-24 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Respuestas antes de reservar.
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map(([q, a]) => (
              <FAQ key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <LegalPage />

      {/* ── CONTACT ── */}
      <section id="contacto" className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-2xl shadow-slate-400/30">
          <div className="grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr] lg:p-12">
            <div>
              <SectionLabel dark>Agenda tu consulta</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Da el primer paso hacia una cirugía mejor preparada.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
                Reserva una orientación preanestésica virtual por Google Meet o adquiere un recurso educativo digital. El pago inicial se coordina por Yape o Plin.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer">
                  <Button variant="whatsapp">
                    <MessageCircle className="h-4 w-4" />
                    Escribir por WhatsApp
                  </Button>
                </a>
                <a href={`mailto:${doctor.email}`}>
                  <Button variant="outlineDark">
                    <Mail className="h-4 w-4" />
                    Enviar correo
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold mb-5">Información de contacto</h3>
              <div className="space-y-3.5 text-sm">
                {[
                  [UserRound, "Nombre", doctor.name],
                  [Stethoscope, "Especialidad", doctor.specialty],
                  [ShieldCheck, "Registro", `CMP ${doctor.cmp} · RNE ${doctor.rne}`],
                  [MapPin, "Atención", `Virtual desde ${doctor.country}`],
                  [Video, "Modalidad", doctor.meet],
                  [Phone, "WhatsApp", doctor.whatsapp],
                  [Mail, "Correo", doctor.email],
                  [CreditCard, "Pagos", "Yape / Plin (manual)"],
                ].map(([Icon, label, value]) => (
                  <p key={label} className="flex items-center gap-3 text-white/70">
                    <Icon className="h-4 w-4 shrink-0 text-white/40" />
                    <span>
                      <span className="font-semibold text-white">{label}:</span> {value}
                    </span>
                  </p>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs leading-6 text-white/50">
                Este servicio ofrece orientación y educación preanestésica para pacientes. No reemplaza la evaluación presencial, no atiende emergencias, no emite indicaciones definitivas de cirugía y no administra anestesia a distancia.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS (requerido Culqi) ── */}
      <SobreNosotros />

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-slate-200 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {doctor.name} · CMP {doctor.cmp} · RNE {doctor.rne} · Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#legal" className="hover:text-slate-950 transition">Política de privacidad</a>
            <a href="#legal" className="hover:text-slate-950 transition">Términos y condiciones</a>
            <a href="#contacto" className="hover:text-slate-950 transition">Contacto</a>
            <a href={doctor.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-slate-950 transition">WhatsApp</a>
          </div>
        </div>
      </footer>
      {/* ── COOKIE BANNER (requerido Culqi) ── */}
      <CookieBanner />
    </main>
  );
}
