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
renderer.setPixelRatio(devicePixelRatio)
window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    camera.aspect = this.window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix()
})

// menambahkan grid
const grid = new THREE.GridHelper(50, 50, 0x0a0a0a, 0x000000)
grid.position.set(0, -0.5, 0)
scene.add(grid)

// contoh menambahkan benda kedalam scene
const box = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireFrame: true })
const boxMesh = new THREE.Mesh(box, boxMaterial)
boxMesh.position.set(1, 0, 0)
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


// menghubungkan script dengan file html
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

// membuat benda menjadi animasi
function animate() {
    requestAnimationFrame(animate)
    boxMesh.rotation.y += 0.01
    boxMesh.rotation.x += 0.01
    renderer.render(scene, camera)
}
animate();