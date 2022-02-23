const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.data = new SlashCommandBuilder()
.setName("balance")
.setDescription("Check the balance of yourself or another user")
.addUserOption(option => option.setName("person").setRequired(false).setDescription("User to check the balance of"));

module.exports.run = async (bot,interaction, options, Economy) => {
    let member = options.getMember("person") || interaction.member;
    let getUser = await Economy.findOne({where: {id: member.id}});
    if(!getUser) {
        getUser = await Economy.create({id: member.id, balance: 0})
    }

    let embed = new MessageEmbed()
    .setTitle(`${member.displayName}'s Balance`)
    .setDescription(`**${getUser.balance}** coins`)
    .setColor("AQUA");

    return interaction.editReply({
        embeds: [embed]
    })
}