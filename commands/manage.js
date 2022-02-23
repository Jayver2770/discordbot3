const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");

module.exports.data = new SlashCommandBuilder()
.setName("manage")
.setDescription("Manage a user")
.addUserOption(option => option.setName("person").setDescription("the person to kick").setRequired(true))

module.exports.run = (bot,interaction,options) => {
    let permissions = interaction.member.permissions;
    if(!permissions.has("MANAGE_MESSAGES")) return interaction.editReply({content: "You don't have the correct permission!"})

    let member = options.getMember("person");

    let embed = new MessageEmbed()
    .setTitle(`Manage ${member.user.username}`)
    .setDescription("Click one of the buttons below to manage a user");

    const row = new MessageActionRow()
    .addComponents(
        [new MessageButton()
        .setLabel("Ban")
        .setStyle("DANGER")
        .setCustomId(`manage-${interaction.member.id}-ban-${member.id}`),

        new MessageButton()
        .setLabel("Kick")
        .setStyle("DANGER")
        .setCustomId(`manage-${interaction.member.id}-kick-${member.id}`)]
    )

    return interaction.editReply({
        embeds: [embed],
        components: [row]
    })

}

module.exports.button = (bot, interaction, member, action) => {
    if(action == "ban") {
        member.ban();
        return interaction.editReply({
            content: "Success",
            ephmeral: true,
        })
    } else if(action == "kick") {
        member.kick();
        return interaction.editReply({
            content: "Success",
            ephmeral: true,
        })
    }
}