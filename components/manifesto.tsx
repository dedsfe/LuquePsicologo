"use client";

import { motion, useReducedMotion } from "motion/react";

// Copy provisória. Cada linha diz uma coisa concreta que acontece na terapia,
// na ordem em que acontece: chegar sem saber falar, falar como dá, entender,
// escolher. Sem metáfora: quem procura ajuda não tem paciência pra decifrar.
const OLHO = "como a terapia anda";
const LINHAS = [
  {
    numero: "01",
    antes: "Você chega sem saber ",
    chave: "explicar o que sente",
    depois: ".",
  },
  {
    numero: "02",
    antes: "Tudo bem. Fala como dá: cansaço, medo, uma ",
    chave: "angústia sem nome",
    depois: ".",
  },
  {
    numero: "03",
    antes: "Semana após semana, aquilo começa a ",
    chave: "fazer sentido",
    depois: ".",
  },
  {
    numero: "04",
    antes: "E quando faz sentido, dá pra ",
    chave: "decidir o que fazer",
    depois: ".",
  },
];

const CALMA = [0.33, 0, 0.15, 1] as const;

/**
 * Eram quatro frases soltas separadas por 10vh de nada: bonito de rolar,
 * impossível de escanear. Viraram quatro etapas numeradas ligadas por uma
 * linha. O número dá a hierarquia que faltava (é ele que diz "isto é um
 * processo, e tem ordem"), e a linha mostra que uma leva à outra.
 */
export function Manifesto() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section id="sobre" className="bg-[#f4f2ec] px-6 py-[12vh] sm:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl">
          {OLHO}
        </p>

        <ol className="mt-9 sm:mt-11">
          {LINHAS.map(({ numero, antes, chave, depois }, indice) => (
            <motion.li
              key={numero}
              initial={reduzirMovimento ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4, margin: "0px 0px 12% 0px" }}
              transition={{ duration: 0.45, delay: indice * 0.05, ease: CALMA }}
              className="relative flex gap-5 pb-9 last:pb-0 sm:gap-7 sm:pb-11"
            >
              {/* A linha nasce do número e morre no próximo. No último item ela
                  não existe: senão apontaria pra um passo que não vem. */}
              {indice < LINHAS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute bottom-2 left-[13px] top-8 w-px bg-[#25302a]/15 sm:left-[15px]"
                />
              )}

              <span
                aria-hidden
                className="relative z-10 mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#25302a] font-serif text-[11px] italic text-[#f4f2ec] sm:size-8 sm:text-xs"
              >
                {numero}
              </span>

              <p className="text-[19px] leading-[1.4] tracking-tight text-[#25302a] sm:text-[26px]">
                {antes}
                <em className="font-serif italic">{chave}</em>
                {depois}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
