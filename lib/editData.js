import { db } from "@/firebase_config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

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
