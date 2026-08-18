/* ============================================================
   SIMPUL. — script.js
   ============================================================ */

/* ---------- DATA PRODUK ---------- */
/* kategori[0] = jenis kelamin (pria/wanita), kategori[1] = jenis potongan */
const PRODUCTS = [
  {
    id: "p1",
    name: "Kemeja Linen Guntara",
    kategori: ["pria", "atasan"],
    harga: 285000,
    hargaCoret: null,
    warna: ["#E4DCC8", "#3C4A2C", "#7A6A50"],
    ukuran: ["S", "M", "L", "XL"],
    img: "https://picsum.photos/seed/simpul-p1/500/650"
  },
  {
    id: "p2",
    name: "Kulot Serat Bumi",
    kategori: ["wanita", "bawahan"],
    harga: 245000,
    hargaCoret: null,
    warna: ["#8A6A4C", "#26241C"],
    ukuran: ["S", "M", "L"],
    img: "https://picsum.photos/seed/simpul-p2/500/650"
  },
  {
    id: "p3",
    name: "Outer Rajut Sendu",
    kategori: ["wanita", "outerwear"],
    harga: 375000,
    hargaCoret: 430000,
    warna: ["#4A5D3A", "#C9BFA6"],
    ukuran: ["M", "L", "XL"],
    img: "https://picsum.photos/seed/simpul-p3/500/650"
  },
  {
    id: "p4",
    name: "Dress Simpul Senja",
    kategori: ["wanita", "dress"],
    harga: 320000,
    hargaCoret: 390000,
    warna: ["#B4707A", "#26241C"],
    ukuran: ["S", "M", "L"],
    img: "https://picsum.photos/seed/simpul-p4/500/650"
  },
  {
    id: "p5",
    name: "Celana Chino Rekat",
    kategori: ["pria", "bawahan"],
    harga: 265000,
    hargaCoret: null,
    warna: ["#26241C", "#7A6A50", "#3C4A2C"],
    ukuran: ["29", "30", "32", "34"],
    img: "https://picsum.photos/seed/simpul-p5/500/650"
  },
  {
    id: "p6",
    name: "Jaket Canvas Perantau",
    kategori: ["pria", "outerwear"],
    harga: 410000,
    hargaCoret: 465000,
    warna: ["#7A6A50", "#26241C"],
    ukuran: ["M", "L", "XL"],
    img: "https://picsum.photos/seed/simpul-p6/500/650"
  },
  {
    id: "p7",
    name: "Blus Katun Ranting",
    kategori: ["wanita", "atasan"],
    harga: 195000,
    hargaCoret: null,
    warna: ["#E4DCC8", "#B4707A", "#8A6A4C"],
    ukuran: ["S", "M", "L"],
    img: "https://picsum.photos/seed/simpul-p7/500/650"
  },
  {
    id: "p8",
    name: "Ikat Pinggang Kulit Kayu",
    kategori: ["pria", "aksesori"],
    harga: 135000,
    hargaCoret: null,
    warna: ["#3C2A1E"],
    ukuran: ["M", "L"],
    img: "https://picsum.photos/seed/simpul-p8/500/650"
  }
];

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
const WA_NUMBER = "6281234567890";

function waLinkForProduct(p){
  const msg = `Halo SIMPUL., saya mau pesan produk "${p.name}" (${rupiah(p.hargaCoret ? p.harga : p.harga)}). Apakah masih tersedia?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ---------- RENDER PRODUK ---------- */
const productGrid = document.getElementById("productGrid");

function renderProducts(filter){
  productGrid.innerHTML = "";
  const filtered = filter === "semua"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.kategori.includes(filter));

  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card reveal";

    card.innerHTML = `
      <div class="pc-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="pc-cat-tag">${p.kategori[1]}</span>
        ${p.hargaCoret ? `<span class="pc-discount">-${Math.round((1 - p.harga / p.hargaCoret) * 100)}%</span>` : ""}
      </div>
      <div class="pc-body">
        <h3 class="pc-name">${p.name}</h3>
        <div class="pc-price">
          <span class="now">${rupiah(p.harga)}</span>
          ${p.hargaCoret ? `<span class="old">${rupiah(p.hargaCoret)}</span>` : ""}
        </div>
        <div class="pc-swatches">
          ${p.warna.map(c => `<span class="swatch" style="background:${c}"></span>`).join("")}
        </div>
        <div class="pc-sizes">
          ${p.ukuran.map(s => `<span>${s}</span>`).join("")}
        </div>
        <a class="pc-cta" href="${waLinkForProduct(p)}" target="_blank" rel="noopener">Pesan via WhatsApp</a>
      </div>
    `;
    productGrid.appendChild(card);
  });

  requestAnimationFrame(observeReveal);
}

renderProducts("semua");

/* ---------- FILTER BAR ---------- */
const filterBar = document.getElementById("filterBar");
filterBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(btn.dataset.filter);
});

/* Kategori tile & split koleksi pria/wanita -> set filter lalu scroll (anchor sudah handle scroll) */
document.querySelectorAll("[data-filter]").forEach(el => {
  if (el.classList.contains("filter-btn")) return;
  el.addEventListener("click", () => {
    const target = el.dataset.filter;
    const targetBtn = filterBar.querySelector(`[data-filter="${target}"]`);
    filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (targetBtn) {
      targetBtn.classList.add("active");
      renderProducts(target);
    } else {
      filterBar.querySelector('[data-filter="semua"]').classList.add("active");
      renderProducts("semua");
    }
  });
});

/* ---------- NAVBAR: mobile toggle ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ---------- NAVBAR: active link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const id = entry.target.getAttribute("id");
      navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(sec => navObserver.observe(sec));

/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

/* ---------- COUNTDOWN PROMO (flash sale s.d. akhir hari) ---------- */
function updateCountdown(){
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999); // berakhir tengah malam hari ini
  let diff = end - now;
  if (diff < 0) diff = 0;

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById("cd-h").textContent = String(h).padStart(2, "0");
  document.getElementById("cd-m").textContent = String(m).padStart(2, "0");
  document.getElementById("cd-s").textContent = String(s).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- SCROLL REVEAL ---------- */
function observeReveal(){
  const revealEls = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

document.querySelectorAll(
  ".featured-card, .cat-tile, .testi-card, .kg-item, .g-item, .faq-item"
).forEach(el => el.classList.add("reveal"));

observeReveal();

/* ---------- NAVBAR shadow saat scroll ---------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 12 ? "0 4px 20px rgba(23,22,15,.08)" : "none";
});