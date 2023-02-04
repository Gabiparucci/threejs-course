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
camera.position.z = 8.5;
camera.position.x = 1.5;
camera.position.y = 3.5;

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

const material = new THREE.MeshLambertMaterial({
  color: 0x348feb,
  side: THREE.DoubleSide,
});

const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), material); // width, height, depth, widthSegments, heightSegments, depthSegments
scene.add(cube);

const circle = new THREE.Mesh(
  new THREE.CircleBufferGeometry(0.5, 20),
  material
);
circle.position.x = -2;
circle.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(circle);

const cone = new THREE.Mesh(
  new THREE.ConeBufferGeometry(0.4, 0.9, 32), //radius, height, radialSegments
  material
);
cone.position.x = -2;
cone.position.y = 2;
scene.add(cone);

const cylinder = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.5, 0.5, 1), //radius top, radius bottom, height
  material
);
cylinder.position.x = 2;
cylinder.position.y = 0;
scene.add(cylinder);

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1), ////width, height
  material
);
plane.position.x = 2;
plane.position.y = 2;
plane.rotation.x = THREE.MathUtils.degToRad(-90);

scene.add(plane);

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3, 20, 20), //radius, widthSegments, heightSegments
  material
);
sphere.position.x = 0;
sphere.position.y = 2;

scene.add(sphere);

renderer.setAnimationLoop(() => {
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
x3.add(circle, { label: "circle" });
x3.add(cone, { label: "cone" });
x3.add(light, { helper: { visible: false } });
