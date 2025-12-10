import { downloadMediaMessage } from "@whiskeysockets/baileys"
import { createSticker } from "../utils/sticker.js"
import { extractTextFromImage } from "../utils/ocr.js"
import { getMessageContent, isImage } from "../utils/message.js"

export async function handleCommand(sock, msg) {
  const content = getMessageContent(msg)
  const text = content.text?.toLowerCase() || ""
  const chatId = msg.key.remoteJid

  // Help command
  if (text === "!help" || text === "!ajuda") {
    await sendHelp(sock, chatId)
    return
  }

  // Sticker command
  if (text.startsWith("!fig")) {
    await handleStickerCommand(sock, msg, content)
    return
  }

  // OCR command
  if (text.startsWith("!ocr")) {
    await handleOCRCommand(sock, msg, content)
    return
  }

  // Info command
  if (text === "!info") {
    await sendInfo(sock, chatId)
    return
  }
}

async function handleStickerCommand(sock, msg, content) {
  const chatId = msg.key.remoteJid

  try {
    console.log("📝 Comando !fig recebido")

    // Check if there's an image
    if (!isImage(msg, content)) {
      await sock.sendMessage(chatId, {
        text: "❌ Envie uma imagem com legenda !fig ou responda a uma imagem com !fig",
      })
      return
    }

    // Send processing message
    await sock.sendMessage(chatId, {
      text: "⏳ Criando figurinha...",
    })

    // Download image
    const buffer = await downloadMediaMessage(msg, "buffer", {})

    if (!buffer) {
      throw new Error("Falha ao baixar imagem")
    }

    // Create sticker
    const stickerBuffer = await createSticker(buffer)

    if (!stickerBuffer) {
      throw new Error("Falha ao processar imagem")
    }

    // Send sticker
    await sock.sendMessage(chatId, {
      sticker: stickerBuffer,
    })

    console.log("✅ Figurinha enviada com sucesso")
  } catch (error) {
    console.error("❌ Erro ao criar figurinha:", error.message)
    await sock.sendMessage(chatId, {
      text: "❌ Erro ao criar figurinha. Verifique se a imagem e valida.",
    })
  }
}

async function handleOCRCommand(sock, msg, content) {
  const chatId = msg.key.remoteJid

  try {
    console.log("📝 Comando !ocr recebido")

    // Check if there's an image
    if (!isImage(msg, content)) {
      await sock.sendMessage(chatId, {
        text: "❌ Envie uma imagem com legenda !ocr ou responda a uma imagem com !ocr",
      })
      return
    }

    // Send processing message
    await sock.sendMessage(chatId, {
      text: "⏳ Extraindo texto da imagem...",
    })

    // Download image
    const buffer = await downloadMediaMessage(msg, "buffer", {})

    if (!buffer) {
      throw new Error("Falha ao baixar imagem")
    }

    // Extract text
    const extractedText = await extractTextFromImage(buffer)

    if (!extractedText || extractedText.trim().length === 0) {
      await sock.sendMessage(chatId, {
        text: "❌ Nenhum texto encontrado na imagem.",
      })
      return
    }

    // Send extracted text
    await sock.sendMessage(chatId, {
      text: `📝 *Texto extraido:*\n\n${extractedText}`,
    })

    console.log("✅ Texto extraido com sucesso")
  } catch (error) {
    console.error("❌ Erro ao extrair texto:", error.message)
    await sock.sendMessage(chatId, {
      text: "❌ Erro ao extrair texto da imagem. Tente novamente.",
    })
  }
}

async function sendHelp(sock, chatId) {
  const helpText = `🤖 *Bot de Figurinhas - Ajuda*

📋 *Comandos disponiveis:*

🎨 *!fig*
   Cria uma figurinha a partir de uma imagem
   - Envie uma imagem com legenda !fig
   - Ou responda a uma imagem com !fig

📝 *!ocr*
   Extrai texto de uma imagem
   - Envie uma imagem com legenda !ocr
   - Ou responda a uma imagem com !ocr

ℹ️ *!info*
   Informacoes sobre o bot

❓ *!help ou !ajuda*
   Mostra esta mensagem

💡 *Dicas:*
   - Use imagens claras para melhores resultados
   - Figurinhas sao automaticamente redimensionadas
   - OCR funciona melhor com texto legivel`

  await sock.sendMessage(chatId, { text: helpText })
}

async function sendInfo(sock, chatId) {
  const infoText = `ℹ️ *Bot de Figurinhas WhatsApp Pro*

📦 Versao: 3.0.0
🔧 Tecnologia: Baileys + Node.js
⚡ Status: Online

✨ Recursos:
   • Criacao de figurinhas
   • OCR (extrair texto de imagens)
   • Tratamento robusto de erros
   • Reconexao automatica

📞 Para ajuda: !help`

  await sock.sendMessage(chatId, { text: infoText })
}
