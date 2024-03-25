import { db, storage } from "@/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import { Coins, Meetups, SubmittedCoins } from "./fetchData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

export const approveCoin = async (coin) => {
  const data = await Coins();
  if (!data) return false;

  let newArr = data;

  let newId = parseInt(data.length) + 1;

  const phrase = coin.coinName;
  const singleWord = phrase.replace(/\s/g, "");

  let freshId = singleWord.toLowerCase() + newId;

  newArr.push({ ...coin, verified: true, id: freshId });

  try {
    const coinDoc = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    await updateDoc(coinDoc, {
      coins: newArr,
    });
  } catch (err) {
    return false;
  }

  // Delete new coin from the submitted coin list
  const res = await deleteSubmittedCoin(coin);
  if (!res) return false;

  return true;
};

export const deleteSubmittedCoin = async (coin) => {
  const subData = await SubmittedCoins();
  if (!subData) return false;

  let newSubArr = subData.filter((sub) => {
    return sub.id != coin.id;
  });

  try {
    const coinDoc = doc(
      db,
      "coinData",
      process.env.NEXT_PUBLIC_DB_SUBMITTED_ID
    );
    await updateDoc(coinDoc, {
      coins: newSubArr,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const deleteApprovedCoinbyId = async (id) => {
  const subData = await Coins();
  if (!subData) return false;

  let newSubArr = subData.filter((sub) => {
    return sub.id !== id;
  });

  try {
    const coinDoc = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    await updateDoc(coinDoc, {
      coins: newSubArr,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const promotedCoinNow = async (coin) => {
  const data = await Coins();
  if (!data) return false;

  let newArr;

  newArr = data.filter((sub) => {
    return sub.id != coin.id;
  });

  newArr.push({
    ...coin,
    approved: true,
  });

  try {
    const coinDoc = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    await updateDoc(coinDoc, {
      coins: newArr,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const unPromoteCoinNow = async (coin) => {
  const data = await Coins();
  if (!data) return false;

  let newArr;

  newArr = data.filter((sub) => {
    return sub.id != coin.id;
  });

  newArr.push({
    ...coin,
    approved: false,
  });

  try {
    const coinDoc = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    await updateDoc(coinDoc, {
      coins: newArr,
    });
  } catch (err) {
    return false;
  }

  return true;
};

export const editDatabase = async () => {
  const allCoins = await fetchAllCoins();

  for (let i = 0; i < allCoins.length; i++) {
    const coinDoc = doc(db, "coinData", allCoins[i].id);

    try {
      await updateDoc(coinDoc, {
        ...allCoins[i],
        urls: {
          ...allCoins[i].urls,
          launchpad_url: "",
          launchpad_title: "",
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    console.log("Edited" + i + " :" + allCoins[i].coinName);
  }

  return true;
};

export const submitMeetup = async (
  title,
  location,
  description,
  logo,
  startDate
) => {
  const imageRef = ref(
    storage,
    `meetup/${title}/${location}/${logo.name + v4()}`
  );

  const status = await uploadBytes(imageRef, logo)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      return false;
    });

  //if their was an error in uploading
  if (!status) return false;

  // get the image URL
  const logoURL = await getDownloadURL(status.ref).then((url) => {
    return url;
  });

  // fetch all meetup array
  const data = await Meetups();
  if (!data) return false;

  console.log(data);

  let meetupArray = data;

  const newMeetup = {
    title: title,
    location: location,
    description: description,
    logo: logoURL,
    date: startDate,
    dateFormat: Date.parse(startDate),
  };

  meetupArray.push(newMeetup);

  try {
    const docRef = doc(db, "meetups", process.env.NEXT_PUBLIC_DB_MEETUP_ID);
    await updateDoc(docRef, {
      meetups: meetupArray,
    });
  } catch (error) {
    return false;
  }

  return true;
};

export const editCoin = async (
  presale,
  address,
  votes,
  platform,
  cmc_id,
  description,
  explorer,
  facebook,
  source_code,
  technical_doc,
  reddit,
  twitter,
  website,
  instagram,
  youtube,
  telegram,
  telegramContact,
  audit,
  doxx,
  safu,
  kyc,
  bmc_audit,
  bmc_audit_score,
  coin
) => {
  // fetch all coins array
  const data = await Coins();
  if (!data) return false;

  let newArr = data;

  // remove the coin data from the array
  const newData = newArr.filter((cdata) => {
    return cdata.id !== coin.id;
  });

  let fullArr = newData;

  fullArr.push({
    ...coin,
    //  presale: presale == 1 ? true : false,
    contract_address: address || null,
    votes: votes || null,
    platform: platform || null,
    cmc_id: cmc_id || null,
    description: description || null,
    urls: {
      ...coin.urls,
      explorer: explorer || null,
      facebook: facebook || null,
      source_code: source_code || null,
      technical_doc: technical_doc || null,
      reddit: reddit || null,
      twitter: twitter || null,
      website: website || null,
      instagram: instagram || null,
      youtube: youtube || null,
      telegram: telegram || null,
      telegramContact: telegramContact || null,
      audit: audit || null,
      doxx: doxx || null,
      safu: safu || null,
      kyc: kyc || null,
    },
    bmc_audit: bmc_audit || null,
    bmc_audit_score: bmc_audit_score || null,
  });

  try {
    const coinDoc = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    await updateDoc(coinDoc, {
      coins: fullArr,
    });
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};
