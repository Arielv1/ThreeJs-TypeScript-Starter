import { Color, HemisphereLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, SpotLight, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import './style.css'

const constants = {
  sizes: {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

// scene
const scene = new Scene()

// camera
const camera = new PerspectiveCamera(75, constants.sizes.width / constants.sizes.height, 0.1, 1000);
camera.position.z = 20;
scene.add(camera);

// mesh
const geomatry = new SphereGeometry(3, 32, 16);
const material = new MeshStandardMaterial({color: 0xff0ff})
const mesh = new Mesh(geomatry, material)
scene.add(mesh)

// light
const light = new SpotLight(new Color(0xffffff))
light.position.x = 5;
light.position.y = 8;
light.position.z = 7.5;
light.intensity = 100;
scene.add(light);

// light2
const light2 = new HemisphereLight(new Color(0x97e6fc), new Color(0x7f0002), 2)
light2.position.x = 0;
light2.position.y = -5;
light2.position.z = 5;
scene.add(light2);
// renderer
const canvas: Element | null = document.querySelector(".webglCanvas")!
const renderer = new WebGLRenderer({canvas: canvas})
renderer.setSize(constants.sizes.width, constants.sizes.height);
renderer.render(scene, camera);

// Optional - controls;
const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.autoRotate = true;
controls.enableRotate = true;
controls.enablePan = true;
controls.enableZoom = true;

// Adjust canvas when resizing window
window.addEventListener('resize', () => {
  constants.sizes.width = window.innerWidth;
  constants.sizes.height = window.innerHeight;

  camera.aspect = constants.sizes.width / constants.sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(constants.sizes.width, constants.sizes.height);
})

// Every Frame 
const onUpdate = () => {
  controls.update();
  window.requestAnimationFrame(onUpdate);
  renderer.render(scene, camera);
}
onUpdate();