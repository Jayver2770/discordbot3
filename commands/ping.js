const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("ping")
.setDescription("ping the user");

module.exports.run = (bot,interaction) => {
    interaction.editReply({
        content: "Hello"
    })
}