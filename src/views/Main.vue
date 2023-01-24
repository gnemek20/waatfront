<template>
  <div class="box">
    <div class="flex full-width justify-center align-center" style="padding: 10px 0px; color: white; background-color: coral;">
      <p>안녕하세요</p>
    </div>
    <div class="flex">
      <WaatInput name="qwe" v-model="sans" placeholder="Input Sans" @input="console">김영석 안녕</WaatInput>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sans: String
    }
  },
  methods: {
    console() {
      console.log(this.sans);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>