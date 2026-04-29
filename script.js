const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const notesBtn = document.querySelector("#notesBtn");
const counter = document.querySelector("#counter");
const progressBar = document.querySelector("#progressBar");
let current = 0;

function setAccent(slide) {
  const accentName = slide.dataset.accent || "green";
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${accentName}`)
    .trim();
  document.documentElement.style.setProperty("--accent", color);
}

function showSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === current);
    slide.setAttribute("aria-hidden", idx === current ? "false" : "true");
  });
  setAccent(slides[current]);
  counter.textContent = `${current + 1} / ${slides.length}`;
  progressBar.style.transform = `scaleX(${(current + 1) / slides.length})`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
  window.history.replaceState(null, "", `#${current + 1}`);
}

function go(delta) {
  showSlide(current + delta);
}

prevBtn.addEventListener("click", () => go(-1));
nextBtn.addEventListener("click", () => go(1));
notesBtn.addEventListener("click", () => {
  document.body.classList.toggle("hide-cues");
});

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    go(1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    go(-1);
  }
  if (event.key.toLowerCase() === "n") {
    document.body.classList.toggle("hide-cues");
  }
  if (event.key.toLowerCase() === "f" && document.fullscreenEnabled) {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }
});

const start = Number.parseInt(window.location.hash.replace("#", ""), 10);
showSlide(Number.isFinite(start) ? start - 1 : 0);
