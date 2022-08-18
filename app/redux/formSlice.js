/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step1: [],
  step2: [],
  step3: null,
  localData: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep1: (state, action) => {
      state.step1 = action.payload;
    },
    setStep2: (state, action) => {
      state.step2 = action.payload;
    },
    setStep3: (state, action) => {
      state.step3 = action.payload;
    },
    setLocalData: (state, action) => {
      state.localData = action.payload;
    },
  },
});

export const {
  setStep1, setStep2, setStep3, setLocalData,
} = formSlice.actions;

// SELECTORS

export const SelectStep1 = (state) => state.form.step1;
export const SelectStep2 = (state) => state.form.step2;
export const SelectStep3 = (state) => state.form.step3;
export const SelectLocalData = (state) => state.form.localData;

export default formSlice.reducer;
