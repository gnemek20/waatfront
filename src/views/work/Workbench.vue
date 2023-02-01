<template>
  <div class="box">
    <WaatHeader />
    <WaatModal v-if="deleteModal">
      <div slot="header" class="flex justify-center" style="margin-bottom: 5px;">
        <p style="font-size: 25px;">정말로 삭제하시겠습니까?</p>
      </div>
      <div slot="footer" class="flex justify-center">
        <div style="margin-right: 20px;">
          <WaatButton @click="deleteModal = !deleteModal">취소하기</WaatButton>
        </div>
        <div style="margin-left: 20px;">
          <WaatButton type="warn" @click="deleteItem()">삭제하기</WaatButton>
        </div>
      </div>
    </WaatModal>
    <WaatModal v-if="createModal">
      <div slot="header" class="flex justify-center" @keydown.enter="createWorkspace" style="margin-bottom: 5px;">
        <WaatInput name="title" v-model="newWorkspace.title" placeholder="새로운 프로젝트"></WaatInput>
      </div>
      <div class="flex" slot="body" @keydown.enter="createWorkspace" style="margin-bottom: 5px;">
        <textarea ref="manual" v-model="newWorkspace.manual" rows="20" placeholder="설명"></textarea>
      </div>
      <div slot="footer" class="flex justify-center">
        <div style="margin-right: 20px;">
          <WaatButton @click="createModalStatus(false)">취소하기</WaatButton>
        </div>
        <div style="margin-left: 20px;">
          <WaatButton @click="createWorkspace" :disabled="newWorkspace.title.length < 1">생성하기</WaatButton>
        </div>
      </div>
    </WaatModal>
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
                <div class="flex full-width full-height justify-center align-center" @click="createModal = true">
                  <img src="@/assets/icon/plus_icon.svg" width="25px" height="25px">
                </div>
              </WaatBox>
            </div>
            <div v-for="index in workspacesCount" v-bind:key="index" style="width: 152px; height: 152px; margin: 10px;">
              <WaatBox class="workspaces" v-if="workspaces[index - 1]">
                <div class="flex flex-column full-width full-height" @click="chick">
                  <div class="flex flex-column align-center full-height" style="margin-bottom: auto; padding: 5px;">
                    <div class="flex">
                      <p>{{ workspaces[index - 1].title.length > 10 ? workspaces[index - 1].title.slice(0, 8) + ' . . .' : workspaces[index - 1].title }}</p>
                    </div>
                    <Divider style="width: 80%" />
                    <div class="flex align-center full-height">
                      <p>{{ workspaces[index - 1].manual.length > 40 ? workspaces[index - 1].manual.slice(0, 38) + ' . . .' : workspaces[index - 1].manual }}</p>
                    </div>
                  </div>
                  <Divider />
                  <div class="flex" style="padding-left: 5px;">
                    <div class="flex">
                      <p class="date">2023 / 02 / 02</p>
                    </div>
                    <div class="trash flex left-auto" @click="deleteModalStatus(true, index - 1)" style="padding: 0px 5px;">
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
      newWorkspace: {
        title: '',
        manual: '',
        date: ''
      },
      workspaces: [],
      workspacesCount: 0,
      deleteIndex: 0,
      deleteModal: false,
      createModal: false
    }
  },
  methods: {
    resizeWindow() {
      const width = window.innerWidth
      var rowCount = 0

      if (width > 707) rowCount = 4
      else if (width > 535) rowCount = 3

      this.workspacesCount = (rowCount - 1) + parseInt(this.workspaces.length / rowCount) * rowCount
    },
    createWorkspace() {
      this.workspaces.push({
        'title': this.newWorkspace.title,
        'manual': this.newWorkspace.manual
      })

      this.workspacesCount += 1
      this.createModalStatus(false)
    },
    deleteItem() {
      this.workspaces.splice(this.deleteIndex, 1)
      this.deleteModal = !this.deleteModal
    },
    deleteModalStatus(boolean, index) {
      this.deleteModal = boolean
      this.deleteIndex = index
    },
    createModalStatus(boolean) {
      this.createModal = boolean
      this.newWorkspace.title = ''
      this.newWorkspace.manual = ''
    },
    chick() {
      console.log(this.workspaces)
    }
  },
  created() {
    this.resizeWindow()
    window.addEventListener('resize', () => {
      this.resizeWindow()
    })
  }
}
</script>

<style lang="scss" scoped>
textarea {
  padding: 5px;
  width: calc(100% - 12px);
  height: 100%;

  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: dimgray;
  resize: none;
}

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