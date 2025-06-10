let isResizing = false;
let currentResizer;
let startX;
let startWidthLeft;
let startWidthRight;

const resizers = document.querySelectorAll(".resizer");
resizers.forEach(resizer => {
  resizer.addEventListener("mousedown", e => {
    e.preventDefault();
    isResizing = true;
    currentResizer = resizer;
    const leftPanel = resizer.previousElementSibling;
    const rightPanel = resizer.nextElementSibling;
    startX = e.clientX;
    startWidthLeft = leftPanel.offsetWidth;
    startWidthRight = rightPanel.offsetWidth;

    function onMouseMove(e) {
      if (!isResizing) return;
      const dx = e.clientX - startX;
      leftPanel.style.flex = `0 0 ${startWidthLeft + dx}px`;
      rightPanel.style.flex = `0 0 ${startWidthRight - dx}px`;
    }

    function onMouseUp() {
      isResizing = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });
});

function updatePreview() {
  const html = document.getElementById("html").value;
  const css = document.getElementById("css").value;
  const js = document.getElementById("js").value;

  const code = `
    <html>
    <head><style>${css}</style></head>
    <body>
      ${html}
      <script>
        const log = console.log;
        console.log = (...args) => {
          window.parent.postMessage({ type: 'log', data: args.join(' ') }, '*');
          log(...args);
        };
        try {
          ${js}
        } catch (e) {
          console.error(e);
        }
      <\/script>
    </body>
    </html>
  `;

  const previewFrame = document.getElementById("preview");
  previewFrame.srcdoc = code;
  updatePreviewSize();
}

function updatePreviewSize() {
  const preview = document.getElementById("preview");
  const span = document.getElementById("previewSize");
  span.textContent = `📐 ${preview.offsetWidth}px × ${preview.offsetHeight}px`;
}

["html", "css", "js"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

window.addEventListener("message", (event) => {
  if (event.data.type === "log") {
    const consoleDiv = document.getElementById("console");
    consoleDiv.innerText += event.data.data + "\n";
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  }
});

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function saveProject() {
  const name = prompt("Nombre del proyecto:");
  if (name) {
    const project = {
      html: document.getElementById("html").value,
      css: document.getElementById("css").value,
      js: document.getElementById("js").value
    };
    localStorage.setItem("project_" + name, JSON.stringify(project));
    loadProjectList();
  }
}

function loadProject(name) {
  if (!name) return;
  const project = JSON.parse(localStorage.getItem("project_" + name));
  if (project) {
    document.getElementById("html").value = project.html;
    document.getElementById("css").value = project.css;
    document.getElementById("js").value = project.js;
    updatePreview();
  }
}

function loadProjectList() {
  const select = document.getElementById("projectSelect");
  select.innerHTML = '<option value="">Proyecto actual</option>';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("project_")) {
      const name = key.replace("project_", "");
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    }
  }
}

function exportCode() {
  const blob = new Blob([JSON.stringify({
    html: document.getElementById("html").value,
    css: document.getElementById("css").value,
    js: document.getElementById("js").value
  })], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "proyecto.json";
  a.click();
}

function handleImportFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    const data = JSON.parse(evt.target.result);
    document.getElementById("html").value = data.html || "";
    document.getElementById("css").value = data.css || "";
    document.getElementById("js").value = data.js || "";
    updatePreview();
  };
  if (file) reader.readAsText(file);
}

function clearStorage() {
  if (confirm("¿Borrar todos los proyectos?")) {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("project_")) localStorage.removeItem(k);
    });
    loadProjectList();
  }
}

function shareCode() {
  const html = encodeURIComponent(document.getElementById("html").value);
  const css = encodeURIComponent(document.getElementById("css").value);
  const js = encodeURIComponent(document.getElementById("js").value);
  const url = `${location.origin}${location.pathname}?html=${html}&css=${css}&js=${js}`;
  prompt("Copia este enlace para compartir:", url);
}

function loadFromURL() {
  const params = new URLSearchParams(location.search);
  if (params.has("html") || params.has("css") || params.has("js")) {
    document.getElementById("html").value = decodeURIComponent(params.get("html") || "");
    document.getElementById("css").value = decodeURIComponent(params.get("css") || "");
    document.getElementById("js").value = decodeURIComponent(params.get("js") || "");
    updatePreview();
  }
}

function formatCode() {
  document.getElementById("html").value = html_beautify(document.getElementById("html").value);
  document.getElementById("css").value = css_beautify(document.getElementById("css").value);
  document.getElementById("js").value = js_beautify(document.getElementById("js").value);
}

window.addEventListener("DOMContentLoaded", () => {
  loadProjectList();
  loadFromURL();
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
  updatePreview();
});
