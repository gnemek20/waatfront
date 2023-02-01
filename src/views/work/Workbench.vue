<template>
  <div class="box">
    <WaatHeader />
    <div class="box align-center">
      <div class="box align-center default-width" style="margin: 40px 0px;">
        <div class="flex title">
          <p>workbench</p>
        </div>
        <Divider />
      </div>
      <div class="flex full-width" style="max-width: 800px;">
        <Section>
          <div class="flex flex-wrap full-width space-between">
            <div style="width: 152px; height: 152px; margin: 10px;">
              <WaatBox class="workspaces" border="dashed">
                <div class="flex full-width full-height justify-center align-center">
                  <img src="@/assets/icon/plus_icon.svg" width="25px" height="25px">
                </div>
              </WaatBox>
            </div>
            <div v-for="index in elementCount" v-bind:key="index" style="width: 152px; height: 152px; margin: 10px;">
              <WaatBox class="workspaces" v-if="element[index - 1]">
                <div class="flex flex-column full-width full-height">
                  <div class="flex flex-column align-center full-height" style="margin-bottom: auto; padding: 5px;">
                    <div class="flex">
                      <p>{{ element[index - 1].name }}</p>
                    </div>
                    <Divider style="width: 80%" />
                    <div class="flex align-center full-height">
                      <p>{{ element[index - 1].manual }}</p>
                    </div>
                  </div>
                  <Divider />
                  <div class="flex" style="padding-left: 5px;">
                    <div class="flex">
                      <p class="date">2023 / 02 / 02</p>
                    </div>
                    <div class="trash flex left-auto" @click="deleteItem(index - 1)" style="padding: 0px 5px;">
                      <img src="@/assets/icon/trash_icon.svg" width="12px">
                    </div>
                  </div>
                </div>
              </WaatBox>
            </div>
          </div>
        </Section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      element: [
        {
          name: '멋진 제목',
          manual: '맛있게 밥을먹기 위한 서버 그것은 과연 치킨일까 무엇일까'
        },
        {
          name: '미친 제목',
          manual: '2일차'
        },
        {
          name: '엄청난 제목',
          manual: '3일차'
        },
        {
          name: '글피',
          manual: '헐 안녕하세요'
        }
      ],
      elementCount: 0
    }
  },
  methods: {
    resizeWindow() {
      const width = window.innerWidth
      var rowCount = 0

      if (width > 707) rowCount = 4
      else if (width > 535) rowCount = 3

      this.elementCount = (rowCount - 1) + parseInt(this.element.length / rowCount) * rowCount
    },
    deleteItem(index) {
      this.element.splice(index, 1)
    }
  },
  created() {
    this.element.push({name: '언젠가'})

    this.resizeWindow()
    window.addEventListener('resize', () => {
      this.resizeWindow()
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 60px;
}

.date {
  font-size: 14px;
}

.trash:hover {
  background-color: #ededed;
}

.workspaces:hover {
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px gray;
}
</style>