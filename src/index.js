const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  
  console.log(context);

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = roll(6);
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
  
  // If the command is known, let's execute it
  if (commandName === '!pogirate') {
    if (context["display-name"].toLowerCase() === "boseriko") {
      client.say(target, `You are 10 of 10 pogi.`);
    } else {
    const num = roll(10);
      client.say(target, `You are ${num} of 10 pogi.`);
      console.log(`* Executed ${commandName} command`);
    }
  }
  
   // If the command is known, let's execute it
  if (commandName === '!gandarate') {
    const num = roll(10);
    client.say(target, `You are ${num} of 10 ganda.`);
    console.log(`* Executed ${commandName} command`);
  }
  
  if (commandName === 'F') {
    client.say(target, `- Fs in the chat bois.`);
  }
}
// Function called when the "dice" command is issued
function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
