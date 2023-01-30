<template>
  <div class="box">
    <div class="flex banner full-width">
      <Section>
        <div class="flex full-width justify-center">
          <div class="flex title pointer" @click="push()">
            <p>WAAT</p>
          </div>
          <div v-if="!onlyHeader" class="flex align-center left-auto">
            <WaatButton @click="signout()">로그아웃</WaatButton>
          </div>
        </div>
      </Section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onlyHeader: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    push() {
      if (this.$session.get('id')) {
        if (this.$router.currentRoute.path == '/workspace') this.$router.go()
        else this.$router.push('/workspace')
      }
      else this.$router.push('/')
    },
    signout() {
      this.$session.destroy()
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  padding: 10px 0px;
  background-color: dimgray;
  color: white;
}

.title {
  font-size: 30px;
}
</style>