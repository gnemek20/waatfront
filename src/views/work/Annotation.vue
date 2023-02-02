<template>
  <div class="containerColumn">
    <div class="wrapper" style="margin-bottom: 20px;">
      <WaatHeader onlyHeader />
    </div>
    <div class="containerRow justify-center">
      <canvas
      ref="canvas"
      width="500"
      height="500"
      />
      <canvas
      v-for="index in canvasCount"
      v-bind:key="index"
      :ref="index"
      width="500"
      height="500"
      style="position: absolute;"
      />
      <canvas
      ref="dragCanvas"
      width="500"
      height="500"
      style="position: absolute;"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rectsCoord: [],
      canvasCount: 0,
      canvas: Object,
      context: Object,
      dragCanvas: Object,
      dragContext: Object,
      clickedX: Number,
      clickedY: Number,
      overedX: Number,
      overedY: Number,
    }
  },
  methods: {
    drawRect(context, startX, startY, endX, endY, isDash) {
      if (context === this.dragContext) context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (isDash) context.setLineDash([10]);
      else context.setLineDash([0]);

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.lineTo(endX, endY);
      context.lineTo(startX, endY);
      context.closePath();
      context.stroke();
    },
    mousePress(event) {
      const movedX = event.offsetX;
      const movedY = event.offsetY;

      this.drawRect(this.dragContext, this.clickedX, this.clickedY, movedX, movedY, true);
    },
  },
  mounted() {
    this.canvas = this.$refs['canvas'];
    this.context = this.canvas.getContext('2d');
    this.dragCanvas = this.$refs['dragCanvas']
    this.dragContext = this.dragCanvas.getContext('2d');

    let saveRectCanvas = new Object();
    let saveRectContext = new Object();
    let isMouseOut = false;

    const image = new Image();
    image.src = 'http://waat.kro.kr:3000/api/pythons/image';
    image.onload = () => {this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);}

    this.dragCanvas.addEventListener('mousedown', (event) => {
      if (isMouseOut) return;
      isMouseOut = true;

      this.canvasCount = this.canvasCount + 1;
      this.clickedX = event.offsetX;
      this.clickedY = event.offsetY;
      this.dragCanvas.addEventListener('mousemove', this.mousePress);
    });
    this.dragCanvas.addEventListener('mouseup', (event) => {
      this.dragCanvas.removeEventListener('mousemove', this.mousePress);
      this.dragContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      isMouseOut = false;
      
      saveRectCanvas = this.$refs[this.canvasCount][0];
      saveRectContext = saveRectCanvas.getContext('2d');
      this.overedX = event.offsetX;
      this.overedY = event.offsetY;
      this.drawRect(saveRectContext, this.clickedX, this.clickedY, this.overedX, this.overedY, false);

      let x, dx, y, dy;
      x = this.clickedX < this.overedX ? this.clickedX : this.overedX;
      dx = this.clickedX > this.overedX ? this.clickedX : this.overedX;
      y = this.clickedY < this.overedY ? this.clickedY : this.overedY;
      dy = this.clickedY > this.overedY ? this.clickedY : this.overedY;
      this.rectsCoord.push({'x': x, 'dx': dx, 'y': y, 'dy': dy});
    });
    addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        if (this.canvasCount > 0) {
          this.canvasCount = this.canvasCount - 1;
          this.rectsCoord.pop();
        }
      }
    });
  },
}
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid dimgray;
}
</style>