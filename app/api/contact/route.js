import axios from "axios";
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

export async function POST(request) {
  const {
    name,
    logo,
    platform,
    id,
    launchpad,
    launchpadURL,
    telegram,
    kyc,
    audit,
    doxx,
    safu,
  } = await request.json();


  

  let message = `
  <b>
  🟢 ${name} listed on BullishMarketCap.
  </b>
  ⛓️Chain: ${platform}

  🚧 Project Sale-Phase has Planned.

  🚀BMC Support Contact:@BMC_Support_now
      `;

  try {
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    const bot = new Telegraf(process.env.NEXT_PUBLIC_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    // Send the message with reply_keyboard
    await bot.telegram.sendPhoto(chatId, logo, {
      caption: message,
      parse_mode: "html",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `⚡️ ${name} CHAT ⚡️`,
              url: `${telegram}`,
            },
          ],

          [
            {
              text: `🗣 Launchpad - ${launchpad}`,
              url: `${launchpadURL}`,
            },
          ],

          [
            {
              text: "🌸 Join BullishMarketCap 🌸",
              url: `https://t.me/BullishMarktCap`,
            },
          ],

          [
            {
              text: "🚀Vote on BMC🚀",
              url: `https://bullishmarketcap.com/coins/${id}`,
            },
          ],
        ],
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
