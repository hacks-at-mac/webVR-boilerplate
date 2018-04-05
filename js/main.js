var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// let there be light
var directionalLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( directionalLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
scene.add( directionalLight );

// let there be earth amirite xd
var forest;

var mtlLoader2 = new THREE.MTLLoader();
mtlLoader2.setPath("assets/forest/")
mtlLoader2.load("forest.mtl", function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("assets/forest/forest.obj", function(mesh) {
        forest = mesh;
        scene.add(forest);
        forest.scale.set(0.1, 0.1, 0.1);
        forest.position.set(0, -200, 0);
        forest.rotation.set(0, 3.14159/2, 0);

        animate();
    });
});

// add a box
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshToonMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

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

camera.position.z = 5;

var t = 0;

var camera_offset = new THREE.Vector3(-4, 6, 0);
var camera_angle = Math.PI/4;

var ey = new THREE.Vector3(0, 1, 0);

function animate() {
	requestAnimationFrame( animate );

    camera_angle += 0.01 * (KEY.state[KEY.LEFT] - KEY.state[KEY.RIGHT]);

    //cube.rotation.y += 0.05;
    //cube.rotation.x += 0.03;

    //goomba.rotation.y += 0.01;

    cube.position.x = Math.cos(0.07 * t);
    cube.position.y = Math.cos(0.1 * t);
    t += 1;

    let camera_position = new THREE.Vector3(0,0,0);
    camera_position.copy(camera_offset);
    camera_position.applyAxisAngle( ey, camera_angle );

    camera_position.add(goomba.position);

    camera.position.copy(camera_position);
    camera.lookAt(goomba.position);

	renderer.render( scene, camera );
}
animate();
