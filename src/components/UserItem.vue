<template>
  <tr>
    <td>
      <img :src="user.avatar" class="mr-2" alt="image" />
      {{ user.name }}
    </td>
    <td>{{ user.age }}</td>
    <td>
      <label
        class="badge badge-gradient-primary mr-2"
        v-for="(item, index) in user.programmingLanguage"
        :key="index"
        >{{ item }}</label
      >
    </td>
    <td>{{ user.gender }}</td>
    <td>
      <button
        type="button"
        class="mr-2 btn btn-gradient-danger btn-icon-text"
        @click="handleDeleteUser(user.id)"
      >
        <i class="mdi mdi-delete btn-icon-prepend"></i> Remove
      </button>
      <button
        type="button"
        class="btn btn-gradient-info btn-icon-text"
        @click="handleOpenModalEdit"
      >
        <i class="mdi mdi-border-color btn-icon-prepend"></i> Edit
      </button>
    </td>
  </tr>

  <teleport to="#app">
    <app-modal :isOpen="isModalEdit" :handelCloseModal="handleCloseModalEdit">
      <form-add-user
        :userInfo="user"
        :handleCloseModal="handleCloseModalEdit"
      ></form-add-user>
    </app-modal>
  </teleport>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");
import FormAddUser from "./FormAddUser.vue";
export default {
  components: { FormAddUser },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isModalEdit: false,
    };
  },
  methods: {
    ...mapActions({
      handleDeleteUser: "deleteUserAction",
    }),
    handleCloseModalEdit() {
      this.isModalEdit = false; // đóng modal
    },
    handleOpenModalEdit() {
      this.isModalEdit = true; // mở modal
    },
  },
};
</script>

<style></style>
