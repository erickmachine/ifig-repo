# Bot de Figurinhas WhatsApp Pro 🤖

Bot profissional para WhatsApp com criacao de figurinhas e OCR (reconhecimento de texto em imagens).

## Recursos

- ✅ Criacao automatica de figurinhas
- ✅ OCR - Extrair texto de imagens
- ✅ Tratamento robusto de erros
- ✅ Reconexao automatica
- ✅ Suporte a grupos e conversas privadas
- ✅ Comandos intuitivos
- ✅ Otimizado para Termux

## Instalacao Rapida

### Termux (Android)

\`\`\`bash
# 1. Instalar dependencias
pkg update && pkg upgrade
pkg install nodejs git

# 2. Clonar ou criar pasta do projeto
mkdir whatsapp-bot
cd whatsapp-bot

# 3. Copiar os arquivos do bot para esta pasta

# 4. Instalar dependencias do projeto
npm install

# 5. Iniciar o bot
npm start
\`\`\`

### Desktop (Windows/Mac/Linux)

\`\`\`bash
# 1. Certifique-se de ter Node.js 18+ instalado
node --version

# 2. Navegar ate a pasta do projeto
cd whatsapp-bot

# 3. Instalar dependencias
npm install

# 4. Iniciar o bot
npm start
\`\`\`

## Como Usar

### Primeira Execucao

1. Execute `npm start`
2. Escaneie o QR Code com seu WhatsApp
3. Aguarde a mensagem "Bot conectado com sucesso!"
4. Pronto! O bot esta ativo

### Comandos Disponiveis

#### 🎨 Criar Figurinha
\`\`\`
!fig
\`\`\`
- Envie uma imagem com a legenda `!fig`
- Ou responda a uma imagem com `!fig`

#### 📝 Extrair Texto (OCR)
\`\`\`
!ocr
\`\`\`
- Envie uma imagem com texto e legenda `!ocr`
- Ou responda a uma imagem com `!ocr`

#### ℹ️ Informacoes
\`\`\`
!info
\`\`\`
- Ver informacoes sobre o bot

#### ❓ Ajuda
\`\`\`
!help
ou
!ajuda
\`\`\`
- Ver todos os comandos disponiveis

## Solucao de Problemas

### Erro: Cannot find module

**Solucao:** Instale as dependencias
\`\`\`bash
npm install
\`\`\`

### Bot nao conecta

**Solucao:** 
1. Delete a pasta `auth_session`
2. Execute `npm start` novamente
3. Escaneie o QR Code

### Erro de permissao no Termux

**Solucao:**
\`\`\`bash
termux-setup-storage
pkg install nodejs
\`\`\`

### Bot desconecta sozinho

**Solucao:**
- Normal! O bot reconecta automaticamente
- Certifique-se de manter o WhatsApp conectado no celular

## Estrutura do Projeto

\`\`\`
whatsapp-bot/
├── index.js              # Arquivo principal
├── package.json          # Configuracao do projeto
├── handlers/
│   └── commands.js       # Processamento de comandos
├── utils/
│   ├── sticker.js        # Criacao de figurinhas
│   ├── ocr.js            # Extracao de texto
│   ├── message.js        # Utilidades de mensagem
│   └── filesystem.js     # Gerenciamento de arquivos
├── scripts/
│   └── setup.js          # Script de configuracao
├── auth_session/         # Sessao do WhatsApp (criado automaticamente)
└── temp/                 # Arquivos temporarios (criado automaticamente)
\`\`\`

## Tecnologias

- **Baileys** - API WhatsApp Web moderna e leve
- **Jimp** - Processamento e manipulacao de imagens
- **Node.js** - Runtime JavaScript
- **ES Modules** - JavaScript moderno

## Recursos Avancados

### OCR Completo (Opcional)

Para OCR completo com Tesseract:

\`\`\`bash
npm install tesseract.js
\`\`\`

Depois, atualize o arquivo `utils/ocr.js` para usar Tesseract.

### Personalizacao

Edite os arquivos para adicionar:
- Novos comandos em `handlers/commands.js`
- Novos utilitarios em `utils/`
- Diferentes estilos de figurinha em `utils/sticker.js`

## Dicas

- Use imagens claras para melhores resultados
- Figurinhas sao automaticamente redimensionadas para 512x512
- O bot salva a sessao automaticamente
- Para parar o bot: `Ctrl + C`

## Licenca

MIT - Livre para uso pessoal e comercial

## Suporte

Se encontrar problemas:
1. Verifique se instalou as dependencias: `npm install`
2. Verifique a versao do Node.js: `node --version` (18+ recomendado)
3. Delete `auth_session` e reconecte
4. Verifique os logs de erro no terminal

---

Feito com ❤️ para a comunidade WhatsApp
