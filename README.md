# 🌸 Flower Shop - Frontend

## 📝 Descripción del proyecto

Este es el frontend de **Flower Shop**, una aplicación web donde los usuarios pueden comprar flores de forma sencilla y rápida. El diseño es amigable y responsivo, pensado para brindar la mejor experiencia de usuario tanto en desktop como en móvil.

---

## 🛠️ Lenguajes y herramientas utilizadas

### 🧑‍💻 Lenguaje

- TypeScript

### 🧰 Herramientas y tecnologías

- Next.js
- Bootstrap
- Figma (diseño de interfaz)

---

## 🚀 Instrucciones de uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/flower-shop-frontend.git
   cd flower-shop-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador y entra a:

   [http://localhost:3000](http://localhost:3000)

---

## 🌐 Instrucciones de despliegue en GitHub Pages

Si quieres desplegar este proyecto en GitHub Pages, sigue estos pasos:

1. Asegúrate de tener el repositorio en GitHub y de haber hecho commit de todos tus cambios.
2. Instala la dependencia `gh-pages` si no la tienes:

   ```bash
   npm install --save gh-pages
   ```

3. En tu `package.json`, agrega los siguientes scripts:

   ```json
   "scripts": {
     "predeploy": "next build && next export",
     "deploy": "gh-pages -d out"
   }
   ```

4. Asegúrate de que en tu `next.config.js` o `next.config.ts` esté configurado el `output: 'export'` y el `basePath`/`assetPrefix` si tu repositorio no está en la raíz.

5. Ejecuta:

   ```bash
   npm run deploy
   ```

6. Ve a la configuración de tu repositorio en GitHub y en la sección de Pages selecciona la rama `gh-pages` y la carpeta `/` como fuente.

7. ¡Listo! Tu sitio estará disponible en `https://tu-usuario.github.io/flower-shop-frontend/`

---

## 📚 Recursos útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Guía de exportación estática de Next.js](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Guía de GitHub Pages](https://pages.github.com/)
- [Bootstrap](https://getbootstrap.com/)

---

Si tienes sugerencias, dudas o encuentras algún bug, ¡no dudes en abrir un issue o un pull request! Gracias por visitar este proyecto.
