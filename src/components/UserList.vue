<template>
  <tbody>
    <user-item
      v-for="user in userListBySearchList"
      :key="user.id"
      :user="user"
    ></user-item>
  </tbody>
</template>

<script>
import UserItem from "./UserItem.vue";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    UserItem,
  },
  // * Cách 1: Sử dụng biến store để lấy state từ store của Vuex
  // computed: {
  //   userList() {
  //     // Vue mặc định những biến nào thuộc về hệ thống của Vue thường sẽ có dấu $
  //     // lấy state từ store của Vuex
  //     return this.$store.state.userList;
  //   },
  // },

  // * Cách 2: Sử dụng mapState để lấy state từ store của Vuex (Object)
  // Để code cơ động hơn nên dùng object hơn mảng vì dùng mảng ta ko set up được tên còn dùng object chỉ cần bên value gọi đúng tên bên store thôi còn bên key muốn đặt tên gì đặt
  // computed: mapState({
  //   // * Cách 1:
  //   // userList: (state) => state.userList,

  //   // * Cách 2:
  //   userList: "userList",
  // }),

  // * Cách 3: Sử dụng mapState để lấy state từ store của Vuex (Array)
  // computed: mapState(["userList"]),

  computed: {
    // mapState khi nó gọi xong nó sẽ trả về cho mình 1 object nên sử dụng Spread Operator để mình bóc tách cặp key-value ra ngoài
    // * Computed lấy từ store về
    ...mapState({
      userList: (state) => state.userList,
    }),

    // * Computed do mình tạo ra
    loading() {
      return false;
    },

    // userListByBoy() {
    //   return this.$store.getters.userListByBoy;
    // },

    // * getters (Array)
    // ...mapGetters(["userListByBoy"]),

    // * getters (Object)
    ...mapGetters({
      userListByBoy: "userListByBoy",
      userListBySearchList: "userListBySearchName",
    }),
  },
};
</script>

<style></style>
