// Um lugar só para o número — o Luque ainda vai comprar o chip novo.
// TODO: trocar aqui quando o número existir; o resto do site herda.
export const WHATSAPP_NUMBER = "5500000000000"

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

// Dois destinos, duas intenções — dá pra separar no analytics depois.
export const AGENDAR_URL = whatsappLink(
  "Oi, Luque. Queria agendar a conversa inicial. Quais horários você tem?"
)
export const CONVERSAR_URL = whatsappLink(
  "Oi, Luque. Vim pelo site e queria tirar uma dúvida antes de marcar."
)
