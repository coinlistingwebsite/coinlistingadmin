import { db } from "@/firebase_config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { fetchCoinById } from "./fetchData";

export const deleteCoinbyId = async (id) => {
  const coinDoc = doc(db, "coinData", id);
  try {
    await deleteDoc(coinDoc);
  } catch (err) {
    return false;
  }

  return true;
};

export const approveCoinById = async (id) => {
  const coinDoc = doc(db, "coinData", id);
  try {
    await updateDoc(coinDoc, {
      verified: true,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const suspendCoinById = async (id) => {
  const coinDoc = doc(db, "coinData", id);
  try {
    await updateDoc(coinDoc, {
      verified: false,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const deleteApprovedCoinbyId = async (id) => {
  const coinDoc = doc(db, "coinData", id);
  try {
    await deleteDoc(coinDoc);
  } catch (err) {
    return false;
  }

  return true;
};

export const addVotesToCoin = async (id) => {
  //get the current votes count
  const coinData = await fetchCoinById(id);
  console.log(coinData.votes);

  const coinDoc = doc(db, "coinData", id);

  try {
    await updateDoc(coinDoc, {
      votes: coinData.votes + 500,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const promotedCoinById = async (id) => {
  const coinDoc = doc(db, "coinData", id);
  try {
    await updateDoc(coinDoc, {
      promoted: true,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const unPromoteCoinById = async (id) => {
  const coinDoc = doc(db, "coinData", id);
  try {
    await updateDoc(coinDoc, {
      promoted: false,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const editCoin = async (
  presale,
  votes,
  address,
  chain,
  description,
  telegramContact,
  telegramURL,
  websiteURL,
  instagramURL,
  youtubeURL,
  twitterURL,
  facebookURL,
  discordURL,
  redditURL,
  auditURL,
  doxxURL,
  kycURL,
  safuURL,
  id
) => {
  const coinDoc = doc(db, "coinData", id);

  try {
    await updateDoc(coinDoc, {
      presale,
      votes,
      address,
      chain,
      description,
      telegramContact,
      telegramURL,
      websiteURL,
      instagramURL,
      youtubeURL,
      twitterURL,
      facebookURL,
      discordURL,
      redditURL,
      auditURL,
      doxxURL,
      kycURL,
      safuURL,
    });
  } catch (err) {
    return false;
  }

  return true;
};
