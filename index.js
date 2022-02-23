// ODg5NDEyMDgxMDcyMzQwOTk0.YUg3jA.fh13sWwWwNSGgQTWtl6KMo7DcKA
const Discord = require("discord.js");
const { token } = require('./config.js');
const Bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
require("./slash-register")()
let commands = require("./slash-register").commands;
const {Economy} = require("./database");

Bot.on('ready', async () => {
    Economy.sync();
    console.log("The bot is online")
})

Bot.on('interactionCreate', async interaction => {
    await interaction.deferReply();
    if(interaction.isCommand()) {
    let name = interaction.commandName;
    let options = interaction.options;

   let commandMethod = commands.get(name)
   if(!commandMethod) return
    

   commandMethod.run(Bot, interaction, options, Economy)

    } else if (interaction.isButton()) {
        let button_id = interaction.customId;
        // button_id = <command name>-<user_id>-ban-34234234234
        // ["ban", "342424242424"]
        let [command, user_id, action, id] = button_id.split("-");
        let guild = interaction.guild;
        let member = guild.members.cache.get(id);

        if(member.id !== user_id) return;

        let buttonCallback = commands.get(command);
        if(!buttonCallback) return;

        buttonCallback.button(Bot, interaction, member, action)


        // if(command == "ban") {
        //     member.ban();
        //     return interaction.editReply({
        //         content: "Success",
        //         ephmeral: true,
        //     })
        // } else if(command == "kick") {
        //     member.kick();
        //     return interaction.editReply({
        //         content: "Success",
        //         ephmeral: true,
        //     })
        // }
    }
})

Bot.on('guildMEmberAdd', member => {
    member.send(`Hello there ${member.user.username}`)
})

Bot.login(token)