require(`dotenv`).config()

const fs = require(`fs`)

fs.writeFile(`lemony_logs.txt`, `🍋️ LEMONY LOGS 🍋️\n`, (err) => {
    if (err) { console.log(`Error writing logs:`, err) }
})

// Import helper functions
const { handleUncaughtException } = require("./utils")

// Import client
const client = require(`./client`)

process.on('uncaughtException', async (err) => {
    const errorPosition = err.stack.split(`\n`)[1].split(`/`)[0].substring(4) + err.stack.split(`\n`)[1].split(`/`)[err.stack.split(`\n`)[1].split(`/`).length - 1]
    await handleUncaughtException(client, err.message, errorPosition)
    console.error(err)
    process.exit(1)
})

client.connect()
