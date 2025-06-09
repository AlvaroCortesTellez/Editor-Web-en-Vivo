# 🖥️ Editor Web en Vivo

Un editor web interactivo para escribir y probar código **HTML, CSS y JavaScript** en tiempo real. Inspirado en la interfaz de W3Schools, con funcionalidades modernas como proyectos guardables, modo oscuro, importación/exportación y vista previa dinámica.

---

## ✨ Características

- 🔤 **Edición en columnas redimensionables** (HTML, CSS, JS, Vista previa)
- 🌙 **Modo claro/oscuro** con preferencia guardada en localStorage
- 🔃 **Vista previa en vivo** actualizada al instante mientras escribes
- 💾 **Gestión de proyectos locales** con múltiples pestañas
- 📤 **Exportación e importación de proyectos** como archivos `.json`
- 🔗 **Compartir código vía enlace URL**
- 🪟 **Consola integrada** para mostrar logs de `console.log()`
- 📏 **Indicador en tiempo real** del tamaño en píxeles de la vista previa

---

## 🚀 Cómo usar

1. Abre el proyecto en tu navegador (archivo `index.html`)
2. Escribe código en las áreas de HTML, CSS o JavaScript
3. La vista previa se actualizará automáticamente
4. Usa la barra superior para:
   - Cambiar el tema
   - Guardar o cargar proyectos
   - Importar desde archivo `.json`
   - Exportar el proyecto actual
   - Compartir el código con un enlace

---

## 📁 Estructura del proyecto

```
editor-web/
├── index.html       # Página principal del editor
├── style.css        # Estilos (modo oscuro, diseño de columnas, etc.)
├── script.js        # Lógica del editor: eventos, vista previa, almacenamiento
└── README.md        # Este archivo
```

---

## 🛠️ Requisitos

Este proyecto no requiere instalación ni dependencias externas. Simplemente abre `index.html` en un navegador moderno como Chrome, Firefox o Edge.

---

## 🎥 Video de demostración

Mira este video para una presentación completa del editor, explicación de su funcionamiento y un ejemplo práctico:

[Ver en YouTube](https://youtu.be/_bThy6UrTyg)

## 📎 Ejemplo de uso

Puedes cargar este enlace compartido para ver un código guardado:

```
https://tusitio.com/editor.html?html=<h1>Hola</h1>&css=h1{color:red;}&js=console.log('Hola mundo');
```

---

## 🧑‍💻 Autor

Creado por **Álvaro Cortés Téllez**  
Inspirado en la experiencia de usuario de W3Schools, CodePen y JSFiddle.
