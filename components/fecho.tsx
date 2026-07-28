"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { BOTAO_VIDRO } from "@/lib/botoes";
import { AGENDAR_URL } from "@/lib/whatsapp";

// TODO (André): copy provisória. Convite, não promessa (CFP).
const FRASE =
  "Você não precisa saber por onde começar. Só precisa começar a falar.";
const BOTAO = "Começar a conversa";

const SUAVE = [0.22, 1, 0.36, 1] as const;

export function Fecho() {
  const reduzirMovimento = useReducedMotion();
  const frase = useRef<HTMLParagraphElement>(null);

  // A frase acende com o scroll, palavra por palavra: quem lê dá o ritmo.
  const { scrollYProgress } = useScroll({
    target: frase,
    offset: ["start 0.85", "end 0.45"],
  });

  const palavras = FRASE.split(" ");

  return (
    <section className="bg-[#fdfcf9] px-6 py-[22vh] sm:px-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p
          ref={frase}
          className="text-balance text-[30px] leading-[1.2] tracking-tight text-[#25302a] sm:text-[46px]"
        >
          {palavras.map((termo, indice) => (
            <Palavra
              key={`${termo}-${indice}`}
              termo={termo}
              progresso={scrollYProgress}
              inicio={indice / palavras.length}
              fim={(indice + 1) / palavras.length}
              parado={!!reduzirMovimento}
            />
          ))}
        </p>

        {/* O fecho é o último empurrão: uma saída só, o mesmo WhatsApp. */}
        <BotaoIma reduzirMovimento={reduzirMovimento} />
      </div>
    </section>
  );
}

/** Uma palavra da frase, acendendo na sua vez. */
function Palavra({
  termo,
  progresso,
  inicio,
  fim,
  parado,
}: {
  termo: string;
  progresso: MotionValue<number>;
  inicio: number;
  fim: number;
  parado: boolean;
}) {
  const opacidade = useTransform(progresso, [inicio, fim], [0.16, 1]);
  const desfoque = useTransform(progresso, [inicio, fim], [3, 0]);
  const filtro = useTransform(desfoque, (v) => `blur(${v}px)`);

  if (parado) return <span className="whitespace-pre">{termo} </span>;

  return (
    <motion.span
      style={{ opacity: opacidade, filter: filtro }}
      className="inline-block whitespace-pre"
    >
      {termo}{" "}
    </motion.span>
  );
}

/** O mesmo botão de vidro do header, andando um pouco na direção do cursor. */
function BotaoIma({ reduzirMovimento }: { reduzirMovimento: boolean | null }) {
  const referencia = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const molaX = useSpring(x, { stiffness: 190, damping: 17, mass: 0.5 });
  const molaY = useSpring(y, { stiffness: 190, damping: 17, mass: 0.5 });

  const seguirCursor = (evento: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduzirMovimento) return;
    const alvo = referencia.current;
    if (!alvo) return;
    const caixa = alvo.getBoundingClientRect();
    x.set((evento.clientX - (caixa.left + caixa.width / 2)) * 0.32);
    y.set((evento.clientY - (caixa.top + caixa.height / 2)) * 0.32);
  };

  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={referencia}
      href={AGENDAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="click_whatsapp"
      onMouseMove={seguirCursor}
      onMouseLeave={soltar}
      onBlur={soltar}
      style={reduzirMovimento ? undefined : { x: molaX, y: molaY }}
      initial={reduzirMovimento ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1, delay: 0.25, ease: SUAVE }}
      className={`mt-14 ${BOTAO_VIDRO}`}
    >
      <span className="relative">{BOTAO}</span>
    </motion.a>
  );
}
