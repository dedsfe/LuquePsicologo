"use client"

import * as React from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/SplitText"
import { AGENDAR_URL } from "@/lib/whatsapp"
import { HeroBackdrop } from "@/components/hero-backdrop"

gsap.registerPlugin(useGSAP, SplitText)

export function Hero() {
  const root = React.useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean; full: boolean }

          // Público com pânico/agorafobia: quem pede menos movimento recebe o estado final direto.
          if (reduce) {
            gsap.set("[data-reveal], [data-hero-title]", { opacity: 1, y: 0 })
            return
          }

          // autoSplit re-divide as linhas quando a Instrument Serif termina de carregar.
          // O onSplit precisa devolver a SUA PRÓPRIA animação — é ela que o GSAP reverte a
          // cada re-split. Devolvendo a timeline do hero inteiro, o resto reanimava junto.
          const split = SplitText.create("[data-hero-title]", {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (instance) =>
              gsap.from(instance.lines, {
                yPercent: 110,
                duration: 1.2,
                stagger: 0.11,
                ease: "power4.out",
                delay: 0.15,
              }),
          })

          gsap.from("[data-reveal]", {
            y: 18,
            opacity: 0,
            duration: 1,
            stagger: 0.14,
            delay: 0.6,
            ease: "power3.out",
          })

          // Devolve o DOM original: sem isso o split deixa as <div> de linha para trás.
          return () => split.revert()
        }
      )

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    // O fundo fica branco de propósito: é o lugar reservado para a imagem do hero.
    <section
      ref={root}
      className="relative flex min-h-svh w-full flex-col items-center px-6 pb-24 pt-[26vh] text-center sm:px-10"
    >
      <HeroBackdrop />

      <h1
        data-hero-title
        className="max-w-[15ch] font-display text-[clamp(3rem,8.5vw,6.75rem)] italic leading-[0.95] tracking-[-0.02em] text-ink"
      >
        Você não precisa sair de casa para começar
      </h1>

      <p
        data-reveal
        className="mt-9 max-w-[46ch] text-[1.02rem] leading-[1.65] text-ink-soft"
      >
        Psicanálise online para quem convive com ansiedade, síndrome do pânico e
        agorafobia. A conversa inicial é sem compromisso.
      </p>

      <div data-reveal className="mt-11">
        <a
          href={AGENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="click_agendar"
          className="inline-flex items-center rounded-full bg-ink px-9 py-4 text-[1rem] text-paper transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        >
          Agendar conversa inicial
        </a>
      </div>
    </section>
  )
}
