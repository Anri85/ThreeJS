// komponen utama dalam aplikasi threejs yaitu scene, camera, dan renderer
// scene merupakan lingkungan 3D yang ada pada aplikasi atau 3D world
// camera digunakan untuk melihat kedalam lingkungan 3D atau 3D world tersebut
// renderer adalah penampilah hasil dari kamera kedalam layar

// membuat scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('white')

// membuat camera dengan penyesuaian ukuran layar (innerWidth/innerHeight)
// seberapa lebar camera atau FOV sebesar 45
// dengan near clip (seberapa dekat camera dapat menagkap gambar) sebesar 1
// dengan far clip (seberapa jauh camera dapat menagkap gambar) sebesar 100
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 1, 100)
camera.position.z += 5

// membuat renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true })
window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    camera.aspect = this.window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix()
})

// contoh menambahkan benda kedalam scene
const box = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const boxMesh = new THREE.Mesh(box, boxMaterial)
scene.add(boxMesh)

const plane = new THREE.PlaneGeometry(1000, 1000, 500, 500)
const planeMat = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const planeMesh = new THREE.Mesh(plane, planeMat)
planeMesh.position.set(0, -1, 0)
planeMesh.rotation.x = -Math.PI/2
scene.add(planeMesh)

// contoh menambahkan cahaya
const pointLight = new THREE.PointLight(0xff0000, 0.5, 50)
pointLight.position.set(1, 1, 0)
scene.add(pointLight)
scene.add(new THREE.PointLightHelper(pointLight, 0.5, 0xff0000))

// contoh menggerakan camera menggunakan keyboard
// let keyboard = []

// document.body.onkeydown = (event) => {
//     keyboard[event.key] = true
// }

// document.body.onkeyup = (event) => {
//     keyboard[event.key] = false
// }

// function process_keyboard() {
//     if(keyboard['a']) {
//         camera.position.x += 0.09
//     } else if(keyboard['w']) {
//         camera.position.y -= 0.09
//     } else if(keyboard['s']) {
//         camera.position.y += 0.09
//     } else if(keyboard['d']) {
//         camera.position.x -= 0.09
//     }
// }

// contoh menggerakan camera dengan menggunakan built in module three.js (OrbitControls)
const orbitControls = new THREE.OrbitControls(camera, renderer.domElement)

// contoh menggerakan camera dengan menggunakan built in module three.js (FirstPersonControls)
// FirstPersonControls memerlukan clock untuk dapat berfungsi dengan baik
// const clock = new THREE.Clock()
// const firstPersonControls = new THREE.FirstPersonControls(camera, renderer.domElement)
// firstPersonControls.lookSpeed = 0.01
// firstPersonControls.mouseDragOn = true

// contoh menggerakan camera dengan menggunakan built in module three.js (TrackballControls)
// const clock = new THREE.Clock()
// const trackballControls = new THREE.TrackballControls(camera, renderer.domElement)

// menghubungkan script dengan file html
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

// membuat benda menjadi animasi
function animate() {
    // memanggil function process_keyboard
    // process_keyboard()
    // memanggil function firstPersonControls
    // firstPersonControls.update(clock.getDelta())
    // memanggil function trackBallControls
    // trackballControls.update(clock.getDelta())

    requestAnimationFrame(animate)
    boxMesh.rotation.y += 0.01
    boxMesh.rotation.x += 0.01
    renderer.render(scene, camera)
}
animate();