<template>
  <div class="box">
    <div class="box">
      <WaatInput name="id" v-model="user.id" placeholder="아이디" nospace focus></WaatInput>
      <WaatInput name="pwd" v-model="user.pwd" placeholder="비밀번호" type="password" nospace></WaatInput>
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
          this.$session.set('id', res.data.id)
          this.$session.set('name', res.data.name)
          this.$router.replace('/workspace')
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