import fs from "fs"

console.log("\n🚀 Configurando Bot de Figurinhas WhatsApp Pro\n")

// Check Node.js version
const nodeVersion = process.version
console.log(`✅ Node.js versao: ${nodeVersion}`)

if (Number.parseInt(nodeVersion.slice(1)) < 18) {
  console.log("⚠️  Aviso: Node.js 18+ recomendado")
}

// Create necessary directories
const dirs = ["auth_session", "temp"]

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Diretorio criado: ${dir}`)
  } else {
    console.log(`✓ Diretorio existente: ${dir}`)
  }
})

console.log("\n✅ Configuracao concluida!")
console.log("\n📋 Proximo passo: npm start\n")
