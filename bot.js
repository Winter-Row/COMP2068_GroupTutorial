const Eris = require("eris");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

const bot = new Eris(process.env.DISCORD_BOT_TOKEN, {
    intents: [
        "guildMessages"
    ]
});

async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
    });
    return completion.data.choices[0].text;
}

//displays if bot is connected
bot.on("ready", () => { 
    console.log("Bot is connected and ready!"); 
});

//displays if error occurs
bot.on("error", (err) => {
  console.error(err); 
});
//gets message with a # first
bot.on("messageCreate", (msg) => {
    if(msg.content.startsWith("#")) {
        runCompletion(msg.content.substring(1)).then(result => bot.createMessage(msg.channel.id, result));
    } 
});

bot.connect();