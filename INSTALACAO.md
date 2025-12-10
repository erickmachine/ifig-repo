# Guia de Instalacao Completo

## Requisitos Minimos

- **Node.js 18.0.0 ou superior**
- **NPM 8.0.0 ou superior**
- **Conexao com internet estavel**
- **WhatsApp instalado no celular**

## Instalacao no Termux (Android)

### Passo 1: Preparar o Termux

\`\`\`bash
# Atualizar repositorios
pkg update && pkg upgrade -y

# Instalar Node.js e Git
pkg install nodejs git -y

# Verificar instalacao
node --version
npm --version
\`\`\`

### Passo 2: Criar o Projeto

\`\`\`bash
# Criar pasta do projeto
mkdir ~/whatsapp-bot
cd ~/whatsapp-bot

# Aqui voce deve colocar os arquivos do bot
# Copie todos os arquivos para esta pasta
\`\`\`

### Passo 3: Instalar Dependencias

\`\`\`bash
# Instalar todas as dependencias
npm install

# Aguarde a instalacao (pode levar 2-5 minutos)
\`\`\`

### Passo 4: Iniciar o Bot

\`\`\`bash
# Iniciar
npm start

# Escaneie o QR Code que aparecer
\`\`\`

### Permissoes no Termux

Se der erro de permissao:

\`\`\`bash
# Conceder acesso ao armazenamento
termux-setup-storage

# Permitir acesso em segundo plano
termux-wake-lock
\`\`\`

## Instalacao no Windows

### Passo 1: Instalar Node.js

1. Baixe Node.js em: https://nodejs.org
2. Instale a versao LTS (recomendado)
3. Abra o CMD ou PowerShell

### Passo 2: Verificar Instalacao

\`\`\`cmd
node --version
npm --version
\`\`\`

### Passo 3: Navegar ate o Projeto

\`\`\`cmd
cd C:\caminho\para\whatsapp-bot
\`\`\`

### Passo 4: Instalar e Executar

\`\`\`cmd
npm install
npm start
\`\`\`

## Instalacao no Linux/Mac

### Passo 1: Instalar Node.js

**Ubuntu/Debian:**
\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

**macOS:**
\`\`\`bash
brew install node
\`\`\`

### Passo 2: Navegar e Instalar

\`\`\`bash
cd ~/whatsapp-bot
npm install
npm start
\`\`\`

## Verificacao de Instalacao

Apos executar `npm install`, verifique se foram criados:

- ✅ Pasta `node_modules/` (com pacotes instalados)
- ✅ Arquivo `package-lock.json`

Se faltarem, execute novamente:

\`\`\`bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
\`\`\`

## Primeira Execucao

1. Execute `npm start`
2. Aguarde o QR Code aparecer
3. Abra WhatsApp no celular
4. Va em Configuracoes > Aparelhos Conectados
5. Clique em "Conectar um aparelho"
6. Escaneie o QR Code
7. Aguarde a mensagem "Bot conectado com sucesso!"

## Problemas Comuns

### Erro: Cannot find module

**Causa:** Dependencias nao instaladas

**Solucao:**
\`\`\`bash
npm install
\`\`\`

### Erro: EACCES permission denied

**Causa:** Falta de permissoes

**Solucao no Linux/Mac:**
\`\`\`bash
sudo chown -R $(whoami) ~/.npm
\`\`\`

**Solucao no Termux:**
\`\`\`bash
termux-setup-storage
\`\`\`

### Erro: network timeout

**Causa:** Conexao lenta ou proxy

**Solucao:**
\`\`\`bash
npm install --verbose
\`\`\`

### Bot desconecta imediatamente

**Causa:** Sessao antiga ou corrompida

**Solucao:**
\`\`\`bash
rm -rf auth_session
npm start
\`\`\`

### QR Code nao aparece

**Causa:** Terminal nao suporta caracteres especiais

**Solucao:** Use outro terminal ou verifique a codificacao UTF-8

## Proximos Passos

Apos a instalacao bem-sucedida:

1. Teste enviando `!help` para o bot
2. Tente criar uma figurinha com `!fig`
3. Teste o OCR com `!ocr`
4. Leia o README.md para mais comandos

## Suporte

Se ainda tiver problemas:
1. Verifique os logs de erro
2. Execute `npm install` novamente
3. Verifique a versao do Node.js
4. Delete `auth_session` e reconecte

---

✅ Instalacao concluida! Seu bot esta pronto para usar.
