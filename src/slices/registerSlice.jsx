import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  registrationStatus: null,
  passwordsMatch: true,
  firstNameError: '',
  lastNameError: '',
  passwordError: '',
  emailError: '',
  registrationData: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload;
    },
    setPasswordsMatch: (state, action) => {
      state.passwordsMatch = action.payload;
    },
    setFirstNameError: (state, action) => {
      state.firstNameError = action.payload;
    },
    setLastNameError: (state, action) => {
      state.lastNameError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload;
    },
  },
});

export const {
  setField,
  setRegistrationStatus,
  setPasswordsMatch,
  setFirstNameError,
  setLastNameError,
  setPasswordError,
  setEmailError,
  setRegistrationData,
} = registerSlice.actions;

export const selectRegistrationData = (state) => state.register.registrationData;

export default registerSlice.reducer;
