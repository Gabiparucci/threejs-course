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

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
scene.add(light);

const path = new THREE.Path();
path.moveTo(1, 3);
path.lineTo(3, 3);
path.lineTo(3, 1);
path.lineTo(1, 1);
path.lineTo(1, 3);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(path.getPoints());

const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
});

const draw = new THREE.Line(geometry, material);

// scene.add(draw);

const path2 = new THREE.Path();
path2.moveTo(1, 3);
path2.quadraticCurveTo(6, 1, 8, 3);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(path2.getPoints());

const draw2 = new THREE.Line(geometry2, material);

// scene.add(draw2);

const path3 = new THREE.Path();
path3.moveTo(1, 3);
path3.bezierCurveTo(3, 4, 4, 3, 8, 3);

const geometry3 = new THREE.BufferGeometry();
geometry3.setFromPoints(path3.getPoints());

const draw3 = new THREE.Line(geometry3, material);

// scene.add(draw3);

const materialHeart = new THREE.MeshLambertMaterial({
  color: 0xeb3452,
  side: THREE.DoubleSide,
});

const path4 = new THREE.Shape();
path4.moveTo(0.3, 1.5);
path4.quadraticCurveTo(0.3, 2.2, 0.9, 2.2);
path4.quadraticCurveTo(1.3, 2.2, 1.4, 1.7);
path4.quadraticCurveTo(1.5, 2.2, 1.9, 2.2);
path4.quadraticCurveTo(2.5, 2.2, 2.5, 1.5);
path4.quadraticCurveTo(2.5, 1, 1.4, 0.3);
path4.quadraticCurveTo(0.3, 1, 0.3, 1.5);

// const geometry4 = new THREE.ShapeBufferGeometry(path4);
const geometry4 = new THREE.ExtrudeBufferGeometry(path4, {
  depth: 0.1,
  bevelEnabled: true,
  bevelSize: 0.1,
  bevelThickness: 0.1,
});

const draw4 = new THREE.Mesh(geometry4, materialHeart);

scene.add(draw4);

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
