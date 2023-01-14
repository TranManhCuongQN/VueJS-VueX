import { createStore } from "vuex";
import user from "../store/module/user.js";
const store = createStore({
  modules: {
    // Module user này chỉ quản lý vấn đề user thôi ko quản lý vấn đề khác
    // Mỗi module sẽ quản lý cho 1 đối tượng
    user: user,
  },
});

export default store;
