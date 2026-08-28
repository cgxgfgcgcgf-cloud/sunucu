const mineflayer = require('mineflayer');

const serverConfig = {
  host: 'xvuqdq.skymc.io',
  version: '26.2'
};

// Bot isimleri (İsimlerinin sonuna 123 ekledik)
const botNames = ['BotKardes1123', 'BotKardes2123', 'BotKardes3123'];
const password = 'kankapeki123';

botNames.forEach((name, index) => {
  setTimeout(() => {
    createBot(name);
  }, index * 5000); // Botlar aynı anda girip sunucuyu yormasın diye 5'er saniye ara veriyoruz
});

function createBot(username) {
  const bot = mineflayer.createBot({
    host: serverConfig.host,
    username: username,
    version: serverConfig.version
  });

  bot.on('spawn', () => {
    console.log(`${username} başarıyla oyuna girdi!`);

    setTimeout(() => {
      // Önce kayıt olmayı dener (Eğer zaten kayıtlıysa AuthMe "zaten kayıtlısınız" der)
      bot.chat(`/register ${password} ${password}`);

      // Kayıt işleminden hemen 2 saniye sonra garanti olması için giriş (login) komutunu gönderir
      setTimeout(() => {
        bot.chat(`/login ${password}`);
      }, 2000);

    }, 2000); // Oyuna girdikten 2 saniye sonra süreci başlatır
  });

  bot.on('kicked', (reason) => {
    console.log(`${username} atıldı, sebebi:`, reason);
  });

  bot.on('error', (err) => {
    console.log(`${username} hata oluştu:`, err);
  });

  bot.on('end', () => {
    console.log(`${username} oyundan çıktı, 30 saniye sonra tekrar bağlanılıyor...`);
    setTimeout(() => createBot(username), 30000);
  });
}
