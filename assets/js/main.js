document.addEventListener("DOMContentLoaded", () => {
  const clock = document.getElementById("taskbar-clock");
  if (!clock) return;

  const tick = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}`;
  };

  tick();
  setInterval(tick, 10_000);
});