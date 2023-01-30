<template>
  <div class="box">
    <div class="flex justify-center full-width">
      <input ref="image" type="file" accept="image/png" multiple />
    </div>
    <div class="full-width">
      <WaatButton @click="inference">inference</WaatButton>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    inference() {
      const fileDownload = require('js-file-download')
      const files = this.$refs.image.files

      if (files.length < 6 && files.length > 0) {
        this.$api.post('/api/pythons/mkdir', {
          id: this.$session.get('id')
        }).then((res) => {})

        const formData = new FormData()
        formData.append("id", this.$session.get('id'))
        for (var i = 0; i < files.length; i++) {
          formData.append("image", files[i])
        }

        this.$api.post('/api/pythons/saveimages', formData)

        this.$api.post('/api/pythons/inference', formData, {
          responseType: 'blob'
        }).then((res) => {
          fileDownload(res.data, 'waat.zip')
        })
      }
      else {
        alert('파일은 1 ~ 5개까지만 업로드해주세요!')
        this.$router.go()
      }
    }
  }
}
</script>