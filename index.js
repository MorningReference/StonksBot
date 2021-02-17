// Discord dependencies
const Discord = require('discord.js');
const {prefix, token, API_KEY, API_SECRET, Nomics_API_Key} = require('./config.json');
const client = new Discord.Client();
// Coinbase dependencies
const Coinbase = require('coinbase').Client;
const coinbase = new Coinbase({
  'apiKey': API_KEY,
  'apiSecret': API_SECRET,
  strictSSL: false
});
// Axios dependencies
const axios = require('axios');
// SVG converter dependencies
const svgToImg = require('svg-to-img');


// let coinsEmbed = new Discord.MessageEmbed()
//   .setColor('#0099ff')
//   .setTitle('Some title')
//   .setURL('https://discord.js.org/')
//   .setAuthor('StonksBot', 'https://i.imgur.com/BUJ4RjN.png', 'http://www.aricjeon.com')
//   .setDescription('Some description here')
//   .setThumbnail('https://i.imgur.com/BUJ4RjN.png')
//   .setTimestamp()
//   .setFooter('Stonks to the moon', 'https://i.imgur.com/BUJ4RjN.png');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// const domparser = new DOMParser();
// const doc = domparser.parseFromString('https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg', 'text/html')
// console.log(doc);

client.on('message', msg => {
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toUpperCase();

  // if(command === 'BTC'){
  //   coinbase.getSpotPrice({'currency': 'USD'}, (err, price) => {
  //     console.log(command, price, err);
  //     coinsEmbed
  //       .setTitle('BTC on Coinbase')
  //       .setURL('https://www.coinbase.com/price/bitcoin')
  //       .setDescription('Current price on Coinbase')
  //       .addField(`Price:`, `$${price.data.amount}`);
  //     return msg.channel.send(coinsEmbed);
  //   });
  // }
  let coinsEmbed = new Discord.MessageEmbed()
        .setTitle(`${command}`)
        .setTimestamp()

//   axios
//     .get(`https://api.nomics.com/v1/currencies/ticker?key=${Nomics_API_Key}&ids=${command}`)
//     .then(res => {
      
//       // let s = new XMLSerializer().serializeToString()
//       // let png = svgToImg.from(svg).toPng({ encoding: "base64"});
//       coinsEmbed
//         .setURL(`https://www.coinbase.com/price/${res.data[0].name}`)
//         .setDescription(`Current price of ${res.data[0].name} on Nomics`)
//         .addFields(
//           {name: 'Price', value:res.data[0].price},
//           {name: 'Circulating Supply', value:res.data[0].circulating_supply},
//           {name: 'Max Supply', value:res.data[0].max_supply},
//           {name: 'Market Cap', value:res.data[0].market_cap},
//           {name: 'ATH', value:res.data[0].high},
//           {name: '24H Volume', value:res.data[0]['1d'].volume},
//           {name: '24H Price Change', value:`${res.data[0]['1d'].price_change} (${res.data[0]['1d'].price_change_pct}%)`, inline: true},
//           {name: '24H Volume Change', value:`${res.data[0]['1d'].volume_change} (${res.data[0]['1d'].volume_change_pct}%)`, inline: true},
//           {name: '24H Market Cap Change', value:`${res.data[0]['1d'].market_cap_change} (${res.data[0]['1d'].market_cap_change_pct}%)`, inline:true},
//         )
//         .setFooter('Stonks to the moon', res.data[0].logo_url)
//       return png;
//     }).then(res => {
//       coinsEmbed
//         .setAuthor('StonksBot', res, 'http://www.aricjeon.com')
//         .setThumbnail(res)
//         .setFooter('Stonks to the moon', res)
//       return msg.channel.send(coinsEmbed);
//     })
// });
  axios
    .get(`https://api.nomics.com/v1/currencies/ticker?key=${Nomics_API_Key}&ids=${command}`)
    .then(res => {

      coinsEmbed
        .setTitle(`${res.data[0].name}`)
        .setURL(`https://www.coinbase.com/price/${res.data[0].name}`)
        .setAuthor('StonksBot', 'https://i.imgur.com/BUJ4RjN.png', 'http://www.aricjeon.com')
        .setDescription(`Current price of ${res.data[0].name} on Nomics`)
        // .setThumbnail('https://i.imgur.com/BUJ4RjN.png')
        .setThumbnail('https://i.imgur.com/BUJ4RjN.png')
        .addFields(
          {name: 'Price', value:res.data[0].price},
          // {name: 'Circulating Supply', value:res.data[0].circulating_supply},
          // {name: 'Max Supply', value:res.data[0].max_supply},
          // {name: 'Market Cap', value:res.data[0].market_cap},
          {name: 'ATH', value:res.data[0].high},
          {name: '24H Volume', value:res.data[0]['1d'].volume},
          {name: '24H Price Change', value:`${res.data[0]['1d'].price_change} (${res.data[0]['1d'].price_change_pct}%)`},
          // {name: '24H Volume Change', value:`${res.data[0]['1d'].volume_change} (${res.data[0]['1d'].volume_change_pct}%)`, inline: true},
          // {name: '24H Market Cap Change', value:`${res.data[0]['1d'].market_cap_change} (${res.data[0]['1d'].market_cap_change_pct}%)`, inline:true},
        )
        .setFooter('Stonks to the moon', 'https://i.imgur.com/BUJ4RjN.png')
      return msg.channel.send(coinsEmbed);
    })
});


client.login(token);
