var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Sun (spotlight).
var sun = new THREE.SphereGeometry(3, 50, 50);
var sunLight = new THREE.PointLight(0xffffff); 
sunLight.position.set(0, 0, 0); 
sunLight.castShadow = true; 
sunLight.shadowMapWidth = 1024; 
sunLight.shadowMapHeight = 1024; 
sunLight.shadowCameraNear = 500; 
sunLight.shadowCameraFar = 4000;
sunLight.add(new THREE.Mesh(sun, new THREE.MeshBasicMaterial({ color: 0xffa500 })));
sunLight.shadowCameraFov = 30;
scene.add(sunLight);

// Extra lighting.
var light = new THREE.PointLight( 0xffffff, 0.5, 100 );
light.position.set(0, 0, 50);
scene.add( light );

// mercury.
var geometry = new THREE.SphereGeometry(0.3, 10, 10);
var material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
var mercury = new THREE.Mesh( geometry, material );
mercury.position.set(-5, 0, -5);
scene.add(mercury);

// Venus.
var geometry = new THREE.SphereGeometry(0.4, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0xcc9900 } );
var venus = new THREE.Mesh( geometry, material );
venus.position.set(-7, 0, 7);
scene.add(venus);

// Earth.
var geometry = new THREE.SphereGeometry(0.6, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0x0055ff } );
var earth = new THREE.Mesh( geometry, material );
earth.position.set(20, 0, -20);
scene.add(earth);

// Mars.
var geometry = new THREE.SphereGeometry(0.5, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0xff3355 } );
var mars = new THREE.Mesh( geometry, material );
mars.position.set(10, 0, 10);
scene.add(mars);

// Jupiter.
var geometry = new THREE.SphereGeometry(2, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0xbb6600 } );
var jupiter = new THREE.Mesh( geometry, material );
jupiter.position.set(20, 0, -20);
scene.add(jupiter);

// Saturn.
var geometry = new THREE.SphereGeometry(1.2, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0xdddd99 } );
var saturn = new THREE.Mesh( geometry, material );
saturn.position.set(-10, 0, -20);
scene.add(saturn);

// Uranus.
var geometry = new THREE.SphereGeometry(1, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0xaaffaa } );
var uranus = new THREE.Mesh( geometry, material );
uranus.position.set(20, 0, -20);
scene.add(uranus);

// Neptune.
var geometry = new THREE.SphereGeometry(1, 20, 20);
var material = new THREE.MeshLambertMaterial( { color: 0xaaccff } );
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