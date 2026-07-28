"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { CONVERSAR_URL } from "@/lib/whatsapp";

// TODO (André): número do registro e e-mail entram aqui quando existirem —
// nada de registro inventado no ar.
const NOME = "Luque Gonçalves";

// O CFP exige o registro em material de divulgação — o rodapé é o lugar padrão.
const CRP = "CRP 139094";
const ASSINATURA = "psicanalista · atendimento online";

const ATALHOS = [
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Como começar", href: "#como-comecar" },
  { rotulo: "Perguntas", href: "#perguntas" },
  { rotulo: "Quem é o Luque", href: "#quem-e-o-luque" },
];

const AVISO =
  "Este site é informativo e não substitui atendimento de urgência. Se você estiver em risco, ligue 188 (CVV, 24h) ou procure o pronto-socorro mais próximo.";

const SUAVE = [0.22, 1, 0.36, 1] as const;

export function Rodape() {
  const reduzirMovimento = useReducedMotion();
  const referencia = useRef<HTMLElement>(null);
  const emVista = useInView(referencia, { once: true, amount: 0.35 });

  return (
    <footer
      ref={referencia}
      // Fica colado no fim da tela e é descoberto pelo conteúdo que passa por
      // cima — por isso as seções acima carregam fundo próprio e z maior.
      className="sticky bottom-0 z-0 flex min-h-[86svh] flex-col justify-between overflow-hidden bg-[#101611] px-6 pb-8 pt-[14vh] text-[#fdfcf9] sm:px-10"
    >
      {/* Luz baixa vindo de cima, pra chapa preta não ficar chapada. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(70%_100%_at_50%_0%,rgb(233_201_138/0.1),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-5xl gap-14 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <Revelado ligado={emVista} parado={reduzirMovimento}>
            <p className="max-w-sm text-[22px] leading-snug tracking-tight text-[#fdfcf9]/90 sm:text-[26px]">
              A conversa começa quando você quiser.
            </p>
          </Revelado>

          <Revelado ligado={emVista} parado={reduzirMovimento} atraso={0.12}>
            <a
              href={CONVERSAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="click_whatsapp"
              className="group mt-7 inline-flex flex-col text-[15px] text-[#fdfcf9]/70 transition-colors hover:text-[#fdfcf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fdfcf9]/60 motion-reduce:transition-none"
            >
              Chamar no WhatsApp
              {/* O traço cresce da esquerda no hover. */}
              <span
                aria-hidden
                className="mt-1 h-px w-full origin-left scale-x-0 bg-[#fdfcf9]/60 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          </Revelado>
        </div>

        <nav className="grid gap-8 sm:grid-cols-2">
          <Revelado ligado={emVista} parado={reduzirMovimento} atraso={0.18}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#fdfcf9]/35">
              seções
            </p>
            <ul className="mt-4 space-y-2">
              {ATALHOS.map((atalho) => (
                <li key={atalho.href}>
                  <a
                    href={atalho.href}
                    className="text-[15px] text-[#fdfcf9]/70 transition-colors hover:text-[#fdfcf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fdfcf9]/60 motion-reduce:transition-none"
                  >
                    {atalho.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </Revelado>

          <Revelado ligado={emVista} parado={reduzirMovimento} atraso={0.26}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#fdfcf9]/35">
              atendimento
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#fdfcf9]/70">
              Online, de qualquer lugar do Brasil.
            </p>
            <Relogio />
          </Revelado>
        </nav>
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* O nome ocupa a base inteira e sobe de dentro da própria máscara. É
            SVG porque `textLength` faz a palavra caber exata na largura, em
            qualquer tela — com texto solto ela vaza ou sobra. */}
        <div className="mt-[12vh] overflow-hidden">
          <motion.svg
            aria-hidden
            viewBox="0 0 1000 172"
            preserveAspectRatio="xMidYMid meet"
            initial={reduzirMovimento ? false : { y: "22%", opacity: 0 }}
            animate={
              emVista || reduzirMovimento
                ? { y: "0%", opacity: 1 }
                : { y: "22%", opacity: 0 }
            }
            transition={{ duration: 1.5, ease: SUAVE }}
            className="block w-full"
          >
            {/* 166 é o corpo em que o nome já chega quase nos 1000 do viewBox:
                o textLength vira acerto fino, não esticamento de letra. */}
            <text
              x="0"
              y="146"
              textLength="1000"
              lengthAdjust="spacing"
              fill="currentColor"
              className="font-serif italic"
              style={{ fontSize: 166 }}
            >
              {NOME}
            </text>
          </motion.svg>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-[#fdfcf9]/12 pt-7 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xl text-[12px] leading-relaxed text-[#fdfcf9]/45">
            {AVISO}
          </p>
          <p className="text-[12px] text-[#fdfcf9]/35 sm:text-right">
            {ASSINATURA}
            <br />© {new Date().getFullYear()} {NOME} · {CRP}
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Entrada padrão do rodapé: sobe atrás de uma máscara, no seu tempo. */
function Revelado({
  children,
  ligado,
  parado,
  atraso = 0,
}: {
  children: React.ReactNode;
  ligado: boolean;
  parado: boolean | null;
  atraso?: number;
}) {
  if (parado) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={
        ligado
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 20, filter: "blur(6px)" }
      }
      transition={{ duration: 1.1, delay: atraso, ease: SUAVE }}
    >
      {children}
    </motion.div>
  );
}

/** A hora de São Paulo, andando. Só depois do mount, pra não brigar com o SSR. */
function Relogio() {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const ler = () =>
      setHora(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }).format(new Date()),
      );

    ler();
    const relogio = setInterval(ler, 30_000);
    return () => clearInterval(relogio);
  }, []);

  return (
    <p className="mt-3 flex items-center gap-2 text-[13px] text-[#fdfcf9]/45">
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="size-[6px] shrink-0 rounded-full bg-[#fdfcf9]/70"
      />
      {hora ? `agora são ${hora} em São Paulo` : " "}
    </p>
  );
}
