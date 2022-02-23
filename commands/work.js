const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("work")
.setDescription("Work for coins");

module.exports.run = async (bot,interaction,options,Economy) => {
    let coins_earned = 15;
    let getUser = await Economy.findOne({where: {id: interaction.member.id}});
    if(!getUser) {
        getUser = await Economy.create({id: interaction.member.id, balance: 0})
    }
    await Economy.update({balance: getUser.balance + coins_earned}, {where: {id: interaction.member.id}})

    return interaction.editReply({
        content: "You have earned 15 coins"
    })
}