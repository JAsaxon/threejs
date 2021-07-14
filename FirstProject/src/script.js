import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const scale = 0.1;
// Light

// Object
let group = new THREE.Group();
let geometry = new THREE.BoxGeometry(scale, scale, scale);

for (let i = 0; i < 10; i++) {
  var subgroup = new THREE.Group();
  for (let j = 0; j < 10; j++) {
    let material = new THREE.MeshBasicMaterial({
        color: "red"
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i * 0.1;
    mesh.position.z = j * 0.1 + 1;

    subgroup.add(mesh);
  }
  group.add(subgroup);
}

scene.add(group);
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = -0.5;
camera.position.y = 1;
camera.position.x = 0.6;
camera.lookAt(.5,.5,.5);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animations
console.log(group);
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  for (let i = 0; i < group.children.length; i++) {
    for (let j = 0; j < group.children[i].children.length; j++) {
      const height =
        (Math.abs(Math.sin(elapsedTime + j / 10) * 20) *
          Math.abs(Math.sin(elapsedTime + i / 10) * 20)) /
        50;

      const obj = group.children[i].children[j];
      obj.scale.set(1, height, 1);
      obj.position.y = height / 20;
      obj.material.color.setRGB(0,Math.cos(height)/1.2,1)
    }
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
