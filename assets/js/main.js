/**
 * main.js
 * - Injeta header e footer em todas as páginas
 * - Marca link ativo no menu
 * - Renderiza Projetos e Certificados usando window.PORTFOLIO_DATA
 */

/**
 * Detecta se estamos na raiz ou numa subpasta.
 * Isso é importante para montar links corretos e caminhos de assets.
 */
function getBasePath() {
  // Se a URL terminar com "/historico/" ou "/historico/index.html", etc.
  const path = window.location.pathname;

  // Se você estiver em / (raiz), base = "./"
  // Se estiver em /projetos/ (subpasta), base = "../"
  const isRoot =
    path.endsWith("/") && (path === "/" || path.split("/").filter(Boolean).length === 0);

  // Heurística simples: se estamos numa pasta (historico/projetos/...), base é "../"
  // Funciona bem para a estrutura proposta.
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return "./"; // raiz
  return "../";
}

function injectHeaderFooter() {
  const base = getBasePath();
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) {
    headerEl.innerHTML = `
      <header class="site-header">
        <nav class="nav" aria-label="Navegação principal">
          <a class="brand" href="${base}">
            <!-- TODO: Troque "SN" por suas iniciais ou seu nome curto -->
            <span>SN</span>
            <span>Portfólio</span>
          </a>

          <ul>
            <li><a data-nav href="${base}">Sobre</a></li>
            <li><a data-nav href="${base}historico/">Histórico</a></li>
            <li><a data-nav href="${base}projetos/">Projetos</a></li>
            <li><a data-nav href="${base}certificados/">Certificados</a></li>
            <li><a data-nav href="${base}contatos/">Contatos</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  if (footerEl) {
    const year = new Date().getFullYear();
    // TODO: Troque o texto do footer se quiser
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <span>© ${year} — Seu Nome</span>
          <span class="muted">Feito com HTML, CSS e JavaScript • GitHub Pages</span>
        </div>
      </footer>
    `;
  }

  setActiveNav();
}

function setActiveNav() {
  // Marca o link do menu como ativo baseado na URL atual
  const path = window.location.pathname;
  const links = document.querySelectorAll("a[data-nav]");

  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    // Considera ativo se o pathname "termina" com o caminho do link
    // (funciona para "/projetos/" etc.)
    const normalizedHref = href.replace("./", "/").replace("../", "/");
    const isActive =
      (normalizedHref === "/" && (path === "/" || path.endsWith("/index.html"))) ||
      (normalizedHref !== "/" && path.includes(normalizedHref.replace(/\/+$/, "/")));

    if (isActive) a.classList.add("active");
  });
}

/* =======================
   Render: Projetos
======================= */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const data = window.PORTFOLIO_DATA;
  const projects = data?.projects || [];

  if (projects.length === 0) {
    grid.innerHTML = `<p class="muted">Nenhum projeto cadastrado ainda.</p>`;
    return;
  }

  grid.innerHTML = projects
    .map((p) => {
      const techBadges = (p.tech || [])
        .map((t) => `<span class="badge">${t}</span>`)
        .join("");

      const repoLink = p.repoUrl
        ? `<a href="${p.repoUrl}" target="_blank" rel="noreferrer">Repositório</a>`
        : "";

      const liveLink = p.liveUrl
        ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer">Demo</a>`
        : "";

      const links = [repoLink, liveLink].filter(Boolean).join(`<span class="dot">•</span>`);

      return `
        <article class="card">
          <h3>${p.title}</h3>
          <p class="muted">${p.description || ""}</p>
          <div class="badges">${techBadges}</div>
          <div class="meta" style="margin-top: 10px;">
            ${links || `<span class="muted">Sem links ainda</span>`}
          </div>
        </article>
      `;
    })
    .join("");
}

/* =======================
   Render: Certificados
======================= */
function renderCertificates() {
  const grid = document.getElementById("certs-grid");
  if (!grid) return;

  const data = window.PORTFOLIO_DATA;
  const certs = data?.certificates || [];

  if (certs.length === 0) {
    grid.innerHTML = `<p class="muted">Nenhum certificado cadastrado ainda.</p>`;
    return;
  }

  grid.innerHTML = certs
    .map((c) => {
      const link = c.credentialUrl
        ? `<a href="${c.credentialUrl}" target="_blank" rel="noreferrer">Ver credencial</a>`
        : `<span class="muted">Sem link</span>`;

      return `
        <article class="card">
          <h3>${c.name}</h3>
          <div class="meta">
            <span>${c.issuer || "Instituição"}</span>
            <span class="dot">•</span>
            <span>${c.date || "Ano"}</span>
          </div>
          <div class="meta" style="margin-top: 10px;">
            ${link}
          </div>
        </article>
      `;
    })
    .join("");
}

/* =======================
   Init
======================= */
document.addEventListener("DOMContentLoaded", () => {
  injectHeaderFooter();
  renderProjects();
  renderCertificates();
});
