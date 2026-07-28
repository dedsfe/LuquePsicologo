// Os dois únicos desenhos de botão do site, os mesmos do header. O CTA é de
// vidro; o que for secundário é link sublinhado. Não existe um terceiro.
//
// O texto precisa vir dentro de <span className="relative">: o anel do vidro é
// um ::before com z-index -1, e sem o span o rótulo cai atrás dele.

export const BOTAO_VIDRO =
  "liquid-glass liquid-glass--press inline-flex items-center justify-center rounded-full px-10 py-4 text-[15px] font-medium tracking-tight text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25302a]/60"

// O mesmo botão de vidro em escala de barra: dentro da navbar ele já está atrás
// do blur dela, então usa a variante --compacto (sem backdrop-filter próprio).
//
// Só o material vem daqui. Display, raio, padding e tamanho de texto ficam com
// quem usa — na navbar os três alvos têm formas diferentes, e utilitário que
// briga com utilitário é decidido pela ordem do CSS, não pela ordem da string.
export const BOTAO_VIDRO_BARRA =
  "liquid-glass liquid-glass--press liquid-glass--compacto items-center justify-center font-medium tracking-tight text-[#25302a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25302a]/60"

export const LINK_SUBLINHADO =
  "inline-block text-sm text-[#2f3a32]/65 underline decoration-[#2f3a32]/25 underline-offset-4 transition hover:text-[#2f3a32] hover:decoration-[#2f3a32]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25302a]/60 motion-reduce:transition-none"

// O mesmo link, invertido, para quando o fundo é foto escura.
export const LINK_SUBLINHADO_CLARO =
  "inline-block text-sm text-[#fdfcf9]/70 underline decoration-[#fdfcf9]/30 underline-offset-4 transition hover:text-[#fdfcf9] hover:decoration-[#fdfcf9]/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fdfcf9]/60 motion-reduce:transition-none"
