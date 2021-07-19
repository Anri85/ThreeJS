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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.BasicShadowMap
window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    camera.aspect = this.window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix()
})

// contoh menambahkan benda kedalam scene
const box = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const boxMesh = new THREE.Mesh(box, boxMaterial)
boxMesh.receiveShadow = true
boxMesh.castShadow = true
scene.add(boxMesh)

const plane = new THREE.PlaneGeometry(1000, 1000 ,500, 500)
const planeMat = new THREE.MeshLambertMaterial({
    color: 0xaaffaa,
})
const planeMesh = new THREE.Mesh(plane, planeMat)
planeMesh.receiveShadow = true
planeMesh.position.set(0, -1, 0)
planeMesh.rotation.x = -Math.PI/2
scene.add(planeMesh)

// contoh macam macam cahaya
// contoh ambient light
// const ambientLight = new THREE.AmbientLight(0x404040)
// scene.add(ambientLight)

// contoh point light yang menerima properti warna, intensitas cahaya, dan distance
// const pointLight = new THREE.PointLight(0xff0000, 0.5, 50)
// pointLight.position.set(1, 1, 1)
// scene.add(pointLight)
// menambahkan helper pointlight untuk membantu menunjukan posisi cahaya pointlight
// scene.add(new THREE.PointLightHelper(pointLight, 1, 0xff0000))

// contoh hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x000000, 0.5)
// scene.add(hemisphereLight)

// contoh spotlight
// const spotlight = new THREE.SpotLight(0x0f00f0, 0.5)
// scene.add(spotlight)

// contoh direction light yang menerima properti warna dan intensitas cahaya
// const directionLight = new THREE.DirectionalLight(0xf0f0f0, 0.5)
// scene.add(directionLight)

// contoh menambahkan bayangan (harus juga mengatur plane, box dan renderer)
const spotlightShadow = new THREE.SpotLight(0x00ff00, 0.5, 5, Math.PI/10)
spotlightShadow.position.set(1.5, 1.5, 0)
spotlightShadow.castShadow = true
scene.add(spotlightShadow)

// menghubungkan script dengan file html
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

// membuat benda menjadi animasi
function draw() {
    requestAnimationFrame(draw)
    boxMesh.rotation.y += 0.01
    boxMesh.rotation.x += 0.02
    renderer.render(scene, camera)
}
draw();