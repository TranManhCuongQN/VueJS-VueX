<template>
  <div>
    <h1>Demo Lifecycle Component</h1>
    <input type="text" ref="myInput" />
    <p>{{ count }}</p>
    <button class="btn btn-success" @click="handleIncrement">Increment</button>
    <ChildLifeCycle v-if="count % 2 === 0" />
  </div>
</template>

<script>
import ChildLifeCycle from "./ChildLifeCycle.vue";
export default {
  components: {
    ChildLifeCycle,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleIncrement() {
      this.count++;
    },
  },
  beforeCreate() {
    // beforeCreate không thể truy cập được data, methods, computed, watch
    console.log("beforeCreate", this.count);
  },
  created() {
    // phải viết trong created mới có thể truy cập được
    // xét những gì liên quan đến data, methods, computed, watch thì sẽ dùng created
    console.log("created", this.count);
    this.count = 5;
  },
  beforeMount() {
    // DOM thất bại do html chưa có phần tử đó dẫn đến ta không dom được
    console.log("beforeMount", this.$refs.myInput);
  },
  mounted() {
    // xét liên quan tới giao diện thì sẽ dùng mounted
    // mounted mới có thể DOM được input đó
    console.log("mounted", this.$refs.myInput);
    this.$refs.myInput.focus();
  },
  beforeUpdate() {
    // Khi trường data thay đổi thì sẽ chạy beforeUpdate, updated
    // Trước khi render ra giao diện sẽ start loading lên
    console.log("beforeUpdate");
  },
  updated() {
    // sau khi render ra giao diện sẽ stop loading
    console.log("updated");
  },
};
</script>

<style></style>
