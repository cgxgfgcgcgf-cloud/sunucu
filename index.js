const mineflayer = require('mineflayer')

// 3 farklı botun ismi
const botNames = ['Karakol_Bot_1', 'Karakol_Bot_2', 'Karakol_Bot_3']

botNames.forEach((username, index) => {
  // Her botun oyuna girişinde çakışma olmaması için küçük gecikmeler ekliyoruz
  setTimeout(() => {
    createBot(username)
  }, index * 3000)
})

function createBot(username) {
  const bot = mineflayer.createBot({
    host: 'dynamic-9.magmanode.com',
    port: 25692,
    username: username,
    version: '1.26.2', // Sunucu sürümün
    checkTimeoutInterval: 60000
  })

  bot.on('spawn', () => {
    console.log(`${username} başarıyla oyuna girdi!`)
    
    // Kayıt ve giriş işlemleri
    setTimeout(() => {
      const botSifresi = 'BotSifresi123'
      bot.chat(`/register ${botSifresi} ${botSifresi}`)
      
      setTimeout(() => {
        bot.chat(`/login ${botSifresi}`)
      }, 1500)
    }, 2000)
  })

  // 7/24 AFK kalması ve atılmaması için küçük hareketler (örneğin periyodik bakış değiştirme)
  bot.on('kicked', (reason) => {
    console.log(`${username} oyundan atıldı, sebep:`, reason)
    // Atılırsa 10 saniye sonra tekrar bağlanmaya çalışır
    setTimeout(() => createBot(username), 10000)
  })

  bot.on('error', (err) => {
    console.log(`${username} hata oluştu:`, err)
  })
}
