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
light.position.set(0, 10, 0);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
//var diffuseMaterial2 = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
var diffuseMaterial2 = new THREE.MeshLambertMaterial({color: 0xF68C02, side: THREE.DoubleSide});

var basicMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});


//var basicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
var armadilloMaterial = new THREE.MeshBasicMaterial({color: 0x7fff7f});
var greenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
var yellowMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});
var pinkMaterial = new THREE.MeshLambertMaterial({color: 0xF5A9F2});


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

floorTexture = new THREE.TextureLoader().load('images/square.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshLambertMaterial({map: floorTexture, side: THREE.DoubleSide});
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
sphere.position.set(0, 10, 0);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   Twisting stack of three cubes
///////////////////////////////////////////////////////////////////////

cubeGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth
cube1 = new THREE.Mesh(cubeGeometry, greenMaterial);
cube1.position.set(0, -0.5, 4);
scene.add(cube1);
cube2 = new THREE.Mesh(cubeGeometry, yellowMaterial);
cube2.position.set(0, 0.5, 4);
cube2.rotation.set(0, 0.5, 0);
scene.add(cube2);
cube3 = new THREE.Mesh(cubeGeometry, pinkMaterial);
cube3.position.set(0, 1.5, 4);
cube3.rotation.set(0, 1, 0);
scene.add(cube3);

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO TIME
///////////////////////////////////////////////////////////////////////////////////////

var millisecond = 0;
window.onload = function () {
    setInterval(function () {
            millisecond += 100;
            checkTime();
            checkPosition();
        }
        , 100)
}

function checkTime() {
    var temp = millisecond % 15000;
    light.position.x = Math.cos(Math.PI * temp / 15000) * 10;
    light.position.y = Math.sin(Math.PI * temp / 15000) * 10;
    sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// CREATIVE COMPONENT
///////////////////////////////////////////////////////////////////////////////////////
var torusKnotMaterial = new THREE.ShaderMaterial({
//	uniforms: uniforms,
    uniforms: {textureSampler: {type: 't', value: floorTexture}},
    vertexShader: document.getElementById('torusKnotVertexShader').textContent,
    fragmentShader: document.getElementById('torusKnotFragmentShader').textContent
});

var torusKnot1 = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.1, 64, 8, 7, 10), torusKnotMaterial);
var torusKnot2 = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.1, 64, 8, 7, 10), torusKnotMaterial);
var torusKnot3 = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.1, 64, 8, 7, 10), torusKnotMaterial);
var torusKnot4 = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.1, 64, 8, 7, 10), torusKnotMaterial);
torusKnot1.position.set(7, 1, 7);
torusKnot1.rotation.set(0, Math.PI / 4, 0);
scene.add(torusKnot1);
torusKnot2.position.set(7, 1, -7);
torusKnot2.rotation.set(0, -Math.PI / 4, 0);
scene.add(torusKnot2);
torusKnot3.position.set(-7, 1, 7);
torusKnot3.rotation.set(0, -Math.PI / 4, 0);
scene.add(torusKnot3);
torusKnot4.position.set(-7, 1, -7);
torusKnot4.rotation.set(0, Math.PI / 4, 0);
scene.add(torusKnot4);

var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
var cubeMaterial = new THREE.MeshLambertMaterial({color: 'yellow', wireframe: true});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1, -5);
scene.add(cube);

var ballGeometry = new THREE.SphereGeometry(2, 10, 10);
var ballMaterial = new THREE.MeshLambertMaterial({color: 'red', wireframe: true});
var ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(5, 1, 0);
scene.add(ball);

renderer.shadowMapEnabled = true;
floor.receiveShadow = true;
ball.castShadow = true;
cube.castShadow = true;
light.castShadow = true;
cube1.castShadow = true;
cube2.castShadow = true;
cube3.castShadow = true;

var step = 0;

function checkPosition() {
    cube.rotation.x += 0.5;
    cube.rotation.y += 0.5;
    cube.rotation.z += 0.5;
    cube1.rotation.y += 0.2;
    cube2.rotation.y += 0.2;
    cube3.rotation.y += 0.2;
    step += 0.2;
    ball.position.x = 5 * Math.cos(step);
    ball.position.y = 1 + (5 * Math.abs(Math.sin(step)));
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    //requestAnimationFrame(update);// requests the next update call;  this creates a loop
    renderer.render(scene, camera);
}
   setInterval(update,800);
   //update();

