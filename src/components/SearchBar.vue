<template>
  <div class="form-group">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        v-model="searchName"
      />
      <div class="input-group-append">
        <button
          class="btn btn-sm btn-gradient-primary"
          type="button"
          @click="handleClickSearch(searchName)"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");
export default {
  state() {
    return {
      searchName: "",
    };
  },
  methods: {
    // Ở đây commit một mutation không đúng flow của VueX mà nó quy định. Mà ở đây phải chạy 1 actions mới đúng quy định của VueX
    // handleClickSearch() {
    //   // gọi đúng tên mutation
    //   this.$store.commit("setSearchNameMutation", this.searchName);
    // },

    // handleClickSearch() {
    //   // dispatch 1 cái action setSearchNameAction
    //   // đối với actions thì sử dụng dispatch, còn đối với mutations thì sử dụng commit
    //   this.$store.dispatch("setSearchNameAction", this.searchName);
    // },

    ...mapActions({
      handleClickSearch: "setSearchNameAction",
    }),
  },
};
</script>

<style></style>
