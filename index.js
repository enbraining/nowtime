require("dotenv").config();

const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('cron');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const channelId = 'YOUR_CHANNEL_ID';  // 메시지를 전송할 채널의 ID
const cronTime = '38 14 * * *';  // cron 표현식, 여기서는 매일 오전 7시

const job = new cron.CronJob(cronTime, () => {
  const channel = client.channels.cache.get('1184729949345693708');

  if (channel) {
    channel.send('특정 시간이 되었습니다! 여기에 보낼 메시지');
  } else {
    console.error('채널을 찾을 수 없거나 텍스트 채널이 아닙니다.');
  }
});

client.on('ready', () => {
  console.log(`봇이 성공적으로 실행되었습니다!`);
  job.start();  // cron 작업 시작
});

client.login(process.env.TOKEN);