/** Decorative loop: equal repeated groups wrap without a visible seam. */
export function startRibbonLoop(root: HTMLElement) {
  if (!("IntersectionObserver" in window)) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const tracks = Array.from(
    root.querySelectorAll<HTMLElement>(".ribbon-track"),
  );
  const phases = tracks.map((_, index) => index * 0.5);
  let widths = tracks.map(
    (track) => (track.firstElementChild as HTMLElement).offsetWidth,
  );
  const resize = new ResizeObserver(() => {
    widths = tracks.map(
      (track) => (track.firstElementChild as HTMLElement).offsetWidth,
    );
  });
  tracks.forEach((track) => resize.observe(track.firstElementChild!));
  let visible = false;
  let pageHidden = false;
  let frame = 0;
  let lastTime = 0;
  let lastScroll = scrollY;
  let impulse = 0;
  let delta = 0;
  const tick = (time: number) => {
    const seconds = Math.min((time - lastTime) / 1000, 0.064);
    lastTime = time;
    // Either scroll direction adds momentum; decay returns to the idle loop.
    impulse = Math.max(-600, Math.min(600, impulse + delta * 4));
    delta = 0;
    impulse *= Math.exp(-seconds * 5);
    tracks.forEach((track, index) => {
      const width = widths[index];
      if (!width) return;
      const direction = index === 0 ? 1 : -1;
      phases[index] =
        (((phases[index] + (direction * (34 + impulse) * seconds) / width) %
          1) +
          1) %
        1;
      track.style.transform = `translate3d(${-phases[index] * 50}%, 0, 0)`;
    });
    frame = requestAnimationFrame(tick);
  };
  const update = () => {
    const running =
      visible && !document.hidden && !pageHidden && !reduced.matches;
    root.dataset.running = String(running);
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = performance.now();
    lastScroll = scrollY;
    impulse = delta = 0;
    if (reduced.matches)
      tracks.forEach((track) => track.style.removeProperty("transform"));
    if (running) frame = requestAnimationFrame(tick);
  };
  const scroll = () => {
    if (frame) delta += scrollY - lastScroll;
    lastScroll = scrollY;
  };
  const hide = () => {
    pageHidden = true;
    update();
  };
  const show = () => {
    pageHidden = false;
    update();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  observer.observe(root);
  update();
  document.addEventListener("visibilitychange", update);
  reduced.addEventListener("change", update);
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("pagehide", hide);
  window.addEventListener("pageshow", show);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    resize.disconnect();
    document.removeEventListener("visibilitychange", update);
    reduced.removeEventListener("change", update);
    window.removeEventListener("scroll", scroll);
    window.removeEventListener("pagehide", hide);
    window.removeEventListener("pageshow", show);
    tracks.forEach((track) => track.style.removeProperty("transform"));
    delete root.dataset.running;
  };
}
