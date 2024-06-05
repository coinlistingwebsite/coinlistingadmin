import { formatNumber } from "@/lib/validations";
import axios from "axios";
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

export async function POST(request) {
  const {
    name,
    logo,
    symbol,
    platform,
    id,
    launchpad,
    launchpadURL,
    telegram,
    contract,
    chart,
    website,
  } = await request.json();

  let response = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=${symbol}&count=1`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  const quote = response.data;

  let coinData = "";

  if (quote.status.credit_count == 1) {
    coinData = `
💵 Price : ${formatNumber(quote?.data.quotes[0].quote.USD.price)} USD
💸 MarketCap : ${formatNumber(quote?.data.quotes[0].quote.USD.market_cap)}
🪄 Total Supply : ${formatNumber(quote?.data.quotes[0].quote.USD.total_supply)}
🔖 Volume 24H : ${formatNumber(quote?.data.quotes[0].quote.USD.volume_24h)}
    `;
  }

  let message = `
  <b>
  💥 ${name} live on BullishMarketCap.
  </b>
  🔗 Contract : ${contract}

  ⛓️Chain: ${platform}
  ${coinData}




  🔥🫎 🔥 ${name} listed on @BullishMarktCap 🎉

  ⛓️Chain: ${platform}

  🚧 Worldwide- Sale has Planned.
  
👉Buy link: ${launchpadURL}

💥Target Exchanges: 

🌖Description: 

🎊Vote on Bullishmarketcap: https://www.bullishmarketcap.com/coins/butterflyinu167

💧Chat Link: 
💧Website:
💧Twitter:









  `;

  try {
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    const bot = new Telegraf(process.env.NEXT_PUBLIC_TOKEN_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_TOKEN_CHAT_ID;

    // Send the message with reply_keyboard
    await bot.telegram.sendVideo(
      chatId,
      "https://firebasestorage.googleapis.com/v0/b/bmc-database-f73bd.appspot.com/o/TES%2FTESTING%2F2024-04-09%201.03.39%20PM.mp4?alt=media&token=4be8c6c0-a35e-4084-bec3-15c2407460df",
      {
        caption: message,
        parse_mode: "html",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `⚡️ ${name} CHAT ⚡️`,
                url: `${telegram.trim()}`,
              },
            ],

            [
              {
                text: `💰Buy`,
                url: `${launchpadURL.trim()}`,
              },
            ],
            [
              {
                text: `🚦Chart`,
                url: `${chart.trim()}`,
              },
            ],
            [
              {
                text: `📍Website`,
                url: `${website.trim()}`,
              },
            ],
            [
              {
                text: `📥Vote`,
                url: `https://www.bullishmarketcap.com/coins/${id}`,
              },
            ],

            [
              {
                text: "🪬Join BMC",
                url: `https://t.me/BullishMarktCap`,
              },
            ],
          ],
        },
      }
    );

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
