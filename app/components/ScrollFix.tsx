'use client';

import { useEffect } from 'react';

export default function ScrollFix() {
  useEffect(() => {
    // 1. Tenta avisar ao navegador para não restaurar a posição anterior
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. O truque do setTimeout(0):
    // Isso força o scroll para o topo DEPOIS que o navegador terminar
    // de tentar pular para o #id da URL.
    const timer = setTimeout(() => {
      // Usamos 'instant' para ignorar qualquer animação de scroll-smooth do CSS
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      
      // 3. Limpa a URL: Remove o "#participe" para que o próximo recarregamento 
      // não tenha uma âncora como destino.
      if (window.location.hash) {
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, '', cleanUrl);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return null;
}