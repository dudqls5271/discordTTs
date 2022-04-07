const { Client, Intents } = require('discord.js');
const client = new Client({
	 intents: [
		 Intents.FLAGS.GUILDS,
		 Intents.FLAGS.GUILD_MESSAGES
		] 
	});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	console.log(message.content);
});

client.login('OTYxNjU5MzgxNzg5OTA5MDQz.Yk8NFw.yH_lDi2g7gjR5Uymz_Mu5G0LJxk');