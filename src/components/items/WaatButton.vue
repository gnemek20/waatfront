<template>
  <div @click="clickEventEmit" :class="disabled ? 'disabled' : type" style="display: flex; justify-content: center; white-space: nowrap;">
    <p style="position: relative; top: 1px;"><slot /></p>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  methods: {
    clickEventEmit() {
      if (!this.disabled) this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
.normal {
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: darkgray;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: darkgray;
}

.normal:hover {
  color: lightyellow;
  background-color: gray;
  border-color: gray;
}

.warn { 
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: coral;
  border-radius: 5px;
  padding: 5px 10px;
  color: coral;
}

.warn:hover {
  color: crimson;
  border-color: crimson;
}

.disabled {
  cursor: not-allowed;
  border-style: solid;
  border-width: 1px;
  border-color: darkgray;
  border-radius: 5px;
  padding: 5px 10px;
  color: darkgray;
}
</style>