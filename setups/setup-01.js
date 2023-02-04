const options = {
  targetSelect: "#scene",
  width: 800,
  height: 600,
  backgroundColor: 0x222222,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(options.width, options.height);

document.querySelector(options.targetSelect).appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);

const camera = new THREE.PerspectiveCamera(50, options.width / options.height);
camera.position.z = 5;

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
scene.add(light);

const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
});

const x3 = new THREEx3({
  THREE,
  OrbitControls: THREE.OrbitControls,
  camera,
  renderer,
  scene,
});

x3.add(camera, { open: false });
x3.add(cube);
x3.add(light, { helper: { visible: false } });
