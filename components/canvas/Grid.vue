<template>
  <canvas class="cnv" ref="cnv"></canvas>
  <div class="cursor" ref="crs"></div>
</template>

<script setup>
  const crs = ref(null)
  
  const cnv = ref(null)
  let ctx = null

  let w, h = null
  const reSizeCnv = () => {
    w = cnv.value.width = window.innerWidth
    h = cnv.value.height = window.innerHeight
  }

  const globalProperties = {
    clearInterval: 500,
    opacityFactor: 0.009,
    centerOpacity: 1,
    hoverRadius: 120,
    sizeSquare: 40,
    sizeFactor: 0.005,
  }

  class Square {
    constructor(x, y, /* text */) {
      this.borderColor = '#e8e8e8'
      this.borderWidth = 0.5
      this.size = globalProperties.sizeSquare

      this.x = x
      this.y = y
      this.hovered = false
      this.opacity = 1
      // this.text = text
    }

    draw() {
      if( this.hovered ) {
        const distance = Math.sqrt(
          Math.pow(this.x + this.size / 2 - this.hoveredX, 2) +
          Math.pow(this.y + this.size / 2 - this.hoveredY, 2)
        );

        this.opacity = Math.max( 0,
          globalProperties.centerOpacity -
            distance * globalProperties.opacityFactor
        );
  
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.globalAlpha = this.opacity;

        const sizeFactor = Math.max(0.5, 1 - distance * globalProperties.sizeFactor);
        const adjustedSize = this.size * sizeFactor;

        const dx = (adjustedSize - this.size) / 2; 
        const dy = (adjustedSize - this.size) / 2;

        ctx.strokeRect(this.x - dx, this.y - dy, adjustedSize, adjustedSize);
        
        // ctx.fillStyle = '#ffffff'; // Цвет текста
        // ctx.font = '12px Arial'; // Шрифт и размер
        // ctx.textAlign = 'center'; // Выравнивание текста
        // ctx.fillText(this.text, this.x + this.size / 2, this.y + this.size / 2 + 5); // Отрисовка текста
      }
    }
  }

  const grid = ref([])

  const init = () => {
    grid.value = []
    const squareQuantityX = w / globalProperties.sizeSquare | 0
    const squareQuantityY = h / globalProperties.sizeSquare | 0

    const gapX = (w - globalProperties.sizeSquare * squareQuantityX) / 2
    const gapY = (h - globalProperties.sizeSquare * squareQuantityY) / 2

    let counter = 0
    for (let j = 0; j < squareQuantityY; j++) {
      let y = gapY + j * globalProperties.sizeSquare

      for (let i = 0; i < squareQuantityX; i++) {
        let x = gapX + i * globalProperties.sizeSquare
        counter++

        grid.value.push(new Square(x, y, /* `${ j }|${ i }` */));
      }
    }
  }

  let animationFrame = null;

  const loop = () => {
    ctx.clearRect(0, 0, w, h)

    grid.value.forEach(square => {
      square.draw()
    });

    if (animationFrame) {
      animationFrame = requestAnimationFrame(loop);
    }
  }

  const startAnimation = () => {
    animationFrame = requestAnimationFrame(loop);
  }

  const stopAnimation = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  const handleMouseMove = (event) => {
    const rect = cnv.value.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    crs.value.classList.add('cursor_move')
    crs.value.style.left = ( mouseX - 2 ) + 'px'
    crs.value.style.top = ( mouseY - 2 ) + 'px'

    grid.value.forEach(square => {
      const distance = Math.sqrt(
        Math.pow(mouseX - (square.x + square.size / 2), 2) +
        Math.pow(mouseY - (square.y + square.size / 2), 2)
      );

      square.hovered = distance <= globalProperties.hoverRadius;
      square.hoveredX = mouseX;
      square.hoveredY = mouseY;
    });
  }

  const handleMouseOut = () => {
    crs.value.classList.remove('cursor_move')
    grid.value = []
    clearCanvas()
  }

  let clearIntervalId = null;

  const clearCanvas = () => {
    ctx.clearRect(0, 0, w, h);
  };

  onMounted(() => {
    ctx = cnv.value.getContext('2d')

    window.onresize = () => {
      reSizeCnv()
      init()
    }

    window.onmouseover = init;
    window.onmouseout = handleMouseOut;
    
    window.onmousemove = handleMouseMove;

    window.onfocus = startAnimation;
    window.onblur = stopAnimation;

    reSizeCnv()
    init()

    animationFrame = requestAnimationFrame(loop);
    loop()

    clearIntervalId = setInterval(clearCanvas, globalProperties.clearInterval);
  })

  onUnmounted(() => {
    clearInterval(clearIntervalId);
  });
</script>
