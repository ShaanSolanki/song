"use client";

const links = [
  { label: "Featured", href: "#featured" },
  { label: "Library", href: "#library" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      style={{ pointerEvents: "none" }}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <a
          href="#top"
          className="font-Satoshi-Black text-lg uppercase tracking-[0.18em] text-paper"
          style={{ pointerEvents: "auto" }}
        >
          Resonance
        </a>
        <ul className="flex items-center gap-5 md:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-Satoshi-Regular text-xs uppercase tracking-[0.2em] text-paper opacity-90 transition-opacity hover:opacity-60 md:text-sm"
                style={{ pointerEvents: "auto" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
