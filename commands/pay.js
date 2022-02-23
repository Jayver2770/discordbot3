const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.data = new SlashCommandBuilder()
.setName("pay")
.setDescription("Pay another user")
.addUserOption(option => option.setName("person").setRequired(true).setDescription("The user you want to pay"))
.addIntegerOption(option => option.setName("amount").setRequired(true).setDescription("The amount to give"))

module.exports.run = async (bot,interaction,options,Economy) => {
    let amount = options.getInteger("amount");
    let member = options.getMember("person")

    if(amount < 1 || amount > 1000) return interaction.editReply({content: "Invalid amount, must be between 1 and 1000"})

    let getUser = await Economy.findOne({where: {id: interaction.member.id}});
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, balance: 0})
    }

    if(getUser.balance < amount) return interaction.editReply({content: "Insufficient Balance"})

    let memberBalance = await Economy.findOne({where: {id: member.id}})

    if(!memberBalance) {
        memberBalance = await Economy.create({id: member.id, balance: 0})
    }

    let newBalance = memberBalance.balance + amount;
    let senderBalance = getUser.balance - amount

    await Economy.update({balance: newBalance}, {where: {id: member.id}})
    await Economy.update({balance: senderBalance}, {where: {id: interaction.member.id}})

    let embed = new MessageEmbed()
    .setTitle("💸 Money transfer complete 💸")
    .setDescription(`**${interaction.member.displayName}** has sent **${amount}** coins to **${member.displayName}**`)
    .setColor("GREEN")
    .setThumbnail(member.user.avatarURL())

    return interaction.editReply({
        embeds: [embed]
    })
}