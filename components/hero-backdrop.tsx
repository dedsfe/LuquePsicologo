// Fundo do hero: papel creme com grain e um fio único subindo pela faixa esquerda.
// O fio sobe limpo, se emaranha no meio do percurso e sai limpo de novo — o nó
// aperta e resolve, nunca cresce. Fica longe do centro para não brigar com a headline.
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f6f3ea]"
    >
      {/* Grain gerado no próprio SVG: sem imagem, sem custo de rede. */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" opacity="0.14" />
      </svg>

      {/* O fio vive numa coluna estreita à esquerda, alta o bastante para atravessar a tela. */}
      <svg
        className="absolute inset-y-0 left-[4vw] h-full w-[min(34vw,380px)] sm:left-[6vw]"
        viewBox="0 0 300 1400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 1400
             C150 1300 149 1180 151 1060
             C153 1000 110 980 88 940
             C60 890 92 828 148 832
             C206 836 240 890 214 934
             C188 978 120 972 96 924
             C68 868 100 786 158 766
             C220 744 272 796 260 856
             C250 910 190 940 144 914
             C102 890 96 828 128 794
             C158 762 210 772 220 808
             C228 838 202 864 180 850
             C164 840 166 816 182 810
             C194 806 202 816 198 828
             C194 780 152 750 150 690
             C148 620 150 400 150 0"
          stroke="#1a1a17"
          strokeOpacity="0.55"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
