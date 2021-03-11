export class Renderer {

  cellSize = 5;
  spaceBetweenCells = 10;

  #arrayLength = 10;
  #borderBox;
  #illo;
  #anchor;
  #circleOptions;
  #currentCellArray = [];

  constructor(cellSize = 5, spaceBetweenCells = 10) {
    this.cellSize = cellSize;
    this.spaceBetweenCells = spaceBetweenCells;
    this.#illo = this.#initScene();
    this.#anchor = new Zdog.Anchor({
      addTo: this.#illo,
      rotate: { x: Zdog.TAU * -0.05, y: Zdog.TAU * -0.10 },
    });
    this.#circleOptions = {
      addTo: this.#anchor,
      stroke: this.cellSize,
      color: 'hsla(269, 52%, 50%, 0.8)',
    }
    this.#borderBox = this.#drawBorderBox();
    this.#animate(this.#illo)();
    const zdogCanvas = document.querySelector('.zdog-canvas');
    const onWheel = (renderer) => {
      return ({ deltaY }) => {
        renderer.#zoom(deltaY / 1000);
      }
    };
    zdogCanvas.addEventListener('wheel', onWheel(this));
  }

  renderArray(array) {
    this.deleteCurrentArray();
    this.#arrayLength = array.length;
    this.#borderBox.remove();
    this.#borderBox = this.#drawBorderBox();
    this.#currentCellArray =
      array.map((row, rowIndex) =>
        row.map((column, columnIndex) =>
          column.map((layer, layerIndex) =>
            layer && this.#drawPoint(rowIndex, columnIndex, layerIndex)
          )
        )
      );
  }


  deleteCurrentArray() {
    this.#currentCellArray.forEach(row => row.forEach(column => column.forEach(layer => layer && layer.remove())));
  }

  #initScene() {
    return new Zdog.Illustration({
      element: '.zdog-canvas',
      dragRotate: true,
      zoom: 1
    });
  }

  #drawBorderBox() {
    return new Zdog.Box({
      addTo: this.#anchor,
      width: this.#arrayLength * (this.spaceBetweenCells + (this.spaceBetweenCells / 8)),
      height: this.#arrayLength * (this.spaceBetweenCells + (this.spaceBetweenCells / 8)),
      depth: this.#arrayLength * (this.spaceBetweenCells + (this.spaceBetweenCells / 8)),
      stroke: 5,
      color: 'hsla(150, 0%, 50% , 0.05)',
    });
  }

  #drawPoint(x, y, z) {
    return new Zdog.Shape({
      ...this.#circleOptions,
      color: (this.#isArrayBorder(x) || this.#isArrayBorder(y) || this.#isArrayBorder(z)) ? `hsla(0, 80%, 30% , 1)` : `hsla(${x * 11}, 80%, 50% , 1)`,
      translate: {
        x: this.spaceBetweenCells * (x - (this.#arrayLength / 2)),
        y: this.spaceBetweenCells * (y - (this.#arrayLength / 2)),
        z: this.spaceBetweenCells * (z - (this.#arrayLength / 2))
      }
    });
  }

  #isArrayBorder(axisCoordinate) {
    return [0, this.#arrayLength -1].includes(axisCoordinate)
  }

  #animate(illo) {
    return () => {
      illo.updateRenderGraph();
      this.#anchor.rotate.y += 0.005;
      requestAnimationFrame(this.#animate(illo));
    }
  }

  #zoom(direction) {
    this.#illo.zoom -= direction;
  }

}