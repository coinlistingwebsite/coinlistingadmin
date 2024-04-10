export const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,20}$/i.test(email);

export const isPassword = (password) => {
  if (password.length < 7 || password.length > 15) {
    return false;
  } else {
    return true;
  }
};

export const isName = (name) => {
  if (name.length < 3 || name.length > 50) {
    return false;
  } else {
    return true;
  }
};

export const validateNameEmailAndPassword = (name, email, password) => {
  if (!isEmail(email) || !isPassword(password) || !isName(name)) {
    return false;
  }

  return true;
};

export const validateEmailAndPassword = (email, password) => {
  if (!isEmail(email) || !isPassword(password)) {
    return false;
  }

  return true;
};

export const scientificToDecimal = function (num) {
  var nsign = Math.sign(num);
  //remove the sign
  num = Math.abs(num);
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    var zero = "0",
      parts = String(num).toLowerCase().split("e"), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      l = Math.abs(e), //get the number of zeros
      sign = e / l,
      coeff_array = parts[0].split(".");
    if (sign === -1) {
      l = l - coeff_array[0].length;
      if (l < 0) {
        num =
          coeff_array[0].slice(0, l) +
          "." +
          coeff_array[0].slice(l) +
          (coeff_array.length === 2 ? coeff_array[1] : "");
      } else {
        num = zero + "." + new Array(l + 1).join(zero) + coeff_array.join("");
      }
    } else {
      var dec = coeff_array[1];
      if (dec) l = l - dec.length;
      if (l < 0) {
        num = coeff_array[0] + dec.slice(0, l) + "." + dec.slice(l);
      } else {
        num = coeff_array.join("") + new Array(l + 1).join(zero);
      }
    }
  }

  return nsign < 0 ? "-" + num : num;
};

export const NGnaira = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatNumber(num) {
  if (!num) return;

  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(4) + "K";
  } else if (num >= 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(4) + "M";
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(4) + "B";
  }

  if (num < 1000) {
    return num.toFixed(4);
  }

  return num.toString();
}
