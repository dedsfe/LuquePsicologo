"use client";

import { motion, useReducedMotion } from "motion/react";

// TODO (André): confirmar a lista com o Luque antes de anunciar. Só entrou aqui
// o que o site já afirmava na primeira dobra (ansiedade, depressão, luto e as
// fases em que a vida pesa demais). Nada de diagnóstico e nada de promessa de
// resultado (CFP): cada item descreve como aquilo aparece no dia, não uma
// doença nem uma cura.
const OLHO = "o que eu atendo";
const TITULO = "Se alguma dessas frases parece sua, a terapia tem o que fazer.";

const TEMAS = [
  {
    nome: "Ansiedade",
    sinal:
      "A cabeça não desliga, o corpo fica ligado o dia inteiro e a noite não descansa.",
  },
  {
    nome: "Depressão",
    sinal:
      "O que era bom ficou sem graça, e o cansaço não passa nem dormindo.",
  },
  {
    nome: "Luto",
    sinal: "Alguém faltou e a vida seguiu, mas você não sabe como seguir junto.",
  },
  {
    nome: "Fases difíceis",
    sinal:
      "Nada de grave aconteceu, e mesmo assim está pesando mais do que você aguenta sozinho.",
  },
] as const;

const CALMA = [0.33, 0, 0.15, 1] as const;

/**
 * O bloco que faltava: quem chega de anúncio precisa se reconhecer antes de
 * qualquer coisa. Fica logo abaixo da hero, em grade previsível, sem trilha de
 * scroll nem desfoque longo. É a seção mais convencional do site de propósito.
 */
export function OQueAtendo() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section id="o-que-atendo" className="bg-[#fdfcf9] px-6 py-[12vh] sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl">
          {OLHO}
        </p>
        <h2 className="mt-4 max-w-2xl text-[26px] leading-[1.2] tracking-tight text-[#25302a] sm:text-[38px]">
          {TITULO}
        </h2>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {TEMAS.map((tema, indice) => (
            <motion.li
              key={tema.nome}
              initial={reduzirMovimento ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px 10% 0px" }}
              // Fade curto e escalonado, nada de desfoque: aqui o conteúdo tem
              // que chegar antes da animação, não depois dela.
              transition={{
                duration: 0.45,
                delay: indice * 0.06,
                ease: CALMA,
              }}
              className="rounded-2xl border border-[#25302a]/10 bg-[#f4f2ec] p-6 sm:p-7"
            >
              <h3 className="text-[19px] tracking-tight text-[#25302a] sm:text-[21px]">
                {tema.nome}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.5] text-[#25302a]/70 sm:text-[17px]">
                {tema.sinal}
              </p>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl text-[15px] leading-[1.5] text-[#25302a]/55">
          Não achou o seu caso aqui? Manda mesmo assim. A primeira conversa
          serve pra isso.
        </p>
      </div>
    </section>
  );
}
