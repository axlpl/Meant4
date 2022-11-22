import { defineStore } from "pinia";

export const useSnackbar = defineStore("snackbar", {
  state: () => ({
    message: [],
  }),
  getters: {
    lastMessage: (state) =>
      state.message.length ? state.message[state.message.length - 1] : "",
  },
  actions: {
    changeMessage(payload: string) {
      this.message.push(payload);
    },
  },
});
