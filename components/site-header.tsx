"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AGENDAR_URL } from "@/lib/whatsapp"

const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#sobre", label: "Sobre" },
  { href: "#duvidas", label: "Dúvidas" },
]

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0c.6 5.9 5.5 10.8 11.4 11.4v1.2C17.5 13.2 12.6 18.1 12 24h-1.2C10.2 18.1 5.3 13.2-.6 12.6v-1.2C5.3 10.8 10.2 5.9 10.8 0Z" />
    </svg>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll() // reload no meio da página já começa com a barra sólida
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Menu aberto cobre a tela: trava o scroll de trás e sai no Esc.
  React.useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* O header flutua sobre o hero; só ganha corpo depois que a pessoa rola. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          scrolled
            ? "border-line/80 bg-paper/85 opacity-100 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-paper/0 opacity-0"
        )}
      />

      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 py-5 md:grid-cols-[1fr_auto_1fr]">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 justify-self-start rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <Sparkle className="h-[1.05rem] w-[1.05rem] text-ink" />
            <span className="font-display text-[1.35rem] leading-none tracking-[-0.01em] text-ink">
              Luque Gonçalves
            </span>
          </a>

          <nav aria-label="Seções do site" className="hidden justify-self-center md:block">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-block py-1 text-[0.92rem] text-ink transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:opacity-60"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={AGENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="click_agendar"
              className="hidden items-center rounded-full bg-ink px-7 py-3.5 text-[0.92rem] text-paper transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-4 focus-visible:ring-offset-paper md:inline-flex"
            >
              Agendar conversa
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 md:hidden"
            >
              <span
                aria-hidden
                className={cn(
                  "block h-px w-5 bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "block h-px w-5 bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sem drawer que salta: o painel entra por opacidade. */}
      <div
        id="menu-mobile"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 -z-10 bg-paper px-6 pb-12 pt-28 transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Menu principal">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${120 + index * 70}ms` : "0ms" }}
                  className={cn(
                    "block border-b border-line py-5 font-display text-[2rem] italic leading-none tracking-[-0.015em] text-ink transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={AGENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="click_agendar"
          onClick={() => setMenuOpen(false)}
          style={{ transitionDelay: menuOpen ? `${120 + NAV_LINKS.length * 70}ms` : "0ms" }}
          className={cn(
            "mt-10 flex items-center justify-center rounded-full bg-ink px-8 py-4 text-[0.95rem] text-paper transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          Agendar conversa
        </a>

        <p className="mt-8 text-center text-[0.85rem] leading-relaxed text-ink-soft">
          Atendimento online, do lugar onde você se sente seguro.
        </p>
      </div>
    </header>
  )
}
