<template>
  <div class="box">
    <div class="flex space-between full-width">
      <WaatInput name="image_dir" v-model="data.image_dir" placeholder="image_dir"></WaatInput>
      <WaatInput name="model_path" v-model="data.model_path" placeholder="model_path"></WaatInput>
      <WaatInput name="annotation_dir" v-model="data.annotation_dir" placeholder="annotation_dir"></WaatInput>
      <WaatInput name="pretrained_model" v-model="data.pretrained_model" placeholder="pretrained_model"></WaatInput>
    </div>
    <div class="full-width">
      <WaatButton @click="inference">inference</WaatButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        image_dir: '',
        model_path: '',
        annotation_dir: '',
        pretrained_model: ''
      }
    }
  },
  methods: {
    inference() {
      // this.$api.post('/api/python/inferenceweb', {
      //   data: this.data
      // }).then((res) => {
      //   console.log(123)
      // })

      this.$api.get('/api/python')
      .then((res) => {
        console.log(res)
      })
    }
  }
}
</script>