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

  if(command === 'BTC'){
    coinbase.getSpotPrice({'currency': 'USD'}, (err, price) => {
      console.log(command, price, err);
      coinsEmbed
        .setTitle('BTC on Coinbase')
        .setURL('https://www.coinbase.com/price/bitcoin')
        .setDescription('Current price on Coinbase')
        .addField(`Price:`, `$${price.data.amount}`);
      return msg.channel.send(coinsEmbed);
    });
  }
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
        .setThumbnail('data:image/png;base64,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')
        .addFields(
          {name: 'Price', value:res.data[0].price},
          {name: 'Circulating Supply', value:res.data[0].circulating_supply},
          // {name: 'Max Supply', value:res.data[0].max_supply},
          {name: 'Market Cap', value:res.data[0].market_cap},
          {name: 'ATH', value:res.data[0].high},
          {name: '24H Volume', value:res.data[0]['1d'].volume},
          {name: '24H Price Change', value:`${res.data[0]['1d'].price_change} (${res.data[0]['1d'].price_change_pct}%)`, inline: true},
          {name: '24H Volume Change', value:`${res.data[0]['1d'].volume_change} (${res.data[0]['1d'].volume_change_pct}%)`, inline: true},
          {name: '24H Market Cap Change', value:`${res.data[0]['1d'].market_cap_change} (${res.data[0]['1d'].market_cap_change_pct}%)`, inline:true},
        )
        .setFooter('Stonks to the moon', 'https://i.imgur.com/BUJ4RjN.png')
      return msg.channel.send(coinsEmbed);
    })
});


client.login(token);
