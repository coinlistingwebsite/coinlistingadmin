import { db } from "@/firebase_config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const coinsRef = collection(db, "coinData");

export const fetchUnVerifiedCoins = async () => {
  const q = query(coinsRef, where("verified", "==", false));
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const fetchVerifiedCoins = async () => {
  const q = query(coinsRef, where("verified", "==", true));
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const fetchPromotedCoins = async () => {
  const q = query(coinsRef, where("promoted", "==", true));
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const fetchAllCoins = async () => {
  const q = query(coinsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const fetchCoinById = async (id) => {
  const data = await fetchAllCoins();
  const results = data.filter((coin) => {
    return coin.id == id;
  });

  return results[0];
};
