const { Client, Intents } = require('discord.js');
const tokenMy= require('./token.json'); 

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

client.login(tokenMy.token);