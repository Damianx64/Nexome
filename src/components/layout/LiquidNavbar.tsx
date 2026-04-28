import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const navLinks = [
  { id: "home", label: "Inicio", href: "/" },
  { id: "articles", label: "Artículos", href: "/articulos" },
  { id: "covers", label: "Portadas", href: "/portadas" },
];

function getActiveLink(pathname: string) {
  return (
    navLinks.find((link) =>
      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
    ) ?? navLinks[0]
  );
}

export default function LiquidNavbar() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeLink = getActiveLink(pathname);

  useEffect(() => {
    const syncPathname = () => {
      setPathname(window.location.pathname);
    };

    syncPathname();
    window.addEventListener("popstate", syncPathname);
    document.addEventListener("astro:page-load", syncPathname);

    return () => {
      window.removeEventListener("popstate", syncPathname);
      document.removeEventListener("astro:page-load", syncPathname);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Principal"
      className="fixed left-1/2 top-5 z-50 w-[min(92vw,46rem)] -translate-x-1/2"
      initial={{ opacity: 0, y: -28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 px-3 py-3 shadow-[0_24px_80px_rgba(15,118,110,0.24)] backdrop-blur-2xl">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -top-10 h-24 rounded-full bg-cyan-200/35 blur-3xl"
          animate={{
            opacity: [0.45, 0.8, 0.45],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 right-0 h-28 w-40 rounded-full bg-emerald-200/20 blur-3xl"
          animate={{
            x: [8, -12, 8],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />

        <LayoutGroup>
          <ul className="relative flex items-center justify-center gap-2">
            {navLinks.map((link, index) => {
              const isActive = activeLink.id === link.id;
              const isHovered = hoveredId === link.id;

              return (
                <li key={link.id} className="relative flex-1">
                  <motion.a
                    href={link.href}
                    className="group relative flex items-center justify-center overflow-hidden rounded-[1.45rem] px-4 py-3 text-sm font-medium tracking-[0.18em] text-cyan-50/82 outline-none md:px-6"
                    style={{
                      WebkitTapHighlightColor: "transparent",
                      tapHighlightColor: "transparent",
                    }}
                    onClick={() => setPathname(link.href)}
                    onHoverStart={() => setHoveredId(link.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(link.id)}
                    onBlur={() => setHoveredId(null)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  >
                    <AnimatePresence>
                      {isHovered && !isActive ? (
                        <motion.span
                          layoutId="hover-shell"
                          className="absolute inset-0 rounded-[1.45rem] border border-white/20 bg-white/10 backdrop-blur-xl"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      ) : null}
                    </AnimatePresence>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.span
                          key={`${link.id}-active`}
                          className="absolute inset-0 rounded-[1.45rem] border border-white/25 bg-gradient-to-br from-cyan-200/45 via-white/18 to-emerald-200/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_30px_rgba(103,232,249,0.18)] backdrop-blur-2xl"
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          <motion.span
                            aria-hidden="true"
                            className="absolute inset-y-1 left-2 w-10 rounded-full bg-white/40 blur-xl"
                            animate={{ x: ["0%", "220%", "0%"], opacity: [0.2, 0.75, 0.2] }}
                            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.span
                            aria-hidden="true"
                            className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                            animate={{ opacity: [0.35, 0.9, 0.35] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </motion.span>
                      ) : null}
                    </AnimatePresence>

                    <span className="relative z-10 flex items-center gap-3">
                      <motion.span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? "bg-white" : "bg-cyan-100/55"
                        }`}
                        animate={{
                          scale: isActive ? [1, 1.35, 1] : isHovered ? [1, 1.2, 1] : 1,
                          opacity: isActive ? [0.8, 1, 0.8] : isHovered ? 0.95 : 0.7,
                          boxShadow: isActive
                            ? [
                                "0 0 0 rgba(255,255,255,0.2)",
                                "0 0 14px rgba(255,255,255,0.9)",
                                "0 0 0 rgba(255,255,255,0.2)",
                              ]
                            : isHovered
                              ? "0 0 12px rgba(165,243,252,0.7)"
                              : "0 0 0 rgba(165,243,252,0)",
                        }}
                        transition={{
                          duration: isActive || isHovered ? 1.8 : 0.2,
                          repeat: isActive || isHovered ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />

                      <motion.span
                        className={`relative ${
                          isActive
                            ? "text-slate-950"
                            : "text-slate-950 group-hover:text-emerald-900"
                        }`}
                        animate={{
                          letterSpacing: isHovered || isActive ? "0.24em" : "0.18em",
                          opacity: isActive ? 1 : isHovered ? 0.98 : 0.82,
                        }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        {link.label}
                      </motion.span>
                    </span>

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-2 left-1/2 h-px w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-100 to-transparent"
                      animate={{
                        opacity: isActive ? 0.95 : isHovered ? 0.7 : 0,
                        scaleX: isActive ? 1.15 : isHovered ? 1 : 0.55,
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    />

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[1.45rem]"
                      style={{
                        background:
                          "radial-gradient(circle at top, rgba(255,255,255,0.28), transparent 54%)",
                      }}
                      animate={{ opacity: isHovered || isActive ? 1 : 0.45 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </motion.a>

                  {index < navLinks.length - 1 ? (
                    <motion.span
                      aria-hidden="true"
                      className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/18 to-transparent md:block"
                      animate={{ opacity: hoveredId ? 0.28 : 0.18 }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </LayoutGroup>
      </div>
    </motion.nav>
  );
}
