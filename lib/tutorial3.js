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

// contoh menambahkan benda kedalam scene dan penggunaan wirefrane dan map
// meload texture
const texture = new THREE.TextureLoader().load('./lib/texture/images1.png')
const texture2 = new THREE.TextureLoader().load('./lib/texture/images4.png')
const texture3 = new THREE.TextureLoader().load('./lib/texture/grass.jpg')
const texture4 = new THREE.TextureLoader().load('./lib/texture/brick.jpg')
const texture5 = new THREE.TextureLoader().load('./lib/texture/wall.png')
// wireframe berfungsi mengubah benda atau geometri menjadi garis-garis
// map berfungsi menambahkan tekstur kedalam benda atau geometri (memasang gambar pada benda)
// const box = new THREE.BoxGeometry(1, 1, 1)
// const boxMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
// const boxMat = new THREE.MeshBasicMaterial({ map: texture })
// const boxMesh = new THREE.Mesh(box, boxMat)
// scene.add(boxMesh)

// contoh menambahkan benda kedalam scene dan penggunaan MeshLamberMaterial dan alphamap
// membuat cahaya
// const light1 = new THREE.PointLight(0xffffff, 1)
// light1.position.set(0, 3, 2)
// scene.add(light1)
// const light2 = new THREE.PointLight(0xffffff, 1)
// light2.position.set(0, -3, 2)
// scene.add(light2)
// MeshLamberMaterial membuat benda atau geometri tak terlihat kecuali jika diberikan cahaya
// alphamap adalah untuk menentukan transparansi
// const box = new THREE.BoxGeometry(1, 1, 1)
// const boxMat = new THREE.MeshLambertMaterial({ 
//     map: texture,
//     alphaMap: texture,
//     transparent: true,
//     side: THREE.DoubleSide
// })
// const boxMesh = new THREE.Mesh(box, boxMat)
// scene.add(boxMesh)

// contoh menambahkan benda kedalam scene dan penggunaan MeshPhongMaterial, shininess dan bumpMap
// membuat cahaya
const light3 = new THREE.PointLight(0xffffff, 1)
light3.position.set(0, 3, 2)
scene.add(light3)
const light4 = new THREE.PointLight(0xffffff, 1)
light4.position.set(0, -3, 2)
scene.add(light4)
// MeshPhongMaterial akan membuat tekstur benda lebih halus daripada MeshLamberMaterial
// shininess untuk mengatur seberapa mengkilap sebuah sisi apabila terkena cahaya
// bumpMap untuk mengatur cekungan dalam sebuah benda
const box = new THREE.BoxGeometry(1, 1, 1)
const boxMat = new THREE.MeshPhongMaterial({
    map: texture3,
    shininess: 100,
    bumpMap: texture5,
    bumpScale: 0.05
})
const boxMesh = new THREE.Mesh(box, boxMat)
scene.add(boxMesh)

// menentukan posisi camera
camera.position.z = 5

// menghubungkan script dengan file html
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

// membuat benda menjadi animasi
function draw() {
    requestAnimationFrame(draw)
    boxMesh.rotation.y += 0.01
    boxMesh.rotation.x += 0.01
    renderer.render(scene, camera)
}
draw();