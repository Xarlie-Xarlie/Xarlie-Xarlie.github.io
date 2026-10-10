// CharlieCharlie dev page — vanilla JS only.
(function () {
  "use strict";

  // ---- Static fallback data (curated from github.com/Xarlie-Xarlie) ----
  var FALLBACK = [
    { name: "algostrix", lang: "Elixir", desc: "Elixir + Phoenix app — algorithms / platform experiment with JS + HTML front.", url: "https://github.com/Xarlie-Xarlie/algostrix" },
    { name: "quebradobank", lang: "Elixir", desc: "Simple, clean Elixir/Phoenix API app — banking domain, good example of my API style.", url: "https://github.com/Xarlie-Xarlie/quebradobank" },
    { name: "vex", lang: "Elixir", desc: "Elixir backend with JS/HTML front — full-stack playground.", url: "https://github.com/Xarlie-Xarlie/vex" },
    { name: "absinthe-graphql", lang: "Elixir", desc: "GraphQL in Elixir with Absinthe — schemas, resolvers, queries.", url: "https://github.com/Xarlie-Xarlie/absinthe-graphql" },
    { name: "weather-api", lang: "Elixir", desc: "Elixir weather API — external API consumption, clean endpoints.", url: "https://github.com/Xarlie-Xarlie/weather-api" },
    { name: "rinhabackend", lang: "Elixir", desc: "Rinha de Backend challenge in Elixir — throughput, concurrency, Docker.", url: "https://github.com/Xarlie-Xarlie/rinhabackend" },
    { name: "whatsapp-meme-downloader", lang: "JavaScript", desc: "JS tooling + Docker — fun automation around WhatsApp media.", url: "https://github.com/Xarlie-Xarlie/whatsapp-meme-downloader" },
    { name: "corenotes", lang: "JavaScript", desc: "JavaScript notes app — frontend + logic in vanilla JS.", url: "https://github.com/Xarlie-Xarlie/corenotes" },
    { name: "bingo", lang: "TypeScript", desc: "TypeScript bingo game — small typed frontend project.", url: "https://github.com/Xarlie-Xarlie/bingo" }
  ];

  var grid = document.getElementById("projectsGrid");
  var activeFilter = "all";

  function normalizeLang(l) {
    if (!l) return "Other";
    if (l === "JavaScript") return "JavaScript";
    if (l === "TypeScript") return "TypeScript";
    if (l === "Elixir") return "Elixir";
    if (l === "Lua") return "Lua";
    return l;
  }

  function matchesFilter(lang) {
    if (activeFilter === "all") return true;
    return normalizeLang(lang) === activeFilter;
  }

  function cardHTML(p) {
    var stars = (p.stars != null) ? "★ " + p.stars : "★ —";
    var updated = p.updated ? new Date(p.updated).toLocaleDateString() : "";
    return (
      '<article class="proj" data-lang="' + normalizeLang(p.lang) + '">' +
        '<div class="proj-top"><span class="lang">' + (p.lang || "Other") + '</span>' +
        '<span class="stars">' + stars + "</span></div>" +
        '<h3><a href="' + p.url + '" target="_blank" rel="noopener">' + p.name + "</a></h3>" +
        "<p>" + (p.desc || "Source code on GitHub.") + "</p>" +
        '<div class="proj-meta">' + (updated ? "updated " + updated : "") + "</div>" +
        '<a class="proj-link" href="' + p.url + '" target="_blank" rel="noopener">View repo ↗</a>' +
      "</article>"
    );
  }

  function render(list) {
    var visible = list.filter(function (p) { return matchesFilter(p.lang); });
    grid.innerHTML = visible.length
      ? visible.map(cardHTML).join("")
      : '<p class="muted">No projects for this filter.</p>';
    requestAnimationFrame(function () {
      var cards = grid.querySelectorAll(".proj");
      cards.forEach(function (c, i) {
        setTimeout(function () { c.classList.add("visible"); }, 60 * i);
      });
    });
  }

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
  render(current);

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
