"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { CalendarMark, ChatRoundVideo, LockKeyhole } from "reicon-react";

import { LINK_SUBLINHADO } from "@/lib/botoes";

// Copy provisória — o respiro entre dois blocos de texto.
const OLHO = "sobre o ritmo";
const TITULO_ANTES = "Parar não é atraso. É ";
const TITULO_CHAVE = "parte do caminho";
const TEXTO =
  "Tem coisa que só aparece quando a gente desacelera o suficiente pra escutar. A terapia abre esse intervalo uma vez por semana, e o que surge nele costuma surpreender.";

// Só o que já está afirmado no site. Duração e preço seguem em aberto —
// não inventar número aqui (ver DESIGN.md).
const SELOS = [
  { Icone: ChatRoundVideo, texto: "por vídeo" },
  { Icone: LockKeyhole, texto: "sigilo profissional" },
  { Icone: CalendarMark, texto: "uma vez por semana" },
];

const SUAVE = [0.22, 1, 0.36, 1] as const;

export function Pausa() {
  const reduzirMovimento = useReducedMotion();
  const referenciaFoto = useRef<HTMLDivElement>(null);
  const referenciaCartao = useRef<HTMLDivElement>(null);

  // A cortina roda em CSS: o motion trava a transição inteira do variant
  // quando clipPath entra nele, então quem abre o card é o próprio browser.
  const emVista = useInView(referenciaCartao, {
    once: true,
    amount: 0.25,
    margin: "0px 0px -10% 0px",
  });

  // O card só existe pra dar respiro: o movimento é lento de propósito.
  const { scrollYProgress } = useScroll({
    target: referenciaFoto,
    offset: ["start end", "end start"],
  });
  // A foto é 16% mais alta que o frame — o deslocamento vive dentro dessa folga.
  const deslocamento = useTransform(scrollYProgress, [0, 1], ["-6.5%", "6.5%"]);

  // Cortina: o card entra como uma faixa fina no meio e abre até a altura
  // cheia. O clip-path não mexe no layout, então nada pula na página.
  const cartao: Variants = reduzirMovimento
    ? { oculto: {}, visivel: {} }
    : {
        oculto: { opacity: 0.65 },
        visivel: {
          opacity: 1,
          transition: {
            duration: 1.5,
            ease: SUAVE,
            staggerChildren: 0.08,
            delayChildren: 0.6,
          },
        },
      };

  // A foto se acomoda enquanto a cortina abre — termina depois dela.
  const foto: Variants = reduzirMovimento
    ? { oculto: {}, visivel: {} }
    : {
        oculto: { scale: 1.16 },
        visivel: { scale: 1, transition: { duration: 2, ease: SUAVE } },
      };

  const linha: Variants = reduzirMovimento
    ? { oculto: {}, visivel: {} }
    : {
        oculto: { opacity: 0, y: 14 },
        visivel: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: SUAVE },
        },
      };

  // A divisa entre foto e texto se desenha em vez de já estar lá.
  const reguaVertical: Variants = reduzirMovimento
    ? { oculto: {}, visivel: {} }
    : {
        oculto: { scaleY: 0 },
        visivel: { scaleY: 1, transition: { duration: 1.4, ease: SUAVE } },
      };

  const reguaHorizontal: Variants = reduzirMovimento
    ? { oculto: {}, visivel: {} }
    : {
        oculto: { scaleX: 0 },
        visivel: { scaleX: 1, transition: { duration: 1.4, ease: SUAVE } },
      };

  // A headline sobe por trás da máscara em vez de aparecer por opacidade.
  const mascara: Variants = reduzirMovimento
    ? { oculto: {}, visivel: {} }
    : {
        oculto: { opacity: 0, y: "105%" },
        visivel: {
          opacity: 1,
          y: "0%",
          transition: { duration: 1.1, ease: SUAVE },
        },
      };

  return (
    <section className="bg-[#f4f2ec] px-6 py-[12vh] sm:px-10">
      {/* Quem é observado é este wrapper, não o card: o clip-path da cortina
          derruba a área visível do card pra 8% e o threshold nunca fecha. */}
      <div ref={referenciaCartao}>
        <motion.div
          variants={cartao}
          initial="oculto"
          animate={emVista ? "visivel" : "oculto"}
          style={
            reduzirMovimento
              ? undefined
              : {
                  clipPath: emVista
                    ? "inset(0% 0% 0% 0% round 28px)"
                    : "inset(46% 0% 46% 0% round 28px)",
                  transition: "clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }
          }
          className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] bg-[#fdfcf9] shadow-[0_1px_2px_rgb(31_45_35/0.06),0_18px_40px_-16px_rgb(31_45_35/0.18)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
        >
          {/* Panorâmica recortada em coluna: o corte fecha na figura à mesa. */}
          <div
            ref={referenciaFoto}
            className="relative min-h-[260px] overflow-hidden md:min-h-[380px]"
          >
            <motion.div
              variants={foto}
              style={{ y: reduzirMovimento ? 0 : deslocamento }}
              className="absolute inset-x-0 -inset-y-[8%]"
            >
              <Image
                src="/mesa-campo.webp"
                alt="Homem sentado a uma mesa no meio de um campo aberto ao amanhecer, de costas, com um tablet nas mãos."
                fill
                quality={100}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-[54%_center]"
              />
            </motion.div>

            {/* A legenda invade a foto: é o que rompe a divisa entre as duas
              metades do card e devolve camada ao conjunto. */}
            {/* Vidro mais leitoso que o do botão: aqui ele precisa carregar
              texto sobre a grama escura, não só insinuar profundidade. */}
            <motion.p
              variants={linha}
              className="liquid-glass absolute inset-x-4 bottom-4 rounded-2xl px-5 py-4 text-[13px] font-medium leading-snug text-[#1e2a22] [background:linear-gradient(180deg,rgb(255_255_255/0.78),rgb(255_255_255/0.62))] sm:inset-x-5 sm:bottom-5"
            >
              <span className="relative">
                Estar longe não é estar sozinho. Online, a conversa é a mesma.
              </span>
            </motion.p>
          </div>

          <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-12">
            {/* A divisa vira um traço que se desenha: vertical no desktop,
              horizontal quando as duas metades empilham. */}
            <motion.span
              aria-hidden
              variants={reguaVertical}
              className="absolute inset-y-8 left-0 hidden w-px origin-top bg-[#25302a]/12 md:block"
            />
            <motion.span
              aria-hidden
              variants={reguaHorizontal}
              className="absolute inset-x-8 top-0 h-px origin-left bg-[#25302a]/12 md:hidden"
            />
            <motion.span
              variants={linha}
              className="text-[11px] uppercase tracking-[0.22em] text-[#25302a]/45"
            >
              {OLHO}
            </motion.span>

            <h2 className="overflow-hidden pb-[0.12em] text-[26px] leading-[1.2] tracking-tight text-[#25302a] sm:text-[34px]">
              <motion.span variants={mascara} className="block">
                {TITULO_ANTES}
                <em className="font-serif italic">{TITULO_CHAVE}</em>.
              </motion.span>
            </h2>

            <motion.p
              variants={linha}
              className="max-w-md text-[15px] leading-relaxed text-[#25302a]/70"
            >
              {TEXTO}
            </motion.p>

            {/* Três selos curtos: quebram o parágrafo sem virar lista de features. */}
            <motion.ul
              variants={linha}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#25302a]/55"
            >
              {SELOS.map(({ Icone, texto }) => (
                <li key={texto} className="flex items-center gap-2">
                  <Icone
                    aria-hidden
                    size={15}
                    color="currentColor"
                    className="shrink-0 opacity-70"
                  />
                  {texto}
                </li>
              ))}
            </motion.ul>

            {/* Secundário: leva pra outra seção, não pro WhatsApp. */}
            <motion.a
              variants={linha}
              href="#como-funciona"
              className={`mt-2 w-fit ${LINK_SUBLINHADO}`}
            >
              O que costuma vir antes
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
