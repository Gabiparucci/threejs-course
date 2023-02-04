const options = {
  targetSelect: "#scene",
  width: 800,
  height: 600,
  backgroundColor: 0x222222,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(options.width, options.height);

document.querySelector(options.targetSelect).appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);

const camera = new THREE.PerspectiveCamera(50, options.width / options.height);
camera.position.z = 8.5;
camera.position.x = 1.5;
camera.position.y = 3.5;

const spot = new THREE.SpotLight(0xffffff, 3, 10, 0.4);
spot.position.y = 4;
spot.castShadow = true;
scene.add(spot);

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  new THREE.MeshLambertMaterial({
    color: 0x368ed1,
  })
);

cube.position.x = 1;
cube.position.y = 1;
cube.castShadow = true;
scene.add(cube);
spot.target = cube;
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  })
);
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.receiveShadow = true;

scene.add(floor);

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
});

const x3 = new THREEx3(
  {
    THREE,
    OrbitControls: THREE.OrbitControls,
    camera,
    renderer,
    scene,
  },
  { grid: { visible: false }, axes: { visible: false } }
);

x3.add(camera, { open: false });
x3.add(spot, { helper: { visible: false } });
x3.add(cube);
