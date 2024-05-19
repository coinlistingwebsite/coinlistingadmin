import { doc, updateDoc } from "firebase/firestore";
import { fetchSubmittedTokens, fetchTokens } from "./fetchData";
import { db } from "@/firebase_config";

export const deleteSubmittedToken = async (token) => {
  const subTokens = await fetchSubmittedTokens();
  if (!subTokens) return false;

  let newSubArr = subTokens.filter((sub) => {
    return sub.request_id != token.request_id;
  });

  try {
    const tokenDoc = doc(
      db,
      "tokens",
      process.env.NEXT_PUBLIC_DB_SUBMITTED_TOKEN_ID
    );
    await updateDoc(tokenDoc, {
      submittedTokens: newSubArr,
    });
  } catch (error) {
    console.log("Error Deleting Submitted Token. Reason: " + error);
    return false;
  }

  return true;
};

export const approveToken = async (token) => {
  const tokenArr = await fetchTokens();
  if (!tokenArr) return { error: true, message: "Error in Approving Token" };

  tokenArr.push(token);

  try {
    const tokenDoc = doc(db, "tokens", process.env.NEXT_PUBLIC_DB_TOKEN_ID);
    await updateDoc(tokenDoc, {
      tokens: tokenArr,
    });
  } catch (error) {
    console.log("Error Approving Token. Reason: " + error);
    return { error: true, message: "Error in submitting Token" };
  }

  const res = await deleteSubmittedToken(token);
  if (!res)
    return {
      error: true,
      message: "Error in Removing Token from Submitted List",
    };

  return { error: false, message: "Token Approved" };
};

export const fetchTokenByID = async (id) => {
  const data = await fetchTokens();
  if (!data) return false;

  const results = data.filter((token) => {
    return token.request_id == id;
  });

  return results[0];
};

export const editToken = async (
  address,
  logo,
  platform,
  announcement,
  description,
  source_code,
  technical_doc,
  reddit,
  twitter,
  website,
  chat,
  youtube,
  mobile_app,
  linkedin,
  cex_name,
  cex_link,
  dex_name,
  dex_link,
  coin
) => {
  const data = await fetchTokens();
  if (!data) return false;

  const newArr = data.filter((token) => {
    return token.request_id != coin.request_id;
  });

  newArr.push({
    ...coin,
    logo: logo || null,
    contract_address: address || null,
    platform: platform || null,
    full_description: description || null,
    urls: {
      ...coin.urls,
      announcement: announcement || null,
      source_code: source_code || null,
      technical_doc: technical_doc || null,
      reddit: reddit || null,
      twitter: twitter || null,
      website: website || null,
      chat: chat || null,
      youtube: youtube || null,
      mobile_app: mobile_app || null,
      linkedin: linkedin || null,
      cex_name: cex_name || null,
      cex_link: cex_link || null,
      dex_name: dex_name || null,
      dex_link: dex_link || null,
    },
  });

  try {
    const coinDoc = doc(db, "tokens", process.env.NEXT_PUBLIC_DB_TOKEN_ID);
    await updateDoc(coinDoc, {
      tokens: newArr,
    });
  } catch (error) {
    console.log("Error Updating Token. Reason: " + error);
    return false;
  }

  return true;
};

export const deleteApprovedTokenByID = async (id) => {
  const data = await fetchTokens();
  if (!data) return false;

  let newArr = data.filter((token) => {
    return token.request_id != id;
  });

  try {
    const coinDoc = doc(db, "tokens", process.env.NEXT_PUBLIC_DB_TOKEN_ID);
    await updateDoc(coinDoc, {
      tokens: newArr,
    });
  } catch (error) {
    return false;
  }

  return true;
};

export const promoteToken = async (token) => {
  const data = await fetchTokens();
  if (!data) return false;

  let newArr = data.filter((coin) => {
    return coin.request_id != token.request_id;
  });

  newArr.push({
    ...token,
    promoted: true,
  });

  try {
    const coinDoc = doc(db, "tokens", process.env.NEXT_PUBLIC_DB_TOKEN_ID);
    await updateDoc(coinDoc, {
      tokens: newArr,
    });
  } catch (error) {
    return false;
  }

  return true;
};

export const unpromoteToken = async (token) => {
  const data = await fetchTokens();
  if (!data) return false;

  let newArr = data.filter((coin) => {
    return coin.request_id != token.request_id;
  });

  newArr.push({
    ...token,
    promoted: false,
  });

  try {
    const coinDoc = doc(db, "tokens", process.env.NEXT_PUBLIC_DB_TOKEN_ID);
    await updateDoc(coinDoc, {
      tokens: newArr,
    });
  } catch (error) {
    return false;
  }

  return true;
};
