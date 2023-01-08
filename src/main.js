import { createApp } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";

import AppModal from "./components/AppModal.vue";
const app = createApp(App);

const store = createStore({
  state() {
    return {
      userList: [
        {
          id: 1,
          name: "Trần Mạnh Cường",
          avatar:
            "https://phongreviews.com/wp-content/uploads/2022/11/anh-avatar-dep-cho-con-trai-1.jpg",
          age: 23,
          description: "thân thiện , hoc hỏi nhanh",
          programmingLanguage: ["JS", "JAVA"],
          gender: "Nam",
          type: "ADMIN",
        },
        {
          id: 1,
          name: "Phan Thùy Duyên",
          avatar:
            "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/avatar-nu-cam-hoa.jpg",
          age: 22,
          description: "thân thiện , hoc hỏi nhanh",
          programmingLanguage: ["PHP", "C#"],
          gender: "Nữ",
          type: "CLIENT",
        },
      ],
      searchName: "Cường",
    };
  },
  getters: {
    userListByBoy(state) {
      return state.userList.filter((user) => user.gender === "Nam");
    },
    userListBySearchName(state) {
      const { userList, searchName } = state;
      return userList.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    },
  },
  mutations: {
    // Tham số thứ nhất là state, tham số thứ hai là dữ liệu người dùng gửi lên
    setSearchNameMutation(state, payload) {
      state.searchName = payload;
    },
  },
  actions: {
    setSearchNameAction(context, payload) {
      context.commit("setSearchNameMutation", payload);
    },
  },
});
app.use(store);

app.component("app-modal", AppModal);
app.mount("#app");
