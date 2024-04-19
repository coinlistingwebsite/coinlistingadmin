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

export const Coins = async () => {
  let results;
  try {
    const docRef = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    const docSnap = await getDoc(docRef);
    results = { ...docSnap.data() };
  } catch (err) {
    console.log("error");
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
