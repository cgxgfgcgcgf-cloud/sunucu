// Bot her doğduğunda veya sunucuya katıldığında tetiklenir
bot.on('spawn', () => {
    console.log('Bot koşturma modu aktif!');
    
    // Sürekli ileri ve sprint tuşlarını basılı tut
    bot.setControlState('forward', true);
    bot.setControlState('sprint', true);
});

// Her saniye botun koştuğundan emin olmak için kontrol döngüsü
setInterval(() => {
    if (bot.entity) {
        bot.setControlState('forward', true);
        bot.setControlState('sprint', true);
    }
}, 1000);
