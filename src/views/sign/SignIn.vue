<template>
  <div class="box">
    <div class="box">
      <WaatInput name="id" v-model="user.id" placeHolder="아이디"></WaatInput>
      <WaatInput name="pwd" v-model="user.pwd" placeHolder="비밀번호"></WaatInput>
    </div>
    <div class="flex justify-center">
      <WaatButton @click="replace('/')">뒤로가기</WaatButton>
      <WaatButton @click="signin">로그인</WaatButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        pwd: ''
      }
    }
  },
  methods: {
    replace(address) {
      this.$router.replace(address).catch(() => {})
    },
    signin() {
      this.$api.post('/api/users/signin', {
        user: this.user
      }).then((res) => {
        if (res.data.status) {
          this.$session.set('id', res.data.id);
          this.replace('/')
        }
        else {
          alert(res.data.msg);
          this.$router.go();
        }
      })
    }
  }
}
</script>