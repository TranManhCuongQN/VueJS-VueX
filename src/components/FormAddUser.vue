<template>
  <div class="card">
    <div class="card-body">
      <form class="forms-sample" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Username"
            v-model.trim="user.name"
          />
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input
            type="number"
            class="form-control"
            id="age"
            placeholder="Age"
            v-model.trim.number="user.age"
          />
        </div>
        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            type="text"
            class="form-control"
            id="avatar"
            placeholder="avatar"
            v-model.trim="user.avatar"
          />
        </div>
        <div class="form-group">
          <label for="">Programming Language : </label>
          <div class="form-row-flex">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="JS"
                  v-model="user.programmingLanguage" />
                JavaScript <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="JAVA"
                  v-model="user.programmingLanguage" />
                Java <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="PHP"
                  v-model="user.programmingLanguage" />
                PHP <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="PYTHON"
                  v-model="user.programmingLanguage" />
                Python <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="C#"
                  v-model="user.programmingLanguage" />
                C# <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="C/C++"
                  v-model="user.programmingLanguage" />
                C/C++ <i class="input-helper"></i
              ></label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="">Gender : </label>
          <div class="d-flex">
            <div class="form-check mr-3">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="gender"
                  value="Nam"
                  v-model="user.gender" />
                Nam <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check mr-3">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="gender"
                  value="Nữ"
                  v-model="user.gender" />
                Nữ <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check mr-3">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="gender"
                  value="Khác"
                  v-model="user.gender" />
                Khác <i class="input-helper"></i
              ></label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Type User : </label>
          <div class="col-sm-9">
            <select class="form-control" v-model="user.type">
              <option value="ADMIN">Admin</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            rows="4"
            v-model.trim="user.description"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-gradient-primary mr-2">
          Submit
        </button>
        <button class="btn btn-light">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
// import { createNamespacedHelpers, useStore } from "vuex";
import { useStore } from "vuex";
// chỉ cần tạo ra 1 createNamespacedHelpers sau đó là cái tên module trỏ tới để lấy ra các actions, getters, state
// const { mapActions } = createNamespacedHelpers("user");
export default {
  props: {
    userInfo: {
      type: Object,
    },
    handleCloseModal: {
      type: Function,
    },
  },
  //* Composition API
  setup(props) {
    const { userInfo } = toRefs(props);
    const store = useStore();
    let user = reactive({
      name: "",
      age: "",
      avatar: "",
      programmingLanguage: [],
      gender: "Nam",
      type: "CLIENT",
      description: "",
    });

    if (userInfo.value) {
      user.id = userInfo.value.id;
      user.name = userInfo.value.name;
      user.avatar = userInfo.value.avatar;
      user.age = userInfo.value.age;
      user.programmingLanguage = userInfo.value.programmingLanguage;
      user.gender = userInfo.value.gender;
      user.type = userInfo.value.type;
      user.description = userInfo.value.description;
    }

    function handleUpdateUser() {
      store.dispatch("user/updateUserAction", user);
    }

    function handleAddUser() {
      store.dispatch("user/addUserAction", user);
    }

    function handleSubmit() {
      if (userInfo.value) {
        // Nếu có userInfo thì thực hiện chức năng edit
        handleUpdateUser(user);
        props.handleCloseModal();
      } else {
        // Nếu ko có userInfo thì thực hiện chức năng thêm
        handleAddUser(user);
        props.handleCloseModal();
      }
    }
    return {
      user,
      handleSubmit,
    };
  },

  //* Options API
  // data() {
  //   return {
  //     user: {
  //       name: "",
  //       age: "",
  //       avatar: "",
  //       programmingLanguage: [],
  //       gender: "Nam",
  //       type: "CLIENT",
  //       description: "",
  //     },
  //   };
  // },
  // methods: {
  //   //* C1
  // dispatch actions
  //   // ...mapActions({
  //   //   handleAddUser: "user/addUserAction",
  //   //   handleUpdateUser: "user/updateUserAction",
  //   // }),

  //   //* C2 Mặc định những actions ở dưới này thuộc về module user
  //   // ...mapActions("user", {
  //   //   handleAddUser: "addUserAction",
  //   //   handleUpdateUser: "updateUserAction",
  //   // }),

  //   //* C3
  //   ...mapActions({
  //     handleAddUser: "addUserAction",
  //     handleUpdateUser: "updateUserAction",
  //   }),
  //   handleSubmit() {
  //     if (this.userInfo) {
  //       // Nếu có userInfo thì thực hiện chức năng edit
  //       this.handleUpdateUser(this.user);
  //       this.handleCloseModal();
  //     } else {
  //       // Nếu ko có userInfo thì thực hiện chức năng thêm
  //       this.handleAddUser(this.user);
  //       this.handleCloseModal();
  //     }
  //   },
  // },
  // created() {
  //   // chuyển đổi props thành data
  //   // created chạy trước khi ta render ra giao diện (vì vậy ta set up trước dữ liệu để hiển thị lên người dùng)
  //   if (this.userInfo) {
  //     // Nếu có userInfo thì gán cho user bởi vì khi thực hiện chức năng thêm sẽ ko có props userInfo
  //     // Để tránh vấn đề tham chiếu ta sử dụng spread operator để khởi tạo 1 object mới dữ liệu dữ nguyên chỉ thay đổi địa chie trên ram thôi
  //     this.user = { ...this.userInfo };
  //   }
  // },
};
</script>

<style>
.form-row-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
