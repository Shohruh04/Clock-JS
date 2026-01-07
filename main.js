// ==========================================
// THREE.JS 3D SCENE SETUP
// ==========================================

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

camera.position.z = 30;

// ==========================================
// PARTICLE SYSTEM - STARFIELD
// ==========================================

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;

    // Colors - mix of cyan and pink
    const colorChoice = Math.random();
    if (colorChoice > 0.5) {
        // Cyan: #17D4FE
        colorsArray[i] = 0.09;
        colorsArray[i + 1] = 0.83;
        colorsArray[i + 2] = 1.0;
    } else {
        // Pink: #fe17a4
        colorsArray[i] = 1.0;
        colorsArray[i + 1] = 0.09;
        colorsArray[i + 2] = 0.64;
    }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ==========================================
// 3D TORUS RINGS
// ==========================================

// Outer Torus
const torusGeometry1 = new THREE.TorusGeometry(15, 0.1, 16, 100);
const torusMaterial1 = new THREE.MeshBasicMaterial({
    color: 0x17D4FE,
    transparent: true,
    opacity: 0.6
});
const torus1 = new THREE.Mesh(torusGeometry1, torusMaterial1);
scene.add(torus1);

// Middle Torus
const torusGeometry2 = new THREE.TorusGeometry(12, 0.08, 16, 100);
const torusMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xfe17a4,
    transparent: true,
    opacity: 0.5
});
const torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
torus2.rotation.x = Math.PI / 2;
scene.add(torus2);

// Inner Torus
const torusGeometry3 = new THREE.TorusGeometry(9, 0.06, 16, 100);
const torusMaterial3 = new THREE.MeshBasicMaterial({
    color: 0x17D4FE,
    transparent: true,
    opacity: 0.4
});
const torus3 = new THREE.Mesh(torusGeometry3, torusMaterial3);
torus3.rotation.y = Math.PI / 2;
scene.add(torus3);

// ==========================================
// FLOATING GEOMETRIC SHAPES
// ==========================================

const shapes = [];
const shapeCount = 15;

// Create Octahedrons
for (let i = 0; i < shapeCount; i++) {
    const geometry = new THREE.OctahedronGeometry(0.3 + Math.random() * 0.5);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x17D4FE : 0xfe17a4,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Random position in a sphere around center
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.random() * Math.PI * 2;
    const radius = 18 + Math.random() * 8;

    mesh.position.x = Math.sin(angle1) * Math.cos(angle2) * radius;
    mesh.position.y = Math.sin(angle1) * Math.sin(angle2) * radius;
    mesh.position.z = Math.cos(angle1) * radius;

    mesh.userData = {
        rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        },
        orbitSpeed: (Math.random() - 0.5) * 0.002,
        orbitRadius: radius,
        orbitAngle: angle1
    };

    shapes.push(mesh);
    scene.add(mesh);
}

// Create Icosahedrons
for (let i = 0; i < shapeCount / 2; i++) {
    const geometry = new THREE.IcosahedronGeometry(0.4 + Math.random() * 0.4);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x17D4FE : 0xfe17a4,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);

    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.random() * Math.PI * 2;
    const radius = 20 + Math.random() * 10;

    mesh.position.x = Math.sin(angle1) * Math.cos(angle2) * radius;
    mesh.position.y = Math.sin(angle1) * Math.sin(angle2) * radius;
    mesh.position.z = Math.cos(angle1) * radius;

    mesh.userData = {
        rotationSpeed: {
            x: (Math.random() - 0.5) * 0.03,
            y: (Math.random() - 0.5) * 0.03,
            z: (Math.random() - 0.5) * 0.03
        },
        orbitSpeed: (Math.random() - 0.5) * 0.001,
        orbitRadius: radius,
        orbitAngle: angle1
    };

    shapes.push(mesh);
    scene.add(mesh);
}

// ==========================================
// GLOWING SPHERES
// ==========================================

const spheres = [];
for (let i = 0; i < 8; i++) {
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x17D4FE : 0xfe17a4,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);

    const angle = (i / 8) * Math.PI * 2;
    sphere.position.x = Math.cos(angle) * 20;
    sphere.position.y = Math.sin(angle) * 20;
    sphere.position.z = (Math.random() - 0.5) * 10;

    sphere.userData = {
        baseAngle: angle,
        speed: 0.003 + Math.random() * 0.002,
        zOffset: sphere.position.z
    };

    spheres.push(sphere);
    scene.add(sphere);
}

// ==========================================
// MOUSE INTERACTION
// ==========================================

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// ==========================================
// ANIMATION LOOP
// ==========================================

let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Smooth camera movement based on mouse
    targetX = mouseX * 3;
    targetY = mouseY * 3;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particle system
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    // Rotate torus rings
    torus1.rotation.x += 0.005;
    torus1.rotation.y += 0.002;

    torus2.rotation.y += 0.004;
    torus2.rotation.z += 0.003;

    torus3.rotation.x += 0.003;
    torus3.rotation.z += 0.005;

    // Animate floating shapes
    shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Slight orbital motion
        shape.userData.orbitAngle += shape.userData.orbitSpeed;
    });

    // Animate glowing spheres
    spheres.forEach((sphere, index) => {
        const angle = sphere.userData.baseAngle + time * sphere.userData.speed * 50;
        sphere.position.x = Math.cos(angle) * 20;
        sphere.position.y = Math.sin(angle) * 20;
        sphere.position.z = Math.sin(time * 2 + index) * 5 + sphere.userData.zOffset;

        // Pulse scale
        const scale = 1 + Math.sin(time * 3 + index) * 0.3;
        sphere.scale.set(scale, scale, scale);
    });

    renderer.render(scene, camera);
}

animate();

// ==========================================
// WINDOW RESIZE HANDLER
// ==========================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// DIGITAL CLOCK FUNCTIONS
// ==========================================

function showTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = "AM";

    if (h === 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    const time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;

    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const dateString = date.toLocaleDateString('en-US', options);
    document.getElementById("DateDisplay").innerText = dateString;

    setTimeout(showDate, 60000);
}

// Initialize clock and date display
showTime();
showDate();
