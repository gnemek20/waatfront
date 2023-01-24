<template>
  <div class="flex full-width">
    <input :ref="name" :type="type" :placeholder="placeholder" @input="inputEventEmit" @blur="blurEventEmit" :style="'padding: 0px 5px;' + 'text-align: ' + align + ';'">
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left'
    },
    nospace: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputEventEmit() {
      if (this.nospace) this.$refs[this.name].value = this.$refs[this.name].value.replace(/\s/g, '');

      this.$emit('input', this.$refs[this.name].value);
    },
    blurEventEmit() {
      this.$emit('blur');
    },
    mounted() {
      if (this.focus) this.$refs[this.name].focus();
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  width: calc(100% - 2px);
  height: 30px;

  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: dimgray;
}

input:focus {
  outline: none;
}

p {
  position: fixed;
  margin-top: 32px;

  font-size: 12px;
}
</style>