const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("ban")
.setDescription("Ban the user provided")
.addUserOption(option => option.setName("person").setDescription("the person to ban").setRequired(true))
.addStringOption(option => option.setName("reason").setDescription("reason the user is being banned").setRequired(true));

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_GUILD")) return interaction.editReply({content: "You don't have the correct permission!"})

    let member = options.getMember("person");
    let reason = options.getString("reason")

    member.ban({reason: reason, days: 7}).then(() => {
        interaction.editReply({content: `User ${member.displayName} was successfully banned **${reason}**!`})
    }).catch(error => {
        console.log(error);
        interaction.editReply({content: "An unknown error occured"})
    })
}

// manage
// /manage <user>
// [Kick] [Ban]