<template>
  <div class="mask">
    <div class="wrapper">
      <div class="container">
        <slot name="header" />
        <slot name="body" />
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: auto;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

.container {
  width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 1);
}
</style>