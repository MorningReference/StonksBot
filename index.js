// Discord dependencies
const Discord = require('discord.js');
const {prefix_coin, prefix_stock, token, Nomics_API_Key, Rapid_Key, Rapid_Host} = require('./config.json');
const client = new Discord.Client();
// Axios dependencies
const axios = require('axios');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  let helpEmbed = new Discord.MessageEmbed()
          .setTitle('Welcome to StonksBot!')
          .setAuthor('StonksBot', 'https://i.imgur.com/BUJ4RjN.png', 'http://www.aricjeon.com')
          .setThumbnail('https://i.imgur.com/BUJ4RjN.png')
          .setDescription(`Let's get you started to make some tendies!`)
          .addFields(
            // {name: `Use the ${prefix_coin} prefix`, value:'To get data on Cryptocurrency', inline:true},
            // {name: `Use the ${prefix_stock} prefix`, value: 'To get data on Stocks', inline:true}
            {name: `Want data on Cryptocurrency?`, value: `Use this syntax ${prefix_coin}<coin>`, inline:true},
            {name: `Want data on Stocks?`, value: `Use this syntax ${prefix_stock}<stock>`, inline:true}
          )
          .setFooter('Stonks to the moon', 'https://i.imgur.com/BUJ4RjN.png')
  if(msg.content.startsWith('!')) return msg.channel.send(helpEmbed);
  if(!msg.content.startsWith(prefix_coin) && !msg.content.startsWith(prefix_stock) || msg.author.bot) return;

  // const args = msg.content.slice(prefix.length).trim().split(' ');
  // const command = args.shift().toUpperCase();
  if(msg.content.startsWith(prefix_coin)) {
    const args = msg.content.slice(prefix_coin.length).trim().split(' ');
    const command = args.shift().toUpperCase();
    let coinsEmbed = new Discord.MessageEmbed()
          .setTitle(`${command}`)
          .setTimestamp()
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
            {name: 'Price', value:`$${res.data[0].price}`},
            // {name: 'Circulating Supply', value:res.data[0].circulating_supply},
            // {name: 'Max Supply', value:res.data[0].max_supply},
            // {name: 'Market Cap', value:res.data[0].market_cap},
            {name: 'ATH', value:`$${res.data[0].high}`},
            {name: '24H Volume', value:res.data[0]['1d'].volume},
            {name: '24H Price Change', value:`$${res.data[0]['1d'].price_change} (${res.data[0]['1d'].price_change_pct}%)`},
            // {name: '24H Volume Change', value:`${res.data[0]['1d'].volume_change} (${res.data[0]['1d'].volume_change_pct}%)`, inline: true},
            // {name: '24H Market Cap Change', value:`${res.data[0]['1d'].market_cap_change} (${res.data[0]['1d'].market_cap_change_pct}%)`, inline:true},
          )
          .setFooter('Stonks to the moon', 'https://i.imgur.com/BUJ4RjN.png')
        return msg.channel.send(coinsEmbed);
      })
      .catch(err => {
        return msg.channel.send(`Either the crypto symbol ${command} can't be found on nomics, or it doesn't exist!`)
      })
  }

  else if(msg.content.startsWith(prefix_stock)) {
    const args = msg.content.slice(prefix_stock.length).trim().split(' ');
    const command = args.shift().toUpperCase();
    let stockEmbed = new Discord.MessageEmbed()
          .setTitle(`${command}`)
          .setTimestamp()
          
    if(command == 'GME') {
      stockEmbed.setImage('https://pbs.twimg.com/media/EtMT6grXEAMEB05.jpg')
    }

    axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${command}&region=US`, {
      headers: {
        "x-rapidapi-key": Rapid_Key,
        "x-rapidapi-host": Rapid_Host
      }
    })
    .then(res => {
      if(res.data.price == null) return msg.channel.send(`${command} is an invalid stock ticker, try again!`);
      stockEmbed
        .setTitle(`${res.data.price.longName}`)
        .setURL(`https://www.barchart.com/stocks/quotes/${command}/overview`)
        .setAuthor('StonksBot', 'https://i.imgur.com/BUJ4RjN.png', 'http://www.aricjeon.com')
        .setDescription(`Current market price of ${res.data.price.longName}`)
        .setThumbnail('https://i.imgur.com/BUJ4RjN.png')
        .addFields(
          {name:'Price', value:`$${res.data.price.regularMarketOpen.raw}`},
          {name:"Today's High", value:`$${res.data.price.regularMarketDayHigh.raw}`},
          {name:"Today's Market Change", value: `$${res.data.price.regularMarketChange.fmt}%`}
        )
        .setFooter('Stonks to the moon', 'https://i.imgur.com/BUJ4RjN.png')
      return msg.channel.send(stockEmbed);
    })
  }
});


client.login(token);
