import { formatNumber } from "@/lib/validations";
import axios from "axios";
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

export async function POST(request) {
  const {
    name,
    logo,
    platform,
    symbol,
    id,
    twitter,
    website,
    contract,
    description,
    telegram,
    cexname1,
    cexname2,
    cexname3,
    targetname1,
    targetname2,
    targetname3,
  } = await request.json();

  let coinData = "";

  try {
    let response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=${symbol}&count=1`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    const quote = response.data;

    if (quote.status.credit_count == 1) {
      coinData = `
💵 Price : ${formatNumber(quote?.data.quotes[0].quote.USD.price)} USD
💸 MarketCap : ${formatNumber(quote?.data.quotes[0].quote.USD.market_cap)}
🪄 Total Supply : ${formatNumber(quote?.data.quotes[0].quote.USD.total_supply)}
🔖 Volume 24H : ${formatNumber(quote?.data.quotes[0].quote.USD.volume_24h)}
    `;
    }
  } catch (error) {
    console.log(error);
  }

  let message = `
  🛸 ${name} listed on  CEX GATE (@cexgate).
${coinData}
🟢 Listed Exchanges: ${cexname1} ${cexname2} ${cexname3}

🚀 Target Exchanges: ${targetname1} ${targetname2} ${targetname3}

⚡Description: ${description}

🗣 Cexgate.io : https://www.cexgate.io/token/${id}

🌏 Website: ${website.trim()}
⚡ Twitter: ${twitter.trim()}
💥 Telegram: ${telegram.trim()}

  `;

  try {
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    const bot = new Telegraf(process.env.NEXT_PUBLIC_TOKEN_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_CEX_GATE_CHAT_ID;

    // Send the message with reply_keyboard
    await bot.telegram.sendPhoto(chatId, logo, {
      caption: message,
      //      parse_mode: "html",
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
