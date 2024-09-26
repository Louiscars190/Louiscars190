import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { cubeTexture } from 'three/src/Three.WebGPU.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 1000, 1000 );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 20, 10, 10 );
const geometry2 = new THREE.CircleGeometry( 5, 32 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const circle = new THREE.Mesh( geometry2, material );
const cube = new THREE.Mesh( geometry, material);
scene.add( circle, cube);


cube.translateX(15);

function animate() {

	circle.rotation.x += 0.01;
	circle.rotation.y += 0.01;

    cube.rotation.x += 5;

	renderer.render( scene, camera );

}