"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { LINK_SUBLINHADO } from "@/lib/botoes";
import { CONVERSAR_URL } from "@/lib/whatsapp";

// TODO (André): copy provisória. Nenhuma resposta promete resultado (CFP), e o
// valor não aparece aqui porque o preço ainda não está fechado.
const OLHO = "perguntas";
const TITULO_ANTES = "O que costuma ";
const TITULO_CHAVE = "travar";
const TITULO_DEPOIS = " antes do primeiro oi.";
const APOIO = "Se a sua não estiver aqui, é só perguntar.";
const CONVITE = "Perguntar no WhatsApp";

const DUVIDAS = [
  {
    pergunta: "Terapia online funciona mesmo?",
    resposta:
      "O atendimento online é reconhecido pelo Conselho Federal de Psicologia e acontece por vídeo, com a mesma escuta de uma sala. Pra quem evita sair de casa, costuma ser o primeiro caminho possível.",
  },
  {
    pergunta: "E se eu travar no meio da conversa?",
    resposta:
      "A gente para. O silêncio também é parte da sessão. Ninguém vai te empurrar a falar o que você ainda não consegue.",
  },
  {
    pergunta: "Preciso de diagnóstico ou encaminhamento?",
    resposta:
      "Não. Você não precisa chegar com nome pro que sente, nem com laudo de ninguém. É pra isso que serve a primeira conversa.",
  },
  {
    pergunta: "O que eu contar fica entre a gente?",
    resposta:
      "Fica. Sigilo é dever do profissional, e as sessões não são gravadas.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "O Luque fala de valores na própria conversa, antes de você marcar qualquer coisa. Tirar dúvida não custa nada.",
  },
  {
    pergunta: "Preciso instalar alguma coisa?",
    resposta:
      "Não. Você recebe um link e entra pelo celular ou pelo computador, de onde estiver.",
  },
];

const SUAVE = [0.22, 1, 0.36, 1] as const;
const CALMA = [0.33, 0, 0.15, 1] as const;

export function Duvidas() {
  const reduzirMovimento = useReducedMotion();
  const secao = useRef<HTMLDivElement>(null);

  // Um por vez: duas respostas abertas ao mesmo tempo viram parede de texto.
  const [aberta, setAberta] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: secao,
    offset: ["start end", "end start"],
  });

  // A coluna da esquerda desce um tanto mais devagar que a lista.
  const deslocamento = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const entrada = {
    initial: { opacity: 0, y: 14, filter: "blur(7px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    // 60% do bloco visível era tarde demais no celular: o texto só saía do
    // desfoque com ele já quase no topo. 15% basta pra não disparar cedo à toa.
    viewport: { once: true, amount: 0.15, margin: "0px 0px 10% 0px" },
  } as const;

  return (
    <section id="perguntas" className="bg-[#f4f2ec] px-6 py-[18vh] sm:px-10">
      <div
        ref={secao}
        className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20"
      >
        {/* A coluna fica parada enquanto as dúvidas passam do lado. */}
        <motion.div
          style={{ y: reduzirMovimento ? 0 : deslocamento }}
          className="lg:sticky lg:top-[22vh] lg:self-start"
        >
          {reduzirMovimento ? (
            <>
              <p className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl">
                {OLHO}
              </p>
              <h2 className="mt-5 text-[30px] leading-[1.15] tracking-tight text-[#25302a] sm:text-[42px]">
                {TITULO_ANTES}
                <em className="font-serif italic">{TITULO_CHAVE}</em>
                {TITULO_DEPOIS}
              </h2>
            </>
          ) : (
            <>
              <motion.p
                {...entrada}
                transition={{ duration: 1.3, ease: CALMA }}
                className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl"
              >
                {OLHO}
              </motion.p>
              <motion.h2
                {...entrada}
                transition={{ duration: 1.5, delay: 0.26, ease: CALMA }}
                className="mt-5 text-[30px] leading-[1.15] tracking-tight text-[#25302a] sm:text-[42px]"
              >
                {TITULO_ANTES}
                <em className="font-serif italic">{TITULO_CHAVE}</em>
                {TITULO_DEPOIS}
              </motion.h2>
            </>
          )}

          <motion.p
            {...(reduzirMovimento ? {} : entrada)}
            transition={{ duration: 1.2, delay: 0.5, ease: CALMA }}
            className="mt-8 max-w-xs text-[15px] leading-relaxed text-[#25302a]/60"
          >
            {APOIO}
          </motion.p>

          <motion.a
            {...(reduzirMovimento ? {} : entrada)}
            transition={{ duration: 1, delay: 0.62, ease: CALMA }}
            href={CONVERSAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="click_whatsapp"
            className={`mt-4 ${LINK_SUBLINHADO}`}
          >
            {CONVITE}
          </motion.a>
        </motion.div>

        <ul className="border-t border-[#25302a]/10">
          {DUVIDAS.map((duvida, indice) => (
            <Linha
              key={duvida.pergunta}
              duvida={duvida}
              indice={indice}
              aberta={aberta === indice}
              aoTocar={() =>
                setAberta((atual) => (atual === indice ? null : indice))
              }
              reduzirMovimento={reduzirMovimento}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Uma dúvida: a pergunta sempre à vista, a resposta a um toque. */
function Linha({
  duvida,
  indice,
  aberta,
  aoTocar,
  reduzirMovimento,
}: {
  duvida: (typeof DUVIDAS)[number];
  indice: number;
  aberta: boolean;
  aoTocar: () => void;
  reduzirMovimento: boolean | null;
}) {
  const id = `duvida-${indice}`;
  const numero = String(indice + 1).padStart(2, "0");

  // As palavras chegam uma atrás da outra, no ritmo de quem responde falando.
  const bloco: Variants = {
    oculto: {},
    visivel: { transition: { staggerChildren: 0.018, delayChildren: 0.06 } },
  };

  const palavra: Variants = reduzirMovimento
    ? { oculto: { opacity: 1 }, visivel: { opacity: 1 } }
    : {
        oculto: { opacity: 0, y: 8, filter: "blur(5px)" },
        visivel: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: CALMA },
        },
      };

  return (
    <li className="relative border-b border-[#25302a]/10">
      {/* O fundo acende só na dúvida aberta — marca onde você está sem borda. */}
      <AnimatePresence>
        {aberta && !reduzirMovimento && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: CALMA }}
            className="pointer-events-none absolute inset-x-[-1.25rem] inset-y-0 rounded-[20px] bg-[linear-gradient(90deg,rgb(37_48_42/0.05),transparent_72%)]"
          />
        )}
      </AnimatePresence>

      <h3>
        <motion.button
          type="button"
          onClick={aoTocar}
          aria-expanded={aberta}
          aria-controls={id}
          initial={reduzirMovimento ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.9,
            delay: reduzirMovimento ? 0 : indice * 0.06,
            ease: SUAVE,
          }}
          whileHover={reduzirMovimento ? undefined : { x: 6 }}
          className="group relative flex w-full items-start gap-5 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25302a]/60 sm:gap-7"
        >
          <motion.span
            aria-hidden
            animate={{ opacity: aberta ? 0.75 : 0.32 }}
            transition={{ duration: 0.4 }}
            className="mt-[6px] font-serif text-[13px] italic tracking-wide text-[#25302a]"
          >
            {numero}
          </motion.span>

          <motion.span
            animate={{ opacity: aberta ? 1 : 0.82 }}
            transition={{ duration: 0.4 }}
            className="flex-1 text-[19px] leading-snug tracking-tight text-[#25302a] sm:text-[23px]"
          >
            {duvida.pergunta}
          </motion.span>

          <Cruz aberta={aberta} reduzirMovimento={reduzirMovimento} />
        </motion.button>
      </h3>

      <AnimatePresence initial={false}>
        {aberta && (
          <motion.div
            id={id}
            key="resposta"
            initial={reduzirMovimento ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.62, ease: SUAVE },
              opacity: { duration: 0.35 },
            }}
            className="overflow-hidden"
          >
            <motion.p
              variants={bloco}
              initial="oculto"
              animate="visivel"
              className="max-w-xl pb-9 pl-[2.6rem] text-[16px] leading-[1.55] text-[#25302a]/70 sm:pl-[3.4rem] sm:text-[17px]"
            >
              {duvida.resposta.split(" ").map((termo, posicao) => (
                <motion.span
                  key={`${termo}-${posicao}`}
                  variants={palavra}
                  className="inline-block whitespace-pre"
                >
                  {termo}{" "}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** O mais dá meia-volta e perde a barra de pé: termina deitado, como menos. */
function Cruz({
  aberta,
  reduzirMovimento,
}: {
  aberta: boolean;
  reduzirMovimento: boolean | null;
}) {
  const giro = reduzirMovimento
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 26 };

  return (
    <motion.span
      aria-hidden
      animate={{ rotate: aberta ? 180 : 0 }}
      transition={giro}
      className="relative mt-[10px] block size-[15px] shrink-0"
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#25302a]/55 transition-colors group-hover:bg-[#25302a] motion-reduce:transition-none" />
      <motion.span
        animate={{ opacity: aberta ? 0 : 1 }}
        transition={{ duration: 0.22 }}
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#25302a]/55 transition-colors group-hover:bg-[#25302a] motion-reduce:transition-none"
      />
    </motion.span>
  );
}
