# Plano v2.0: do site cinematográfico para o site que converte

A v1.0 está no ar e tagueada (`v1.0`). A v2.0 mudou de objetivo no meio do
caminho, e é isso que este documento registra.

Última atualização: 29/07/2026.

## A virada de direção

O plano original era só **encurtar a rolagem**. Depois de olhar três landing
pages de psicólogas que rodam Google Ads (marlabastos.com.br,
psicologakellytaniguchi.com, nayaraborgespsi.com), o objetivo virou outro:

> Deixar o site **menos awwwards e mais comum**, porque quem chega de anúncio
> não processa um site de texto puro com trilha de scroll. O que fica comum é a
> **estrutura e o ritmo**; a paleta, a tipografia e o vidro continuam.

O que as três referências têm e o site não tinha: um bloco dizendo o que o
psicólogo atende, logo na primeira rolada, e CTA repetido perto.
O que nenhuma das três tem: preço, formulário, agendamento online, depoimento.
Todas mandam para o WhatsApp.

## Regras de trabalho

1. **Não commitar nem dar push sem o André aprovar.** Fazer, mostrar no
   localhost, parar.
2. **Nunca rodar `npm run build` com o `npm run dev` no ar**: o build limpa o
   `.next` e derruba a página que ele está olhando.
3. Subir o dev desanexado, senão ele morre junto com a tarefa:
   `(nohup npm run dev > /tmp/dev.log 2>&1 &)`
4. Medir sempre antes e depois, no viewport de celular:
   `document.body.scrollHeight / window.innerHeight`

## Já commitado e no ar

- `4063915` um CTA só na hero e no fecho, tudo para o WhatsApp
- `a975b14` manifesto abstrato virou copy concreta; travessões fora das copys
- `480b45b` desfoques focam antes do meio da tela; fim real da seção do Luque
- `dd147bb` `#como-comecar` de 3,5 para 2,8 telas
- `01bdb16` `#como-comecar` pinado (o conteúdo corre dentro do painel)

Aprendizado do pin: **ele não reduz rolagem**. A rolagem de um pin é a altura
do curso, e o curso precisa dar tempo do conteúdo passar. Pin muda a leitura,
não o tamanho. Cortar telas exige cortar conteúdo.

## Pronto no localhost, esperando aprovação (sem commit)

- `components/o-que-atendo.tsx` (novo) + `app/page.tsx`: bloco "o que eu
  atendo" logo depois da hero, 4 cards em linguagem de sintoma (ansiedade,
  depressão, luto, fases difíceis). **TODO: confirmar a lista com o Luque.**
- `components/manifesto.tsx` (`#sobre`): as 4 frases soltas viraram 4 etapas
  numeradas ligadas por uma linha. 1,18 para 0,82 tela.
- `components/conversa.tsx` (`#como-funciona`): o ziguezague virou grade de
  cards com cabeçalho.

## O problema aberto: ficou tudo igual

`#o-que-atendo` e `#como-funciona` saíram com a mesma receita (olho em itálico,
título, grade de cards com borda). Trocamos "tudo etéreo" por "tudo igual".

**Próximo passo, decidido mas não executado:**

1. **Fundir `#como-funciona` com `#perguntas`** numa seção só, em accordion
   clicável. As duas fazem a mesma coisa: pergunta e resposta sobre o mesmo
   medo. Essa é a repetição de verdade, não só a visual. Corta cerca de 1,5
   tela.
2. **Cards só no `#o-que-atendo`**, que é o único bloco com itens realmente
   paralelos. Aí o card volta a significar alguma coisa.
3. **Separar os fundos**: hoje são três beges quase idênticos (`#fdfcf9`,
   `#faf8f3`, `#f4f2ec`), sem contraste, e o site inteiro lê como uma seção só
   e comprida.

## Depois disso, na fila

- `#para-quem`: conversa de chat que ocupa 2,4 telas; cortar para um trecho
  curto e o resto em texto normal.
- Badges de confiança (CRP, 50 minutos, online, sigilo) numa faixa fina abaixo
  da hero.
- Hero com a foto do Luque e headline direta, no lugar das cadeiras.
- Um CTA por volta da tela 3: no mapa original havia um buraco da tela 0,6 até
  a 7,1 sem nenhum botão.
- Espaçamentos de rodapé e `#como-comecar`.

## Rolagem

| momento | telas no celular |
| --- | --- |
| v1.0 | 17,0 |
| depois dos cortes commitados | 16,1 |
| com o bloco novo + `#sobre` e `#como-funciona` refeitos | 17,3 |
| meta | 10 |

O bloco novo custou 1,6 tela e vale o custo. O caminho para a meta é a fusão
das duas seções de perguntas e o corte de `#para-quem`.

## Fora de escopo da v2.0

- Número do WhatsApp ainda é placeholder em `lib/whatsapp.ts`
  (`5500000000000`). **Nenhum botão funciona de verdade até o Luque passar o
  chip.**
- Área de pagamento com liberação de calendário.
- Preço da sessão, enquanto o Luque não definir.
