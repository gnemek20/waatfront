<template>
  <div class="box full justify-center align-center">
    <div class="flex flex-column">
      <div class="title">
        <p>WAAT</p>
      </div>
      <div class="sub-title box text-center" style="margin: 100px 0px;">
        <p>이곳에 설명을 입력하세요</p>
        <p>당신의 멋진 설명이 이곳에 입력됩니다!</p>
      </div>
      <div class="flex space-between" style="margin-top: 35px;">
        <WaatButton @click="push('signin')">로그인</WaatButton>
        <WaatButton @click="push('signup')">회원가입</WaatButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    push(address) {
      this.$router.push(address).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 150px;
}

.sub-title {
  font-size: 20px;
}
</style>