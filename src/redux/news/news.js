import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  favorites: []
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, { payload: news }) => {
      state.news = news;
    },
    toggleFavorites: (state, { payload }) => {
      const isExists = state.favorites.some(n => n.id === payload);

      if (isExists) {
        const index = state.favorites.findIndex(n => n.id === payload);
        if (index !== -1) {
          state.favorites.splice(index, 1);
        }
      } else {
        const news = state.news.find(n => n.id === payload);
        state.favorites.push(news);
      }
    }
  }
});

export const { setNews, toggleFavorites } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
