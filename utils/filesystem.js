import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function ensureDirectories() {
  const dirs = [path.join(process.cwd(), "auth_session"), path.join(process.cwd(), "temp")]

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`✅ Diretorio criado: ${path.basename(dir)}`)
    }
  })
}

export function cleanTempFiles() {
  const tempDir = path.join(process.cwd(), "temp")

  if (fs.existsSync(tempDir)) {
    const files = fs.readdirSync(tempDir)
    files.forEach((file) => {
      fs.unlinkSync(path.join(tempDir, file))
    })
  }
}
