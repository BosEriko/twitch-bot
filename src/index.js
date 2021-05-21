const tmi = require('tmi.js');
const axios = require('axios');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    "boseriko"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

let getUserIdByUsername = (username) => {
  let data;
  axios({
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    url: `https://api.twitch.tv/kraken/users?login=${username}`,
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': '4ovwggr1jw6kinx4xsyg100asm3g8t',
    }
  }).then((res) => {
    data = res.data.users[0]._id;
  });
  return data;
}

// Fetch API
let getGameByUserId = (userID) => {
  let data;
  axios({
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    url: `https://api.twitch.tv/kraken/channels/${userID}/videos`,
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': '4ovwggr1jw6kinx4xsyg100asm3g8t',
    }
  }).then((res) => {
    data = res.data.videos[0].game;
  });
  return data;
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  
  // console.log(context);

  // Remove whitespace from chat message
  const commandName = msg.trim();
  const commandTag = msg.trim().trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = roll(6);
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
  
  const badges = context.badges
  
  // If the command is known, let's execute it
  if (commandName === '!pogirate') {
    const num = roll(10);
    client.say(target, `You are ${num} out of 10 pogi.`);
    console.log(`* Executed ${commandName} command`);
  }
  
  // If the command is known, let's execute it
  if (commandName === '!lanjutrate') {
    const num = roll(10);
    client.say(target, `You are ${num} out of 10 malanjuts.`);
    console.log(`* Executed ${commandName} command`);
  }
  
  // If the command is known, let's execute it
  if (commandName === '!gandarate') {
    const num = roll(10);
    client.say(target, `You are ${num} out of 10 ganda.`);
    console.log(`* Executed ${commandName} command`);
  }
  
  // If the command is known, let's execute it
  if (commandName === '!timein') {
    client.say(target, `Salamat sa time in!`);
    console.log(`* Executed ${commandName} command`);
  }
  
  if (commandName === '!so') {
    const userId = getUserIdByUsername("boseriko");
    const userGame = getGameByUserId(userId);
    console.log("user Id", userId);
    console.log("user game", userGame);
  }
  
  if (commandName === 'F') {
    client.say(target, `Fs in the chat bois.`);
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
