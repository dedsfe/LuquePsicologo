"use client";

import { motion, useReducedMotion } from "motion/react";

// Perguntas provisórias: o que costuma travar alguém antes da primeira mensagem.
const OLHO = "antes da primeira mensagem";
const TITULO = "O que costuma travar quem está pensando em começar.";

const PARES = [
  {
    pergunta: "E se eu não souber o que falar?",
    resposta:
      "A maioria não sabe. A gente começa por aí mesmo, pelo que ainda não tem nome.",
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

const CALMA = [0.33, 0, 0.15, 1] as const;

/**
 * Era um ziguezague: pergunta e resposta soltas no branco, alternando de lado
 * a cada 13vh. Bonito de rolar, impossível de escanear, e no celular o texto
 * alinhado à direita ainda quebrava a leitura.
 *
 * Agora são cards em grade, todos alinhados à esquerda. A pergunta continua
 * em serif itálico e a resposta em sans escura: a hierarquia que antes vinha
 * do espaço agora vem do contraste entre as duas vozes dentro da mesma caixa.
 */
export function Conversa() {
  const reduzirMovimento = useReducedMotion();

  return (
    <section id="como-funciona" className="bg-[#faf8f3] px-6 py-[12vh] sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl">
          {OLHO}
        </p>
        <h2 className="mt-4 max-w-2xl text-[26px] leading-[1.2] tracking-tight text-[#25302a] sm:text-[38px]">
          {TITULO}
        </h2>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {PARES.map(({ pergunta, resposta }, indice) => (
            <motion.li
              key={pergunta}
              initial={reduzirMovimento ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px 10% 0px" }}
              transition={{ duration: 0.45, delay: indice * 0.06, ease: CALMA }}
              className="rounded-2xl border border-[#25302a]/10 bg-[#fdfcf9] p-6 sm:p-7"
            >
              <p className="font-serif text-[17px] italic text-[#25302a]/55 sm:text-lg">
                {pergunta}
              </p>
              <p className="mt-3 text-[17px] leading-[1.45] tracking-tight text-[#25302a] sm:text-[19px]">
                {resposta}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
