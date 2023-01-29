<template>
  <div class="box">
    <div class="flex banner full-width">
      <Section>
        <div class="flex align-center title pointer" @click="reload()">
          <p>WAAT</p>
        </div>
        <div class="flex align-center left-auto">
          <WaatButton @click="signout()">로그아웃</WaatButton>
        </div>
      </Section>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reload() {
      this.$router.go()
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