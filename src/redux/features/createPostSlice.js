import { createSlice, current } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    currentStep: 0,
    steps: 0,
    isCurrentStepCompleted: false,

    transactionType: "sale",
    propertyType: "house",
    addressId: null,

    address: null,
    location: null,

    title: "",
    description: "",

    basicInfo: {
      addressId: null,
      transactionType: "sale",
      displayedAddress: "",
      propertyType: "house",
      location: [],
      addressCompound: {},
    },
    postInfo: {
      title: "",
      description: "",
    },
    propertyInfo: {
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
    },
  },
  reducers: {
    initialSteps: (state, action) => {
      state.steps = action.payload;
    },
    goNext: (state, action) => {
      if (state.currentStep < state.steps && state.isCurrentStepCompleted) {
        state.currentStep += 1;
        state.isCurrentStepCompleted = false;
      }
    },
    goBack: (state, action) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setIsStepCompleted: (state, action) => {
      state.isCurrentStepCompleted = action.payload;
    },
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setAddressId: (state, action) => {
      state.addressId = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = Object.assign(state.address, action.payload);
    },
    updateBasicInfoForm: (state, action) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
  },
});

export const {
  setTransactionType,
  setPropertyType,
  setAddressId,
  initialSteps,
  goNext,
  goBack,
  setIsStepCompleted,
  setAddress,
  updateAddress,
  setLocation,
  setTitle,
  setDescription,
} = createPostSlice.actions;
export default createPostSlice.reducer;
