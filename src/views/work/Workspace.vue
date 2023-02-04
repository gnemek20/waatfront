<template>
  <div class="containerColumn">
    <div class="wrapper">
      <WaatHeader onlyHeader />
    </div>
    <div class="containerColumn" style="margin: 40px 0px;">
      <div class="containerRow justifyCenter" style="margin-bottom: 40px;">
        <div class="containerColumn fullWidth defaultWidth">
          <div class="containerColumn">
            <p style="font-size: 30px;">{{ workspace.theme }}</p>
            <p>{{ workspace.content }}</p>
          </div>
          <div class="wrapper">
            <Divider />
          </div>
        </div>
      </div>
      <div class="containerRow">
        <Section class="justifyCenter">
          <div class="containerColumn imageTable">
            <div class="containerRow" style="margin-left: auto; margin-right: 12px;">
              <div class="wrapper" v-if="!isSelect">
                <WaatButton @click="clickOption">선택</WaatButton>
              </div>
              <div class="wrapper" v-if="isSelect" style="margin-right: 10px;">
                <WaatButton @click="clickOption">취소</WaatButton>
              </div>
              <div class="wrapper" v-if="isSelect" style="margin-left: 10px;">
                <WaatButton type="warn" @click="deleteImages">삭제</WaatButton>
              </div>
            </div>
            <div class="tableRow">
              <div class="containerRow space">
                <WaatBox class="images" border="dashed">
                  <label for="files">
                    <img
                    src="@/assets/icon/plus_icon.svg"
                    width="25px"
                    height="25px"
                    />
                  </label>
                  <input
                  id="files"
                  ref="files"
                  type="file"
                  accept="image/png"
                  @change="uploadFiles"
                  multiple
                  />
                </WaatBox>
              </div>
              <div
              class="containerRow space"
              v-for="index in spareSpaces.count"
              v-bind:key="index"
              >
                <WaatBox
                class="images"
                v-if="images[index - 1]"
                :ref="index - 1"
                >
                  <div
                  class="wrapper justifyCenter alignCenter fullHeight"
                  @click="clickImage(index - 1)"
                  >
                    <p>{{ images[index - 1].image }}</p>
                  </div>
                </WaatBox>
              </div>
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
      workspace: {
        id: this.$session.get('id'),
        theme: this.$route.query.theme,
        content: '',
      },
      spareSpaces: {
        count: 0,
        rowVolume: 0,
      },
      images: [],
      clickedImages: [],
      isSelect: false,
    }
  },
  methods: {
    computeTableRow() {
      const width = window.innerWidth;
      this.spareSpaces.rowVolume = 0;

      if (width > 707) this.spareSpaces.rowVolume = 4;
      else if (width > 535) this.spareSpaces.rowVolume = 3;

      this.spareSpaces.count = (this.spareSpaces.rowVolume - 1) + parseInt(this.images.length / this.spareSpaces.rowVolume) * this.spareSpaces.rowVolume;
    },
    async uploadFiles() {
      const input = this.$refs['files']
      const files = input.files;

      if (files.length > 0) {
        const imagesArray = this.images.map(value => ['image', value.image][1]);
        const formData = new FormData();
        formData.append('id', this.workspace.id);
        formData.append('theme', this.workspace.theme);
        for (let i = 0; i < files.length; i++) {
          if (!(imagesArray.includes(files[i].name))) {
            formData.append('file', files[i]);
            this.images.push({
              image: files[i].name,
            });
          }
        }
        this.computeTableRow();

        await this.$api.post('/api/users/uploadFiles', formData);
        input.value = null;
      }
    },
    clickImage(index) {
      if (this.isSelect) {
        const clickedArray = this.clickedImages.map(value => ['index', value.index][1]);
        const isExistImage = clickedArray.includes(index);
        if (isExistImage) {
          const spliceIndex = clickedArray.indexOf(index);
          this.clickedImages.splice(spliceIndex, 1);
          this.$refs[index][0]['$el'].style = 'border: 1px solid dimgray; border-radius: 10px;';
        }
        else {
          this.clickedImages.push({
            index: index,
            image: this.images[index].image,
          });
          this.$refs[index][0]['$el'].style = 'border: 1px solid dimgray; border-radius: 10px; box-shadow: 0px 0px 20px 0px gray;';
        }
      }
    },
    clearStyle() {
      for (let i = 0; i < this.images.length; i++) {
        this.$refs[i][0]['$el'].style = 'border: 1px solid dimgray; border-radius: 10px;';
      }
    },
    clickOption() {
      if (this.isSelect) {
        this.clearStyle();
        this.clickedImages = [];
      }
      
      this.isSelect = !this.isSelect;
    },
    async deleteImages() {
      await this.$api.post('/api/users/deleteImages', {
        workspace: this.workspace,
        images: this.clickedImages,
      }).then((res) => {
        if (res.data.status) {
          const clickedArray = this.clickedImages.map(value => ['index', value.index][1]).sort();
          for (let i = 0; i < this.clickedImages.length; i++) {
            this.images.splice(clickedArray[i] - i, 1);
          }

          this.clearStyle();
          this.computeTableRow();
          this.isSelect = !this.isSelect;
        }
      });
    },
  },
  async created() {
    await this.$api.post('/api/users/getWorkspace', {
      workspace: this.workspace,
    }).then((res) => {
      if (res.data.status) {
        this.workspace.content = res.data.workspace.content;
      }
    });

    await this.$api.post('/api/users/getImages', {
      workspace: this.workspace,
    }).then((res) => {
      if (res.data.status) {
        for (let i = 0; i < res.data.images.length; i++) {
          this.images.push({
            image: res.data.images[i].image,
          });
        }
      }
    });

    this.computeTableRow();
    window.addEventListener('resize', this.computeTableRow);
  },
}
</script>

<style lang="scss" scoped>
.imageTable {
  max-width: 800px;
  width: 100%;
}

.tableRow {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.tableRow label {
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.tableRow input {
  position: absolute;
  width: 0px;
}

.space {
  margin: 12px;
  width: 150px;
  height: 150px;
}

.images {
  width: 100%;
  height: 100%;
}

.images:hover {
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px gray;
}
</style>