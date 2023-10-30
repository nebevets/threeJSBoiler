import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const FULL_CIRCLE = Math.PI * 2; // a full 360 degress in radians

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(new THREE.AxesHelper(5));

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// stats and gui are dev only, below here
const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();

const cubeFolder = gui.addFolder("Cube");
cubeFolder.open();

const rotationFolder = cubeFolder.addFolder("Rotation");
rotationFolder.add(cube.rotation, "x", 0, FULL_CIRCLE);
rotationFolder.add(cube.rotation, "y", 0, FULL_CIRCLE);
rotationFolder.add(cube.rotation, "z", 0, FULL_CIRCLE);
rotationFolder.open();

const positionFolder = cubeFolder.addFolder("Position");
positionFolder.add(cube.position, "x", -10, 10, 0.1);
positionFolder.add(cube.position, "y", -10, 10, 0.1);
positionFolder.add(cube.position, "z", -10, 10, 0.1);
positionFolder.open();

const scaleFolder = cubeFolder.addFolder("Scale");
scaleFolder.add(cube.scale, "x", 0, 5);
scaleFolder.add(cube.scale, "y", 0, 5);
scaleFolder.add(cube.scale, "z", 0, 5);
scaleFolder.open();

cubeFolder.add(cube, "visible", false);
// dev only above here

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
