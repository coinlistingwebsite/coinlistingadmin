import { db, storage } from "@/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import {
  approvedCats,
  CoinListing,
  Coins,
  Meetups,
  NewsData,
  submittedCats,
  SubmittedCoins,
  SubmittedListings,
} from "./fetchData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const approveCoin = async (coin) => {
  // Upload new Coin into the main Coins List

  let message = "Coin was Submitted and Alerts were sent";

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
    message = "Error in uploading coin";
    return { error: true, message: message };
  }

  // Delete new coin from the submitted coin list
  const res = await deleteSubmittedCoin(coin);
  if (!res) {
    message = "Error";
    return { error: true, message: message };
  }

  //send coin alert message

  return { error: false, message: message, id: freshId };
};

export const approveCatsListing = async (coin) => {
  let message = "Coin was Submitted and Alerts were sent";

  const data = await approvedCats();
  if (!data) return false;

  let newArr = data;

  newArr.push({ ...coin });

  const docRef = doc(db, "cats", process.env.NEXT_PUBLIC_CATS_APPROVED);
  try {
    await updateDoc(docRef, {
      cats: newArr,
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  const res = await deleteSubmittedCat(coin);
  if (!res) {
    message = "Error";
    return { error: true, message: message };
  }

  return { error: false, message: message };
};

export const approveListing = async (coin) => {
  let message = "Coin was Submitted and Alerts were sent";

  const data = await CoinListing();
  if (!data) return false;

  let newArr = data;

  let newId = parseInt(data.length) + 1;

  const phrase = coin.coinName;
  const singleWord = phrase.replace(/\s/g, "");

  let freshId = singleWord.toLowerCase() + newId;

  newArr.push({ ...coin, verified: true, id: freshId });

  try {
    const coinDoc = doc(
      db,
      "coins",
      process.env.NEXT_PUBLIC_DB_SUBMITTED_LISTING_ID
    );
    await updateDoc(coinDoc, {
      coins: newArr,
    });
  } catch (err) {
    message = "Error in uploading coin";
    return { error: true, message: message };
  }

  const res = await deleteSubmittedListing(coin);
  if (!res) {
    message = "Error";
    return { error: true, message: message };
  }

  return { error: false, message: message, id: freshId };
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

export const deleteSubmittedCat = async (coin) => {
  const subData = await submittedCats();

  if (!subData) return false;

  let newSubArr = subData.filter((sub) => {
    return sub.id != coin.id;
  });

  const docRef = doc(db, "cats", process.env.NEXT_PUBLIC_APP_CATS);

  try {
    await updateDoc(docRef, {
      submitted: newSubArr,
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const deleteSubmittedListing = async (coin) => {
  const subData = await SubmittedListings();

  if (!subData) return false;

  let newSubArr = subData.filter((sub) => {
    return sub.id != coin.id;
  });

  try {
    const coinDoc = doc(db, "coinData", process.env.NEXT_PUBLIC_DB_LISTING_ID);
    await updateDoc(coinDoc, {
      coins: newSubArr,
    });
  } catch (err) {
    return false;
  }
  return true;
};

export const deleteEndedPresales = async () => {
  const coins = await Coins();
  if (!coins) return false;

  var currentDate = new Date();
  var time = currentDate.getTime();

  let newCoins = coins.filter((coin) => {
    return coin.date_end > time;
  });

  try {
    const coinDoc = doc(db, "coins", process.env.NEXT_PUBLIC_DB_ID);
    await updateDoc(coinDoc, {
      coins: newCoins,
    });
  } catch (err) {
    console.log(err);
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
  startDate,
  link
) => {
  const singleWord = title.replace(/\s/g, "_");
  let freshId = singleWord.toLowerCase() + "_" + v4().substr(0, 4);

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

  let meetupArray = data;

  const newMeetup = {
    title: title,
    location: location,
    description: description,
    logo: logoURL,
    dateFormat: Date.parse(startDate),
    link: link,
    id: freshId,
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
  startDate,
  endDate,
  cexname1,
  cexlink1,
  cexname2,
  cexlink2,
  cexname3,
  cexlink3,
  cexname4,
  cexlink4,
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
    date_launched: startDate,
    date_end: endDate,
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
      cexname1: cexname1 || null,
      cexlink1: cexlink1 || null,

      cexname2: cexname2 || null,
      cexlink2: cexlink2 || null,

      cexname3: cexname3 || null,
      cexlink3: cexlink3 || null,

      cexname4: cexname4 || null,
      cexlink4: cexlink4 || null,
    },
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

export const submitNews = async (title, location, description, logo, link) => {
  const singleWord = title.replace(/\s/g, "_");
  let freshId = singleWord.toLowerCase() + "_" + v4().substr(0, 4);

  const imageRef = ref(
    storage,
    `news/${title}/${location}/${logo.name + v4()}`
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
  const data = await NewsData();
  if (!data) return false;

  let newsArray = data;

  const newNews = {
    title: title,
    location: location,
    description: description,
    logo: logoURL,
    date_added: Date.now(),
    link: link,
    id: freshId,
  };

  newsArray.push(newNews);

  try {
    const docRef = doc(db, "news", process.env.NEXT_PUBLIC_DB_NEWS_ID);
    await updateDoc(docRef, {
      news: newsArray,
    });
  } catch (error) {
    return false;
  }

  return true;
};
