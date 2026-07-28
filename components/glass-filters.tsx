// Mapas de deslocamento do vidro — invisíveis, só alimentam os backdrop-filter
// de .liquid-glass. Ficam no layout porque header e navbar usam os mesmos ids.
export function GlassFilters() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <filter id="liquid-glass-refraction">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.006 0.014"
          numOctaves={2}
          seed={7}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="4" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="36"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
      <filter id="liquid-glass-edge">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.003 0.005"
          numOctaves={1}
          seed={7}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="8" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="26"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
