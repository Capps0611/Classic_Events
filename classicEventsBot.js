const Discord = require('discord.js')
const client = new Discord.Client()

const settings = require('./settings.json');
const fs = require('fs');

var events;
fs.access('./Events/activeEvents.json', fs.F_OK, (err) => {
    if (err) {
        console.log("file doesn't exist, creating....")
        var text = '{'+
          '"totalEvents":0'
        +'}';
        obj = JSON.parse(text);
        let json = JSON.stringify(obj,null, 2);
        fs.writeFile('./Events/activeEvents.json', json);
    }
    //file exists
  })

setTimeout(function(){
  events = require('./Events/activeEvents.json');
},1000)


client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    switch (primaryCommand.toLowerCase()) {
      case 'help':
        helpCommand(arguments, receivedMessage)
        break;
        case 'createevent':
          createEvent(arguments,receivedMessage)
          break;
      default: receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        switch (arguments[0].toLowerCase()) {
          default: receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
        }
    }
    else
    {
      receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

/*
 * TO:DO - Save events, generate event ID, parse event params cleaner
*/
function createEvent(arguments,receivedMessage)
{
  var newEvent = "";
  events.totalEvents+= 1;
  for (var i = 0; i < arguments.length; i++)
  {
    newEvent += arguments[i]+" ";
  }
  receivedMessage.channel.send("Event ID: "+events.totalEvents+"\n"+newEvent+"\nReact with :green_square: for going and :red_square: for not going")
  //Sets the intial reactions for going/not going
  setTimeout(function() {
     let lastMsg = client.user.lastMessage;
     lastMsg.react("🟩")
     lastMsg.react("🟥")
   }, 2000,client);
   var text = '{"event_'+events.totalEvents+'":['+
   '{"date":"'+arguments[0]+'","time":"'+arguments[1]+'","description":"'+arguments[2]+'"}]}';
   events.event_$XX=JSON.parse(text)
   fs.writeFile('./Events/activeEvents.json',JSON.stringify(events,null, 2))

}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
//https://discordapp.com/oauth2/authorize?client_id=649324010105995316&scope=bot
bot_secret_token = settings.token

client.login(bot_secret_token)