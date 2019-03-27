var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

// Sun (spotlight).
//var textureLoader = new THREE.TextureLoader();
var sun = new THREE.SphereBufferGeometry(3, 50, 50);
var sunLight = new THREE.PointLight(0xffffff); 
sunLight.position.set(0, 0, 0); 
sunLight.castShadow = true; 
sunLight.shadowMapWidth = 1024; 
sunLight.shadowMapHeight = 1024; 
sunLight.shadowCameraNear = 500; 
sunLight.shadowCameraFar = 4000;
//sunLight.add(new THREE.Mesh(sun, new THREE.MeshPhongMaterial({map: textureLoader.load('js/solar_system/textures/sun.jpg') })));
sunLight.add(new THREE.Mesh(sun, new THREE.MeshBasicMaterial({ color: 0xffa500 })));
sunLight.shadowCameraFov = 30;
scene.add(sunLight);

// Extra lighting.
var light = new THREE.PointLight( 0xffffff, 0.5, 100 );
light.position.set(0, 0, 50);
scene.add( light );

// mercury.
//var texture = new THREE.ImageUtils.loadTexture('js/solar_system/textures/mercury1_baseColor.jpeg');
var textureLoader = new THREE.TextureLoader();
var geometry = new THREE.SphereBufferGeometry(0.3, 10, 10);
var material = new THREE.MeshPhongMaterial({ map: textureLoader.load('js/solar_system/textures/mercury1_baseColor.jpeg')});
var mercury = new THREE.Mesh( geometry, material );
mercury.position.set(-5, 0, -5);
scene.add(mercury);

// Venus.
var textureLoader = new THREE.TextureLoader();
var geometry = new THREE.SphereBufferGeometry(0.4, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/venus1_baseColor.jpeg') } );
var venus = new THREE.Mesh( geometry, material );
venus.position.set(-7, 0, 7);
scene.add(venus);

// Earth.
var geometry = new THREE.SphereBufferGeometry(0.6, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/earth1_baseColor.jpeg') } );
var earth = new THREE.Mesh( geometry, material );
earth.position.set(20, 0, -20);
scene.add(earth);

// Mars.
var geometry = new THREE.SphereBufferGeometry(0.5, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/mars1_baseColor.jpeg') } );
var mars = new THREE.Mesh( geometry, material );
mars.position.set(10, 0, 10);
scene.add(mars);

// Jupiter.
var geometry = new THREE.SphereBufferGeometry(2, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/jupiter1_baseColor.jpeg') } );
var jupiter = new THREE.Mesh( geometry, material );
jupiter.position.set(20, 0, -20);
scene.add(jupiter);

// Saturn.
var geometry = new THREE.SphereBufferGeometry(1.2, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/saturn.jpg') } );
var saturn = new THREE.Mesh( geometry, material );
saturn.position.set(-10, 0, -20);
scene.add(saturn);

// Uranus.
var geometry = new THREE.SphereBufferGeometry(1, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/uranus1_baseColor.jpeg') } );
var uranus = new THREE.Mesh( geometry, material );
uranus.position.set(20, 0, -20);
scene.add(uranus);

// Neptune.
var geometry = new THREE.SphereBufferGeometry(1, 20, 20);
var material = new THREE.MeshPhongMaterial( { map: textureLoader.load('js/solar_system/textures/neptune1_baseColor.jpeg') } );
var neptune = new THREE.Mesh( geometry, material );
neptune.position.set(50, 0, -20);
scene.add(neptune);

// Stars.
var particles = new THREE.CircleGeometry(0.1, 20);
for (var p = 0; p < 1000; p++) {
    var particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 500);
    particles.vertices.push(particle);
}

var particleMaterial = new THREE.ParticleBasicMaterial({ color: 0xffffff, size: 1 });
var particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
scene.add(particleSystem);

// Camera options.
camera.position.z = 35;

function render() {
  requestAnimationFrame(render);
  var time = Date.now() * 0.0005;

  //mercury.rotation.x += 0.01;
  mercury.position.x = Math.sin( time * 4.5 ) * 5;
  mercury.position.y = Math.cos( time * 4.5 ) * 2;
  mercury.position.z = Math.cos( time * 4.5 ) * 5;
  
  //venus.rotation.x += 0.01;
  venus.position.x = Math.sin( time * -2.5 ) * 9;
  venus.position.y = Math.sin( time * -1.5 ) * 2;
  venus.position.z = Math.cos( time * -2.5 ) * 9;
  
  //earth.rotation.x += 0.01;
  earth.position.x = Math.sin( time * 1.5 ) * 13;
  earth.position.z = Math.cos( time * 1.5 ) * 13;
  
  mars.position.x = Math.sin( time * 1 ) * 18;
  mars.position.y = Math.cos( time * 1 ) * 4;
  mars.position.z = Math.cos( time * 1 ) * 18;
  
  jupiter.position.x = Math.sin( time * 0.5 ) * 25;
  jupiter.position.y = Math.sin( time * 0.5 ) * 3;
  jupiter.position.z = Math.cos( time * 0.5 ) * 25;
  
  saturn.position.x = Math.sin( time * 0.3 ) * 32;
  saturn.position.z = Math.cos( time * 0.3 ) * 32;
  
  uranus.position.x = Math.sin( time * 0.2 ) * 40;
  uranus.position.y = Math.cos( time * 0.2 ) * 10;
  uranus.position.z = Math.cos( time * 0.2 ) * 40;
  
  neptune.position.x = Math.sin( time * 0.1 ) * 50;
  neptune.position.y = Math.cos( time * 0.1 ) * 20;
  neptune.position.z = Math.cos( time * 0.1 ) * 50;
  
  renderer.render(scene, camera);
}
render();