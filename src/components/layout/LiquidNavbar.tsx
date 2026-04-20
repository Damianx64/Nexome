import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { id: "home", label: "Inicio", href: '/' },
  { id: "articles", label: "Artículos", href: '/articulos' },
  { id: "covers", label: "Portadas", href: '/portadas' },
];

export default function TopNavbar() {
  // Mantenemos tu lógica para leer la ruta actual al cargar
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const currentLink = navLinks.find(link => 
        link.href !== '/' ? currentPath.startsWith(link.href) : currentPath === '/'
      );
      return currentLink ? currentLink.id : navLinks[0].id;
    }
    return navLinks[0].id;
  });

  const handleNavigation = (href: string) => {
    window.location.href = href;
  };

  return (
    // Cambiado a 'top-6' y con los colores de vidrio esmerilado claro
    <nav className="fixed top-6 left-1/2 flex -translate-x-1/2 items-center p-1.5 rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur-md z-50">
      {navLinks.map((link) => {
        const isActive = active === link.id;

        return (
          <button
            key={link.id}
            onClick={() => {
              setActive(link.id);
              handleNavigation(link.href);
            }}
            // Ajuste de colores: texto oscuro si está activo, gris claro si no
            className={`relative px-6 py-2 text-sm font-medium tracking-wide transition-colors duration-300 outline-none tap-highlight-transparent ${
              isActive ? "text-gray-900 drop-shadow-sm" : "text-gray-600 hover:text-gray-900/80"
            }`}
          >
            <span className="relative z-10">{link.label}</span>

            {/* La píldora animada con Framer Motion, adaptada al estilo claro */}
            {isActive && (
              <motion.div
                layoutId="glass-indicator"
                className="absolute inset-0 z-0 rounded-full bg-white/40 shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}