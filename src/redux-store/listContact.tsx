import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ContactState {
  items: any;
}

const initialState: ContactState = {
  items: [],
};
export const contact = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    getContact: (state, action: PayloadAction<any>) => {
      state.items.push(...action.payload);
      //   return { ...state, items: [...state.items, ...action.payload] };
    },
    updateContact: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        items: state.items.map((item: any, index: number) =>
          item.id === action.payload.id ? { ...action?.payload } : item
        ),
      };
    },
    deleteContact: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        items: state.items.filter(
          (res: { id: any }) => res.id !== action.payload.id
        ),
      };
    },
  },
});

export const { getContact, deleteContact, updateContact } = contact.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectContact = (state: RootState) => state.contact.items;

export default contact.reducer;
