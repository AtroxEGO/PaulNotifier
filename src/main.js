require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, Discord} = require('discord.js');
const https = require('https');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const prefix = '/';
let url = 'https://raw.githubusercontent.com/AtroxEGO/PaulAddonsKotlin/master/version.txt'

client.once('ready', () => {
    console.log('Paul Notifier is online!');
    
    // (async (url) => {
    //     const latestVersion = await getTextFromUrl(url)
    // })('https://raw.githubusercontent.com/AtroxEGO/PaulAddonsKotlin/master/version.txt');
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'fetchupdate'){
        if (interaction.member.roles.cache.some(r => r.name === "Paul")){
            console.log(interaction.member.roles);
            (async (url) => {
                const latestVersion = await getTextFromUrl(url)
                url = 'https://raw.githubusercontent.com/AtroxEGO/PaulAddonsKotlin/master/changes'
                const changes = await getTextFromUrl(url)
                // console.log(changes)
                interaction.reply({content: "Fetching Update!", ephemeral: true});
                const embed = new EmbedBuilder()
                .setTitle("New Version: " + latestVersion)
                .setColor(0x8521ff)
                .setAuthor({name:'Detected new version of Paul Addons!', url:'https://github.com/AtroxEGO/PaulAddonsKotlin/releases/latest'})
                .setFooter({text:'by AtroxEGO#1952', icon_url:''})
                .setTimestamp()
                .addFields({name: 'Changes:', value: " ", inline: false})
                for (let i = 0; i < changes.split("\n").length - 1; i++){
                    embed.addFields({name:" ", value:changes.split("\n")[i], inline: false})
                }
                client.channels.cache.get(process.env.RELEASES_ID).send({embeds: [embed]})
                client.channels.cache.get(process.env.RELEASES_ID).send({files: ["https://github.com/AtroxEGO/PaulAddonsKotlin/releases/latest/download/PaulAddons-" + latestVersion + ".jar"]});
            })('https://raw.githubusercontent.com/AtroxEGO/PaulAddonsKotlin/master/version.txt');
            client.channels.cache.get(process.env.RELEASES_ID).send("@everyone")
        } else {
            interaction.reply({content: "You dont have enough permissions to do that!", ephemeral: true})
        }
    }
    if (interaction.commandName === 'add'){
        const num1 = interaction.options.get('number-one').value;
        const num2 = interaction.options.get('number-two').value;
        const sum = num1 + num2
        const reply = num1 + " + " + num2 + " = " + sum
        interaction.reply({content: reply , ephemeral: true});
    }
    if (interaction.commandName === "leaderboards"){
        const embed = new EmbedBuilder()
        .setColor(0x8521ff)
        .setAuthor({name:'Leaderboard'})
        .setFooter({text:'by AtroxEGO#1952', icon_url:''})
        .setTimestamp()
        if(interaction.options.get('leaderboard').value === "level"){
            embed.addFields({name: '#1 AtroxEGO', value: ":white_small_square: 354", inline: true})
            .setTitle("Skyblock Level Leaderboard")
            .addFields({name: '#2 DeathStreeks', value: ":white_small_square: 353", inline: true})
            .addFields({name: '#3 Ealman', value: ":white_small_square: 352", inline: true})
            .addFields({name: '#4 Timerr_', value: ":white_small_square: 350", inline: true})
            .addFields({name: '#5 DestructiveDonut', value: ":white_small_square: 349", inline: true})
            .addFields({name: '#6 Locowi', value: ":white_small_square: 348", inline: true})
            .addFields({name: '#7 Bananyawn', value: ":white_small_square: 347", inline: true})
            .addFields({name: '#8 CamCamSatNav', value: ":white_small_square: 347", inline: true})
            .addFields({name: '#9 Breefing', value: ":white_small_square: 347", inline: true})
            .addFields({name: '#10 ffnn', value: ":white_small_square: 346", inline: true})
            .addFields({name: '#11 OwOPanda', value: ":white_small_square: 346", inline: true})
            .addFields({name: '#12 go_vn', value: ":white_small_square: 345", inline: true})
        }
        if(interaction.options.get('leaderboard').value === "networth"){
            embed.addFields({name: '#1 AtroxEGO', value: ":white_small_square: 157.21B", inline: true})
            .setTitle("Networth Leaderboard")
            .addFields({name: '#2 56ms', value: ":white_small_square: 154.51B", inline: true})
            .addFields({name: '#3 DeathStreeks', value: ":white_small_square: 139.81B", inline: true})
            .addFields({name: '#4 Voxeeer', value: ":white_small_square: 135.44B", inline: true})
            .addFields({name: '#5 HuTayo', value: ":white_small_square: 127.31B", inline: true})
            .addFields({name: '#6 Refraction', value: ":white_small_square: 127.12B", inline: true})
            .addFields({name: '#7 Ealman', value: ":white_small_square: 121.5B", inline: true})
            .addFields({name: '#8 Phobiability', value: ":white_small_square: 113.3B", inline: true})
            .addFields({name: '#9 chayuwu', value: ":white_small_square: 111.53B", inline: true})
            .addFields({name: '#10 Larucus', value: ":white_small_square: 89.58B", inline: true})
            .addFields({name: '#11 0Nova', value: ":white_small_square: 83.66B", inline: true})
            .addFields({name: '#12 Dulkir', value: ":white_small_square: 81.67B", inline: true})
        }
        interaction.reply({embeds: [embed]})
    }
})


client.login(process.env.TOKEN);

const getTextFromUrl = (url) => {
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};