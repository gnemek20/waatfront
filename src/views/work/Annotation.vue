<template>
  <div class="containerColumn">
    <div class="wrapper">
      <WaatHeader onlyHeader />
    </div>
    <div class="containerColumn alignCenter" style="margin: 40px 0px;">
      <div class="containerRow justifyCenter" style="margin-bottom: 20px;">
        <canvas
        ref="canvas"
        width="550"
        height="550"
        />
        <canvas
        v-for="index in canvasCount"
        v-bind:key="index"
        :ref="index"
        width="550"
        height="550"
        style="position: absolute;"
        />
        <canvas
        ref="dragCanvas"
        width="550"
        height="550"
        style="position: absolute;"
        />
      </div>
      <div class="containerColumn options">
        <div class="containerRow leftAuto">
          <div class="wrapper" style="margin-right: 10px;">
            <WaatButton @click="push('workspace')">뒤로가기</WaatButton>
          </div>
          <div class="wrapper" style="margin-left: 10px;">
            <WaatButton>저장하기</WaatButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: {
        id: this.$session.get('id'),
        theme: this.$route.query.theme,
        image: this.$route.query.image,
      },
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
    push(address) {
      this.$router.push({
        name: address,
        query: {
          theme: this.image.theme,
        },
      });
    },
  },
  async mounted() {
    this.canvas = this.$refs['canvas'];
    this.context = this.canvas.getContext('2d');
    this.dragCanvas = this.$refs['dragCanvas']
    this.dragContext = this.dragCanvas.getContext('2d');

    let saveRectCanvas = new Object();
    let saveRectContext = new Object();
    let isMouseOut = false;
    let isClickedEsc = false;

    await this.$api.post('/api/users/getImage', {
      image: this.image,
    }).then((res) => {
      if (res.data.status) {
        let showingImage = new Image();
        fetch('http://waat.kro.kr:3000/api/users/getImage/image');
        showingImage.src = 'http://waat.kro.kr:3000/api/users/getImage/image';
        showingImage.onload = async () => {
          this.context.drawImage(showingImage, 0, 0, this.canvas.width, this.canvas.height);
        }
      }
    });

    this.dragCanvas.addEventListener('mousedown', (event) => {
      if (isMouseOut) return;
      isMouseOut = true;
      isClickedEsc = false;

      this.canvasCount = this.canvasCount + 1;
      this.clickedX = event.offsetX;
      this.clickedY = event.offsetY;
      this.dragCanvas.addEventListener('mousemove', this.mousePress);
    });
    this.dragCanvas.addEventListener('mouseup', (event) => {
      this.dragCanvas.removeEventListener('mousemove', this.mousePress);
      this.dragContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      isMouseOut = false;

      if (isClickedEsc) return;

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
          this.dragCanvas.removeEventListener('mousemove', this.mousePress);
          this.dragContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
          isMouseOut = false;
          isClickedEsc = true;
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

.options {
  width: 550px;
}
</style>