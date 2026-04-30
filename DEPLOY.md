# Guía de despliegue en Vercel

## Requisitos previos
- Node.js 18+ instalado en tu computadora
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Cuenta en [GitHub](https://github.com) (gratis)

---

## Paso 1: Instala dependencias y prueba localmente

```bash
cd dr-jhonatan-web-v2
npm install
npm run dev
```

Abre http://localhost:5173 y verifica que todo se vea bien.

---

## Paso 2: Sube el proyecto a GitHub

1. Ve a https://github.com/new y crea un repositorio nuevo (ej: `dr-jhonatan-web`)
2. En tu terminal:

```bash
git init
git add .
git commit -m "Versión inicial web Dr. Jhonatan Guevara"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/dr-jhonatan-web.git
git push -u origin main
```

---

## Paso 3: Despliega en Vercel

1. Ve a https://vercel.com e inicia sesión con tu cuenta de GitHub
2. Haz clic en **"Add New Project"**
3. Selecciona el repositorio `dr-jhonatan-web`
4. Vercel detectará automáticamente que es Vite/React
5. Configuración del build (ya se detecta sola):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Haz clic en **"Deploy"**
7. En 1-2 minutos tendrás una URL tipo `dr-jhonatan-web.vercel.app`

---

## Paso 4: Conectar dominio propio (cuando lo tengas)

1. En Vercel, ve a tu proyecto → **Settings → Domains**
2. Agrega tu dominio (ej: `drjhonatanguevara.com`)
3. Vercel te dará registros DNS para configurar en tu proveedor de dominio
4. Una vez configurado, el SSL/HTTPS es automático y gratuito

---

## Paso 5: Actualizaciones futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Vercel detectará el push y redesplegará automáticamente en 30-60 segundos.

---

## Configurar el formulario para recibir datos reales

El formulario actual envía los datos por WhatsApp. Para recibir datos por correo o base de datos, puedes usar:

- **Formspree** (https://formspree.io) — Gratis hasta 50 envíos/mes
- **Google Forms** — Gratis, vincula con Google Sheets
- **Airtable** — Base de datos visual, plan gratuito disponible

Para implementar Formspree, cambia en `IntakeForm`:
```jsx
// Reemplaza: action={handleSubmit}
// Por: action="https://formspree.io/f/TU_ID"
// Y cambia method a POST con fetch
```

---

## Variables de entorno (futuro)

Si agregas una pasarela de pago (Culqi, Mercado Pago), nunca pongas las claves directamente en el código. Usa variables de entorno en Vercel:

**Vercel → Project → Settings → Environment Variables**

```
VITE_CULQI_PUBLIC_KEY=pk_live_XXXXXXXXX
```

En el código: `import.meta.env.VITE_CULQI_PUBLIC_KEY`

---

## Notas importantes

- La foto del doctor (`public/dr-guevara.png`) ya está incluida y se desplegará automáticamente
- El sitio es completamente estático — no necesita servidor ni base de datos para funcionar
- El plan gratuito de Vercel incluye 100GB de ancho de banda/mes, más que suficiente para empezar
- Vercel también provee analytics básicos gratuitos
