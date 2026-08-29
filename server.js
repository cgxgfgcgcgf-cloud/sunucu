const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'dynamic-9.magmanode.com',
        port: 25692,
        username: 'KacmazBot'    // Botun oyundaki adı
    });

    bot.on('spawn', () => {
        console.log('Bot oyuna basariyla katildi, kosu ve anti-afk baslatildi.');
        
        // Sürekli ileri ve koşma tuşunu basılı tut
        bot.setControlState('forward', true);
        bot.setControlState('sprint', true);
    });

    // Her 1 saniyede bir koştuğundan emin ol
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('forward', true);
            bot.setControlState('sprint', true);
        }
    }, 1000);

    // Her 15 saniyede bir zıplayıp sağ tıklayarak AFK korumasını tetikle
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            bot.activateItem();
        }
    }, 15000);

    // Bot oyundan düşerse 5 saniye sonra tekrar bağlanmaya çalış
    bot.on('end', () => {
        console.log('Bot sunucudan dustu, yeniden baglaniliyor...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('Baglanti hatasi olustu: ', err);
    });
}

createBot();
