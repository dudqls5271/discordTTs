// const discordTTS=require("discord-tts");
const {Client, Intents} = require("discord.js");
// const {getVoiceConnection, AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel} = require("@discordjs/voice");
const tokenMy= require('./token.json');

const intents=
[
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS
];

const client = new Client({intents:intents});
client.login(tokenMy.token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// let voiceConnection = null;
// let audioPlayer=new AudioPlayer();

// setInterval(() => {
// 	console.log("Hello Semadi");
// }, 3000);

client.once('ready', () => {
    console.log('Bot is ready!')

    setInterval(() => {
        const statuses = [
            'TTS기능 멈춰뒀어요!'
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, {type: "PLAYING"})
    }, 1000) //1000 = 1초 5000 = 5초 10000 = 10초
})
client.on("messageCreate", async (msg)=>{
	const usermsg = msg.content;

	const fs = require('fs');

	const dataRead = fs.readFileSync('./command.json');
	const dataJSON = dataRead.toString();
	const command = JSON.parse(dataJSON);
	const commandFile = require('./command.json');

	var keys = Object.keys(commandFile); 

	for (var i=0; i<keys.length; i++) {
		var key = keys[i];
		if(usermsg === key) {
			msg.channel.send(commandFile[key]); 
			process.setMaxListeners(0);
		}
	}
	
	if(usermsg.match('/comadd') == '/comadd') {
		const commandInput = usermsg.substr(7).replace(/ /g,"").split(':');
		console.log(commandInput);

		const userInput =  commandInput[0];
		command[userInput] = commandInput[1];
		const updateJSON = JSON.stringify(command);

		fs.writeFileSync('./command.json', updateJSON);
		fs.close();
		process.setMaxListeners(0);
	}

	process.on('uncaughtException', function(error) {
		console.log('command error');
	});
	process.setMaxListeners(0);
	
});

client.on("messageCreate", async (msg)=>{
	const connection = getVoiceConnection(msg.guildId);
	const user_mas = msg.content;
	for (var i = 0; i < user_mas.length; i++) {
		if(user_mas[i] == "=") {
			const user_msg_Str = user_mas.substr(2, user_mas.length);
			const stream=discordTTS.getVoiceStream(user_msg_Str);
			const audioResource=createAudioResource(stream, {inputType: StreamType.Arbitrary, inlineVolume:true});
			if(!voiceConnection || voiceConnection?.status===VoiceConnectionStatus.Disconnected){
				voiceConnection = joinVoiceChannel({
					channelId: msg.member.voice.channelId,
					guildId: msg.guildId,
					adapterCreator: msg.guild.voiceAdapterCreator,
				});
				voiceConnection=await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
			}
			
			if(voiceConnection.status===VoiceConnectionStatus.Connected){
				voiceConnection.subscribe(audioPlayer);
				audioPlayer.play(audioResource);
			}

		}
	}

	if(user_mas === "== command out") {
		connection.destroy();
		voiceConnection = null;
	}

	process.on('uncaughtException', function(error) {
		console.log('voice error');
	});

});



client.login(tokenMy.token);