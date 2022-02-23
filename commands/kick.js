const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("kick")
.setDescription("Kick the user provided")
.addUserOption(option => option.setName("person").setDescription("the person to kick").setRequired(true))
.addStringOption(option => option.setName("reason").setDescription("reason the user is being kicked").setRequired(true));

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: "You don't have the correct permission!"})

    let member = options.getMember("person");
    let reason = options.getString("reason")

    member.kick(reason).then(() => {
        interaction.editReply({content: `User ${member.displayName} was successfully kicked **${reason}**!`})
    }).catch(error => {
        console.log(error);
        interaction.editReply({content: "An unknown error occured"})
    })
}