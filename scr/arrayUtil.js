
const inInitialSpawnRange = (index, length) => {
  return index > (length / 5) * 2 && index < (3 * length / 5);
};

export const generate3dArray = (length) => {
  const range = new Array(length).fill();
  return range.map((row, rowIndex) => range.map((column, columnIndex) => range.map((layer, layerIndex) => {
    if (inInitialSpawnRange(rowIndex, length) && inInitialSpawnRange(columnIndex, length) && inInitialSpawnRange(layerIndex, length)) {
      return Math.random() < 0.2;
    } else {
      return false;
      // return Math.random() < 0.2;
    }
  } )));
};