export const utilFilter = (tags) => {
  let arr = [];
  tags.map((tag) => {
    if (tag.value) {
      arr.push(tag.name);
    }
  });
  arr = arr.map((item, index) => {
    if (index < arr.length - 1) {
      return item + "|";
    } else {
      return item;
    }
  });
  return arr;
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  let message;
  if (!rules) {
    return true;
  }

  let status = {};
  let errorMessage = {
    required: "Field is required / invalid input",
    email: "Should be a valid email",
    minLength: `At least ${rules.minLength} characters`,
  };

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    status.required = isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (value.trim() === "") status.minLength = false;
    else if (value.length >= rules.minLength) status.minLength = isValid;
    else status.minLength = false;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    status.maxLength = isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    status.email = isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  let keys = [];

  for (let key in status) {
    keys.push(key);
  }

  keys = keys.filter((key) => !status[key]);

  message = keys.map((key) => errorMessage[key]);

  return [isValid, message];
};
