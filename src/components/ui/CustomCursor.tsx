import React, { useEffect, useRef } from 'react';

export const CustomCursor = React.memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!pointerQuery.matches) return;

    const cursor = cursorRef.current;
    const wave = waveRef.current;
    const label = labelRef.current;
    if (!cursor || !wave || !label) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointerX = 0;
    let pointerY = 0;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let animationFrame = 0;
    let waveAnimation: Animation | undefined;

    const renderCursor = () => {
      cursorX += (pointerX - cursorX) * (reducedMotion ? 1 : 0.2);
      cursorY += (pointerY - cursorY) * (reducedMotion ? 1 : 0.2);
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

      if (!reducedMotion && (Math.abs(pointerX - cursorX) > 0.2 || Math.abs(pointerY - cursorY) > 0.2)) {
        animationFrame = window.requestAnimationFrame(renderCursor);
      } else {
        animationFrame = 0;
      }
    };

    const pulse = () => {
      if (reducedMotion) return;
      waveAnimation?.cancel();
      waveAnimation = wave.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.35)', opacity: 0.72 },
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
        ],
        { duration: 560, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      const target = event.target instanceof Element ? event.target : null;
      const projectTarget = target?.closest(
        '#projects .projects-showcase-preview, #projects .projects-showcase-image, #projects img, #projects .projects-showcase-item',
      );
      const interactiveTarget = target?.closest('a, button, [role="button"]');
      const textTarget = target?.closest(
        'input, textarea, select, [contenteditable="true"], p, h1, h2, h3, h4, h5, h6, label, li, blockquote',
      );
      let hoverLabel = '';
      let mode = 'default';

      if (projectTarget) {
        mode = 'interactive';
        hoverLabel = 'VIEW';
      } else if (interactiveTarget) {
        mode = 'interactive';
        hoverLabel = interactiveTarget.matches('button[type="submit"]') ? 'SEND' : 'OPEN';
      } else if (textTarget) {
        mode = 'text';
      }

      if (cursor.dataset.mode !== mode && mode === 'interactive') {
        pulse();
      }
      cursor.dataset.mode = mode;
      if (mode === 'text') {
        document.documentElement.dataset.portfolioCursorText = 'true';
      } else {
        delete document.documentElement.dataset.portfolioCursorText;
      }

      label.textContent = hoverLabel;
      cursor.classList.add('is-visible');
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderCursor);
      }
    };

    const handlePointerDown = () => {
      cursor.classList.add('is-pressed');
      pulse();
    };

    const handlePointerUp = () => {
      cursor.classList.remove('is-pressed');
    };

    const handlePointerLeave = () => {
      cursor.classList.remove('is-visible');
      cursor.classList.remove('is-pressed');
      delete document.documentElement.dataset.portfolioCursorText;
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      waveAnimation?.cancel();
      delete document.documentElement.dataset.portfolioCursorText;
    };
  }, []);

  return (
    <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true" data-mode="default">
      <span ref={waveRef} className="portfolio-cursor-wave" />
      <span className="portfolio-cursor-dot" />
      <span ref={labelRef} className="portfolio-cursor-label" />
    </div>
  );
});
