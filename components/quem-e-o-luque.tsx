"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { BOTAO_VIDRO, LINK_SUBLINHADO_CLARO } from "@/lib/botoes";
import { CONVERSAR_URL } from "@/lib/whatsapp";

// A pergunta é do visitante; o que vem depois é o Luque em primeira pessoa.
const PERGUNTA = "E quem vai estar do outro lado?";
const NOME = "Luque Gonçalves";

// O CFP exige o registro em material de divulgação. Aparece aqui e no rodapé.
const CRP = "CRP 139094";

// Os papéis vêm do André: o cara tem repertório clínico e é pai, avô, pastor e
// músico. É essa soma que faz alguém confiar o próprio pânico a ele.
const PAPEIS = ["psicanalista", "pai", "avô", "pastor", "músico"];

// TODO (André): copy provisória. Formação e tempo de clínica não estão aqui
// porque eu não invento dado do Luque.
const FALA =
  "O que eu estudei está a serviço da conversa, não do diagnóstico. Você não vai falar com um especialista distante — vai falar comigo.";

const ALT =
  "Luque Gonçalves sentado à mesa de um estúdio, falando ao microfone durante a gravação de um podcast.";

/** Opacidade + subida a partir de uma faixa do progresso do scroll. */
function useEntrada(
  progresso: MotionValue<number>,
  inicio: number,
  fim: number,
) {
  const opacidade = useTransform(progresso, [inicio, fim], [0, 1]);
  const y = useTransform(progresso, [inicio, fim], [26, 0]);
  return { opacity: opacidade, y };
}

export function QuemEOLuque() {
  const reduzirMovimento = useReducedMotion();
  const referenciaTrilha = useRef<HTMLDivElement>(null);

  // O progresso é medido à mão: com `offset` do useScroll ele voltava no meio
  // do caminho (curva triangular), e aqui a conta precisa ser monotônica —
  // do topo da trilha até o ponto em que ela termina de passar.
  const { scrollY } = useScroll();
  const [curso, setCurso] = useState({ inicio: 0, extensao: 1 });

  useEffect(() => {
    const medir = () => {
      const trilha = referenciaTrilha.current;
      if (!trilha) return;
      const inicio = trilha.offsetTop;
      const extensao = Math.max(1, trilha.offsetHeight - window.innerHeight);
      setCurso({ inicio, extensao });
    };

    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  const scrollYProgress = useTransform(
    scrollY,
    [curso.inicio, curso.inicio + curso.extensao],
    [0, 1],
    { clamp: true },
  );

  // A foto cresce do centro até ocupar a tela — clip-path em vez de escala,
  // pra imagem não distorcer nem perder nitidez no caminho.
  const recorte = useTransform(scrollYProgress, (v) => {
    const abertura = Math.min(1, v / 0.34);
    const vertical = 24 * (1 - abertura);
    const horizontal = 28 * (1 - abertura);
    const raio = 24 * (1 - abertura);
    return `inset(${vertical}% ${horizontal}% ${vertical}% ${horizontal}% round ${raio}px)`;
  });

  // O véu só escurece depois que a foto já tomou a tela: é o que deixa a fala
  // legível sem tirar o rosto de cena.
  const veu = useTransform(scrollYProgress, [0.34, 0.46], [0, 0.58]);

  const entradaPergunta = useEntrada(scrollYProgress, 0.38, 0.46);
  const entradaNome = useEntrada(scrollYProgress, 0.44, 0.54);
  const entradaFala = useEntrada(scrollYProgress, 0.7, 0.8);
  const entradaBotao = useEntrada(scrollYProgress, 0.84, 0.94);

  // Cada papel tem sua fatia: eles chegam um atrás do outro, como fala.
  const passoPapel = 0.025;
  const inicioPapeis = 0.58;

  // Sem movimento: a foto num quadro comum e o texto embaixo dela.
  if (reduzirMovimento) {
    return (
      <section
        id="quem-e-o-luque"
        className="bg-[#f4f2ec] px-6 py-[16vh] sm:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-serif text-lg italic text-[#25302a]/45 sm:text-xl">
            {PERGUNTA}
          </p>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[24px] bg-[#e8e4da]">
            <Image
              src="/luque-podcast.webp"
              alt={ALT}
              fill
              quality={100}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover object-[50%_28%]"
            />
          </div>

          <p className="mt-6 text-[15px] font-medium text-[#25302a]">
            {NOME}
            <span className="ml-2 font-normal text-[#25302a]/50">{CRP}</span>
          </p>

          <p className="mt-6 font-serif text-[30px] italic leading-[1.15] text-[#25302a] sm:text-[44px]">
            {PAPEIS.join(" · ")}
          </p>

          <p className="mt-10 max-w-2xl text-[22px] leading-[1.4] tracking-tight text-[#25302a] sm:text-[27px]">
            {FALA}
          </p>

          <a
            href={CONVERSAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="click_whatsapp"
            className={`mt-12 w-fit ${BOTAO_VIDRO}`}
          >
            <span className="relative">Falar com o Luque</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="quem-e-o-luque" className="bg-[#f4f2ec]">
      {/* A trilha dá o curso do scroll; o quadro fica preso no meio dela. */}
      <div ref={referenciaTrilha} className="relative h-[340vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.div
            style={{ clipPath: recorte }}
            className="relative h-full w-full"
          >
            <Image
              src="/luque-podcast.webp"
              alt={ALT}
              fill
              priority={false}
              quality={100}
              sizes="100vw"
              className="object-cover object-[50%_26%]"
            />

            {/* Véu em gradiente: escurece o lado do texto e devolve o rosto
                à direita, em vez de apagar a foto inteira por igual. */}
            <motion.div
              aria-hidden
              style={{ opacity: veu }}
              className="absolute inset-0 bg-gradient-to-r from-[#101611] via-[#101611]/70 to-[#101611]/15"
            />

            {/* A fala aparece sobre ela depois que a foto já está parada. */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-14">
              <div className="mx-auto w-full max-w-5xl">
                <motion.p
                  style={entradaPergunta}
                  className="font-serif text-[15px] italic text-[#fdfcf9]/55 sm:text-base"
                >
                  {PERGUNTA}
                </motion.p>

                {/* O nome é o herói tipográfico: serifa itálica grande, uma
                    linha só. Os papéis viram apoio miúdo embaixo dele. */}
                <motion.p
                  style={entradaNome}
                  className="mt-4 font-serif text-[52px] italic leading-[0.95] tracking-[-0.02em] text-[#fdfcf9] sm:text-[86px]"
                >
                  {NOME}
                </motion.p>

                <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4">
                  {PAPEIS.map((papel, indice) => (
                    <PapelNaFoto
                      key={papel}
                      papel={papel}
                      primeiro={indice === 0}
                      progresso={scrollYProgress}
                      inicio={inicioPapeis + indice * passoPapel}
                      fim={inicioPapeis + indice * passoPapel + 0.05}
                    />
                  ))}
                </ul>

                {/* O registro entra miúdo: é exigência do CFP, não argumento. */}
                <motion.p
                  style={entradaNome}
                  className="mt-4 text-[13px] tracking-wide text-[#fdfcf9]/45"
                >
                  {CRP}
                </motion.p>

                <motion.p
                  style={entradaFala}
                  className="mt-9 max-w-xl text-[18px] leading-[1.5] text-[#fdfcf9]/90 sm:text-[22px]"
                >
                  {FALA}
                </motion.p>

                {/* Aqui o fundo é a foto escura: o vidro do header escurece
                    junto e engole o rótulo. Então vale o outro estilo dele —
                    o link sublinhado, na versão clara. */}
                <motion.a
                  style={entradaBotao}
                  href={CONVERSAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics="click_whatsapp"
                  className={`mt-11 w-fit ${LINK_SUBLINHADO_CLARO}`}
                >
                  Falar com o Luque
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Um papel dele, entrando na sua vez. */
function PapelNaFoto({
  papel,
  primeiro,
  progresso,
  inicio,
  fim,
}: {
  papel: string;
  primeiro: boolean;
  progresso: MotionValue<number>;
  inicio: number;
  fim: number;
}) {
  const opacidade = useTransform(progresso, [inicio, fim], [0, 1]);
  const y = useTransform(progresso, [inicio, fim], ["110%", "0%"]);

  return (
    <li className="flex items-center gap-x-3 sm:gap-x-4">
      {!primeiro && (
        <span aria-hidden className="text-[#fdfcf9]/35">
          ·
        </span>
      )}
      <span className="overflow-hidden pb-[0.1em]">
        <motion.span
          style={{ opacity: opacidade, y }}
          className="block text-[14px] leading-snug text-[#fdfcf9]/75 sm:text-[16px]"
        >
          {papel}
        </motion.span>
      </span>
    </li>
  );
}
