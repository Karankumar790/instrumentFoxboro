// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   firstName: '',
//   lastName: '',
//   mobileNo: '',
//   email: '',
//   company: '',
//   position: '',
//   country: '',
//   state: '',
//   message: '',
//   isSubmitting: false,
//   submitSuccess: false,
//   submitError: null,
// }

// const supportSlice = createSlice({
//   name: 'support',
//   initialState,
//   reducers : {
//     setField: (state, action) => {
//       const { field, value } = action.payload;
//       state[field] = value;
//     },
//     resetForm: (state) => {
//       return initialState;
//     },
//     setSubmitting: (state, action) => {
//       state.isSubmitting = action.payload;
//     },
//     setSubmitSuccess: (state, action) => {
//       state.submitSuccess = action.payload;
//     },
//     setSubmitError: (state, action) => {
//       state.submitError = action.payload;
//   }
//   },
// })

// export const { setField, resetForm, setSubmitting, setSubmitSuccess, setSubmitError } = supportSlice.actions;

// export default supportSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: '',
  lastName: '',
  mobileNo: '',
  email: '',
  company: '',
  position: '',
  country: '',
  state: '',
  message: '',
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
}

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      return initialState;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setSubmitSuccess: (state, action) => {
      state.submitSuccess = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    }
  }
})

export const { setField, resetForm, setSubmitting, setSubmitSuccess, setSubmitError } = supportSlice.actions;

export default supportSlice.reducer;
