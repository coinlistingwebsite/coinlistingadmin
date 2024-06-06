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
    cexlink1,
    description,
    twitter,
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

  let cexInfo = "";

  if (cexlink1) {
    cexInfo = `
    💥Target Exchanges: <a href=${cexlink1}>${cexname1}</a>
    `;
  }

  let message = `
  🔥🫎 🔥 ${name} listed on @BullishMarktCap 🎉

  ⛓️Chain: ${platform}

  🚧 Worldwide- Sale has Planned.
  
👉Buy link: ${launchpadURL}

${cexInfo}

🌖Description: ${description}

🎊Vote on Bullishmarketcap: https://www.bullishmarketcap.com/coins/${id}

💧Chat Link: ${telegram.trim()}
💧Website: ${website.trim()}
💧Twitter: ${twitter.trim()}

  `;

  try {
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    const bot = new Telegraf(process.env.NEXT_PUBLIC_TOKEN_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_TOKEN_CHAT_ID;

    // const chatId = 622872171;

    // Send the message with reply_keyboard
    await bot.telegram.sendMessage(chatId, message, {
      parse_mode: "html",
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
