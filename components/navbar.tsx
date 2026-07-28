"use client";

import { useState } from "react";

import { BOTAO_VIDRO_BARRA } from "@/lib/botoes";
import { AGENDAR_URL } from "@/lib/whatsapp";

// Navegar não é o CTA: o link só ganha o vidro debaixo do ponteiro, e some de
// novo ao sair. Forma e padding ficam com cada uso, como no botão.
const LINK_BARRA =
  "liquid-glass liquid-glass--fantasma text-[#25302a]/75 transition-colors hover:text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25302a]/60 motion-reduce:transition-none"

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
                  className={`${LINK_BARRA} inline-flex rounded-full px-4 py-2 text-sm`}
                >
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={AGENDAR_URL}
            className={`${BOTAO_VIDRO_BARRA} hidden rounded-full px-5 py-2.5 text-sm md:inline-flex`}
          >
            <span className="relative">Agendar</span>
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className={`${BOTAO_VIDRO_BARRA} inline-flex size-10 rounded-full md:hidden`}
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
                    className={`${LINK_BARRA} block rounded-2xl px-4 py-3 text-[15px]`}
                  >
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              ))}
              <li className="p-1">
                <a
                  href={AGENDAR_URL}
                  onClick={() => setAberto(false)}
                  className={`${BOTAO_VIDRO_BARRA} flex w-full rounded-2xl px-4 py-3 text-[15px]`}
                >
                  <span className="relative">Agendar consulta</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
