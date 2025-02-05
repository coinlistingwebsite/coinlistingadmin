import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

// Function to extract Twitter handle from various URL formats
function extractTwitterHandle(twitterUrl) {
  if (!twitterUrl) return "";

  try {
    // Remove any trailing slashes
    twitterUrl = twitterUrl.trim().replace(/\/$/, "");

    // Handle different URL patterns
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([^\/\?]+)/i,
      /^@?([^\/\?]+)$/i,
    ];

    for (const pattern of patterns) {
      const match = twitterUrl.match(pattern);
      if (match && match[1]) {
        // Remove @ if it exists and return handle
        return match[1].replace(/^@/, "");
      }
    }

    return "";
  } catch (error) {
    console.error("Error parsing Twitter URL:", error);
    return "";
  }
}

export async function POST(request) {
  try {
    const { name, logo, platform, symbol, id, twitter } = await request.json();
    const projectLink = `https://rankcoins.com/currencies/${name.replace(
      /\s+/g,
      "-"
    )}/${id}`;

    // Extract Twitter handle
    const handle = extractTwitterHandle(twitter);

    const twitterMention = handle ? `@${handle}` : "";

    const tweetText = `🚨 NEW LISTING 🚨
${name} $${symbol} is now listed on RankCoins!
Check it out: ${projectLink}
${twitterMention}

#memecoins #moonshots #crypto #gems`.trim();

    // Initialize the Twitter API client
    const client = new TwitterApi({
      appKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY,
      appSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET,
      accessToken: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Post the tweet
    await client.v2.tweet({
      text: tweetText,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error posting tweet:", error);
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
}
