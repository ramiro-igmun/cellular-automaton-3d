
const inInitialSpawnRange = (index, length) => {
  return index > (length / 3) && index < (2 * length / 3);
};

export const generate3dArray = (length, states) => {
  const range = new Array(length).fill();
  return range.map((row, rowIndex) => range.map((column, columnIndex) => range.map((layer, layerIndex) => {
    if (inInitialSpawnRange(rowIndex, length) && inInitialSpawnRange(columnIndex, length) && inInitialSpawnRange(layerIndex, length)) {
      return Math.random() < 0.2 ? states : 0;
    } else {
      // return 0;
      return Math.random() < 0.2 ? states : 0;
    }
  })));
};