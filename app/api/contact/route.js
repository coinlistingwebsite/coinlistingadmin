import axios from "axios";
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

export async function POST(request) {
  const { name, logo, platform, id, launchpad, launchpadURL, telegram } =
    await request.json();

  let message = `
  <b>
  🟢 ${name} listed on BullishMarketCap.
  </b>
  ⛓️Chain: ${platform}

  🚧 Project Sale-Phase has Planned.
  <a href="https://www.bullishmarketcap.com/coins/${id}">
 🔥 VOTE NOW ON BULLISHMARKETCAP
  </a>
  `;

  try {
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    const bot = new Telegraf(process.env.NEXT_PUBLIC_BOT_ID);

    // Replace 'CHAT_ID' with the actual chat ID where you want to send the message
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    // Send the message with reply_keyboard
    await bot.telegram.sendVideo(
      chatId,
      "https://firebasestorage.googleapis.com/v0/b/bmc-database-f73bd.appspot.com/o/TES%2FTESTING%2F2024-04-09%202.16.53%20PM.mp4?alt=media&token=7b6cea7e-d051-4bb1-90ae-27b7e2dbf855",
      {
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
