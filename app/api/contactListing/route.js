import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export async function POST(request) {
  try {
    const { name, symbol, buy_link, logo, tweet, id, date_launched, chat } =
      await request.json();

    let message = `
💎New Airdrop💎 ${name}  Coin Airdrop


🐬Airdrop  Link: ${buy_link}

👉Chat: ${chat}
`;

    const bot = new Telegraf(process.env.NEXT_PUBLIC_BOT_ID);

    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    await bot.telegram.sendPhoto(chatId, logo, {
      caption: message,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
