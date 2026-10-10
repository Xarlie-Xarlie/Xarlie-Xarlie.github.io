// CharlieCharlie dev page — vanilla JS only.
(function () {
  "use strict";

  // ---- Static fallback data (curated from github.com/Xarlie-Xarlie) ----
  var FALLBACK = [
    { name: "algostrix", lang: "Elixir", desc: "Elixir + Phoenix app — algorithms / platform experiment with JS + HTML front.", desc_pt: "App em Elixir + Phoenix — experimento de algoritmos/plataforma com front em JS + HTML.", url: "https://github.com/Xarlie-Xarlie/algostrix" },
    { name: "quebradobank", lang: "Elixir", desc: "Simple, clean Elixir/Phoenix API app — banking domain, good example of my API style.", desc_pt: "App de API em Elixir/Phoenix, simples e limpa — domínio bancário, bom exemplo do meu estilo de API.", url: "https://github.com/Xarlie-Xarlie/quebradobank" },
    { name: "vex", lang: "Elixir", desc: "Elixir backend with JS/HTML front — full-stack playground.", desc_pt: "Backend em Elixir com front em JS/HTML — playground full-stack.", url: "https://github.com/Xarlie-Xarlie/vex" },
    { name: "absinthe-graphql", lang: "Elixir", desc: "GraphQL in Elixir with Absinthe — schemas, resolvers, queries.", desc_pt: "GraphQL em Elixir com Absinthe — schemas, resolvers, queries.", url: "https://github.com/Xarlie-Xarlie/absinthe-graphql" },
    { name: "weather-api", lang: "Elixir", desc: "Elixir weather API — external API consumption, clean endpoints.", desc_pt: "API de clima em Elixir — consumo de API externa, endpoints limpos.", url: "https://github.com/Xarlie-Xarlie/weather-api" },
    { name: "rinhabackend", lang: "Elixir", desc: "Rinha de Backend challenge in Elixir — throughput, concurrency, Docker.", desc_pt: "Desafio Rinha de Backend em Elixir — throughput, concorrência, Docker.", url: "https://github.com/Xarlie-Xarlie/rinhabackend" },
    { name: "whatsapp-meme-downloader", lang: "JavaScript", desc: "JS tooling + Docker — fun automation around WhatsApp media.", desc_pt: "Ferramentas em JS + Docker — automação divertida com mídias do WhatsApp.", url: "https://github.com/Xarlie-Xarlie/whatsapp-meme-downloader" },
    { name: "corenotes", lang: "JavaScript", desc: "JavaScript notes app — frontend + logic in vanilla JS.", desc_pt: "App de notas em JavaScript — frontend + lógica em JS puro.", url: "https://github.com/Xarlie-Xarlie/corenotes" },
    { name: "bingo", lang: "TypeScript", desc: "TypeScript bingo game — small typed frontend project.", desc_pt: "Jogo de bingo em TypeScript — pequeno projeto frontend tipado.", url: "https://github.com/Xarlie-Xarlie/bingo" }
  ];

  // ---- i18n dictionary (keys match data-i18n / data-i18n-html in index.html) ----
  var I18N = {
    en: {
      title: "CharlieCharlie — Software Engineer",
      meta_desc: "CharlieCharlie (Xarlie-Xarlie) — Software Engineer focused on Elixir, Phoenix, GraphQL and integrations. Currently at Isaac, previously Cross Commerce Store and UFMA (ML).",
      nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_experience: "Experience", nav_contact: "Contact",
      hero_eyebrow: '<span class="dot"></span> Available for interesting backend work',
      hero_h1: 'Hi, I\'m <span class="accent">CharlieCharlie</span>.<br />Software Engineer.',
      hero_lede: 'I build APIs and backend systems with <strong>Elixir&nbsp;&amp;&nbsp;Phoenix</strong>, GraphQL, and JavaScript/TypeScript. Currently Software Engineer at <strong>Isaac</strong> (remote, São Paulo), previously <strong>Cross Commerce Store</strong> and ML research at <strong>UFMA</strong>.',
      cta_projects: "View projects",
      stat_repos: "public repos", stat_elixir: "yrs shipping Elixir", stat_followers: "followers",
      card_em1: "Isaac · daily driver", card_em2: "ERP · payments", card_em3: "background jobs", card_em4: "ship & persist",
      about_title: "Backend-first, pragmatic, allergic to over-engineering.",
      about_p1: 'I\'m Jean Charles — online as <strong>CharlieCharlie / Xarlie-Xarlie</strong>. I\'m a Software Engineer at <strong>Isaac</strong>, where I architect and evolve scalable backend and integration solutions: flexible <strong>GraphQL and REST APIs</strong> connecting Isaac to ERPs and payment providers, plus real-time integrations and high-traffic frontends. I care about reliability — refactoring legacy, expanding test coverage, and holding a high bar in code review.',
      about_p2: 'My public work leans Elixir (Phoenix APIs, Absinthe GraphQL, high-throughput experiments like <code>rinhabackend</code>), with JavaScript/TypeScript on the side (bots, tooling, small frontends). I also live in the terminal — Neovim, Lua configs, Docker.',
      skills_title: "What I work with", skills_g1: "Core backend", skills_g3: "Ops & workflow",
      projects_title: "Selected repos",
      projects_sub: 'Curated from <a href="https://github.com/Xarlie-Xarlie?tab=repositories" target="_blank" rel="noopener">github.com/Xarlie-Xarlie</a>. Star counts update live via the GitHub API when online.',
      filter_all: "All",
      projects_more: '…plus configs (<a href="https://github.com/Xarlie-Xarlie/nvim" target="_blank" rel="noopener">nvim</a>, <a href="https://github.com/Xarlie-Xarlie/lunarvim" target="_blank" rel="noopener">lunarvim</a>) and experiments. Full list on GitHub.',
      exp_title: "Where I've been",
      exp1t: 'Software Engineer — Isaac <span class="muted">· Oct 2024 — Present · Remote</span>',
      exp1d: "Architecting scalable backend and integration flows: flexible GraphQL/REST APIs linking Isaac to ERPs and payment providers, real-time integrations, resilient error handling and validation. Refactored legacy, grew automated test coverage, championed review standards.",
      exp2t: 'Software Engineer (Backend) — Cross Commerce Store <span class="muted">· Jan 2022 — Dec 2023 · Remote</span>',
      exp2d: "Marketplace integrations across Brazilian platforms, RabbitMQ background processing at high request rates, Linux VM/container infra, DB tuning, Kibana monitoring. Led code-quality initiatives — faster, cleaner, better documented.",
      exp3t: 'Machine Learning Engineer — UFMA / LACMOR <span class="muted">· Feb 2021 — Oct 2021 · Remote</span>',
      exp3d: "Deep neural nets for phoneme recognition in speech: FFT feature engineering, stacked autoencoders in TensorFlow/Keras (50% phoneme-grouping accuracy), custom training framework with mid-training layer insertion.",
      exp4t: "Open source &amp; experiments — @Xarlie-Xarlie",
      exp4d: 'Phoenix APIs (<code>quebradobank</code>, <code>weather-api</code>), GraphQL with Absinthe, throughput challenges (<code>rinhabackend</code>), JS bots &amp; tooling.',
      contact_title: "Let's talk.",
      contact_p: "No forms, no spam — just links. Fastest way to reach me is LinkedIn or a GitHub discussion/issue.",
      footer_built: "Built with plain HTML/CSS/JS · Hosted on GitHub Pages",
      footer_top: "Back to top ↑",
      view_repo: "View repo ↗", updated: "updated ", no_projects: "No projects for this filter.",
      fallback_desc: "Source code on GitHub."
    },
    pt: {
      title: "CharlieCharlie — Engenheiro de Software",
      meta_desc: "CharlieCharlie (Xarlie-Xarlie) — Engenheiro de Software focado em Elixir, Phoenix, GraphQL e integrações. Atualmente na Isaac, antes Cross Commerce Store e UFMA (ML).",
      nav_about: "Sobre", nav_skills: "Habilidades", nav_projects: "Projetos", nav_experience: "Experiência", nav_contact: "Contato",
      hero_eyebrow: '<span class="dot"></span> Disponível para trabalhos backend interessantes',
      hero_h1: 'Olá, eu sou <span class="accent">CharlieCharlie</span>.<br />Engenheiro de Software.',
      hero_lede: 'Construo APIs e sistemas backend com <strong>Elixir&nbsp;&amp;&nbsp;Phoenix</strong>, GraphQL e JavaScript/TypeScript. Atualmente Engenheiro de Software na <strong>Isaac</strong> (remoto, São Paulo), anteriormente na <strong>Cross Commerce Store</strong> e pesquisa em ML na <strong>UFMA</strong>.',
      cta_projects: "Ver projetos",
      stat_repos: "repos públicos", stat_elixir: "anos com Elixir", stat_followers: "seguidores",
      card_em1: "Isaac · dia a dia", card_em2: "ERP · pagamentos", card_em3: "jobs em background", card_em4: "deploy & dados",
      about_title: "Backend em primeiro lugar, pragmático, alérgico a over-engineering.",
      about_p1: 'Sou Jean Charles — online como <strong>CharlieCharlie / Xarlie-Xarlie</strong>. Sou Engenheiro de Software na <strong>Isaac</strong>, onde arquiteto e evoluo soluções escaláveis de backend e integrações: <strong>APIs GraphQL e REST</strong> flexíveis conectando a Isaac a ERPs e meios de pagamento, além de integrações em tempo real e frontends de alto tráfego. Prezo pela confiabilidade — refatoração de legado, ampliação de testes automatizados e alto padrão em code review.',
      about_p2: 'Meu trabalho público é majoritariamente Elixir (APIs Phoenix, GraphQL com Absinthe, experimentos de alta vazão como <code>rinhabackend</code>), com JavaScript/TypeScript ao lado (bots, ferramentas, pequenos frontends). Também vivo no terminal — Neovim, configs em Lua, Docker.',
      skills_title: "Com o que trabalho", skills_g1: "Backend principal", skills_g3: "Ops & fluxo de trabalho",
      projects_title: "Repos selecionados",
      projects_sub: 'Curadoria de <a href="https://github.com/Xarlie-Xarlie?tab=repositories" target="_blank" rel="noopener">github.com/Xarlie-Xarlie</a>. As estrelas atualizam ao vivo via API do GitHub quando há conexão.',
      filter_all: "Todos",
      projects_more: '…além de configs (<a href="https://github.com/Xarlie-Xarlie/nvim" target="_blank" rel="noopener">nvim</a>, <a href="https://github.com/Xarlie-Xarlie/lunarvim" target="_blank" rel="noopener">lunarvim</a>) e experimentos. Lista completa no GitHub.',
      exp_title: "Por onde passei",
      exp1t: 'Engenheiro de Software — Isaac <span class="muted">· Out 2024 — Presente · Remoto</span>',
      exp1d: "Arquitetura e evolução de fluxos escaláveis de backend e integrações: APIs GraphQL/REST flexíveis ligando a Isaac a ERPs e meios de pagamento, integrações em tempo real, tratamento de erros resiliente e validação. Refatorei legado, ampliei cobertura de testes automatizados e defendi padrões de revisão.",
      exp2t: 'Engenheiro de Software (Backend) — Cross Commerce Store <span class="muted">· Jan 2022 — Dez 2023 · Remoto</span>',
      exp2d: "Integrações com marketplaces brasileiros, processamento em background com RabbitMQ sob altas taxas de requisição, infra com VMs Linux/conteineres, tuning de banco, monitoramento com Kibana. Liderei iniciativas de qualidade de código — mais rápido, limpo e documentado.",
      exp3t: 'Engenheiro de Machine Learning — UFMA / LACMOR <span class="muted">· Fev 2021 — Out 2021 · Remoto</span>',
      exp3d: "Redes neurais profundas para reconhecimento de fonemas em fala: engenharia de atributos com FFT, autoencoders empilhados em TensorFlow/Keras (50% de acurácia no agrupamento de fonemas), framework de treino customizado com inserção de camadas no meio do treino.",
      exp4t: "Open source &amp; experimentos — @Xarlie-Xarlie",
      exp4d: 'APIs Phoenix (<code>quebradobank</code>, <code>weather-api</code>), GraphQL com Absinthe, desafios de throughput (<code>rinhabackend</code>), bots e ferramentas em JS.',
      contact_title: "Vamos conversar.",
      contact_p: "Sem formulários, sem spam — só links. A forma mais rápida de falar comigo é pelo LinkedIn ou por uma issue no GitHub.",
      footer_built: "Feito com HTML/CSS/JS puro · Hospedado no GitHub Pages",
      footer_top: "Voltar ao topo ↑",
      view_repo: "Ver repo ↗", updated: "atualizado em ", no_projects: "Nenhum projeto para este filtro.",
      fallback_desc: "Código-fonte no GitHub."
    }
  };

  var grid = document.getElementById("projectsGrid");
  var activeFilter = "all";
  var lang = "en";
  try {
    lang = localStorage.getItem("cc-lang") ||
      (((navigator.language || "").toLowerCase().indexOf("pt") === 0) ? "pt" : "en");
  } catch (e) { lang = "en"; }
  if (lang !== "pt") lang = "en";

  function normalizeLang(l) {
    if (!l) return "Other";
    if (l === "JavaScript") return "JavaScript";
    if (l === "TypeScript") return "TypeScript";
    if (l === "Elixir") return "Elixir";
    if (l === "Lua") return "Lua";
    return l;
  }

  function matchesFilter(l) {
    if (activeFilter === "all") return true;
    return normalizeLang(l) === activeFilter;
  }

  function displayDesc(p) {
    if (lang === "pt") return p.desc_pt || p.desc || I18N.pt.fallback_desc;
    return p.desc || I18N.en.fallback_desc;
  }

  function cardHTML(p) {
    var d = I18N[lang];
    var stars = (p.stars != null) ? "★ " + p.stars : "★ —";
    var updated = p.updated
      ? new Date(p.updated).toLocaleDateString(lang === "pt" ? "pt-BR" : undefined)
      : "";
    return (
      '<article class="proj" data-lang="' + normalizeLang(p.lang) + '">' +
        '<div class="proj-top"><span class="lang">' + (p.lang || "Other") + '</span>' +
        '<span class="stars">' + stars + "</span></div>" +
        '<h3><a href="' + p.url + '" target="_blank" rel="noopener">' + p.name + "</a></h3>" +
        "<p>" + displayDesc(p) + "</p>" +
        '<div class="proj-meta">' + (updated ? d.updated + updated : "") + "</div>" +
        '<a class="proj-link" href="' + p.url + '" target="_blank" rel="noopener">' + d.view_repo + "</a>" +
      "</article>"
    );
  }

  function render(list) {
    var visible = list.filter(function (p) { return matchesFilter(p.lang); });
    grid.innerHTML = visible.length
      ? visible.map(cardHTML).join("")
      : '<p class="muted">' + I18N[lang].no_projects + "</p>";
    requestAnimationFrame(function () {
      var cards = grid.querySelectorAll(".proj");
      cards.forEach(function (c, i) {
        setTimeout(function () { c.classList.add("visible"); }, 60 * i);
      });
    });
  }

  // Language toggle
  function applyLang(l) {
    lang = (l === "pt") ? "pt" : "en";
    var d = I18N[lang];
    document.documentElement.lang = (lang === "pt") ? "pt-BR" : "en";
    document.title = d.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", d.meta_desc);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (d[k] != null) el.innerHTML = d[k];
    });
    document.getElementById("langToggle").textContent = (lang === "pt") ? "EN" : "PT-BR";
    try { localStorage.setItem("cc-lang", lang); } catch (e) {}
    render(current);
  }

  document.getElementById("langToggle").addEventListener("click", function () {
    applyLang(lang === "pt" ? "en" : "pt");
  });

  // Filters
  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      render(current);
    });
  });

  var current = FALLBACK.slice();
  applyLang(lang);

  // Try live GitHub data to enrich stars + pick up new repos (graceful fallback).
  fetch("https://api.github.com/users/Xarlie-Xarlie/repos?per_page=100&sort=updated")
    .then(function (r) { if (!r.ok) throw new Error("gh api " + r.status); return r.json(); })
    .then(function (repos) {
      if (!Array.isArray(repos) || !repos.length) return;
      var keep = ["algostrix", "quebradobank", "vex", "absinthe-graphql", "weather-api",
        "rinhabackend", "whatsapp-meme-downloader", "corenotes", "bingo",
        "cross-commerce-challenge", "nvim", "lunarvim"];
      var live = repos
        .filter(function (r) { return keep.indexOf(r.name) !== -1 && !r.fork; })
        .map(function (r) {
          var fb = FALLBACK.find(function (f) { return f.name === r.name; });
          return {
            name: r.name,
            lang: r.language || (fb && fb.lang) || "Other",
            desc: r.description || (fb && fb.desc) || "",
            desc_pt: (fb && fb.desc_pt) || "",
            url: r.html_url,
            stars: r.stargazers_count,
            updated: r.updated_at
          };
        });
      // Preserve curated order, then append any extras.
      var ordered = [];
      FALLBACK.forEach(function (f) {
        var hit = live.find(function (l) { return l.name === f.name; });
        ordered.push(hit || f);
      });
      live.forEach(function (l) {
        if (!ordered.find(function (o) { return o.name === l.name; })) ordered.push(l);
      });
      current = ordered;
      render(current);
    })
    .catch(function () { /* offline / rate-limited: keep fallback */ });

  // Follower count (non-critical).
  fetch("https://api.github.com/users/Xarlie-Xarlie")
    .then(function (r) { return r.json(); })
    .then(function (u) {
      if (u.public_repos != null) document.getElementById("statRepos").textContent = u.public_repos;
      if (u.followers != null) document.getElementById("statFollowers").textContent = u.followers;
    })
    .catch(function () {});

  // Typing effect
  var phrases = [
    "mix phx.new my_api --no-html",
    "absinthe: field :user, :user do resolve &Resolvers.get_user/3 end",
    "docker compose up --build"
  ];
  var typedEl = document.getElementById("typed");
  var pi = 0, ci = 0, deleting = false;
  function tick() {
    var full = phrases[pi];
    ci += deleting ? -1 : 1;
    typedEl.textContent = full.slice(0, ci);
    var delay = deleting ? 28 : 55;
    if (!deleting && ci === full.length) { delay = 1400; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    setTimeout(tick, delay);
  }
  tick();

  // Mobile nav
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { links.classList.remove("open"); });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
