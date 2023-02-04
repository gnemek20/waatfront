<template>
  <div class="box">
    <WaatHeader />
    <WaatModal v-if="deleteModal">
      <div slot="header" class="flex justify-center" @keydown.esc="deleteModal = !deleteModal" style="margin-bottom: 5px;">
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
      <div slot="header" class="flex justify-center" @keydown.enter="createWorkspace" @keydown.esc="createModalStatus(false)" style="margin-bottom: 5px;">
        <WaatInput name="theme" v-model="newWorkspace.theme" placeholder="새로운 프로젝트" focus></WaatInput>
      </div>
      <div class="flex" slot="body" @keydown.enter="createWorkspace" @keydown.esc="createModalStatus(false)" style="margin-bottom: 5px;">
        <textarea ref="content" v-model="newWorkspace.content" rows="20" placeholder="설명"></textarea>
      </div>
      <div slot="footer" class="flex justify-center">
        <div style="margin-right: 20px;">
          <WaatButton @click="createModalStatus(false)">취소하기</WaatButton>
        </div>
        <div style="margin-left: 20px;">
          <WaatButton @click="createWorkspace" :disabled="newWorkspace.theme.length < 1">생성하기</WaatButton>
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
                <div class="flex flex-column full-width full-height">
                  <div class="flex flex-column align-center full-height" @click="push('workspace', index - 1)" style="margin-bottom: auto; padding: 5px;">
                    <div class="flex">
                      <p>{{ workspaces[index - 1].theme.length > 10 ? workspaces[index - 1].theme.slice(0, 8) + ' . . .' : workspaces[index - 1].theme }}</p>
                    </div>
                    <Divider style="width: 80%" />
                    <div class="flex align-center full-height">
                      <p>{{ workspaces[index - 1].content.length > 40 ? workspaces[index - 1].content.slice(0, 38) + ' . . .' : workspaces[index - 1].content }}</p>
                    </div>
                  </div>
                  <Divider />
                  <div class="flex" style="padding-left: 5px;">
                    <div class="flex" @click="push('workspace', index - 1)">
                      <p class="date">{{ workspaces[index - 1].date }}</p>
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
        id: this.$session.get('id'),
        theme: '',
        content: '',
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
      this.newWorkspace.date = Intl.DateTimeFormat('kr').format(new Date()).replace(/\./g, '').replace(/\s/g, ' / ');

      this.$api.post('/api/users/validateWorkspaceTheme', {
        workspace: this.newWorkspace,
      }).then((res) => {
        if (res.data.isExist) {
          this.$refs['content'].value = this.$refs['content'].value.replace(/\n/g, '');
          alert('이름이 중복됩니다.');
        }
        else {
          this.$api.post('/api/users/createWorkspace', {
            workspace: this.newWorkspace,
          }).then((res) => {
            if (!res.data.status) {
              alert(res.data.msg);
              this.$router.go();
            }
            else {
              this.workspaces.push({
                'id': this.newWorkspace.id,
                'theme': this.newWorkspace.theme,
                'content': this.newWorkspace.content,
                'date': this.newWorkspace.date
              });
              this.workspacesCount += 1;
              this.createModalStatus(false);
            }
          });
        }
      });
    },
    deleteItem() {
      this.$api.post('/api/users/deleteWorkspace', {
        workspace: {
          id: this.newWorkspace.id,
          theme: this.workspaces[this.deleteIndex].theme,
        }
      }).then((res) => {
        if (res.data.status) {
          this.workspaces.splice(this.deleteIndex, 1);
          this.deleteModal = !this.deleteModal;
        }
        else {
          alert(res.data.msg);
          this.$router.go();
        }
      });
    },
    deleteModalStatus(boolean, index) {
      this.deleteModal = boolean
      this.deleteIndex = index
    },
    createModalStatus(boolean) {
      this.createModal = boolean
      this.newWorkspace.theme = ''
      this.newWorkspace.content = ''
    },
    push(address, index) {
      this.$router.push({name: address, query: {theme: this.workspaces[index].theme}});
    }
  },
  async created() {
    await this.$api.post('/api/users/getWorkspaces', {
      id: this.newWorkspace.id,
    }).then((res) => {
      for (var i = 0; i < res.data.workspaces.length; i++) {
        this.workspaces.push(res.data.workspaces[i]);
      }
    });

    this.resizeWindow();
    window.addEventListener('resize', () => {
      this.resizeWindow();
    });
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