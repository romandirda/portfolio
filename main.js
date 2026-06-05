import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Zacílíme přímo na náš ohraničený kontejner
const container = document.getElementById("container3D");

// 1. Vytvoření scény a kamery (poměr stran se počítá z kontejneru, ne z okna)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 150; 

let controls;

// 2. Inicializace rendereru uvnitř kontejneru
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 3. Aktivace OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;

// 4. Načtení 3D modelu
const loader = new GLTFLoader();
loader.load(
  './experiment .glb', 
  function (gltf) {
    const baseCube = gltf.scene;
    baseCube.scale.set(30, 30, 30); 

    // --- PROSTŘEDNÍ KOSTKA ---
    const cube1 = baseCube;
    cube1.position.set(0, 0, 0); 
    scene.add(cube1);

    // --- LEVÁ KOSTKA ---
    const cube2 = baseCube.clone(); 
    cube2.position.set(-80, 0, 0); 
    scene.add(cube2);

    // --- PRAVÁ KOSTKA ---
    const cube3 = baseCube.clone(); 
    cube3.position.set(80, 0, 0); 
    scene.add(cube3);

    console.log("3D modely bezpečně uzamčeny v boxu!");
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error("Chyba při načítání modelu:", error);
  }
);

// 5. Osvětlení
const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(100, 100, 100); 
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 6. Animační smyčka
function animate() {
  requestAnimationFrame(animate);
  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);
}

// 7. Responzivita hlídá velikost KONTEJNERU, ne celého okna
window.addEventListener("resize", function () {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
