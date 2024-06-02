const { createSlice } = require("@reduxjs/toolkit");

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    areaRange: [0, 0],

    priceRange: [0, 0],

    propertySelect: null
  },
  reducers: {
    setAreaRange: (state, action) => {
      state.areaRange = action.payload
    },

    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    }
  },
});

export const { setAreaRange, setPriceRange } = filterSlice.actions;
export default filterSlice.reducer;
