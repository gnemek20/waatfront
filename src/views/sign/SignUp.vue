<template>
  <div class="box align-center">
    <WaatHeader onlyHeader></WaatHeader>
    <div class="box align-center default-width">
      <div class="box">
        <div class="box" @keydown.enter="validateId()" style="margin: 20px 0px 10px;">
          <p>아이디</p>
          <div class="flex">
            <div class="flex full-width" style="margin-right: 5px;">
              <WaatInput name="id" v-model="user.id" placeholder="최대 20글자까지 입력 가능합니다" @input="inputId" nospace focus>
                <p ref="idStatus">{{ message.id }}</p>
              </WaatInput>
            </div>
            <div class="flex" style="margin-left: 5px;">
              <WaatButton @click="validateId()" :disabled="user.id.length == 0 || user.id.length > 20">중복 확인</WaatButton>
            </div>
          </div>
        </div>
        <div class="box" @keydown.enter="signup()" style="margin: 10px 0px;">
          <p>비밀번호</p>
          <WaatInput name="pwd" v-model="user.pwd" type="password" placeholder="최대 20글자까지 입력 가능합니다" @input="validatePwd" nospace></WaatInput>
        </div>
        <div class="box" @keydown.enter="signup()" style="margin: 10px 0px;">
          <p>비밀번호 확인</p>
          <WaatInput name="confirmPwd" v-model="confirmPwd" type="password" placeholder="최대 20글자까지 입력 가능합니다" @input="validatePwd" nospace>
            <p ref="pwdStatus">{{ message.pwd }}</p>
          </WaatInput>
        </div>
        <div class="box" @keydown.enter="signup()" style="margin: 10px 0px 20px;">
          <p>닉네임</p>
          <WaatInput name="pwd" v-model="user.name" placeholder="최대 20글자까지 입력 가능합니다"></WaatInput>
        </div>
      </div>
      <div class="flex full-width" style="margin: 20px 0px;">
        <WaatButton class="full-width" @click="signup" :disabled="!submit">회원가입</WaatButton>
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
        pwd: '',
        name: ''
      },
      check: {
        id: false,
        pwd: false,
        name: false
      },
      message: {
        id: '',
        pwd: ''
      },
      confirmPwd: '',
      submit: false
    }
  },
  methods: {
    replace(address) {
      this.$router.replace(address).catch(() => {})
    },
    signup() {
      this.$api.post('/api/users/validateid', {
        id: this.user.id
      }).then((res) => {
        if (res.data.status) {
          this.message.id = res.data.msg
        }
      })

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
    },
    inputId() {
      this.message.id = ''
      this.check.id = false
    },
    validateId() {
      if (this.user.id.length > 20) return
      
      this.$api.post('/api/users/validateid', {
        id: this.user.id
      }).then((res) => {
        if (res.data.status) {
          this.$refs['idStatus'].style.color = 'lightgreen'
          this.message.id = res.data.msg
          this.check.id = true
        }
        else {
          this.$refs['idStatus'].style.color = 'coral'
          this.message.id = res.data.msg
        }
      })
    },
    validatePwd() {
      if (this.confirmPwd.length == 0) {
        this.message.pwd = ''
        return
      }

      if (this.user.pwd == this.confirmPwd) {
        this.message.pwd = ''
        this.check.pwd = true
      }
      else {
        this.$refs['pwdStatus'].style.color = 'coral'
        this.message.pwd = '비밀번호가 같지 않습니다.'
        this.check.pwd = false
      }
    }
  },
  updated() {
    if (this.user.name.length != 0 && this.user.name.length < 21) this.check.name = true
    else this.check.name = false
    
    if (this.check.id && this.check.pwd && this.check.name) this.submit = true
    else this.submit = false
  }
}
</script>