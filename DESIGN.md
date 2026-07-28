# DESIGN.md — direção travada. Não redesenhe.

> **Para qualquer IA/agente que abrir este repositório:**
> A direção visual abaixo **já foi decidida** pelo André (dono do projeto).
> Você **não tem autorização** para trocar paleta, tipografia, formato de botão, grid ou
> adicionar dark mode. Se achar que algo deveria mudar, **escreva a sugestão e pare** —
> quem decide é o André.
>
> Em 25/07/2026 um agente reescreveu o design inteiro sem ser pedido. Não repita isso.

---

## O projeto em uma frase

Landing page do **Luque Gonçalves**, psicanalista que atende **online**. Público-núcleo:
**síndrome do pânico e agorafobia** (também ansiedade e depressão), adultos e adolescentes.
O único objetivo do site é **levar a pessoa certa pro WhatsApp**.

Planbook completo (fonte da verdade de escopo):
https://app.notion.com/p/3a888228a2c081b5b588e8dbca988b00

---

## A regra que manda em tudo

**Quem tem pânico e agorafobia muitas vezes não sai de casa.** Isso define o produto e o design:

- O atendimento **online é o produto principal**, não um plano B.
- O site tem que ser **calmo**: zero pop-up, zero contador de urgência, zero exit-intent,
  zero autoplay, zero carrossel que anda sozinho.
- **Nada pisca, pula ou persegue o cursor.** Movimento é convite, nunca susto.
- Todo CTA tem **um destino só: o WhatsApp**, com mensagem pré-preenchida.
- **CFP:** não prometer resultado, não garantir cura, não usar depoimento de paciente.

---

## Direção visual (travada em 25/07/2026)

**Referência:** template **MaestroClass** ("The Lost Art of Dough") — hero de imagem
full-bleed, headline em serifa itálica grande e centralizada, sub curto, um botão pill preto.
Editorial, silencioso, com muito respiro. **Não** é dashboard de SaaS, **não** é Swiss/Bauhaus.

**Paleta** — definida em `app/globals.css`:

| Token | Valor | Uso |
|---|---|---|
| `paper` | `#ffffff` | fundo da página |
| `ink` | `#1a1a17` | texto principal e botão sólido |
| `ink-soft` | `#55554e` | texto de apoio |
| `line` | `#e5e3dd` | bordas e réguas de 1px |

- **Sem dark mode.** O site é claro, ponto.
- **Sem acento colorido.** O contraste vem do preto sobre claro e da foto de fundo.
- **Sem `stone`/`neutral` do Tailwind cru.** Sempre os tokens acima.

**Tipografia:**
- Display/headline: **Instrument Serif** (`--font-display`) — **em itálico**, tamanho grande
  (`clamp(3rem, 8.5vw, 6.75rem)`), `leading` quase 1, tracking levemente negativo.
- Corpo/UI/nav: **Geist Sans** (`--font-sans`), tamanho normal, **sem caixa alta**.
- O template não usa label em uppercase com tracking largo. Não reintroduza isso.

**Formas:**
- Botões são **pill preto** (`rounded-full`, `bg-ink`, `text-paper`), texto em caixa normal.
  Hover = leve queda de opacidade. Nada de wipe, gradiente ou sombra colorida.
- Bordas de 1px na cor `line`.

**Composição do hero:**
- Tudo centralizado, ancorado no **terço superior** (`pt-[26vh]`) — a metade de baixo é o
  espaço reservado para a **imagem de fundo**, que ainda vai ser gerada.
- Enquanto a imagem não existe, **o fundo é branco**. Não invente gradiente, blob, ruído
  ou foto de banco de imagem no lugar dela.

**Header:**
- Fixo no topo, transparente sobre o hero; ao rolar ganha `paper/85` + blur + borda inferior.
- Três colunas: logo (sparkle ✦ + "Luque Gonçalves" em Instrument Serif) à esquerda,
  nav no centro, pill preto "Agendar conversa" à direita.
- Mobile: logo + hambúrguer de duas linhas; painel em fade, com Esc e trava de scroll.

**Movimento:**
- GSAP SplitText por linhas (com `mask`) na headline. Easing `cubic-bezier(.22,1,.36,1)`,
  durações 0.5–1.2s. Nada de bounce ou spring elástico.
- **`prefers-reduced-motion` é obrigatório** em todo componente novo — o público é
  literalmente o que mais precisa disso. `app/globals.css` já zera animação global; ainda
  assim, cada componente com GSAP precisa do seu próprio caminho `reduce`.

---

## Arquitetura

- **Next.js 16 + Tailwind v4 + shadcn.** Leia `AGENTS.md`: esta versão do Next tem breaking
  changes; consulte `node_modules/next/dist/docs/` antes de escrever código.
- `lib/whatsapp.ts` — **único** lugar com o número e as mensagens. Não hardcode link de
  WhatsApp em componente.
- `components/site-header.tsx` — header descrito acima.
- `components/hero.tsx` — headline + sub + um CTA.
- `public/hero-sofa.jpg` — foto de banco de imagem que sobrou de uma versão anterior.
  **Não está em uso.** Não reintroduza sem o André pedir.

**Analytics:** o evento `click_whatsapp` é a conversão. Os CTAs carregam
`data-analytics="click_agendar"` / `data-analytics="click_whatsapp"` — mantenha os atributos.

---

## Ainda em aberto (não invente, pergunte)

- **Imagem de fundo do hero:** vai ser gerada. Até lá, fundo branco.
- **Número do WhatsApp:** `lib/whatsapp.ts` está com `5500000000000`. O Luque vai comprar um chip novo.
- **Preço:** o Notion tem dois números conflitantes (90/450/1000 vs. ~250 por sessão com
  desconto por pacote). **Não publique preço no site** até o André confirmar.
- **Foto do Luque:** ainda não existe.
- **Domínio:** não registrado.
- **Seções depois do hero:** "Como funciona", "Para quem é", "Sobre", "Dúvidas" — as âncoras
  já existem no header, as seções não foram construídas.

---

## Se você é um agente e quer mudar algo daqui

1. Não mude.
2. Escreva o que você mudaria e por quê.
3. Espere o André responder.
