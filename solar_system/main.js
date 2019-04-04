var pointLight, sun, moon, earth, earthOrbit, ring, controls, scene, camera, renderer, scene;
var planetSegments = 50;
var mercuryData = constructPlanetData(87, 0.0004, 20, "mercury", "img/mercury.jpeg", 0.5, planetSegments);
var venusData = constructPlanetData(225, .000099, 25, "venus", "img/venus.jpeg", 0.8, planetSegments);
var earthData = constructPlanetData(365, 0.024, 30, "earth", "img/earth.jpg", 1, planetSegments);
var moonData = constructPlanetData(29.5, 0, 2, "moon", "img/moon.jpg", 0.2, planetSegments);
var marsData = constructPlanetData(687, 0.025, 35, "mars", "img/mars.jpeg", 0.9, planetSegments);
var jupyterData = constructPlanetData(4380, 0.0009, 42, "jupyter", "img/jupyter.jpeg", 3, planetSegments);
var saturnData = constructPlanetData(10950, 0.01, 50, "saturn", "img/saturn.jpg", 1.5, planetSegments);
var uranusData = constructPlanetData(60225, 0.017, 55, "uranus", "img/uranus.jpeg", 1, planetSegments);
var neptuneData = constructPlanetData(59860, 0.016, 60, "neptune", "img/neptune.jpeg", 1, planetSegments);
var planetOnFocus = null;

var planets = [];

var orbitData = { value: 200, runOrbit: true, runRotation: true };
var clock = new THREE.Clock();

/**
 * This eliminates the redundance of having to type property names for a planet object.
 * @param {type} myOrbitRate decimal
 * @param {type} myRotationRate decimal
 * @param {type} myDistanceFromAxis decimal
 * @param {type} myName string
 * @param {type} myTexture image file path
 * @param {type} mySize decimal
 * @param {type} mySegments integer
 * @returns {constructPlanetData.mainAnonym$0}
 */
function constructPlanetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName, myTexture, mySize, mySegments) {
    return {
        orbitRate: myOrbitRate
        , rotationRate: myRotationRate
        , distanceFromAxis: myDistanceFromAxis
        , name: myName
        , texture: myTexture
        , size: mySize
        , segments: mySegments
    };
}

/**
 * create a visible ring and add it to the scene.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getRing(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ring1Geometry = new THREE.RingGeometry(size, innerDiameter, facets);
    var ring1Material = new THREE.MeshBasicMaterial({ color: myColor, side: THREE.DoubleSide });
    var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Used to create a three dimensional ring. This takes more processing power to 
 * run that getRing(). So use this sparingly, such as for the outermost ring of
 * Saturn.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getTube(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ringGeometry = new THREE.TorusGeometry(size, innerDiameter, facets, facets);
    var ringMaterial = new THREE.MeshBasicMaterial({ color: myColor, side: THREE.DoubleSide });
    myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Simplifies the creation of materials used for visible objects.
 * @param {type} type
 * @param {type} color
 * @param {type} myTexture
 * @returns {THREE.MeshStandardMaterial|THREE.MeshLambertMaterial|THREE.MeshPhongMaterial|THREE.MeshBasicMaterial}
 */
function getMaterial(type, color, myTexture) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: myTexture === undefined ? null : myTexture
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        case 'phong':
            return new THREE.MeshPhongMaterial(materialOptions);
        case 'standard':
            return new THREE.MeshStandardMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

/**
 *  Draws all of the orbits to be shown in the scene.
 * @returns {undefined}
 */
function createVisibleOrbits() {
    var orbitWidth = 0.01;
    mercuryOrbit = getRing(mercuryData.distanceFromAxis + orbitWidth
        , mercuryData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "mercuryOrbit"
        , 0);
    venusOrbit = getRing(venusData.distanceFromAxis + orbitWidth
        , venusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "venusOrbit"
        , 0);
    earthOrbit = getRing(earthData.distanceFromAxis + orbitWidth
        , earthData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "earthOrbit"
        , 0);
    marsOrbit = getRing(marsData.distanceFromAxis + orbitWidth
        , marsData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "marsOrbit"
        , 0);
    jupyterOrbit = getRing(jupyterData.distanceFromAxis + orbitWidth
        , jupyterData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "jupyterOrbit"
        , 0);
    saturnOrbit = getRing(saturnData.distanceFromAxis + orbitWidth
        , saturnData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "saturnOrbit"
        , 0);
    uranusOrbit = getRing(uranusData.distanceFromAxis + orbitWidth
        , uranusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "uranusOrbit"
        , 0);
    neptuneOrbit = getRing(neptuneData.distanceFromAxis + orbitWidth
        , neptuneData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "neptuneOrbit"
        , 0);
}

/**
 * Simplifies the creation of a sphere.
 * @param {type} material THREE.SOME_TYPE_OF_CONSTRUCTED_MATERIAL
 * @param {type} size decimal
 * @param {type} segments integer
 * @returns {getSphere.obj|THREE.Mesh}
 */
function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}

/**
 * Creates a planet and adds it to the scene.
 * @param {type} myData data for a planet object
 * @param {type} x integer
 * @param {type} y integer
 * @param {type} z integer
 * @param {type} myMaterialType string that is passed to getMaterial()
 * @returns {getSphere.obj|THREE.Mesh|loadTexturedPlanet.myPlanet}
 */
function loadTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        passThisTexture = new THREE.ImageUtils.loadTexture(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = getMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = getMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var myPlanet = getSphere(myMaterial, myData.size, myData.segments);
    myPlanet.receiveShadow = true;
    myPlanet.name = myData.name;
    scene.add(myPlanet);
    myPlanet.position.set(x, y, z);

    return myPlanet;
}

/**
 * Simplifies creating a light that disperses in all directions.
 * @param {type} intensity decimal
 * @param {type} color HTML color
 * @returns {THREE.PointLight|getPointLight.light}
 */
function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}

/**
 * Move the planet around its orbit, and rotate it.
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @param {type} stopRotation optional set to true for rings
 * @returns {undefined}
 */
function movePlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.y += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime
            * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0)
            * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime
            * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0)
            * myData.distanceFromAxis;
    }
}

/**
 * Move the moon around its orbit with the planet, and rotate it.
 * @param {type} myMoon
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @returns {undefined}
 */
function moveMoon(myMoon, myPlanet, myData, myTime) {
    movePlanet(myMoon, myData, myTime);
    if (orbitData.runOrbit) {
        myMoon.position.x = myMoon.position.x + myPlanet.position.x;
        myMoon.position.z = myMoon.position.z + myPlanet.position.z;
    }
}

/**
 * This function is called in a loop to create animation.
 * @param {type} renderer
 * @param {type} scene
 * @param {type} camera
 * @param {type} controls
 * @returns {undefined}
 */
function update(renderer, scene, camera, controls) {
    pointLight.position.copy(sun.position);
    controls.update();

    var time = Date.now();

    movePlanet(mercury, mercuryData, time);
    movePlanet(ring, mercuryData, time, true);

    movePlanet(venus, venusData, time);
    movePlanet(ring, venusData, time, true);

    movePlanet(mars, marsData, time);
    movePlanet(ring, marsData, time, true);

    movePlanet(jupyter, jupyterData, time);
    movePlanet(ring, jupyterData, time, true);

    movePlanet(earth, earthData, time);
    movePlanet(ring, earthData, time, true);

    movePlanet(uranus, uranusData, time);
    movePlanet(ring, uranusData, time, true);

    movePlanet(neptune, neptuneData, time);
    movePlanet(ring, neptuneData, time, true);

    movePlanet(saturn, saturnData, time);
    movePlanet(ring, saturnData, time, true);
    moveMoon(moon, earth, moonData, time);

    if (planetOnFocus !== null) {
        //camera.position.set(planetOnFocus.position.x, planetOnFocus.position.y, planetOnFocus.position.z);
        controls.target.set(planetOnFocus.position.x, planetOnFocus.position.y, planetOnFocus.position.z);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

/**
 * This is the function that starts everything.
 * @returns {THREE.Scene|scene}
 */
function init() {
    // Create the camera that allows us to view into the scene.
    camera = new THREE.PerspectiveCamera(
        45, // field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near clipping plane
        1000 // far clipping plane
    );
    camera.position.z = 100;
    camera.position.x = -30;
    camera.position.y = 40;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Create the scene that holds all of the visible objects.
    scene = new THREE.Scene();

    // Create the renderer that controls animation.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach the renderer to the div element.
    document.getElementById('webgl').appendChild(renderer.domElement);

    // Create controls that allows a user to move the scene with a mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load the images used in the background.
    var path = 'cubemap/';
    var format = '.jpg';
    var urls = [
        path + 'nx' + format, path + 'nx' + format,
        path + 'nx' + format, path + 'nx' + format,
        path + 'nx' + format, path + 'nx' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    // Attach the background cube to the scene.
    scene.background = reflectionCube;

    // Create light from the sun.
    pointLight = getPointLight(1.5, "rgb(244, 158, 18)");
    scene.add(pointLight);

    // Create light that is viewable from all directions.
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    // Create the sun.
    var textureLoader = new THREE.TextureLoader();
    //var sunMaterial = getMaterial("basic", "rgb(255, 255, 0)");
    var sunMaterial = new THREE.MeshPhongMaterial({ map: textureLoader.load('img/sun.jpg')});
    sun = getSphere(sunMaterial, 16, 48);
    scene.add(sun);

    // Create the glow of the sun.
    var spriteMaterial = new THREE.SpriteMaterial(
        {
            map: new THREE.ImageUtils.loadTexture("img/glow.png")
            , useScreenCoordinates: false
            , color: 0xffffee
            , transparent: false
            , blending: THREE.AdditiveBlending
        });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(70, 70, 1.0);
    sun.add(sprite); // This centers the glow at the sun.
    sun.name = "sun";

    // Create the planets
    mercury = loadTexturedPlanet(mercuryData, mercuryData.distanceFromAxis, 0, 0);
    venus = loadTexturedPlanet(venusData, venusData.distanceFromAxis, 0, 0);
    mars = loadTexturedPlanet(marsData, marsData.distanceFromAxis, 0, 0);
    earth = loadTexturedPlanet(earthData, earthData.distanceFromAxis, 0, 0);
    moon = loadTexturedPlanet(moonData, moonData.distanceFromAxis, 0, 0);
    ring = getTube(3, 0.2, 480, 0x757064, "ring", earthData.distanceFromAxis);
    jupyter = loadTexturedPlanet(jupyterData, jupyterData.distanceFromAxis, 0, 0);
    saturn = loadTexturedPlanet(saturnData, saturnData.distanceFromAxis, 0, 0);
    uranus = loadTexturedPlanet(uranusData, uranusData.distanceFromAxis, 0, 0);
    neptune = loadTexturedPlanet(neptuneData, neptuneData.distanceFromAxis, 0, 0);

    planets.push(mercury, venus, mars, earth, moon, jupyter, saturn, uranus, neptune, sun);

    info = document.getElementById('contentTitle');
    subtitle = document.getElementById('subtitle');
    description = document.getElementById('description')

    // Create the visible orbit that the Earth uses.
    createVisibleOrbits();

    

    // Start the animation.
    update(renderer, scene, camera, controls);
}

function setFromCamera(raycaster, coords, origin) {
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(camera.position).normalize();
}

function hideWelcome() {
    TweenMax.to($('#welcome'), 0.5, {
        css: {
            opacity: 0
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#welcome'), 0.5, {
        css: {
            display: 'none'
        },
        delay: 1,
        ease: Quad.easeInOut
    });
}

function onMouseDown(event) {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
    setFromCamera(raycaster, mouse, camera);
    var intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0) {
        hideWelcome();
        TweenMax.from($('#content'), 0.5, {
            css: {
                left: '-500px'
            },
            delay: 0.5,
            ease: Quad.easeInOut
        });
        planetOnFocus = intersects[0].object;
        switch (intersects[0].object.name) {
            case "mercury":
                info.innerHTML = " <span>Mercúrio</span>";
                description.innerHTML = "O menor e mais interno planeta do Sistema Solar, orbitando o Sol a cada 87,969 dias terrestres. A sua órbita tem a maior excentricidade e o seu eixo apresenta a menor inclinação em relação ao plano da órbita dentre todos os planetas do Sistema Solar.";
                break;
            case "venus":
                info.innerHTML = " <span>Vênus</span>";
                description.innerHTML = "O segundo planeta do Sistema Solar em ordem de distância a partir do Sol, orbitando-o a cada 224,7 dias. Recebeu seu nome em homenagem à deusa romana do amor e da beleza Vénus, equivalente a Afrodite. Depois da Lua, é o objeto mais brilhante do céu noturno, atingindo uma magnitude aparente de -4,6, o suficiente para produzir sombras.";
                break;
            case "mars":
                info.innerHTML = " <span>Marte</span>";
                description.innerHTML = "O quarto planeta a partir do Sol, o segundo menor do Sistema Solar. Batizado em homenagem ao deus romano da guerra, muitas vezes é descrito como o 'Planeta Vermelho', porque o óxido de ferro predominante em sua superfície lhe dá uma aparência avermelhada.";
                break;
            case "earth":
                info.innerHTML = " <span>Terra</span>";
                description.innerHTML = "O terceiro planeta mais próximo do Sol, o mais denso e o quinto maior dos oito planetas do Sistema Solar. É também o maior dos quatro planetas telúricos. É por vezes designada como Mundo ou Planeta Azul. Lar de milhões de espécies de seres vivos, incluindo os humanos, a Terra é o único corpo celeste onde é conhecida a existência de vida.";
                break;
            case "moon":
                info.innerHTML = " <span>Lua</span>";
                description.innerHTML = "A Lua é o único satélite natural da Terra e o quinto maior do Sistema Solar. É o maior satélite natural de um planeta no sistema solar em relação ao tamanho do seu corpo primário, tendo 27% do diâmetro e 60% da densidade da Terra, o que representa 1⁄81 da sua massa.";
                break;
            case "jupyter":
                info.innerHTML = " <span>Júpiter</span>";
                description.innerHTML = "O maior planeta do Sistema Solar, tanto em diâmetro quanto em massa, e é o quinto mais próximo do Sol. Possui menos de um milésimo da massa solar, contudo tem 2,5 vezes a massa de todos os outros planetas em conjunto.";
                break;
            case "saturn":
                info.innerHTML = " <span>Saturno</span>";
                description.innerHTML = "Sexto planeta a partir do Sol e o segundo maior do Sistema Solar atrás de Júpiter. Pertencente ao grupo dos gigantes gasosos, possui cerca de 95 massas terrestres e orbita a uma distância média de 9,5 unidades astronômicas.";
                break;
            case "uranus":
                info.innerHTML = " <span>Urano</span>";
                description.innerHTML = "O sétimo planeta a partir do Sol, o terceiro maior e o quarto mais massivo dos oito planetas do Sistema Solar. Foi nomeado em homenagem ao deus grego do céu, Urano, o pai de Cronos (Saturno) e o avô de Zeus (Júpiter).";
                break;
            case "neptune":
                info.innerHTML = " <span>Netuno</span>";
                description.innerHTML = "O oitavo planeta do Sistema Solar, o último a partir do Sol desde a reclassificação de Plutão para a categoria de planeta anão, em 2006. Pertencente ao grupo dos gigantes gasosos, possui um tamanho ligeiramente menor que o de Urano, mas maior massa, equivalente a 17 massas terrestres. Netuno orbita o Sol a uma distância média de 30,1 unidades astronômicas.";
                break;
            case "sun":
                info.innerHTML = " <span>Sol</span>";
                description.innerHTML = "A estrela central do Sistema Solar. Todos os outros corpos do Sistema Solar, como planetas, planetas anões, asteroides, cometas e poeira, bem como todos os satélites associados a estes corpos, giram ao seu redor. Responsável por 99,86% da massa do Sistema Solar, o Sol possui uma massa 332 900 vezes maior que a da Terra, e um volume 1 300 000 vezes maior que o do nosso planeta. A distância da Terra ao Sol é cerca de 150 milhões de quilômetros ou 1 unidade astronômica (UA).";
                break;
        }
    }
}
document.addEventListener('mousedown', onMouseDown, false);

// Start everything.
init();

$(window).on('load', function () {
    TweenMax.to($('#welcome'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
});