"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

// Copy provisória — o respiro entre dois blocos de texto.
const OLHO = "sobre o ritmo";
const TITULO_ANTES = "Parar não é atraso. É ";
const TITULO_CHAVE = "parte do caminho";
const TEXTO =
  "Tem coisa que só aparece quando a gente desacelera o suficiente pra escutar. A terapia abre esse intervalo uma vez por semana — e o que surge nele costuma surpreender.";

export function Pausa() {
  const reduzirMovimento = useReducedMotion();

  const entrada = reduzirMovimento
    ? {}
    : {
        initial: { filter: "blur(8px)", opacity: 0, y: 18 },
        whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25, margin: "0px 0px -10% 0px" },
        transition: { duration: 1.6, ease: [0.33, 0, 0.15, 1] as const },
      };

  return (
    <section className="bg-[#f4f2ec] px-6 py-[12vh] sm:px-10">
      <motion.div
        {...entrada}
        className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] bg-[#fdfcf9] shadow-[0_1px_2px_rgb(31_45_35/0.06),0_18px_40px_-16px_rgb(31_45_35/0.18)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
      >
        {/* Panorâmica recortada em coluna: o corte fecha na figura à mesa. */}
        <div className="relative min-h-[240px] md:min-h-[440px]">
          <Image
            src="/mesa-campo.webp"
            alt="Homem sentado a uma mesa no meio de um campo ao amanhecer, olhando para o celular."
            fill
            quality={100}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-[54%_center]"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#25302a]/45">
            {OLHO}
          </span>

          <h2 className="text-[26px] leading-[1.2] tracking-tight text-[#25302a] sm:text-[34px]">
            {TITULO_ANTES}
            <em className="font-serif italic">{TITULO_CHAVE}</em>.
          </h2>

          <p className="max-w-md text-[15px] leading-relaxed text-[#25302a]/70">
            {TEXTO}
          </p>

          <a
            href="#como-funciona"
            className="group mt-2 inline-flex w-fit items-center gap-3 text-sm text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25302a]/60"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-[#25302a]/15 transition group-hover:border-[#25302a]/40 group-hover:bg-[#25302a]/5 motion-reduce:transition-none">
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-4 fill-none stroke-current stroke-[1.4]"
              >
                <path
                  d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            O que costuma vir antes
          </a>
        </div>
      </motion.div>
    </section>
  );
}
