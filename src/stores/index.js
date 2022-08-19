import { defineStore } from "pinia";

export default defineStore({
  id: "index",
  state: () => ({
    sideBarAcitve: true,
    headerLoading: false,
  }),
});
