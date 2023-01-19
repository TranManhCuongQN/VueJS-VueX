import {
  createUserApi,
  getAllUserApi,
  deleteUserApi,
  updateUserApi,
} from "../../api/users";

const state = () => {
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
        id: 2,
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
    searchName: "",
  };
};

const getters = {
  userListByBoy(state) {
    return state.userList.filter((user) => user.gender === "Nam");
  },
  userListBySearchName(state) {
    const { userList, searchName } = state;
    return userList.filter((user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase())
    );
  },
};

const mutations = {
  // Tham số thứ nhất là state, tham số thứ hai là dữ liệu người dùng gửi lên
  setSearchNameMutation(state, payload) {
    state.searchName = payload;
  },
  addUserMutation(state, payload) {
    // state.userList.push(payload);
    state.userList = [...state.userList, payload];
  },
  deleteUserMutation(state, payload) {
    state.userList = state.userList.filter((user) => user.id !== payload);
  },
  updateUserMutation(state, payload) {
    const index = state.userList.findIndex((user) => user.id === payload.id);
    if (index !== -1) {
      state.userList[index] = payload;
    }
  },
  setUserListMutation(state, payload) {
    state.userList = payload;
  },
};

const actions = {
  // Tất cả các nghiệp vụ bất đồng bộ sẽ thực hiện trong action
  async getAllUserAction(context) {
    const payload = await getAllUserApi();
    context.commit("setUserListMutation", payload);
  },
  setSearchNameAction(context, payload) {
    setTimeout(() => {
      context.commit("setSearchNameMutation", payload);
    }, 2000);
  },
  // context luôn luôn có trong action, payload là dữ liệu người dùng gửi lên
  async addUserAction(context, payload) {
    // const newUser = { ...payload, id: Math.random() };
    // context.commit thực thi một mutation
    // context.commit("addUserMutation", newUser);

    const res = await createUserApi(payload);
    console.log(res);
    // sau khi thêm xong gọi lại action getAllUserAction để lấy lại danh sách user mới
    // khi dispatch 1 actions "getAllUserAction thì action getAllUserAction sẽ được chạy đi lấy dữ liệu danh sách user mới
    context.dispatch("getAllUserAction");
  },
  async deleteUserAction(context, payload) {
    await deleteUserApi(payload);
    context.dispatch("getAllUserAction");
    context.commit("deleteUserMutation", payload);
  },
  async updateUserAction(context, payload) {
    await updateUserApi(payload);

    context.dispatch("getAllUserAction");
    context.commit("updateUserMutation", payload);
  },
};

// mặc định namespaced là false, khi false thì bạn không cần chỉ định module bạn chỉ cần gọi đúng cái tên state, action, mutation, getter là được không cần chỉ định module. Nếu namespaced là true thì bạn phải chỉ định module, nếu ko chỉ định thì ko lấy đc
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
