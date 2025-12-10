import makeWASocket, { fetchLatestBaileysVersion } from "@whiskeysockets/baileys"
import pino from "pino"
import qrcode from "qrcode-terminal"
import { handleCommand } from "./handlers/commands.js"
import { ensureDirectories } from "./utils/filesystem.js"
import { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys"

async function connectToWhatsApp() {
  const { version } = await fetchLatestBaileysVersion()
  const { state, saveCreds } = useMultiFileAuthState("auth_session")

  const logger = pino({ level: "silent" })

  console.log("\n🤖 Bot de Figurinhas WhatsApp Pro\n")
  console.log("📦 Preparando ambiente...\n")

  // Ensure directories exist
  ensureDirectories()

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger,
    browser: ["Bot Figurinhas", "Chrome", "1.0.0"],
    markOnlineOnConnect: true,
  })

  // Custom QR code handler
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      console.log("\n📱 Escaneie o QR Code abaixo com seu WhatsApp:\n")
      qrcode.generate(qr, { small: true })
      console.log("\n")
    }

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

      console.log("\n⚠️  Conexao fechada:", lastDisconnect?.error, "\n🔄 Reconectando:", shouldReconnect ? "Sim" : "Nao")

      if (shouldReconnect) {
        setTimeout(() => connectToWhatsApp(), 3000)
      } else {
        console.log("\n❌ Bot desconectado. Execute novamente para reconectar.\n")
        process.exit(0)
      }
    } else if (connection === "open") {
      console.log("\n✅ Bot conectado com sucesso!\n")
      console.log("📋 Comandos disponiveis:")
      console.log("   !fig - Criar figurinha de imagem")
      console.log("   !ocr - Extrair texto de imagem")
      console.log("   !help - Ver todos os comandos")
      console.log("\n🟢 Bot ativo e aguardando mensagens...\n")
    }
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return

    for (const msg of messages) {
      try {
        // Ignore messages from bot itself
        if (msg.key.fromMe) continue

        // Ignore status updates
        if (msg.key.remoteJid === "status@broadcast") continue

        await handleCommand(sock, msg)
      } catch (error) {
        console.error("❌ Erro ao processar mensagem:", error.message)

        try {
          await sock.sendMessage(msg.key.remoteJid, {
            text: "❌ Ocorreu um erro ao processar sua mensagem. Tente novamente.",
          })
        } catch (sendError) {
          console.error("❌ Erro ao enviar mensagem de erro:", sendError.message)
        }
      }
    }
  })

  // Handle errors
  sock.ev.on("error", (error) => {
    console.error("❌ Erro no socket:", error)
  })

  return sock
}

// Start bot
connectToWhatsApp().catch((error) => {
  console.error("❌ Erro fatal ao iniciar bot:", error)
  process.exit(1)
})

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n⏹️  Bot encerrado pelo usuario.\n")
  process.exit(0)
})

process.on("unhandledRejection", (error) => {
  console.error("❌ Erro nao tratado:", error)
})
