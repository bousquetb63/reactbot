const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client({disableEveryone: true});
bot.on('ready', async () => {
  console.log(`${bot.user.username} is Reporting for duty!`);
  bot.user.setActivity(`..`);
  try {
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
  } catch(e) {
      console.log(e.stack);
  }
  var channel = bot.channels.get("446491398158548996");
  channel.bulkDelete(1);
  channel.send({
    "embed": {
      "color": 11976479,
      "fields": [
        {
          "name": "Discord Role Assignment",
          "value": "React with each of the platforms you play on by clicking on the corresponding platform icon below."
        }
      ]
    }
  })
  .then(msg => { 
    msg.react('446500467359481856');
    msg.react('446500500683358208');
    msg.react('446827534555021322');
    msg.react('447493425571299330');
    msg.react('447454880601473046');
  });

});

bot.on('message', message => {
    if(message.channel.name.includes('rp') && message.author.username != "Role Bot" && message.author.discriminator != "2815"){
        message.delete();
    }
});

bot.on('messageReactionAdd', async (messageReaction, user) => {
    let gaming = await messageReaction.emoji.guild.roles.find("name", "gaming");
    let pc = await messageReaction.emoji.guild.roles.find("name", "pc");
    let xbox = await messageReaction.emoji.guild.roles.find("name", "xbox");
    let ps4 = await messageReaction.emoji.guild.roles.find("name", "ps4");
    let crypto = await messageReaction.emoji.guild.roles.find("name", "crypto");

    var guildUser = await messageReaction.emoji.guild.fetchMember(user);
    if(user.bot) {
        return;
    }
    if(messageReaction.emoji.id == "446500467359481856") {
        console.log("xbox");
        if(guildUser.roles.has(xbox.id)) {
            console.log("has role");
            return;
        }
        messageReaction.emoji.guild.member(guildUser.user).addRole(xbox);

    }else if(messageReaction.emoji.id == "446500500683358208") {
        console.log("pc");
        if(guildUser.roles.has(pc.id)) {
            console.log("has role");
            return;
        }
        messageReaction.emoji.guild.member(guildUser.user).addRole(pc);
    }else if(messageReaction.emoji.id == "446827534555021322") {
        console.log("ps4");
        if(guildUser.roles.has(ps4.id)) {
            console.log("has role");
            return;
        }
        messageReaction.emoji.guild.member(guildUser.user).addRole(ps4);

    }else if(messageReaction.emoji.id == "447493425571299330") {
        console.log("gaming");
        if(guildUser.roles.has(gaming.id) || guildUser.roles.has(crypto.id)) {
            console.log("has role");
            return;
        }
        messageReaction.emoji.guild.member(guildUser.user).addRole(gaming);

    }else if(messageReaction.emoji.id == "447454880601473046") {
        console.log("crypto");
        if(guildUser.roles.has(crypto.id) || guildUser.roles.has(gaming.id)) {
            console.log("has role");
            return;
        }
        messageReaction.emoji.guild.member(guildUser.user).addRole(crypto);

    }
});

// bot.on('messageReactionRemove', async (messageReaction, user) => {
//     let pc = await messageReaction.emoji.guild.roles.find("name", "pc");
//     let xbox = await messageReaction.emoji.guild.roles.find("name", "xbox");
//     let ps4 = await messageReaction.emoji.guild.roles.find("name", "ps4");

//     var guildUser = await messageReaction.emoji.guild.fetchMember(user);

//     if(user.bot) {
//         return;
//     }
//     if(messageReaction.emoji.id == "446500467359481856") {
//         messageReaction.emoji.guild.member(guildUser.user).removeRole(xbox);
//     }else if(messageReaction.emoji.id == "446500500683358208") {
//         messageReaction.emoji.guild.member(guildUser.user).removeRole(pc);
//     }else if(messageReaction.emoji.id == "446827534555021322") {
//         messageReaction.emoji.guild.member(guildUser.user).removeRole(ps4);
//     }
// })

bot.on('error', error => {
    return;
})
// login bot with token
bot.login(settings.secret.botToken);