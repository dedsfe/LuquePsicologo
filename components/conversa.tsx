"use client";

import { motion, useReducedMotion } from "motion/react";

// Perguntas provisórias — o que costuma travar alguém antes da primeira mensagem.
const PARES = [
  {
    pergunta: "E se eu não souber o que falar?",
    resposta:
      "A maioria não sabe. A gente começa por aí mesmo — pelo que ainda não tem nome.",
  },
  {
    pergunta: "Preciso estar muito mal pra procurar?",
    resposta:
      "Não. Dá pra vir num momento comum, só pra entender melhor o que você está vivendo.",
  },
  {
    pergunta: "Quanto tempo isso leva?",
    resposta:
      "A conversa inicial dura cerca de 50 minutos, e já dá pra sentir se faz sentido seguir.",
  },
  {
    pergunta: "E se eu não me sentir à vontade com você?",
    resposta:
      "Pode dizer. A gente ajusta o rumo, ou eu te indico alguém que combine mais.",
  },
];

// A pergunta é pensamento: serif itálico, miúda, apagada.
const CLASSE_PERGUNTA = "font-serif text-lg italic text-[#25302a]/45 sm:text-xl";

// A resposta é fala: sans, cheia, escura.
const CLASSE_RESPOSTA =
  "text-xl leading-[1.4] tracking-tight text-[#25302a] sm:text-[27px]";

const ENTRADA = {
  initial: { filter: "blur(7px)", opacity: 0, y: 12 },
  whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4, margin: "0px 0px -12% 0px" },
} as const;

export function Conversa() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section id="como-funciona" className="bg-[#faf8f3] px-6 py-[18vh] sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-[13vh]">
        {PARES.map(({ pergunta, resposta }, i) => {
          // Alterna o eixo: o olho desce em ziguezague, sem precisar de caixa.
          const aDireita = i % 2 === 1;

          return (
            <div
              key={pergunta}
              className={`flex max-w-xl flex-col gap-4 ${
                aDireita ? "self-end text-right" : "self-start"
              }`}
            >
              {reduzirMovimento ? (
                <>
                  <p className={CLASSE_PERGUNTA}>{pergunta}</p>
                  <p className={CLASSE_RESPOSTA}>{resposta}</p>
                </>
              ) : (
                <>
                  <motion.p
                    {...ENTRADA}
                    transition={{ duration: 1.4, ease: [0.33, 0, 0.15, 1] }}
                    className={CLASSE_PERGUNTA}
                  >
                    {pergunta}
                  </motion.p>
                  {/* O respiro é o que faz soar como resposta, não como legenda. */}
                  <motion.p
                    {...ENTRADA}
                    transition={{
                      duration: 1.6,
                      delay: 0.45,
                      ease: [0.33, 0, 0.15, 1],
                    }}
                    className={CLASSE_RESPOSTA}
                  >
                    {resposta}
                  </motion.p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
