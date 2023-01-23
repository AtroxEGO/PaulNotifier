require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'fetchupdate',
        description: 'Gets data about latest Paul Addons version and sends notification'
    },
    {
        name: 'leaderboards',
        description: 'View specific leaderboards as well as the best leaderboards a player or a guild has',
        options: [
            {
                name: 'leaderboard',
                description: 'Leaderboard type',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Skyblock Level',
                        value: "level"
                    },
                    {
                        name: "Networth",
                        value: "networth"
                    }
                ],
                required: true
            }
        ]
    },
    {
        name: 'add',
        description: 'Adds two numbers together',
        options: [
            {
                name: 'number-one',
                description: 'The First Number',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'number-two',
                description: 'The Second Number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () =>{
    try {
        console.log('Registering commands')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('Registering succesful')
    } catch (error){
        console.log('There was an error: ' + error);
    }
})();