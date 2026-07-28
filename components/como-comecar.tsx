"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { BOTAO_VIDRO } from "@/lib/botoes";
import { AGENDAR_URL } from "@/lib/whatsapp";

// TODO (André): copy provisória. Nada aqui promete resultado (CFP) — os três
// passos descrevem só o caminho até a primeira conversa.
const OLHO = "E como isso começa?";
const TITULO_ANTES = "O começo é ";
const TITULO_CHAVE = "menor";
const TITULO_DEPOIS = " do que parece.";

const PASSOS = [
  {
    numero: "01",
    antes: "Você ",
    chave: "escreve",
    depois: ".",
    texto:
      "Uma frase basta. Não precisa estar organizado, nem saber o nome do que você sente.",
  },
  {
    numero: "02",
    antes: "A gente ",
    chave: "combina",
    depois: " o horário.",
    texto:
      "Quem responde é o Luque, não um robô. Vocês acham um dia que caiba na sua semana.",
  },
  {
    numero: "03",
    antes: "A conversa ",
    chave: "acontece",
    depois: ".",
    texto:
      "Online, de onde você estiver. Cerca de 50 minutos, sem precisar atravessar a cidade.",
  },
] as const;

const FECHO = "Você não precisa estar pronto pra mandar a primeira mensagem.";
const SUAVE = [0.22, 1, 0.36, 1] as const;
const CALMA = [0.33, 0, 0.15, 1] as const;

// Geometria do fio: ele desce quase reto e respira de leve pros lados. A onda
// é uma senoide fechada, então dá pra saber o x de qualquer y — é assim que os
// nós e o ponto de luz caem exatamente em cima da linha.
const FIO_CENTRO = 22;
const FIO_AMPLITUDE = 13;
const FIO_ONDAS = 3;
const FIO_LARGURA = FIO_CENTRO + FIO_AMPLITUDE + 10;

const xDoFio = (y: number, altura: number) =>
  FIO_CENTRO +
  FIO_AMPLITUDE * Math.sin((y / Math.max(1, altura)) * Math.PI * FIO_ONDAS);

/** O caminho inteiro, em pixels reais — sem viewBox esticada distorcendo a curva. */
function desenharFio(altura: number) {
  if (altura <= 0) return "";
  const partes = Math.max(2, Math.round(altura / 6));
  let d = "";
  for (let i = 0; i <= partes; i++) {
    const y = (altura * i) / partes;
    d += `${i === 0 ? "M" : "L"}${xDoFio(y, altura).toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

export function ComoComecar() {
  const reduzirMovimento = useReducedMotion();
  const trilha = useRef<HTMLDivElement>(null);
  const marcos = useRef<Array<HTMLSpanElement | null>>([]);

  // A altura da trilha e o centro de cada número, medidos no DOM: a linha
  // precisa acompanhar o texto real, não uma altura chutada.
  const [medida, setMedida] = useState({ altura: 0, nos: [] as number[] });

  useEffect(() => {
    const alvo = trilha.current;
    if (!alvo) return;

    const medir = () => {
      const base = alvo.getBoundingClientRect().top;
      const nos = marcos.current.map((marco) => {
        if (!marco) return 0;
        const caixa = marco.getBoundingClientRect();
        return caixa.top - base + caixa.height / 2;
      });
      setMedida({ altura: alvo.offsetHeight, nos });
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(alvo);
    window.addEventListener("resize", medir);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  // O fio se desenha com o scroll; a mola tira o serrilhado do trackpad.
  const { scrollYProgress } = useScroll({
    target: trilha,
    offset: ["start 80%", "end 65%"],
  });
  const avanco = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });

  const caminho = useMemo(() => desenharFio(medida.altura), [medida.altura]);

  // O passo "aceso" é aquele que a ponta do fio já alcançou — o texto acende
  // junto, então quem lê sabe onde está sem precisar de barra de progresso.
  const [alcancado, setAlcancado] = useState(-1);
  useMotionValueEvent(avanco, "change", (valor) => {
    const y = valor * medida.altura;
    let ultimo = -1;
    medida.nos.forEach((no, indice) => {
      if (no <= y + 1) ultimo = indice;
    });
    setAlcancado(ultimo);
  });

  // A ponta luminosa: mesma senoide da linha, então ela nunca sai do trilho.
  const pontaY = useTransform(avanco, (v) => v * medida.altura);
  const pontaX = useTransform(pontaY, (y) => xDoFio(y, medida.altura));
  const pontaOpacidade = useTransform(avanco, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  const cabecalho = {
    initial: { filter: "blur(7px)", opacity: 0, y: 14 },
    whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
  } as const;

  return (
    <section id="como-comecar" className="bg-[#fdfcf9] px-6 py-[18vh] sm:px-10">
      <div className="mx-auto max-w-5xl">
        {reduzirMovimento ? (
          <>
            <p className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl">
              {OLHO}
            </p>
            <h2 className="mt-5 max-w-2xl text-[30px] leading-[1.15] tracking-tight text-[#25302a] sm:text-[46px]">
              {TITULO_ANTES}
              <em className="font-serif italic">{TITULO_CHAVE}</em>
              {TITULO_DEPOIS}
            </h2>
          </>
        ) : (
          <>
            <motion.p
              {...cabecalho}
              transition={{ duration: 1.3, ease: CALMA }}
              className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl"
            >
              {OLHO}
            </motion.p>
            <motion.h2
              {...cabecalho}
              transition={{ duration: 1.5, delay: 0.28, ease: CALMA }}
              className="mt-5 max-w-2xl text-[30px] leading-[1.15] tracking-tight text-[#25302a] sm:text-[46px]"
            >
              {TITULO_ANTES}
              <em className="font-serif italic">{TITULO_CHAVE}</em>
              {TITULO_DEPOIS}
            </motion.h2>
          </>
        )}

        <div ref={trilha} className="relative mt-[13vh]">
          {/* O fio liga os três passos. É decoração: a ordem já está no <ol>. */}
          {!reduzirMovimento && medida.altura > 0 && (
            <svg
              aria-hidden
              width={FIO_LARGURA}
              height={medida.altura}
              viewBox={`0 0 ${FIO_LARGURA} ${medida.altura}`}
              className="pointer-events-none absolute left-0 top-0"
            >
              <defs>
                <linearGradient id="fio-comeco" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#25302a" stopOpacity="0.1" />
                  <stop offset="45%" stopColor="#25302a" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#25302a" stopOpacity="0.16" />
                </linearGradient>
              </defs>

              {/* Sulco apagado: mostra que o caminho continua adiante. */}
              <path
                d={caminho}
                fill="none"
                stroke="#25302a"
                strokeOpacity="0.08"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <motion.path
                d={caminho}
                fill="none"
                stroke="url(#fio-comeco)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ pathLength: avanco }}
              />

              {medida.nos.map((y, indice) => (
                <NoDoFio
                  key={indice}
                  x={xDoFio(y, medida.altura)}
                  y={y}
                  aceso={indice <= alcancado}
                />
              ))}

              <motion.circle
                cx={pontaX}
                cy={pontaY}
                r={9}
                fill="#25302a"
                fillOpacity={0.12}
                style={{ opacity: pontaOpacidade }}
              />
              <motion.circle
                cx={pontaX}
                cy={pontaY}
                r={3.5}
                fill="#25302a"
                style={{ opacity: pontaOpacidade }}
              />
            </svg>
          )}

          <ol className="flex flex-col gap-[16vh] pl-16 sm:pl-24">
            {PASSOS.map((passo, indice) => (
              <Passo
                key={passo.numero}
                passo={passo}
                indice={indice}
                aceso={reduzirMovimento ? true : indice <= alcancado}
                reduzirMovimento={reduzirMovimento}
                progressoDaTrilha={avanco}
                registrarMarco={(elemento) => {
                  marcos.current[indice] = elemento;
                }}
              />
            ))}
          </ol>
        </div>

        <Fecho reduzirMovimento={reduzirMovimento} />
      </div>
    </section>
  );
}

// Em SVG o motion escala a partir da caixa da própria forma (fill-box), então
// o centro é "center" — origem em pixels aqui manda o halo pro lugar errado.
const CENTRO_DA_FORMA = {
  transformBox: "fill-box",
  transformOrigin: "center",
} as const;

/** O ponto onde o fio encosta num passo — acende quando a linha chega nele. */
function NoDoFio({ x, y, aceso }: { x: number; y: number; aceso: boolean }) {
  return (
    <>
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill="#fdfcf9"
        stroke="#25302a"
        strokeWidth="1.5"
        initial={{ scale: 0.72, strokeOpacity: 0.16 }}
        animate={{ scale: aceso ? 1 : 0.72, strokeOpacity: aceso ? 0.55 : 0.16 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        style={CENTRO_DA_FORMA}
      />
      {/* Um halo curto marca a chegada e sai de cena. */}
      {aceso && (
        <motion.circle
          cx={x}
          cy={y}
          r={4}
          fill="none"
          stroke="#25302a"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 3.4, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={CENTRO_DA_FORMA}
        />
      )}
    </>
  );
}

/** Um passo: número, fala e a cena que mostra o passo acontecendo. */
function Passo({
  passo,
  indice,
  aceso,
  reduzirMovimento,
  progressoDaTrilha,
  registrarMarco,
}: {
  passo: (typeof PASSOS)[number];
  indice: number;
  aceso: boolean;
  reduzirMovimento: boolean | null;
  progressoDaTrilha: MotionValue<number>;
  registrarMarco: (elemento: HTMLSpanElement | null) => void;
}) {
  const referencia = useRef<HTMLLIElement>(null);
  const emVista = useInView(referencia, { once: true, amount: 0.4 });

  // A cena flutua um tanto contra o scroll — dá profundidade sem chamar atenção.
  const deslocamento = useTransform(
    progressoDaTrilha,
    [0, 1],
    [10 + indice * 4, -(10 + indice * 4)],
  );

  const entrada = reduzirMovimento
    ? {}
    : {
        initial: { opacity: 0, y: 18, filter: "blur(6px)" },
        animate: emVista
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 18, filter: "blur(6px)" },
      };

  return (
    <li
      ref={referencia}
      className="grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-12"
    >
      <div>
        <span
          ref={registrarMarco}
          className="inline-block overflow-hidden pb-[0.12em] font-serif text-[15px] italic tracking-wide text-[#25302a]/40"
        >
          {reduzirMovimento ? (
            passo.numero
          ) : (
            <motion.span
              className="block"
              initial={{ y: "115%" }}
              animate={emVista ? { y: "0%" } : { y: "115%" }}
              transition={{ duration: 0.9, ease: SUAVE }}
            >
              {passo.numero}
            </motion.span>
          )}
        </span>

        <motion.h3
          {...entrada}
          transition={{ duration: 1.1, delay: 0.1, ease: CALMA }}
          className="mt-4 text-[26px] leading-[1.15] tracking-tight text-[#25302a] sm:text-[34px]"
        >
          {passo.antes}
          <em className="font-serif italic">{passo.chave}</em>
          {passo.depois}
        </motion.h3>

        <motion.p
          {...entrada}
          transition={{ duration: 1.2, delay: 0.34, ease: CALMA }}
          className="mt-4 max-w-md text-[17px] leading-[1.5] text-[#25302a]/65 sm:text-[19px]"
        >
          {passo.texto}
        </motion.p>
      </div>

      <motion.div
        style={{ y: reduzirMovimento ? 0 : deslocamento }}
        className="flex justify-center sm:justify-end"
      >
        <Cena
          indice={indice}
          ligada={aceso || emVista}
          reduzirMovimento={reduzirMovimento}
        />
      </motion.div>
    </li>
  );
}

function Cena({
  indice,
  ligada,
  reduzirMovimento,
}: {
  indice: number;
  ligada: boolean;
  reduzirMovimento: boolean | null;
}) {
  if (indice === 0)
    return <CenaMensagem ligada={ligada} reduzirMovimento={reduzirMovimento} />;
  if (indice === 1)
    return <CenaHorario ligada={ligada} reduzirMovimento={reduzirMovimento} />;
  return <CenaEncontro reduzirMovimento={reduzirMovimento} />;
}

/** Moldura das cenas: papel um tom acima do fundo, canto grande, sombra rasa. */
function Quadro({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-[26px] bg-[#f4f2ec] p-6 shadow-[0_1px_2px_rgb(37_48_42/0.04),0_18px_40px_-24px_rgb(37_48_42/0.28)] sm:p-7">
      {children}
    </div>
  );
}

const MENSAGEM = "Oi, Luque. Eu queria conversar.";
const RESPOSTA = "Oi! Que bom que você escreveu.";

/** Passo 01: a mensagem sendo escrita, entregue e respondida. */
function CenaMensagem({
  ligada,
  reduzirMovimento,
}: {
  ligada: boolean;
  reduzirMovimento: boolean | null;
}) {
  const [letras, setLetras] = useState(0);

  useEffect(() => {
    if (!ligada || reduzirMovimento) return;
    let contador = 0;
    // Ritmo de quem digita com cuidado, não de máquina.
    const relogio = setInterval(() => {
      contador += 1;
      setLetras(contador);
      if (contador >= MENSAGEM.length) clearInterval(relogio);
    }, 45);
    return () => clearInterval(relogio);
  }, [ligada, reduzirMovimento]);

  const completa = !!reduzirMovimento || letras >= MENSAGEM.length;
  const texto = reduzirMovimento ? MENSAGEM : MENSAGEM.slice(0, letras);

  return (
    <Quadro>
      <div className="flex min-h-[188px] flex-col justify-end gap-3">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-[20px] bg-[#25302a] px-[18px] py-3 text-right text-[15px] leading-relaxed text-[#fdfcf9]">
            {texto || " "}
            {!completa && (
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="ml-[2px] inline-block h-[15px] w-[2px] translate-y-[2px] bg-[#fdfcf9]"
              />
            )}
          </p>
        </div>

        <motion.p
          initial={reduzirMovimento ? false : { opacity: 0 }}
          animate={{ opacity: completa ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-right text-[11px] tracking-wide text-[#25302a]/35"
        >
          entregue
        </motion.p>

        {/* A resposta chega depois de um respiro — ninguém responde no mesmo segundo. */}
        <motion.p
          initial={reduzirMovimento ? false : { opacity: 0, scale: 0.86, y: 10 }}
          animate={
            completa
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.86, y: 10 }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            delay: reduzirMovimento ? 0 : 1.1,
          }}
          style={{ originX: 0, originY: 1 }}
          className="max-w-[85%] self-start rounded-[20px] bg-[#fdfcf9] px-[18px] py-3 text-[15px] leading-relaxed text-[#25302a]/80"
        >
          {RESPOSTA}
        </motion.p>
      </div>
    </Quadro>
  );
}

const HORARIOS = ["ter · 19h", "qua · 8h", "qui · 20h", "sáb · 10h"];
const ESCOLHIDO = 2;

/** Passo 02: os horários chegam e um deles fica de pé. */
function CenaHorario({
  ligada,
  reduzirMovimento,
}: {
  ligada: boolean;
  reduzirMovimento: boolean | null;
}) {
  const [decidido, setDecidido] = useState(false);

  useEffect(() => {
    if (!ligada || reduzirMovimento) return;
    const relogio = setTimeout(() => setDecidido(true), 1500);
    return () => clearTimeout(relogio);
  }, [ligada, reduzirMovimento]);

  const marcado = !!reduzirMovimento || decidido;

  return (
    <Quadro>
      <div className="flex min-h-[188px] flex-col justify-center gap-[10px]">
        <p className="mb-1 text-[11px] tracking-wide text-[#25302a]/35">
          esta semana
        </p>

        {HORARIOS.map((horario, indice) => {
          const escolhido = marcado && indice === ESCOLHIDO;

          return (
            <motion.div
              key={horario}
              initial={reduzirMovimento ? false : { opacity: 0, x: -12 }}
              animate={
                ligada
                  ? { opacity: escolhido || !marcado ? 1 : 0.4, x: 0 }
                  : { opacity: 0, x: -12 }
              }
              transition={{
                duration: 0.7,
                delay: reduzirMovimento ? 0 : indice * 0.12,
                ease: SUAVE,
              }}
              className="relative overflow-hidden rounded-full"
            >
              {/* O preenchimento entra deslizando: é a escolha sendo feita. */}
              <motion.span
                aria-hidden
                initial={false}
                animate={{ scaleX: escolhido ? 1 : 0 }}
                transition={{ duration: 0.7, ease: SUAVE }}
                style={{ originX: 0 }}
                className="absolute inset-0 rounded-full bg-[#25302a]"
              />
              <p
                className={`relative flex items-center justify-between rounded-full px-5 py-[10px] text-[15px] transition-colors duration-500 ${
                  escolhido
                    ? "text-[#fdfcf9]"
                    : "text-[#25302a]/70 ring-1 ring-inset ring-[#25302a]/10"
                }`}
              >
                {horario}
                <motion.span
                  initial={false}
                  animate={{ opacity: escolhido ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: escolhido ? 0.35 : 0 }}
                  className="text-[13px]"
                >
                  combinado
                </motion.span>
              </p>
            </motion.div>
          );
        })}
      </div>
    </Quadro>
  );
}

/** Passo 03: nada acontece, e é esse o ponto — só um ritmo calmo. */
function CenaEncontro({
  reduzirMovimento,
}: {
  reduzirMovimento: boolean | null;
}) {
  return (
    <Quadro>
      <div className="relative flex min-h-[188px] items-center justify-center">
        {/* Ondas saindo do centro: é o que dá o pulso da respiração. */}
        {!reduzirMovimento &&
          [0, 1, 2].map((anel) => (
            <motion.span
              key={anel}
              aria-hidden
              animate={{ scale: [0.86, 1.55], opacity: [0.34, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: anel * 1.85,
              }}
              className="absolute size-28 rounded-full border border-[#25302a]/40"
            />
          ))}

        {/* Ciclo de respiração: enche, segura, esvazia devagar. */}
        <motion.span
          aria-hidden
          animate={reduzirMovimento ? undefined : { scale: [1, 1.16, 1.16, 1] }}
          transition={
            reduzirMovimento
              ? undefined
              : {
                  duration: 11,
                  times: [0, 0.36, 0.5, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute size-28 rounded-full bg-[radial-gradient(circle_at_38%_32%,rgb(37_48_42/0.22),rgb(37_48_42/0.06)_62%,rgb(37_48_42/0.02))] shadow-[inset_0_1px_2px_rgb(253_252_249/0.6)]"
        />

        <p className="relative max-w-[11rem] text-center font-serif text-[19px] italic leading-snug text-[#25302a]">
          de onde você estiver
        </p>
      </div>
    </Quadro>
  );
}

/** O convite final: uma frase e um botão que vem ao encontro do cursor. */
function Fecho({ reduzirMovimento }: { reduzirMovimento: boolean | null }) {
  return (
    <div className="mt-[18vh] flex flex-col items-center text-center">
      <motion.p
        initial={
          reduzirMovimento ? false : { opacity: 0, filter: "blur(7px)", y: 12 }
        }
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 1.4, ease: CALMA }}
        className="max-w-lg text-balance font-serif text-[24px] italic leading-[1.3] text-[#25302a] sm:text-[30px]"
      >
        {FECHO}
      </motion.p>

      <BotaoIma reduzirMovimento={reduzirMovimento} />
    </div>
  );
}

function BotaoIma({ reduzirMovimento }: { reduzirMovimento: boolean | null }) {
  const referencia = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const molaX = useSpring(x, { stiffness: 190, damping: 17, mass: 0.5 });
  const molaY = useSpring(y, { stiffness: 190, damping: 17, mass: 0.5 });

  // O botão anda um terço do caminho até o cursor: perto o bastante pra
  // parecer vivo, longe o bastante pra não fugir de quem quer clicar.
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
      initial={reduzirMovimento ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1, delay: 0.3, ease: SUAVE }}
      className={`mt-12 ${BOTAO_VIDRO}`}
    >
      <span className="relative">Mandar a primeira mensagem</span>
    </motion.a>
  );
}
