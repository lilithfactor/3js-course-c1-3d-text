import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load('/textures/matcaps/7.png')
matcapTexture1.colorSpace = THREE.SRGBColorSpace
// const matcapTexture2 = textureLoader.load('/textures/matcaps/6.png')
// matcapTexture2.colorSpace = THREE.SRGBColorSpace
// const matcapTexture3 = textureLoader.load('/textures/matcaps/4.png')
// matcapTexture3.colorSpace = THREE.SRGBColorSpace
// const matcapTexture4 = textureLoader.load('/textures/matcaps/2.png')
// matcapTexture4.colorSpace = THREE.SRGBColorSpace
// const matcapTexture5 = textureLoader.load('/textures/matcaps/8.png')
// matcapTexture5.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts, Objects, Environment
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'l i l i t h f a c t o r',
            {
                font: font, //* if the key and value hav same name, you, you can just pass the key/value
                size: 0.5,
                depth: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
        // )
        textGeometry.center()

        textGeometry.computeBoundingBox()

        const material = new THREE.MeshPhysicalMaterial({
            wireframe: false,
            metalness: 0.275,
            roughness: 0.127
        })
        const text = new THREE.Mesh(
            textGeometry,
            material
        )
        //* Adding GUI props for MeshPhysicalMaterials
        gui.add(material, 'metalness').min(0).max(1).step(0.001)
        gui.add(material, 'roughness').min(0).max(1).step(0.001)
        scene.add(text)

        //* Transmission
        material.transmission = 1
        material.ior = 1.825
        material.thickness = 1
        gui.add(material, 'transmission').min(0).max(1).step(0.0001)
        gui.add(material, 'ior').min(1).max(2.333).step(0.0001)
        gui.add(material, 'thickness').min(0).max(1).step(0.0001)

        //* Time 
        console.time('all geometries')

        console.time('torus')

        //* Adding Geometries
        // Torus Geometry
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        // const donutMaterial = new THREE.MeshMatcapMaterial( {matcap: matcapTexture5})
        for (let i = 0; i<50; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            
            donut.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            )

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            donut.rotation.z = Math.random() * Math.PI

            const scale = Math.random() * 2
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }

        console.timeEnd('torus')
        console.time('octahedron')

        // Octahedron Geometry
        const octahedronGeometry = new THREE.OctahedronGeometry(1)
        // const octahedronMaterial = new THREE.MeshMatcapMaterial( {matcap: matcapTexture2})
        for (let i = 0; i<50; i++) {
            const octahedron = new THREE.Mesh(octahedronGeometry, material)

            octahedron.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            )

            octahedron.rotation.x = Math.random() * Math.PI
            octahedron.rotation.y = Math.random() * Math.PI
            octahedron.rotation.z = Math.random() * Math.PI

            scene.add(octahedron)
        }
        
        console.timeEnd('octahedron')
        console.time('sphere')

        // sphere Geometry
        const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16)
        // const sphereMaterial = new THREE.MeshMatcapMaterial( {matcap: matcapTexture3})
        for (let i = 0; i<50; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, material)

            sphere.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            )

            sphere.rotation.x = Math.random() * Math.PI
            sphere.rotation.y = Math.random() * Math.PI
            sphere.rotation.z = Math.random() * Math.PI

            const scale = Math.random() * 3
            sphere.scale.set(scale, scale, scale)

            scene.add(sphere)
        }

        console.timeEnd('sphere')
        console.time('cone')

        // cone Geometry
        const coneGeometry = new THREE.ConeGeometry(1, 1, 16, 16)
        // const coneMaterial = new THREE.MeshMatcapMaterial( {matcap: matcapTexture4})
        for (let i = 0; i<50; i++) {
            const cone = new THREE.Mesh(coneGeometry, material)

            cone.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
            )

            cone.rotation.x = Math.random() * Math.PI
            cone.rotation.y = Math.random() * Math.PI
            cone.rotation.z = Math.random() * Math.PI

            scene.add(cone)
        }
        console.timeEnd('cone')
        console.timeEnd('all geometries')
    }
)

/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    //* Change mapping property to equirectangularreflection
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    //* assign to background and environment properties
    scene.background = environmentMap
    scene.environment = environmentMap

})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()