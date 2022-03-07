const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000)
document.body.appendChild( renderer.domElement );

const light = new THREE.PointLight( 0xffffff, 1, 1000 ); 
light.position.set( 0, -10, 0 );
scene.add( light );

class Cube{
  constructor(locationX, locationY, locationZ, rotationSpeedX, rotationSpeedY, rotationSpeedZ){
    this.locationX = locationX
    this.locationY = locationY
    this.locationZ = locationZ
    this.rotationSpeedX = rotationSpeedX
    this.rotationSpeedY = rotationSpeedY
    this.rotationSpeedZ = rotationSpeedZ
  }
  makeCube(){
    this.geometry = new THREE.BoxGeometry(.01,.1,.1);
    this.material = new THREE.MeshLambertMaterial( { color: 0x505050 } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.cube.position.x = this.locationX
    this.cube.position.y = this.locationY
    this.cube.position.z = this.locationZ
    this.cube.rotation.y = Math.random(0,1)*3
    scene.add( this.cube );
  }
}

function randomValue(a,b,c){
  return Math.random(0,1)*Math.abs(b-a)-c
}

var cubes = []
for (var i = 0; i < 2000; i++){
  var newCube = new Cube((Math.random(0,1)-.5)*6,(Math.random(0,1)-.5)*6,Math.random(0,1)*3,(Math.random(0,1)/100)-.005,(Math.random(0,1)/100)-.005,(Math.random(0,1)/100)-.005)
  newCube.makeCube()
  cubes.push(newCube)
}
camera.position.z = 5

var scrollHeight = 0
var scrollDerivative = 0


function animate() {
  scrollDerivative = scrollHeight
  scrollHeight = window.pageYOffset/1000

  scrollDerivative -= scrollHeight
  
  
	requestAnimationFrame( animate );
  for(var i = 0; i < cubes.length; i++){
    cubes[i].cube.rotation.y += cubes[i].rotationSpeedY + scrollDerivative +  Math.sin(scrollHeight*10)/10
    cubes[i].cube.rotation.x += cubes[i].rotationSpeedX + scrollDerivative
    cubes[i].cube.rotation.z += cubes[i].rotationSpeedZ + scrollDerivative
  }
  
  camera.position.y = scrollHeight
	renderer.render( scene, camera );
}

window.addEventListener('resize', function(){
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width/height;
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
})

animate();