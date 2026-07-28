"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { BOTAO_VIDRO } from "@/lib/botoes";
import { CONVERSAR_URL } from "@/lib/whatsapp";

// Copy provisória. A cena é ilustrativa — não é print de conversa real, e por
// isso a abertura diz "começaria". Sem diagnóstico e sem promessa (CFP).
const ABERTURA_ANTES = "Se fosse hoje, a conversa ";
const ABERTURA_CHAVE = "começaria mais ou menos assim";

type Bloco = { de: "pessoa" | "luque"; falas: string[] };

const CONVERSA: Bloco[] = [
  {
    de: "pessoa",
    falas: [
      "Oi. Não sei bem como começar isso.",
      "Semana passada eu passei mal no meio do mercado. Do nada.",
      "O coração disparou, faltou ar, achei que ia morrer ali no corredor.",
      "Fui pro pronto-socorro. Fizeram exame, deu tudo normal, me mandaram pra casa.",
    ],
  },
  {
    de: "luque",
    falas: [
      "Que bom que você escreveu.",
      "O que você sentiu foi real. O corpo não inventa — ele estava respondendo a outra coisa, e é isso que a gente vai olhar junto.",
    ],
  },
  {
    de: "pessoa",
    falas: [
      "Desde aquele dia eu evito sair.",
      "Cancelei três coisas esse mês. Já nem sei que desculpa dar.",
      "E todo mundo fica dizendo que é frescura, que é só me distrair.",
    ],
  },
  {
    de: "luque",
    falas: [
      "Não é frescura. É um quadro conhecido, e ninguém atravessa isso sozinho no braço.",
      "E você não precisa cruzar a cidade pra começar: a conversa é online, de onde você estiver.",
    ],
  },
  {
    de: "pessoa",
    falas: ["E se eu não souber explicar direito o que eu sinto?"],
  },
  {
    de: "luque",
    falas: ["A maioria não sabe. A gente começa por aí mesmo."],
  },
];

const SUAVE = [0.22, 1, 0.36, 1] as const;
const ESPERA_DIGITANDO = 640;

// O rabinho é feito com dois pseudo-elementos: um continua a bolha, o outro
// recorta o canto com a cor do papel da seção.
const RABO_ESQUERDA =
  "before:absolute before:bottom-0 before:-left-[7px] before:h-5 before:w-5 before:rounded-br-[15px] before:bg-[#f2efe7] before:content-[''] after:absolute after:bottom-0 after:-left-[10px] after:h-5 after:w-[10px] after:rounded-br-[10px] after:bg-[#fdfcf9] after:content-['']";

const RABO_DIREITA =
  "before:absolute before:bottom-0 before:-right-[8px] before:h-5 before:w-5 before:rounded-bl-[15px] before:bg-[#25302a] before:content-[''] after:absolute after:bottom-0 after:-right-[10px] after:h-5 after:w-[10px] after:rounded-bl-[10px] after:bg-[#fdfcf9] after:content-['']";

// Cada mensagem cresce a partir do próprio rabinho, como no iMessage.
const bolhaVariants = (reduzir: boolean | null): Variants =>
  reduzir
    ? { oculto: { opacity: 1 }, visivel: { opacity: 1 } }
    : {
        oculto: { opacity: 0, scale: 0.82, y: 10 },
        visivel: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.7 },
        },
      };

/** Um turno de fala: digita, some o indicador, e as mensagens caem em cascata. */
function TurnoDeFala({
  bloco,
  reduzirMovimento,
}: {
  bloco: Bloco;
  reduzirMovimento: boolean | null;
}) {
  const referencia = useRef<HTMLDivElement>(null);
  const emVista = useInView(referencia, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -12% 0px",
  });

  // Rede de segurança: uma seção invisível é pior que uma sem animação.
  const [porGarantia, setPorGarantia] = useState(false);
  useEffect(() => {
    const relogio = setTimeout(() => {
      const alvo = referencia.current;
      if (!alvo) return;
      const { top, bottom } = alvo.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) setPorGarantia(true);
    }, 1800);
    return () => clearTimeout(relogio);
  }, []);

  const ativo = emVista || porGarantia;
  const [digitando, setDigitando] = useState(true);

  useEffect(() => {
    if (!ativo || reduzirMovimento) return;
    const relogio = setTimeout(() => setDigitando(false), ESPERA_DIGITANDO);
    return () => clearTimeout(relogio);
  }, [ativo, reduzirMovimento]);

  const daPessoa = bloco.de === "pessoa";
  const mostrarFalas = ativo && (!digitando || !!reduzirMovimento);
  const bolha = bolhaVariants(reduzirMovimento);

  return (
    <div
      ref={referencia}
      className={`relative flex flex-col gap-[6px] ${
        daPessoa ? "items-start" : "items-end"
      }`}
    >
      {/* O indicador fica por cima do espaço já reservado pelas mensagens:
          assim nada empurra a página quando a fala aparece. */}
      <AnimatePresence>
        {ativo && digitando && !reduzirMovimento && (
          <motion.div
            key="digitando"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: SUAVE }}
            style={{ originX: daPessoa ? 0 : 1, originY: 1 }}
            className={`absolute top-0 z-10 flex items-center gap-[5px] rounded-[20px] px-[18px] py-[14px] ${
              daPessoa ? "left-0 bg-[#f2efe7]" : "right-0 bg-[#25302a]"
            }`}
          >
            {[0, 1, 2].map((ponto) => (
              <motion.span
                key={ponto}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ponto * 0.16,
                }}
                className={`size-[6px] rounded-full ${
                  daPessoa ? "bg-[#25302a]/45" : "bg-[#fdfcf9]/70"
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {bloco.falas.map((fala, indice) => {
        // Só a última da sequência ganha rabinho, como no iMessage.
        const ultima = indice === bloco.falas.length - 1;

        return (
          <motion.p
            key={fala}
            variants={bolha}
            initial="oculto"
            animate={mostrarFalas ? "visivel" : "oculto"}
            transition={{ delay: mostrarFalas ? indice * 0.11 : 0 }}
            style={{ originX: daPessoa ? 0 : 1, originY: 1 }}
            className={`relative max-w-[85%] rounded-[20px] px-[18px] py-3 text-[15px] leading-relaxed sm:max-w-[78%] ${
              daPessoa
                ? "bg-[#f2efe7] text-[#25302a]/80"
                : "bg-[#25302a] text-[#fdfcf9]"
            } ${ultima ? (daPessoa ? RABO_ESQUERDA : RABO_DIREITA) : ""}`}
          >
            {fala}
          </motion.p>
        );
      })}
    </div>
  );
}

export function ParaQuem() {
  const reduzirMovimento = useReducedMotion();
  const referencia = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start end", "end start"],
  });

  // O fio da conversa desce um tanto mais devagar que a página.
  const deslocamento = useTransform(scrollYProgress, [0, 1], [14, -14]);

  const linha: Variants = reduzirMovimento
    ? { oculto: { opacity: 1 }, visivel: { opacity: 1 } }
    : {
        oculto: { opacity: 0, y: 14 },
        visivel: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: SUAVE },
        },
      };

  return (
    <section id="para-quem" className="bg-[#fdfcf9] px-6 py-[16vh] sm:px-10">
      <motion.div
        ref={referencia}
        style={{ y: reduzirMovimento ? 0 : deslocamento }}
        className="mx-auto flex max-w-2xl flex-col"
      >
        <motion.h2
          variants={linha}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.6 }}
          className="max-w-xl text-[26px] leading-[1.2] tracking-tight text-[#25302a] sm:text-[34px]"
        >
          {ABERTURA_ANTES}
          <em className="font-serif italic">{ABERTURA_CHAVE}</em>.
        </motion.h2>

        <div className="mt-16 flex flex-col gap-7">
          {CONVERSA.map((bloco, indice) => (
            <TurnoDeFala
              key={indice}
              bloco={bloco}
              reduzirMovimento={reduzirMovimento}
            />
          ))}
        </div>

        <motion.a
          variants={linha}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.8 }}
          href={CONVERSAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="click_whatsapp"
          className={`mt-14 w-fit ${BOTAO_VIDRO}`}
        >
          <span className="relative">Começar a minha</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
