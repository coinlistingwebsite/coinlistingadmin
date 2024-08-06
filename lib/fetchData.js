import { db } from "@/firebase_config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const coinsRef = collection(db, "coinData");

export const fetchSubmittedTokens = async () => {
  try {
    const docRef = doc(
      db,
      "tokens",
      process.env.NEXT_PUBLIC_DB_SUBMITTED_TOKEN_ID
    );
    const docSnap = await getDoc(docRef);
    let tokens = { ...docSnap.data() };
    return tokens.submittedTokens;
  } catch (error) {
    console.log("Error fetching submitted tokens. Reason: " + error);
    return false;
  }
};

export const fetchTokens = async () => {
  try {
    const docRef = doc(db, "tokens", process.env.NEXT_PUBLIC_DB_TOKEN_ID);
    const docSnap = await getDoc(docRef);
    let tokens = { ...docSnap.data() };

    return tokens.tokens;
  } catch (error) {
    console.log("Error fetching tokens. Reason: " + error);
    return false;
  }
};

export const Coins = async () => {
  let results;
  try {
    const docRef = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log(err);
    return false;
  }
  const loopData = results.coins;
  return loopData;
};

export const CoinListing = async () => {
  let results;
  try {
    const docRef = doc(
      db,
      "coins",
      process.env.NEXT_PUBLIC_DB_SUBMITTED_LISTING_ID
    );
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log(err);
    return false;
  }
  const loopData = results.coins;
  return loopData;
};

export const SubmittedCoins = async () => {
  let results;
  try {
    const docRef = doc(db, "coinData", process.env.NEXT_PUBLIC_DB_SUBMITTED_ID);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log(err);
    return false;
  }
  const loopData = results.coins;
  return loopData;
};

export const SubmittedListings = async () => {
  let results;
  try {
    const docRef = doc(db, "coinData", process.env.NEXT_PUBLIC_DB_LISTING_ID);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log("error");
    return false;
  }
  const loopData = results.coins;
  return loopData;
};

export const fetchVerifiedCoins = async () => {
  const data = await Coins();

  if (!data) {
    return false;
  }
  const results = data.filter((coin) => {
    return coin.verified == true;
  });

  return results;
};

export const fetchCoinById = async (id) => {
  const data = await Coins();

  if (!data) {
    return false;
  }
  const results = data.filter((coin) => {
    return coin.id == id;
  });

  return results[0];
};

export const Meetups = async () => {
  let results;
  try {
    const docRef = doc(db, "meetups", process.env.NEXT_PUBLIC_DB_MEETUP_ID);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log("error");
    return false;
  }
  const loopData = results.meetups;
  return loopData;
};

export const NewsData = async () => {
  let results;
  try {
    const docRef = doc(db, "news", process.env.NEXT_PUBLIC_DB_NEWS_ID);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log("Error - Fetching News Data" + "/n" + err);
    return false;
  }
  const loopData = results.news;
  return loopData;
};

export const fetchBanners = async () => {
  let results;
  try {
    const docRef = doc(db, "banners", process.env.NEXT_PUBLIC_DB_BANNERS);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log("error");
    return false;
  }

  return results;
};

export const fetchCexBanners = async () => {
  let results;
  try {
    const docRef = doc(db, "cexBanners", process.env.NEXT_PUBLIC_CEX_BANNERS);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log("error");
    return false;
  }

  return results;
};
