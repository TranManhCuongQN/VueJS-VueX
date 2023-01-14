<template>
  <h1>Child Life Cycle</h1>
</template>

<script>
export default {
  mounted() {
    this.hello = setInterval(() => {
      console.log("Hello VueJS");
    }, 1000);
  },
  beforeUnmount() {
    // Mình muốn một khi component rời khỏi cây DOM của Vue bất kỳ dữ liệu gì của nó được xóa sạch hết tối ưu performance
    // xóa sách trước khi nó unmounted
    console.log("beforeMount");
    clearInterval(this.hello);
  },
  unmounted() {
    console.log("unmounted");
  },
};
</script>

<style></style>
