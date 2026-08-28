// Botun sürekli ileri koşmasını ve bağlantıda kalmasını sağlayan güncel döngü
bot.on('spawn', () => {
    console.log('Bot oyuna girdi, koşu başlatılıyor...');
    
    // Sürekli ileri ve koşma (sprint) tuşunu basılı tut
    bot.setControlState('forward', true);
    bot.setControlState('sprint', true);
});

// Eğer bot bir şekilde durursa veya engelle karşılaşırsa tekrar koşuyu tetikle
bot.on('physicsTick', () => {
    if (!bot.getControlState('forward')) {
        bot.setControlState('forward', true);
    }
    if (!bot.getControlState('sprint')) {
        bot.setControlState('sprint', true);
    }
});
