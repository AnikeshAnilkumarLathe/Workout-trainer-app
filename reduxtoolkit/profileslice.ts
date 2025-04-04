// reduxtoolkit/profileslice.ts
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: [],
  reducers: {
    addExercise(state, action) {
      state.push(action.payload);
    },
    removeExercise(state, action) {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addExercise, removeExercise } = profileSlice.actions;
export default profileSlice.reducer;
