// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';
import { loadState, saveState } from './localStorage';
const preloaded = loadState();

export const store = configureStore({
  reducer: { crypto: cryptoReducer },
  preloadedState: preloaded,
});

store.subscribe(() => {
  saveState({ crypto: store.getState().crypto });
});
