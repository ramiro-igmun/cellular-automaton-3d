import { Renderer } from "./renderer.js";
import { Evolutioner } from "./evolutioner.js";
import { generate3dArray } from "./arrayUtil.js";

const length = 30;
const rule = '4/4/5';
const [s, b, [c]] = rule.split('/').map(element => element.split(',').map(v => +v));
const states = c - 1;

let currentGeneration = generate3dArray(length, states);

const evolutioner = new Evolutioner({ survive: s, born: b, states });
const renderer = new Renderer(15, 15);

const gameLoop = () => {
  currentGeneration = evolutioner.getNextGeneration(currentGeneration);
  renderer.renderArray(currentGeneration);
}

let interval = setInterval(gameLoop, 100);


