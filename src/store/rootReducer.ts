import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { experiencesSlice } from "./experiences";
import { searchesSlice } from "./search";
import { usersSlice } from "./users";

export const otherReducers = combineReducers({
  [experiencesSlice.name]: experiencesSlice.reducer,
  [searchesSlice.name]: searchesSlice.reducer,
  [usersSlice.name]: usersSlice.reducer
});

const rootReducer = (state, action) => {
  switch (action.type) {
    // TODO: might need to seperate client and server
    // https://github.com/kirill-konshin/next-redux-wrapper#server-and-client-state-separation
    case HYDRATE: {
      console.log("HYDRATE", state, action.payload);

      if (
        !!action.payload &&
        !!action.payload?.users &&
        !!action.payload?.experiences &&
        !!action.payload?.searches &&
        !Object.keys(action.payload.users).length &&
        !Object.keys(action.payload.experiences).length &&
        !Object.keys(action.payload.searches).length
      ) {
        return state;
      } else {
        return {
          ...state,
          ...action.payload
        };
      }
    }
    default: {
      return otherReducers(state, action);
    }
  }
};
export default rootReducer;
