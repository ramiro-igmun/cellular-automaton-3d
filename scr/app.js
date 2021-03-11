import { Renderer } from "./renderer.js";
import { Evolutioner } from "./evolutioner.js";
import { generate3dArray } from "./arrayUtil.js";

const length = 30;
const rule = '4/4/5';
const [s, b, [c]] = rule.split('/').map(element => element.split(',').map(v => +v));
const states = c - 1;
let running = true;

let currentGeneration = generate3dArray(length, states);

const evolutioner = new Evolutioner({ survive: s, born: b, states });
const renderer = new Renderer(10, 15);

const gameLoop = () => {
  if (running) {
    currentGeneration = evolutioner.getNextGeneration(currentGeneration);
    renderer.renderArray(currentGeneration);
  }
}

let interval = setInterval(gameLoop, 100);

let pauseButton = document.querySelector('.pause-button');

pauseButton.addEventListener('click', (e) => {
  console.log('click');
  running = !running;
});
