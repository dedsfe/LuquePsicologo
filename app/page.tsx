import { Conversa } from "@/components/conversa";
import { Header } from "@/components/header";
import { Manifesto } from "@/components/manifesto";
import { Navbar } from "@/components/navbar";
import { Pausa } from "@/components/pausa";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Manifesto />
      <Pausa />
      <Conversa />
    </>
  );
}
