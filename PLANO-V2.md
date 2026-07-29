# Plano v2.0: encurtar o caminho até o WhatsApp

Fechamos a v1.0 com o site inteiro no ar e funcionando. A v2.0 não muda a
identidade visual: ela corta rolagem e coloca a informação que decide a
conversão mais perto do topo.

Medido em 28/07/2026, iPhone 15 (tela de 659px), produção.

## O diagnóstico

O site tem **17 telas de rolagem no mobile**. As três landing pages de
psicólogas que rodam Google Ads e que usamos como referência têm de 4 a 6.

Dois furos que a medição mostrou:

1. **Da tela 0,6 até a 7,1 não existe nenhum CTA.** Quem chega de anúncio rola
   seis telas e meia sem ver um botão.
2. **Falta um bloco dizendo o que o Luque atende** (ansiedade, pânico, luto,
   depressão). Hoje isso está diluído dentro de `#para-quem`, lá na tela 5.
   As três referências dizem isso na primeira tela.

## Mapa atual e corte proposto

| seção | arquivo | hoje | meta | o que fazer |
| --- | --- | --- | --- | --- |
| hero | `header.tsx` | 1,0 | 1,0 | mantém |
| `#sobre` | `manifesto.tsx` | 1,2 | 0,6 | juntar o espaçamento (`gap-[10vh]`, `py-[22vh]`) |
| pausa | `pausa.tsx` | 1,3 | 0 | cortar inteira: é atmosfera, não informação |
| `#como-funciona` | `conversa.tsx` | 1,5 | 1,0 | encurtar respiro entre os pares |
| `#para-quem` | `para-quem.tsx` | 2,4 | 1,2 | reduzir a trilha de scroll |
| `#quem-e-o-luque` | `quem-e-o-luque.tsx` | 2,2 | 1,3 | trilha já caiu de 340vh para 220vh; ir a 150vh |
| `#como-comecar` | `como-comecar.tsx` | 3,5 | 1,5 | maior ganho da página; as 3 cenas ocupam demais |
| `#perguntas` | `duvidas.tsx` | 1,9 | 1,2 | mantém: as 3 referências têm FAQ |
| fecho | `fecho.tsx` | 0,8 | 0,8 | mantém |
| rodapé | `rodape.tsx` | 1,4 | 0,8 | mantém o conteúdo, corta o espaço |

Soma da meta: cerca de **9,4 telas**, mais os dois blocos novos abaixo.

## O que entra de novo

- **Bloco "o que eu atendo"** logo depois da hero: lista curta de sintomas em
  linguagem de quem sente, não de diagnóstico. Custo estimado: 0,5 tela.
- **Um CTA por volta da tela 3**, para fechar o buraco de seis telas.

Alvo final: **10 telas**, contra 17 de hoje.

## Ordem de ataque

1. `#como-comecar` (3,5 telas, o maior ganho isolado)
2. Cortar `pausa.tsx`
3. `#para-quem` e `#quem-e-o-luque`
4. Bloco de sintomas + CTA do meio
5. Espaçamentos de `#sobre`, `#como-funciona` e rodapé

Cada passo entra num commit separado, com a rolagem medida antes e depois.

## Fora de escopo aqui

Estes itens estão em aberto e não fazem parte da v2.0:

- Número do WhatsApp ainda é placeholder em `lib/whatsapp.ts`
  (`5500000000000`). Nenhum botão funciona de verdade até o Luque passar o chip.
- Área de pagamento com liberação de calendário. Vale antes pesquisar como as
  psicólogas concorrentes fazem: nenhuma das três referências tem preço,
  formulário ou agendamento online, todas mandam para o WhatsApp.
- Preço da sessão. Continua fora do site enquanto o Luque não definir.

## Como medir

O que fecha cada passo é a contagem de telas, não a impressão de que ficou
menor. No mobile, com o site rodando:

```js
// no console do navegador, viewport de celular
document.body.scrollHeight / window.innerHeight;
```
