import Image from "next/image";

import { AGENDAR_URL, CONVERSAR_URL } from "@/lib/whatsapp";

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
          Um lugar para{" "}
          <em className="font-serif italic tracking-normal">respirar</em> e ser
          escutado
        </h1>
        <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-[#2f3a32]/70 sm:text-base">
          Psicoterapia para quem quer entender o próprio ritmo. Atendimento
          online e presencial.
        </p>

        <div className="mt-10 flex flex-col items-center gap-5 md:flex-row md:gap-8">
          <a
            href={AGENDAR_URL}
            className="liquid-glass inline-flex items-center justify-center rounded-full px-10 py-4 text-[15px] font-medium tracking-tight text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25302a]/60"
          >
            <span className="relative">Agendar consulta</span>
          </a>

          <a
            href={CONVERSAR_URL}
            className="text-sm text-[#2f3a32]/65 underline decoration-[#2f3a32]/25 underline-offset-4 transition hover:text-[#2f3a32] hover:decoration-[#2f3a32]/60 motion-reduce:transition-none"
          >
            Tirar uma dúvida antes
          </a>
        </div>
      </div>
    </header>
  );
}
