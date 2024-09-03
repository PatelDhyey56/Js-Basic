const patterns = {
  textOnly: "^[a-zA-Z\\s]+$",
  numberOnly: "^\\d+$",
};

export const postPeopleValid = {
  name: {
    required: true,
    pattern: patterns.textOnly,
  },
  age: {
    required: true,
    pattern: patterns.numberOnly,
  },
  gender: {
    required: true,
    pattern: patterns.textOnly,
  },
};

export const putPeopleValid = {
  name: {
    required: false,
    pattern: patterns.textOnly,
  },
  age: {
    required: false,
    pattern: patterns.numberOnly,
  },
  gender: {
    required: false,
    pattern: patterns.textOnly,
  },
};
