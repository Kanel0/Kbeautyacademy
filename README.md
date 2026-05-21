# K Beauty Academy

Landing page pour **K Beauty Academy**, une école de formation en beauté spécialisée dans la prothésie ongulaire et la pose de cils.

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS 4** (via le plugin Vite `@tailwindcss/vite`)
- Déploiement via GitHub Pages (`.github/workflows/deploy.yml`)

## Scripts

```bash
npm run dev       # Lance le serveur de développement Vite
npm run build     # Compile TypeScript + build Vite
npm run preview   # Prévisualise le build en local
```

## Structure

- `src/Kbeautyacademy.tsx` — composant principal contenant toute l'interface (héros, formations, boutique, footer, etc.)
- `src/App.tsx` — point d'entrée React
- `src/main.tsx` — montage React
- `index.html` — template HTML (langue française)

## Fonctionnalités

- Animations au scroll (Intersection Observer)
- Compteurs animés
- Effet parallaxe sur les images
- Barre de progression de lecture
- Mise en page responsive
- Thème visuel rose/corail
