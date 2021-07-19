// komponen utama dalam aplikasi threejs yaitu scene, camera, dan renderer
// scene merupakan lingkungan 3D yang ada pada aplikasi atau 3D world
// camera digunakan untuk melihat kedalam lingkungan 3D atau 3D world tersebut
// renderer adalah penampilah hasil dari kamera kedalam layar

// membuat scene
const scene = new THREE.Scene()

// membuat camera dengan penyesuaian ukuran layar (innerWidth/innerHeight)
// seberapa lebar camera atau FOV sebesar 45
// dengan near clip (seberapa dekat camera dapat menagkap gambar) sebesar 1
// dengan far clip (seberapa jauh camera dapat menagkap gambar) sebesar 100
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 1, 100)

// membuat renderer
const renderer = new THREE.WebGL1Renderer()
window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    camera.aspect = this.window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix()
})

// contoh menambahkan benda kedalam scene (lingkaran)
// const box = new THREE.SphereGeometry(1, 32, 32)
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// const boxMesh = new THREE.Mesh(box, boxMaterial)
// scene.add(boxMesh)

// contoh menambahkan benda custom kedalam scene (segitiga)
// const triangleGeo = new THREE.BufferGeometry()
// const verteces = new Float32Array([
//     -1.0, -1.0, 0.0,
//     1.0, 1.0, 0.0,
//     -1.0, 1.0, 0.0,
// ])
// triangleGeo.setAttribute('position', new THREE.BufferAttribute(verteces, 3))
// const triangleMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// const triangleMesh = new THREE.Mesh(triangleGeo, triangleMat)
// scene.add(triangleMesh)

// contoh menambahkan benda custom kedalam scene (kubus)
const squareGeo = new THREE.BufferGeometry()
const verteces = new Float32Array([
    // titik ke 0
    -1.0, -1.0, 1.0,
    // titik ke 1
    1.0, 1.0, 1.0,
    // titik ke 2
    -1.0, 1.0, 1.0,
    // titik ke 3
    1.0, -1.0, 1.0,

    // titik ke 4
    -1.0, -1.0, -1.0,
    // titik ke 5
    1.0, 1.0, -1.0,
    // titik ke 6
    -1.0, 1.0, -1.0,
    // titik ke 7
    1.0, -1.0, -1.0
])
squareGeo.setIndex([
    // sisi depan
    0, 3, 1,
    1, 2, 0,
    // sisi belakang
    4, 6, 5,
    5, 7, 4,
    // sisi kiri
    4, 0, 2,
    2, 6, 4,
    // sisi kanan
    5, 1, 3,
    3, 7, 5,
    // sisi atas
    1, 5, 6,
    6, 2, 1,
    // sisi bawah
    0, 4, 7,
    7, 3, 0
])
// menambahkan color pada setiap sudut
const squareColor = new Float32Array([
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,

    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0
])
squareGeo.setAttribute('position', new THREE.BufferAttribute(verteces, 3))
squareGeo.setAttribute('color', new THREE.BufferAttribute(squareColor, 3))
const squareMat = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })
const squareMesh = new THREE.Mesh(squareGeo, squareMat)
scene.add(squareMesh)

// menentukan posisi camera
camera.position.z = 5

// menghubungkan script dengan file html
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

// membuat benda menjadi animasi
function draw() {
    requestAnimationFrame(draw)
    // boxMesh.rotation.y += 0.01
    // triangleMesh.rotation.x += 0.01
    squareMesh.rotation.y += 0.01
    squareMesh.rotation.x += 0.01
    renderer.render(scene, camera)
}
draw();