const options = {
  targetSelect: "#scene",
  width: 800,
  height: 600,
  backgroundColor: 0x222222,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(options.width, options.height);

document.querySelector(options.targetSelect).appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);

const camera = new THREE.PerspectiveCamera(50, options.width / options.height);
camera.position.z = 8.5;
camera.position.x = 1.5;
camera.position.y = 3.5;

const spot = new THREE.PointLight(0xffffff, 10);
spot.position.y = 4;
spot.castShadow = true;
scene.add(spot);

const ball = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 60, 60),
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
  })
);

ball.position.x = 1;
ball.position.y = 1;
ball.castShadow = true;
scene.add(ball);
spot.target = ball;
//Basic geral luz independente
//Lambert Sem brilho, reflete a luz mas não funciona no spot light
//Phong possui briho, verniz
//standard respeita a física, metalness -> o quão metálico ele é e roughness -> o quão fosco ele é
//Physical -> propriedades mais avançadas, transmission -> simular vidro
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshPhysicalMaterial({
    color: 0xde0a0a,
    side: THREE.DoubleSide,
    metalness: 0.48,
    roughness: 0.57,
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
x3.add(ball);
x3.add(floor);
