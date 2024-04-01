import { createSlice, current } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    basicInfo: {
      propertyType: null,
      transactionType: "sale",
      location: { lat: null, lng: null },
      displayedAddress: "",
      address: { province: "", city: "", ward: "", street: "" },
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
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },

    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setBasicInfo: (state, action) => {
      const {
        propertyType,
        transactionType,
        location,
        address,
        displayedAddress,
      } = action.payload;

      state.propertyType = propertyType;
      state.transactionType = transactionType;
      state.location = location;
      state.address = address;
      state.displayedAddress = displayedAddress;
    },
    setPostInfo: (state, action) => {
      const { title, description } = action.payload;
      state.title = title;
      state.description = description;
    },

    setPropertyInfo: (state, action) => {
      const { bedrooms, bathrooms, area } = action.payload;

      state.bedrooms = bedrooms;
      state.bathrooms = bathrooms;
      state.area = area;
    },
  },
});

export const { setPostInfo, setPropertyType, setTransactionType } =
  createPostSlice.actions;
export default createPostSlice.reducer;
