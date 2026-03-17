# MAGNA Microsite - Morelli Premium Kitchen

## Descripción
Landing page premium para la línea MAGNA de Morelli. Concepto: "Silenciosamente Imponente".

## Tech Stack
- **Frontend**: React + Tailwind CSS + Framer Motion + Shadcn UI
- **Formulario**: Formspree (envío directo a email)
- **Idiomas**: Español, Portugués, Inglés

## Deploy

### Railway
1. Conectá tu repo de GitHub a Railway
2. Seleccioná la carpeta `/frontend`
3. Railway detectará automáticamente el proyecto React
4. ¡Listo! No necesita variables de entorno

### Vercel
1. Importá el repo desde GitHub
2. Configurá el Root Directory como `frontend`
3. Deploy automático

### Netlify
1. Conectá el repo de GitHub
2. Build command: `yarn build`
3. Publish directory: `frontend/build`

## Configuración del Formulario

El formulario usa Formspree. Para cambiar el email de destino:
1. Andá a [formspree.io](https://formspree.io)
2. Creá una cuenta y un nuevo form
3. Reemplazá el ID en `ContactSection.jsx`:
   ```js
   fetch('https://formspree.io/f/TU_FORM_ID', {
   ```

## Desarrollo Local

```bash
cd frontend
yarn install
yarn start
```

## Estructura
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ManifestoSection.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── SpecsSection.jsx
│   │   ├── GallerySection.jsx
│   │   ├── ContactSection.jsx
│   │   └── Footer.jsx
│   ├── translations.js
│   └── App.js
└── package.json
```

## Funcionalidades
- Hero con video aleatorio
- Manifiesto de marca
- Showcase de productos MAGNA 1200 y MAGNA 900
- Especificaciones técnicas con tabs
- Galería con hover mostrando modelo
- Formulario de contacto (Formspree → email)
- Selector de idioma (ES/PT/EN)
