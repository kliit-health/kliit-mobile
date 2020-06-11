export const displayConsole = (key, value) => {
  console.log(`---------${key}-------`, value ? value : "");
};

export const hasSpecialCharactors = (value) => {
  var re = /^(?=.*[!@#\$%\^&\*])/;
  return re.test(value);
};

export const isEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

export const isPassword = (mail) => {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(mail)
  ) {
    return true;
  }
  return false;
};

export const isPasswordAlphaNumeric = (mail) => {
  if (/(?=.*?[A-Za-z])(?=.*\d)/.test(mail)) {
    return true;
  }
  return false;
};
