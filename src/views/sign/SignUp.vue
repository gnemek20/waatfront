<template>
  <div class="box">
    <div class="box">
      <WaatInput name="id" v-model="user.id" placeholder="아이디" nospace focus></WaatInput>
      <WaatInput name="pwd" v-model="user.pwd" placeholder="비밀번호" type="password" nospace></WaatInput>
      <WaatInput name="pwd" v-model="user.name" placeholder="닉네임"></WaatInput>
    </div>
    <div class="flex justify-center">
      <WaatButton @click="replace('/')">뒤로가기</WaatButton>
      <WaatButton @click="signup">회원가입</WaatButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        pwd: '',
        name: ''
      }
    }
  },
  methods: {
    replace(address) {
      this.$router.replace(address).catch(() => {})
    },
    signup() {
      this.$api.post('/api/users/signup', {
        user: this.user
      }).then((res) => {
        if (res.data.status) {
          alert(res.data.msg)
          this.replace('/')
        }
        else {
          alert(res.data.msg)
          this.$router.go()
        }
      })
    }
  }
}
</script>