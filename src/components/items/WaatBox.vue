<template>
  <div class="flex flex-column full-width full-height" :style="'border: 1px ' + border + ' dimgray; border-radius: 10px; overflow: hidden;'">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: String,
      default: 'solid'
    }
  }
}
</script>