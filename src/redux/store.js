import NotesSlice from "./NotesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
   reducer: NotesSlice
});

export default store;