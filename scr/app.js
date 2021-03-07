import { Renderer } from "./renderer.js";
import { Evolutioner } from "./evolutioner.js";
import { generate3dArray } from "./arrayUtil.js";

const length = 30;
const rule = '13,14,15,16,17,18,19,20,21,22,23,24,25,26/13,14,17,18,19/2';
const [s, b, [c]] = rule.split('/').map(element => element.split(',').map(v => +v));
const states = c - 1;

let currentGeneration = generate3dArray(length, states);
console.log(currentGeneration);

const evolutioner = new Evolutioner({ survive: s, born: b, states });
console.log(evolutioner);
const renderer = new Renderer(13, 15);

currentGeneration = evolutioner.getNextGeneration(currentGeneration);
console.log(currentGeneration);

const gameLoop = () => {
  currentGeneration = evolutioner.getNextGeneration(currentGeneration);
  renderer.renderArray(currentGeneration);
}

let interval = setInterval(gameLoop, 100);


