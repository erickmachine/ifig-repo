import Jimp from "jimp"

export async function createSticker(imageBuffer) {
  try {
    const image = await Jimp.read(imageBuffer)

    // Get original dimensions
    const width = image.bitmap.width
    const height = image.bitmap.height

    // Calculate new dimensions maintaining aspect ratio
    let newWidth, newHeight
    if (width > height) {
      newWidth = 512
      newHeight = Math.round((height / width) * 512)
    } else {
      newHeight = 512
      newWidth = Math.round((width / height) * 512)
    }

    // Resize maintaining aspect ratio
    image.resize(newWidth, newHeight, Jimp.RESIZE_BEZIER)

    // Create 512x512 canvas with transparent background
    const sticker = new Jimp(512, 512, 0x00000000)

    // Center the image on the canvas
    const x = Math.round((512 - newWidth) / 2)
    const y = Math.round((512 - newHeight) / 2)

    sticker.composite(image, x, y)

    // Export as PNG
    const buffer = await sticker.getBufferAsync(Jimp.MIME_PNG)

    return buffer
  } catch (error) {
    console.error("❌ Erro ao processar imagem:", error.message)
    return null
  }
}
