const { createSlice } = require("@reduxjs/toolkit");

const systemSlice = createSlice({
  name: "system",
  initialState: {
    isChatOpened: false,
    isMapOpened: false,
  },
  reducers: {
    toggleChatWidget: (state) => {
      state.isChatOpened = !state.isChatOpened;
    },

    toggleMapWidget: (state) => {
      state.isMapOpened = !state.isMapOpened;
    }
  },
});

export const { toggleChatWidget, toggleMapWidget } = systemSlice.actions;
export default systemSlice.reducer;
