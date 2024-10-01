import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { cubeTexture } from 'three/src/Three.WebGPU.js';

//Main important scene stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 50;

const renderer = new THREE.WebGLRenderer( {alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement ); // Connects the renderer to the body in the canvas
const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();
loader.load(
    './porschecarmodel/scene.gltf',
    function(gltf)
    {
        scene.add(gltf.scene)
    },
);


const geometry = new THREE.BoxGeometry( 20, 20, 20 );
const geometry2 = new THREE.CircleGeometry( 5, 32 ); 
const planegeo =  new THREE.PlaneGeometry( 100, 50 );
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0x000000  } ) );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
const floormat = new THREE.MeshBasicMaterial( {color: 0x808080} )
const circle = new THREE.Mesh( geometry2, material );
const cube = new THREE.Mesh( geometry, material);
const floor = new THREE.Mesh( planegeo, floormat );
const group = new THREE.Group();

const ambientLight = new THREE.AmbientLight(0xffffff, 100);
scene.add(ambientLight);

group.add(cube, line);
scene.add(floor);

cube.castShadow = true;
cube.wireframe = true;
group.rotateY(0);
//floor.rotateX(-135);
floor.translateZ(-50);
function main()
{
    
}

function createlights()
{

}

function animate() {

	group.rotation.y += 0.01;

    render();

}

function render()
{
    renderer.render( scene, camera );
}