//the slash command builder is a class that helps you build a slash command without having to manually type out everything.
const { SlashCommandBuilder } = require("discord.js");

//export
module.exports = {
  //data is a property that is required for a slash command
  data: new SlashCommandBuilder()
    //set the name of the command
    .setName("ping")
    //set the description of the command
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    //execute is a function that is called when the command is run
    //so everything in here will be run when the command is run
    await interaction.reply("Pong!");
  },
};