const discordTTS=require("discord-tts");
const {Client, Intents} = require("discord.js");
const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel} = require("@discordjs/voice");
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

client.on("ready", () => console.log("Online"));

let voiceConnection;
let audioPlayer=new AudioPlayer();

client.on("messageCreate", async (msg)=>{
    if(msg.content=="tts")
    {
        const stream=discordTTS.getVoiceStream("hello text to speech world");
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
});