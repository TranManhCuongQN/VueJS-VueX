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
                  value="N???"
                  v-model="user.gender" />
                N??? <i class="input-helper"></i
              ></label>
            </div>
            <div class="form-check mr-3">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="gender"
                  value="Kh??c"
                  v-model="user.gender" />
                Kh??c <i class="input-helper"></i
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
// ch??? c???n t???o ra 1 createNamespacedHelpers sau ???? l?? c??i t??n module tr??? t???i ????? l???y ra c??c actions, getters, state
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
        // N???u c?? userInfo th?? th???c hi???n ch???c n??ng edit
        handleUpdateUser(user);
        props.handleCloseModal();
      } else {
        // N???u ko c?? userInfo th?? th???c hi???n ch???c n??ng th??m
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

  //   //* C2 M???c ?????nh nh???ng actions ??? d?????i n??y thu???c v??? module user
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
  //       // N???u c?? userInfo th?? th???c hi???n ch???c n??ng edit
  //       this.handleUpdateUser(this.user);
  //       this.handleCloseModal();
  //     } else {
  //       // N???u ko c?? userInfo th?? th???c hi???n ch???c n??ng th??m
  //       this.handleAddUser(this.user);
  //       this.handleCloseModal();
  //     }
  //   },
  // },
  // created() {
  //   // chuy???n ?????i props th??nh data
  //   // created ch???y tr?????c khi ta render ra giao di???n (v?? v???y ta set up tr?????c d??? li???u ????? hi???n th??? l??n ng?????i d??ng)
  //   if (this.userInfo) {
  //     // N???u c?? userInfo th?? g??n cho user b???i v?? khi th???c hi???n ch???c n??ng th??m s??? ko c?? props userInfo
  //     // ????? tr??nh v???n ????? tham chi???u ta s??? d???ng spread operator ????? kh???i t???o 1 object m???i d??? li???u d??? nguy??n ch??? thay ?????i ?????a chie tr??n ram th??i
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
