var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x9bddf2, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// loaders
//var texLoader = new THREE.TextureLoader();
//var mtlLoader = new THREE.MTLLoader();
//var objLoader = new THREE.OBJLoader();

// light
var light = new THREE.AmbientLight( 0x404040, 2.0 );
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

// ground
var plane;

var mtlLoader2 = new THREE.MTLLoader();
mtlLoader2.setPath("assets/forest/")
mtlLoader2.load("forest.mtl", function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("assets/forest/forest.obj", function(mesh) {
        goomba = mesh;
        scene.add(goomba);
        goomba.scale.set(0.1, 0.1, 0.1);
        goomba.position.set(0, 0.2, 2);
        goomba.rotation.set(0, 3.14159/2, 0);

        animate();
    });
});

var geometry = new THREE.PlaneGeometry( 20, 20 );
var material = new THREE.MeshBasicMaterial( {color: 0xCC0000, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

plane.position.x = 0;
plane.position.y = -1;
plane.position.z = 0;
plane.rotation.x = 3.14159/2;
plane.rotation.y = 0;
plane.rotation.z = 0;

// rotating cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.z = 50;

// manage loading
var manager = new THREE.LoadingManager();
manager.onLoad = function() {

};

// Goomba
var goomba;

var mtlLoader2 = new THREE.MTLLoader();
mtlLoader2.setPath("assets/goomba/")
mtlLoader2.load("goomba.mtl", function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("assets/goomba/goomba.obj", function(mesh) {
        goomba = mesh;
        scene.add(goomba);
        goomba.scale.set(0.1, 0.1, 0.1);
        goomba.position.set(0, 0.2, 2);
        goomba.rotation.set(0, 3.14159/2, 0);

        animate();
    });
});


// Link
var link;

var mtlLoader1 = new THREE.MTLLoader();
mtlLoader1.setPath("assets/link/")
mtlLoader1.load("link.mtl", function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("assets/link/link.obj", function(mesh) {
        link = mesh;
        scene.add(link);
        link.scale.set(0.03, 0.03, 0.03);
        link.position.set(0, -1, 0);
        link.rotation.set(0, 0, 0);

        animate();
    });
});

var camera_offset = new THREE.Vector3(0, 8, -12);
var camera_angle = 0;

var ex = new THREE.Vector3(1, 0, 0);
var ey = new THREE.Vector3(0, 1, 0);
var ez = new THREE.Vector3(0, 0, 1);

// render loop
function animate() {
	requestAnimationFrame( animate );

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    cube.rotation.z += 0.05;

    let vel = new THREE.Vector3(KEY.state[KEY.A] - KEY.state[KEY.D], KEY.state[KEY.SPACE] - KEY.state[KEY.SHIFT], KEY.state[KEY.W] - KEY.state[KEY.S]).multiplyScalar(0.1);
    vel.applyAxisAngle(ey, link.rotation.y);

    link.position.add(vel);
    link.rotation.y += 0.05 * (KEY.state[KEY.LEFT] - KEY.state[KEY.RIGHT]);

    goomba.rotation.y = Math.atan2(goomba.position.z - link.position.z, link.position.x - goomba.position.x);

    let camera_shift = new THREE.Vector3(0, 0, 0);
    camera_shift.copy(camera_offset);
    camera_shift.applyAxisAngle(ey, camera_angle);

    camera.position.addVectors(link.position, camera_shift);
    camera.lookAt(link.position);

	renderer.render( scene, camera );
}
