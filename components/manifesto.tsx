"use client";

import { motion, useReducedMotion } from "motion/react";

// Copy provisória — a ideia é a frase ganhar contorno junto com o desfoque.
const LINHAS = [
  { antes: "No começo, quase nada tem ", chave: "contorno", depois: "." },
  {
    antes: "A gente descreve o que sente com as ",
    chave: "palavras que tem",
    depois: ".",
  },
  { antes: "Aos poucos, o que era ruído vira ", chave: "frase", depois: "." },
  { antes: "E o que era frase vira ", chave: "escolha", depois: "." },
];

const CLASSE_LINHA =
  "text-2xl leading-[1.35] tracking-tight text-[#25302a] sm:text-[34px]";

export function Manifesto() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section id="sobre" className="bg-[#f4f2ec] px-6 py-[22vh] sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-[10vh]">
        {LINHAS.map(({ antes, chave, depois }) => {
          const conteudo = (
            <>
              {antes}
              <em className="font-serif italic">{chave}</em>
              {depois}
            </>
          );

          // Sem movimento preferido: a frase nasce em foco, nada se perde.
          if (reduzirMovimento) {
            return (
              <p key={chave} className={CLASSE_LINHA}>
                {conteudo}
              </p>
            );
          }

          return (
            <motion.p
              key={chave}
              className={CLASSE_LINHA}
              initial={{ filter: "blur(9px)", opacity: 0.4, y: 14 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              // Dispara cedo, ainda embaixo, pra o foco chegar durante a descida.
              // Uma vez só: o que ganhou contorno não volta a embaçar.
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 2.4, ease: [0.33, 0, 0.15, 1] }}
            >
              {conteudo}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
}
