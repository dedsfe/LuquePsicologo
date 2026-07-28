"use client";

import { motion, useReducedMotion } from "motion/react";

// Copy provisória. Cada linha diz uma coisa concreta que acontece na terapia,
// na ordem em que acontece: chegar sem saber falar, falar como dá, entender,
// escolher. Sem metáfora: quem procura ajuda não tem paciência pra decifrar.
const LINHAS = [
  {
    antes: "Você chega sem saber ",
    chave: "explicar o que sente",
    depois: ".",
  },
  {
    antes: "Tudo bem. Fala como dá: cansaço, medo, uma ",
    chave: "angústia sem nome",
    depois: ".",
  },
  {
    antes: "Semana após semana, aquilo começa a ",
    chave: "fazer sentido",
    depois: ".",
  },
  {
    antes: "E quando faz sentido, dá pra ",
    chave: "decidir o que fazer",
    depois: ".",
  },
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
