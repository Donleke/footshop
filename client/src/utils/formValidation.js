const registerOptions = {
  name: {
    required: "username is required",
    maxLength: {
      value: 20,
      message: "username must be less than 20 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  },
  password: {
    required: "Password is required",
    // pattern: /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,15}$/,
    minLength: {
      value: 6,
      message:
        "Password must have at least 6 characters and contain special characters",
    },
  },

  firstName: {
    required: "firstname is required",
    maxLength: {
      value: 20,
      message: "firstname must be less than 20 characters",
    },
  },
  lastName: {
    required: "lastname is required",
    maxLength: {
      value: 20,
      message: "lastname must be less than 20 characters",
    },
  },
  address: {
    required: "pls fill out your address",
  },
  state: {
    required: "pls fill out your state",
  },
  phone: {
    required: "pls fill out your phone detail",
  },
  postalCode: {
    required: "pls fill out zip code",
  },
  country: {
    required: "country is required",
  },
};

export default registerOptions;
