const mineflayer = require('mineflayer');

const HOST = 'LowEndV1.aternos.me';
const PORT = 36451;
const USERNAME = 'AFKBot';
const VERSION = '1.21.4';

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('Bot is online!');
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      bot.look(yaw, 0, true);
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1500);
    }, 5000);
  });

  bot.on('chat', (username, message) => {
    if (message === '!status') bot.chat('I am online!');
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
    setTimeout(createBot, 6000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
    setTimeout(createBot, 6000);
  });

  bot.on('end', () => {
    console.log('Reconnecting...');
    setTimeout(createBot, 6000);
  });
}
