"use client";

import { useState } from "react";

import { AGENDAR_URL } from "@/lib/whatsapp";

// Destinos provisórios — as seções ainda não existem.
const LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Perguntas", href: "#perguntas" },
];

export function Navbar() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav className="w-full max-w-3xl">
        <div className="liquid-glass liquid-glass--gold flex items-center gap-2 rounded-full py-2 pl-5 pr-2">
          <a
            href="#topo"
            className="relative mr-auto text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25302a]/60"
          >
            <span className="font-serif text-xl italic">Luque</span>
            <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.22em] opacity-65">
              psicólogo
            </span>
          </a>

          <ul className="relative hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex rounded-full px-4 py-2 text-sm text-[#25302a]/75 transition hover:bg-white/35 hover:text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25302a]/60 motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={AGENDAR_URL}
            className="relative hidden rounded-full bg-white/45 px-5 py-2.5 text-sm font-medium tracking-tight text-[#25302a] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9),0_1px_2px_rgb(31_45_35/0.12)] transition hover:bg-white/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25302a]/60 motion-reduce:transition-none md:inline-flex"
          >
            Agendar
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="relative inline-flex size-10 items-center justify-center rounded-full bg-white/40 text-[#25302a] transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25302a]/60 motion-reduce:transition-none md:hidden"
          >
            <span className="sr-only">
              {aberto ? "Fechar menu" : "Abrir menu"}
            </span>
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 motion-reduce:transition-none ${
                  aberto ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 motion-reduce:transition-none ${
                  aberto ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {aberto && (
          <div
            id="menu-mobile"
            className="liquid-glass liquid-glass--gold mt-2 rounded-3xl p-2 md:hidden"
          >
            <ul className="relative">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setAberto(false)}
                    className="block rounded-2xl px-4 py-3 text-[15px] text-[#25302a]/80 transition hover:bg-white/35 hover:text-[#25302a] motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-1">
                <a
                  href={AGENDAR_URL}
                  onClick={() => setAberto(false)}
                  className="block rounded-2xl bg-white/50 px-4 py-3 text-center text-[15px] font-medium text-[#25302a] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9)] transition hover:bg-white/70 motion-reduce:transition-none"
                >
                  Agendar consulta
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
