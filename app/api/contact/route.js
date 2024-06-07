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
    cexname1,
    cexlink1,
    description,
    twitter,
  } = await request.json();

  let message = `
  🔥🫎 🔥 ${name} listed on @BullishMarktCap 🎉

  ⛓️Chain: ${platform || ""}

  🚧 Worldwide- Sale has Planned.
  
👉Buy link: ${launchpadURL || ""}

💥Target Exchanges: ${cexname1 || ""} -> ${cexlink1 || ""}

🌖Description: ${description || ""}

🎊Vote on Bullishmarketcap: https://www.bullishmarketcap.com/coins/${id}

💧Chat Link: ${telegram.trim() || ""}
💧Website: ${website.trim() || ""}
💧Twitter: ${twitter.trim() || ""}

  `;

  try {
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    const bot = new Telegraf(process.env.NEXT_PUBLIC_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    // const chatId = 622872171;

    // Send the message with reply_keyboard
    // await bot.telegram.sendMessage(chatId, message, {
    //   parse_mode: "html",
    // });

    await bot.telegram.sendPhoto(chatId, logo, {
      caption: message,
      // parse_mode: "html",
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
