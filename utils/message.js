export function getMessageContent(msg) {
  const message = msg.message

  if (!message) return { text: "", quoted: null }

  // Get text content
  const text = message.conversation || message.extendedTextMessage?.text || message.imageMessage?.caption || ""

  // Get quoted message
  const quoted = message.extendedTextMessage?.contextInfo?.quotedMessage || null

  return { text, quoted, message }
}

export function isImage(msg, content) {
  const message = content?.message || msg.message

  // Check if message itself is an image
  if (message?.imageMessage) {
    return true
  }

  // Check if quoted message is an image
  if (content?.quoted?.imageMessage) {
    // Update message to point to quoted image
    msg.message = { imageMessage: content.quoted.imageMessage }
    return true
  }

  return false
}
