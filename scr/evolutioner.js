import { generate3dArray } from "./arrayUtil.js";

export class Evolutioner {

  survive = [];
  born = [];
  states = 2;
  #countNeighbours;

  constructor({ survive, born, states }) {
    this.survive = survive;
    this.born = born;
    this.states = states;
    this.#countNeighbours = this.mooreNeighborhood;
  }

  getNextGeneration(currentGeneration) {
    const { length } = currentGeneration;
    let nextGeneration = generate3dArray(length);
    for (let x = 0; x < length; x++) {
      for (let y = 0; y < length; y++) {
        for (let z = 0; z < length; z++) {
          const neighboursAlive = this.#countNeighbours([x, y, z], currentGeneration);
          nextGeneration[x][y][z] = this.#applyRules(currentGeneration[x][y][z], neighboursAlive);
        }
      }
    }
    return nextGeneration;
  }

  mooreNeighborhood = (position, array) => {
    const { length } = array;
    const [x, y, z] = position;
    let counter = 0;
    for (let a = x - 1; a < x + 2; a++) {
      for (let b = y - 1; b < y + 2; b++) {
        for (let c = z - 1; c < z + 2; c++) {
          if (a === x && b === y && c === z) {
            continue;
          }
          const x1 = this.#normalizeIndex(a, length);
          const y1 = this.#normalizeIndex(b, length);
          const z1 = this.#normalizeIndex(c, length);

          if (array[x1][y1][z1]) {
            counter++;
          }
        }
      }
    }
    return counter;
  }

  #normalizeIndex(index, length) {
    return index < 0 ? length - 1 : index > (length - 1) ? 0 : index;
  }

  #applyRules(isAlive, neighboursAlive) {
    return isAlive ? this.survive.includes(neighboursAlive) : this.born.includes(neighboursAlive); 
  }

}