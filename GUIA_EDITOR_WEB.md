# 📘 Guía de Transferencia de Conocimiento

## Proyecto: Editor Web en Vivo (HTML/CSS/JS)

Esta guía explica detalladamente cómo se desarrolló el editor web en vivo, abordando cada archivo involucrado (`index.html`, `style.css`, `script.js`) y enfocándose especialmente en el archivo JavaScript, que contiene la lógica principal del proyecto.

---

## 🔧 Estructura General del Proyecto

```
editor-web/
├── index.html    # Interfaz principal del editor
├── style.css     # Estilos y diseño de columnas redimensionables
├── script.js     # Lógica del editor (resizable, preview, proyectos, consola, etc.)
├── README.md     # Descripción del proyecto
```

---

## 1️⃣ index.html

### Objetivo:
Proporciona la estructura visual del editor con áreas para HTML, CSS, JS, vista previa y herramientas.

### Componentes clave:

- `<textarea>` para código HTML, CSS y JavaScript.
- `<iframe>` con `id="preview"` para mostrar el resultado en vivo.
- Barra superior con botones: guardar, cargar, importar, exportar, cambiar tema, compartir.
- `<select>` para elegir proyectos guardados.
- `<div id="console">` para mostrar `console.log()` del iframe.

---

## 2️⃣ style.css

### Objetivo:
Define el diseño visual y responsivo del editor.

### Características principales:

- `display: flex;` para distribuir las columnas de forma horizontal.
- `.resizer`: permite redimensionar columnas arrastrando los bordes.
- `.dark`: modo oscuro alternativo mediante `classList`.
- Barras de desplazamiento personalizadas y colores suaves.

---

## 3️⃣ script.js

### Objetivo:
Implementa toda la lógica del editor. Se divide en múltiples secciones.

---

### 🔄 Redimensionamiento de columnas

```js
resizer.addEventListener("mousedown", e => {
  // Guarda posición inicial y tamaños
  // Añade listeners para 'mousemove' y 'mouseup'
});
```

- Usa `mousedown`, `mousemove` y `mouseup` para detectar arrastre del divisor (`.resizer`) entre columnas.
- Calcula los nuevos tamaños de los paneles izquierdo y derecho al mover el mouse.
- Desactiva el movimiento cuando se suelta el botón.

---

### 🖼️ Vista previa en vivo

```js
function updatePreview() {
  const html = ..., css = ..., js = ...;
  const code = `<html>...<style>${css}</style>...<script>${js}</script></html>`;
  previewFrame.srcdoc = code;
}
```

- Toma el contenido de los tres editores.
- Crea un HTML completo con CSS en `<style>` y JS en `<script>`.
- Asigna al `iframe.srcdoc` para renderizar el resultado.
- Actualiza automáticamente en cada `input`.

---

### 🧪 Captura de consola

```js
console.log = (...args) => {
  window.parent.postMessage({ type: 'log', data: args.join(' ') }, '*');
};
```

- Redefine `console.log` dentro del `iframe`.
- Usa `postMessage` para enviar los logs al editor padre.
- Escucha con `window.addEventListener("message", ...)` y los muestra en un `<div>`.

---

### 🌙 Modo oscuro/claro

```js
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", ...);
}
```

- Cambia la clase `dark` del `<body>`.
- Guarda la preferencia en `localStorage`.

---

### 💾 Guardar y cargar proyectos

```js
function saveProject() { ... }
function loadProject(name) { ... }
function loadProjectList() { ... }
```

- Guarda los valores de los tres editores en `localStorage`.
- Carga un proyecto al seleccionarlo.
- Lista todos los proyectos guardados para elegirlos.

---

### 📤 Exportar e importar

```js
function exportCode() { ... }
function handleImportFile(e) { ... }
```

- Convierte los datos del editor a JSON y los descarga.
- Lee archivos `.json` para importar proyectos guardados.

---

### 🔗 Compartir código por URL

```js
function shareCode() {
  const html = encodeURIComponent(...);
  const url = `?html=${html}&css=...&js=...`;
}
```

- Crea una URL con los contenidos codificados.
- Puede ser copiada y compartida para cargar el proyecto por enlace.

---

### 📐 Medir vista previa

- Se añade un elemento en la barra superior para mostrar en vivo el ancho y alto del `iframe.preview`.

```js
const observer = new ResizeObserver(entries => {
  const { width, height } = entries[0].contentRect;
  document.getElementById("previewSize").textContent = `${width}×${height}`;
});
observer.observe(document.getElementById("preview"));
```

---

## ✅ Conclusión

Este proyecto combina conocimientos de:

- HTML: estructura de páginas web
- CSS: diseño visual, flexbox, dark mode
- JavaScript: DOM, eventos, almacenamiento local, iframe, comunicación entre ventanas

Es ideal para enseñar cómo crear herramientas web interactivas desde cero, usando tecnologías estándar sin frameworks.

---

## ✍️ Autor

Guía creada por **Álvaro Cortés Téllez**  
Para uso educativo y extensión del conocimiento entre estudiantes y desarrolladores.
