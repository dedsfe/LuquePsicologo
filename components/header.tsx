import Image from "next/image";

import { BOTAO_VIDRO } from "@/lib/botoes";
import { AGENDAR_URL } from "@/lib/whatsapp";

export function Header() {
  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Image
        src="/header-bg-mobile.webp"
        alt=""
        fill
        priority
        quality={100}
        sizes="(min-aspect-ratio: 1429/2560) 100vw, 56vh"
        className="-z-10 object-cover object-bottom md:hidden"
      />
      <Image
        src="/header-bg.webp"
        alt=""
        fill
        priority
        quality={100}
        sizes="(min-aspect-ratio: 4300/2398) 100vw, 179vh"
        className="-z-10 hidden object-cover object-bottom md:block"
      />

      <div className="flex flex-1 flex-col items-center px-6 pt-[22vh] text-center">
        <h1 className="max-w-3xl text-balance text-4xl leading-[1.1] tracking-tight text-[#2f3a32] sm:text-6xl">
          Tem coisas que a gente não resolve{" "}
          <em className="font-serif italic tracking-normal">pensando</em>{" "}
          sozinho
        </h1>
        <p className="mt-6 max-w-lg text-balance text-sm leading-relaxed text-[#2f3a32]/70 sm:text-base">
          Psicoterapia para ansiedade, depressão, luto e as fases em que a vida
          pesa demais. Online e presencial.
        </p>

        {/* Uma porta só: duas chamadas lado a lado dividem a decisão de quem já
            está inseguro pra pedir ajuda. Tudo cai no mesmo WhatsApp. */}
        <div className="mt-10 flex justify-center">
          <a href={AGENDAR_URL} className={BOTAO_VIDRO}>
            <span className="relative">Agendar consulta</span>
          </a>
        </div>
      </div>
    </header>
  );
}
