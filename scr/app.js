import { Renderer } from "./renderer.js";
import { Evolutioner } from "./evolutioner.js";
import { generate3dArray } from "./arrayUtil.js";

const length = 30;
const rule = '3/0';
const [survive, born] = rule.split('/');

let currentGeneration = generate3dArray(length);
const evolutioner = new Evolutioner({ survive, born });
const renderer = new Renderer(13, 15);

const gameLoop = () => {
  currentGeneration = evolutioner.getNextGeneration(currentGeneration);
  renderer.renderArray(currentGeneration);
}

let interval = setInterval(gameLoop, 100);


