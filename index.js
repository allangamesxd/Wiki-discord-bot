const Discord = require("discord.js"); // Conectando a livraria discord.js
const client = new Discord.Client({intents: 32767}); // Configuração 1
const config = require("./config.json"); // Arquivo de configuração
const db = require("quick.db");

client.login(config.token); // Pegando o token do bot no arquivo config.json (obs: vá em codes aqui na github e escolha "config.json" para saber como colocar o token do seu bot lá)

client.once('ready', async () => {

    console.log("✅ - Estou online!") 

})

client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return; // Pegando o prefixo do bot no arquivo config.json
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return message.channel.send(`Óla ${message.author} meu prefixo é \`${config.prefix.toLowerCase()}\` `);

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});
