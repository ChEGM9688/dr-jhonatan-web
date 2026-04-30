// Ilustraciones SVG profesionales para cada producto
// Generadas inline — no requieren archivos externos

export function ImgGuia() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g1a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="g1b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#g1a)" rx="16"/>
      {/* Document */}
      <rect x="110" y="30" width="120" height="160" rx="10" fill="white" opacity="0.9" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.1))"/>
      <rect x="125" y="55" width="90" height="6" rx="3" fill="#0ea5e9" opacity="0.8"/>
      <rect x="125" y="70" width="75" height="4" rx="2" fill="#94a3b8"/>
      <rect x="125" y="82" width="80" height="4" rx="2" fill="#94a3b8"/>
      <rect x="125" y="94" width="65" height="4" rx="2" fill="#94a3b8"/>
      <rect x="125" y="110" width="90" height="5" rx="2.5" fill="#0ea5e9" opacity="0.6"/>
      <rect x="125" y="123" width="72" height="4" rx="2" fill="#94a3b8"/>
      <rect x="125" y="135" width="82" height="4" rx="2" fill="#94a3b8"/>
      <rect x="125" y="147" width="60" height="4" rx="2" fill="#94a3b8"/>
      {/* Checkmarks */}
      <circle cx="118" cy="165" r="7" fill="#0ea5e9"/>
      <text x="118" y="169" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">✓</text>
      <rect x="130" y="162" width="55" height="4" rx="2" fill="#94a3b8"/>
      {/* Badge */}
      <rect x="240" y="50" width="80" height="90" rx="10" fill="url(#g1b)" opacity="0.9"/>
      <text x="280" y="82" textAnchor="middle" fill="white" fontSize="26">📋</text>
      <text x="280" y="108" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">GUÍA</text>
      <text x="280" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">PDF</text>
      {/* Price tag */}
      <rect x="242" y="155" width="76" height="30" rx="8" fill="white" opacity="0.95"/>
      <text x="280" y="175" textAnchor="middle" fill="#0ea5e9" fontSize="14" fontWeight="700">S/ 39</text>
      {/* Decorative circles */}
      <circle cx="50" cy="50" r="30" fill="#0ea5e9" opacity="0.15"/>
      <circle cx="370" cy="220" r="40" fill="#0284c7" opacity="0.12"/>
      <circle cx="30" cy="220" r="20" fill="#38bdf8" opacity="0.2"/>
    </svg>
  );
}

export function ImgChecklist() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g2a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="g2b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#g2a)" rx="16"/>
      {/* Clipboard */}
      <rect x="130" y="25" width="140" height="185" rx="10" fill="white" opacity="0.92" filter="drop-shadow(0 4px 16px rgba(0,0,0,0.08))"/>
      <rect x="160" y="20" width="80" height="18" rx="9" fill="#e2e8f0"/>
      {/* Checklist items */}
      {[55,80,105,130,155,175].map((y, i) => (
        <g key={i}>
          <rect x="148" y={y} width="12" height="12" rx="3" fill={i < 4 ? "url(#g2b)" : "#e2e8f0"}/>
          {i < 4 && <text x="154" y={y+9} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">✓</text>}
          <rect x="167" y={y+2} width={i % 2 === 0 ? 72 : 58} height="5" rx="2.5" fill={i < 4 ? "#64748b" : "#cbd5e1"}/>
        </g>
      ))}
      {/* Green accent card */}
      <rect x="255" y="45" width="85" height="100" rx="12" fill="url(#g2b)" opacity="0.92"/>
      <text x="297" y="82" textAnchor="middle" fill="white" fontSize="28">✅</text>
      <text x="297" y="108" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">CHECKLIST</text>
      <text x="297" y="120" textAnchor="middle" fill="white" fontSize="9">CIRUGÍA</text>
      <text x="297" y="132" textAnchor="middle" fill="white" fontSize="9">SEGURA</text>
      {/* Price */}
      <rect x="257" y="158" width="81" height="30" rx="8" fill="white" opacity="0.95"/>
      <text x="297" y="178" textAnchor="middle" fill="#16a34a" fontSize="14" fontWeight="700">S/ 19</text>
      {/* Decorations */}
      <circle cx="45" cy="45" r="28" fill="#22c55e" opacity="0.12"/>
      <circle cx="360" cy="210" r="38" fill="#16a34a" opacity="0.1"/>
      <circle cx="55" cy="215" r="18" fill="#4ade80" opacity="0.18"/>
    </svg>
  );
}

export function ImgMiniCurso() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g3a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faf5ff" />
          <stop offset="100%" stopColor="#ede9fe" />
        </linearGradient>
        <linearGradient id="g3b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#g3a)" rx="16"/>
      {/* Video screen */}
      <rect x="80" y="35" width="170" height="105" rx="12" fill="#1e1b4b" opacity="0.9"/>
      <rect x="88" y="43" width="154" height="89" rx="8" fill="#312e81" opacity="0.8"/>
      {/* Play button */}
      <circle cx="165" cy="87" r="22" fill="url(#g3b)" opacity="0.95"/>
      <polygon points="158,77 158,97 180,87" fill="white"/>
      {/* Progress bar */}
      <rect x="88" y="136" width="154" height="6" rx="3" fill="#4338ca" opacity="0.4"/>
      <rect x="88" y="136" width="90" height="6" rx="3" fill="url(#g3b)"/>
      <circle cx="178" cy="139" r="5" fill="white" stroke="#7c3aed" strokeWidth="2"/>
      {/* PDF card */}
      <rect x="100" y="155" width="130" height="55" rx="10" fill="white" opacity="0.9"/>
      <text x="120" y="177" fill="#7c3aed" fontSize="14">📄</text>
      <rect x="140" y="165" width="72" height="5" rx="2.5" fill="#7c3aed" opacity="0.7"/>
      <rect x="140" y="176" width="55" height="4" rx="2" fill="#94a3b8"/>
      <rect x="140" y="186" width="62" height="4" rx="2" fill="#94a3b8"/>
      {/* Badge */}
      <rect x="268" y="45" width="82" height="100" rx="12" fill="url(#g3b)" opacity="0.92"/>
      <text x="309" y="82" textAnchor="middle" fill="white" fontSize="26">🎓</text>
      <text x="309" y="107" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">MINI</text>
      <text x="309" y="118" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">CURSO</text>
      <text x="309" y="129" textAnchor="middle" fill="white" fontSize="9">VIDEO+PDF</text>
      {/* Price */}
      <rect x="270" y="158" width="80" height="30" rx="8" fill="white" opacity="0.95"/>
      <text x="310" y="178" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="700">S/ 79</text>
      {/* Decorations */}
      <circle cx="45" cy="40" r="26" fill="#8b5cf6" opacity="0.12"/>
      <circle cx="365" cy="215" r="38" fill="#7c3aed" opacity="0.1"/>
      <circle cx="40" cy="220" r="18" fill="#a78bfa" opacity="0.18"/>
    </svg>
  );
}

export function ImgConsulta() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g4a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="g4b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#g4a)" rx="16"/>
      {/* Meet window */}
      <rect x="60" y="30" width="200" height="140" rx="12" fill="#1f2937" opacity="0.95" filter="drop-shadow(0 6px 20px rgba(0,0,0,0.15))"/>
      {/* Top bar */}
      <rect x="60" y="30" width="200" height="28" rx="12" fill="#111827"/>
      <rect x="60" y="44" width="200" height="14" fill="#111827"/>
      <circle cx="78" cy="44" r="5" fill="#ef4444" opacity="0.8"/>
      <circle cx="93" cy="44" r="5" fill="#f59e0b" opacity="0.8"/>
      <circle cx="108" cy="44" r="5" fill="#22c55e" opacity="0.8"/>
      <text x="200" y="49" textAnchor="middle" fill="#9ca3af" fontSize="9">Google Meet</text>
      {/* Doctor video tile */}
      <rect x="70" y="65" width="85" height="75" rx="8" fill="#374151"/>
      <circle cx="112" cy="87" r="14" fill="#6b7280"/>
      <ellipse cx="112" cy="110" rx="22" ry="14" fill="#6b7280"/>
      <text x="112" y="126" textAnchor="middle" fill="#d1d5db" fontSize="7">Dr. Guevara</text>
      {/* Patient video tile */}
      <rect x="165" y="65" width="85" height="75" rx="8" fill="#1e3a5f"/>
      <circle cx="207" cy="87" r="14" fill="#3b82f6" opacity="0.6"/>
      <ellipse cx="207" cy="110" rx="22" ry="14" fill="#3b82f6" opacity="0.6"/>
      <text x="207" y="126" textAnchor="middle" fill="#93c5fd" fontSize="7">Paciente</text>
      {/* Controls bar */}
      <rect x="60" y="148" width="200" height="22" rx="0" fill="#111827"/>
      <rect x="60" y="158" width="200" height="12" rx="12" fill="#111827"/>
      <circle cx="150" cy="159" r="7" fill="#ef4444"/>
      <circle cx="168" cy="159" r="7" fill="#374151"/>
      <circle cx="132" cy="159" r="7" fill="#374151"/>
      {/* Badge */}
      <rect x="280" y="40" width="82" height="105" rx="12" fill="url(#g4b)" opacity="0.92"/>
      <text x="321" y="78" textAnchor="middle" fill="white" fontSize="26">📹</text>
      <text x="321" y="103" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">CONSULTA</text>
      <text x="321" y="114" textAnchor="middle" fill="white" fontSize="9">VIRTUAL</text>
      <text x="321" y="125" textAnchor="middle" fill="white" fontSize="9">45-60 min</text>
      {/* Price */}
      <rect x="278" y="158" width="86" height="30" rx="8" fill="white" opacity="0.95"/>
      <text x="321" y="178" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="700">S/ 150</text>
      {/* Stethoscope decoration */}
      <text x="95" y="210" fontSize="28" opacity="0.25">🩺</text>
      <circle cx="45" cy="45" r="26" fill="#059669" opacity="0.12"/>
      <circle cx="360" cy="215" r="38" fill="#047857" opacity="0.1"/>
    </svg>
  );
}

export function ImgPoliticaPrivacidad() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g5a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="g5b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#g5a)" rx="16"/>
      {/* Shield */}
      <path d="M 170 25 L 230 25 L 250 45 L 250 120 Q 250 155 200 175 Q 150 155 150 120 L 150 45 Z" fill="url(#g5b)" opacity="0.9"/>
      <path d="M 175 35 L 225 35 L 242 52 L 242 118 Q 242 148 200 165 Q 158 148 158 118 L 158 52 Z" fill="white" opacity="0.15"/>
      {/* Lock icon */}
      <rect x="182" y="80" width="36" height="30" rx="6" fill="white" opacity="0.95"/>
      <path d="M 188 80 Q 188 62 200 62 Q 212 62 212 80" fill="none" stroke="white" strokeWidth="5" strokeOpacity="0.95"/>
      <circle cx="200" cy="95" r="5" fill="#1d4ed8"/>
      {/* Checkmark */}
      <circle cx="200" cy="130" r="14" fill="white" opacity="0.2"/>
      <text x="200" y="136" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
      {/* Ley badge */}
      <rect x="272" y="50" width="90" height="80" rx="12" fill="url(#g5b)" opacity="0.85"/>
      <text x="317" y="82" textAnchor="middle" fill="white" fontSize="20">🛡️</text>
      <text x="317" y="100" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">LEY 29733</text>
      <text x="317" y="112" textAnchor="middle" fill="white" fontSize="8">DATOS</text>
      <text x="317" y="122" textAnchor="middle" fill="white" fontSize="8">PERSONALES</text>
      {/* Info lines */}
      <rect x="80" y="195" width="240" height="5" rx="2.5" fill="#3b82f6" opacity="0.3"/>
      <rect x="100" y="207" width="200" height="4" rx="2" fill="#3b82f6" opacity="0.2"/>
      <rect x="120" y="218" width="160" height="4" rx="2" fill="#3b82f6" opacity="0.15"/>
      {/* Decorations */}
      <circle cx="45" cy="45" r="26" fill="#3b82f6" opacity="0.12"/>
      <circle cx="360" cy="215" r="38" fill="#1d4ed8" opacity="0.08"/>
    </svg>
  );
}
