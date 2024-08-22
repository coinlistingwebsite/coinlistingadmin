import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export async function POST(request) {
  try {
    const { name, logo, tweetURL, date_launched } = await request.json();

    let message = `
🐈 ${name} joined the competition.

💥Holder Competition link : ${tweetURL}

✨Send your dream PeiPei AI Cat join big competition. Earn SOL. 

👉Submit your PeiPei CAT AI: www.peipeicatai.com
`;

    const bot = new Telegraf(process.env.NEXT_PUBLIC_PPCAI_BOT);

    const chatId = process.env.NEXT_PUBLIC_CATS_CHAT_ID;

    await bot.telegram.sendPhoto(chatId, logo, {
      caption: message,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
