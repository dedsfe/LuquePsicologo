import { ComoComecar } from "@/components/como-comecar";
import { Conversa } from "@/components/conversa";
import { Duvidas } from "@/components/duvidas";
import { Fecho } from "@/components/fecho";
import { Header } from "@/components/header";
import { Manifesto } from "@/components/manifesto";
import { Navbar } from "@/components/navbar";
import { OQueAtendo } from "@/components/o-que-atendo";
import { ParaQuem } from "@/components/para-quem";
import { Pausa } from "@/components/pausa";
import { QuemEOLuque } from "@/components/quem-e-o-luque";
import { Rodape } from "@/components/rodape";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* O conteúdo anda por cima do rodapé, que fica preso no fim da tela e
          vai sendo descoberto. Daí o z-10 e o fundo próprio aqui. */}
      <div className="relative z-10 bg-[#fdfcf9]">
        <Header />
        {/* Antes de qualquer coisa contemplativa: quem chega de anúncio
            precisa se reconhecer na primeira rolada. */}
        <OQueAtendo />
        <Manifesto />
        <Pausa />
        <Conversa />
        <ParaQuem />
        <QuemEOLuque />
        <ComoComecar />
        <Duvidas />
        <Fecho />
      </div>

      <Rodape />
    </>
  );
}
