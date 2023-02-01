<template>
  <div class="box align-center">
    <WaatHeader onlyHeader></WaatHeader>
    <div class="box default-width">
      <div class="box">
        <div class="box" @keydown.enter="signin()" style="margin: 20px 0px 10px;">
          <p>아이디</p>
          <WaatInput name="id" v-model="user.id" nospace focus></WaatInput>
        </div>
        <div class="box" @keydown.enter="signin()" style="margin: 10px 0px 20px;">
          <p>비밀번호</p>
          <WaatInput name="pwd" v-model="user.pwd" type="password" nospace></WaatInput>
        </div>
      </div>
      <div class="flex full-width" style="margin-top: 20px;">
        <WaatButton class="full-width" @click="signin" :disabled="!submit">로그인</WaatButton>
      </div>
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
      },
      submit: false
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
          this.$router.replace('/workbench')
        }
        else {
          alert(res.data.msg)
          this.$router.go()
        }
      })
    }
  },
  updated() {
    if (this.user.id.length > 0 && this.user.pwd.length > 0) this.submit = true
    else this.submit = false
  }
}
</script>