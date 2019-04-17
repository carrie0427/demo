myvector = new THREE.Vector3(0, 1, 2);
console.log('myvector =', myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
//renderer.setClearColor(0xd0f0d0);     // set background colour
renderer.setClearColor(0xb19cd9);
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(0, 12, 20);
camera.lookAt(0, 0, 0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize', resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
    window.scrollTo(0, 0);
}

/////////////////////////////////////
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////

light = new THREE.PointLight(0xffffff);
//light = new THREE.PointLight(0xffff00);
light.position.set(0, 4, 2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
//var diffuseMaterial2 = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
var diffuseMaterial2 = new THREE.MeshLambertMaterial({color: 0xF68C02, side: THREE.DoubleSide});
var basicMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
//var basicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
var greenMaterial = new THREE.MeshLambertMaterial({color:0x00ff00});
var yellowMaterial = new THREE.MeshLambertMaterial({color:0xffff00});
var pinkMaterial = new THREE.MeshLambertMaterial({color:0xF5A9F2});



///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////
// WORLD COORDINATE FRAME
/////////////////////////////////////

var worldFrame = new THREE.AxesHelper(5);
scene.add(worldFrame);


/////////////////////////////////////
// FLOOR with texture
/////////////////////////////////////

floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
sphere.position.set(0, 4, 2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth
box = new THREE.Mesh(boxGeometry, diffuseMaterial);
box.position.set(-4, 0, 0);
scene.add(box);

///////////////////////////////////////////////////////////////////////
//   Twisting stack of three cubes
///////////////////////////////////////////////////////////////////////

cubeGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth
cube1 = new THREE.Mesh(cubeGeometry, greenMaterial);
cube1.position.set(0, 0, 4);
scene.add(cube1);
cube2 = new THREE.Mesh(cubeGeometry, yellowMaterial);
cube2.position.set(0, 1, 4);
cube2.rotation.set(0, 0.5, 0);
scene.add(cube2);
cube3 = new THREE.Mesh(cubeGeometry, pinkMaterial);
cube3.position.set(0, 2, 4);
cube3.rotation.set(0, 1, 0);
scene.add(cube3);

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html]
///////////////////////////////////////////////////////////////////////

// Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
// order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0xff3333}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0xff8800}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0xffff33}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0x33ff33}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0x3333ff}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0x8833ff}));
// Cube parameters: width (x), height (y), depth (z),
//        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 1, 1, 1);
mcc = new THREE.Mesh(mccGeometry, cubeMaterialArray);
mcc.position.set(-2, 0, 0);
scene.add(mcc);

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry(0.30, 0.30, 0.80, 20, 4);
cylinder = new THREE.Mesh(cylinderGeometry, diffuseMaterial);
cylinder.position.set(2, 0, 0);
scene.add(cylinder);

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry(0.0, 0.30, 0.80, 20, 4);
cone = new THREE.Mesh(coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add(cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry(1.2, 0.4, 10, 20);
torus = new THREE.Mesh(torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0, 0, 0);     // rotation about x,y,z axes
scene.add(torus);

torus2 = new THREE.Mesh(torusGeometry, diffuseMaterial);
torus2.position.set(7.5, 0, 0);
torus2.rotation.set(Math.PI/2, 0, 0);
scene.add(torus2);

/////////////////////////////////////
//  CUSTOM OBJECT
////////////////////////////////////

var geom = new THREE.Geometry();
var v0 = new THREE.Vector3(0, 0, 0);
var v1 = new THREE.Vector3(3, 0, 0);
var v2 = new THREE.Vector3(0, 3, 0);
var v3 = new THREE.Vector3(3, 3, 0);
var v4 = new THREE.Vector3(1.5, 0, -2.6);
var v5 = new THREE.Vector3(1.5, 3, -2.6);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);
geom.vertices.push(v5);

geom.faces.push(new THREE.Face3(0, 1, 2));
geom.faces.push(new THREE.Face3(1, 3, 2));
geom.faces.push(new THREE.Face3(1, 3, 4));
geom.faces.push(new THREE.Face3(5, 3, 4));
geom.faces.push(new THREE.Face3(0, 2, 4));
geom.faces.push(new THREE.Face3(5, 2, 4));
geom.computeFaceNormals();

customObject = new THREE.Mesh(geom, diffuseMaterial2);
customObject.position.set(0, 0, -2);
scene.add(customObject);

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();

function checkKeyboard() {
    if (keyboard.pressed("W")) {
        console.log('W pressed');
        if(light.position.y <= 4.9) {
            light.position.y += 0.1;
        }
    } else if (keyboard.pressed("S")) {
        if (light.position.y >= -4.9) {
            light.position.y -= 0.1;
        }
    }
    if (keyboard.pressed("A")) {
        if (light.position.x >= -4.9) {
            light.position.x -= 0.1;
        }
    } else if (keyboard.pressed("D")){
        if(light.position.x <= 4.9) {
            light.position.x += 0.1;
        }
    }
    sphere.position.set(light.position.x, light.position.y, light.position.z);
}


///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    checkKeyboard();
    requestAnimationFrame(update);      // requests the next update call;  this creates a loop
    renderer.render(scene, camera);
}

update();

