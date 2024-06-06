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
    const bot = new Telegraf(process.env.NEXT_PUBLIC_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    // const chatId = 622872171;

    // Send the message with reply_keyboard
    // await bot.telegram.sendMessage(chatId, message, {
    //   parse_mode: "html",
    // });

    await bot.telegram.sendVideo(
      chatId,
      "https://firebasestorage.googleapis.com/v0/b/bmc-database-f73bd.appspot.com/o/TES%2FTESTING%2F2024-04-09%202.16.53%20PM.mp4?alt=media&token=7b6cea7e-d051-4bb1-90ae-27b7e2dbf855",
      {
        caption: message,
        parse_mode: "html",
      }
    );

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
