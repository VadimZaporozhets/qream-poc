import {
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    SpotLight,
    Scene,
    PCFSoftShadowMap,
    SphereGeometry,
    MeshLambertMaterial,
    Mesh,
    SpotLightHelper,
    PlaneBufferGeometry,
    DoubleSide,
    MeshBasicMaterial,
    Math as ThreeMath,
    CylinderBufferGeometry,
    PointLight,
    FogExp2
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import TWEEN from '@tweenjs/tween.js';
import Stats from 'stats.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const canvas = document.getElementById('canvas');

let scene,
    renderer,
    camera,
    stats,
    controls,
    screenWidth = window.innerWidth,
    screenHeight = window.innerHeight;

const createScene = () => {
    renderer = new WebGLRenderer({
        antialias: true
    });
    scene = new Scene();
    scene.fog = new FogExp2(0xefd1b5, 0.015);
    stats = new Stats();
    camera = new PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 10000);
    controls = new OrbitControls(camera, renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    camera.position.set(0, 0, 35);
    camera.lookAt(0, 0, 0);

    // gui.add(camera.position, 'x', -100, 100)
    //     .name('camera x')
    //     .listen();

    // gui.add(camera.position, 'y', -100, 100)
    //     .name('camera y')
    //     .listen();

    // gui.add(camera.position, 'z', -100, 100)
    //     .name('camera z')
    //     .listen();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
};

let ambientLight, spotLight, spotLightHelper;

const createLights = () => {
    ambientLight = new AmbientLight(0xffffff, 0.3);
    spotLight = new SpotLight(0xffffff, 1);

    spotLight.position.set(20, 25, 20);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;

    spotLightHelper = new SpotLightHelper(spotLight);

    gui.add(spotLight, 'intensity', 0, 2)
        .name('Spotlight intensity')
        .listen();

    gui.add(spotLight.position, 'x', -100, 100)
        .name('Spotlight x')
        .listen();

    gui.add(spotLight.position, 'y', -100, 100)
        .name('Spotlight y')
        .listen();

    gui.add(spotLight.position, 'z', -100, 100)
        .name('Spotlight z')
        .listen();

    gui.add(ambientLight, 'intensity', 0, 2)
        .name('Ambient intensity')
        .listen();

    scene.add(spotLight);
    scene.add(ambientLight);
    // scene.add(spotLightHelper);
};

let sphere;

const createObject = () => {
    const geometry = new SphereGeometry(5, 60, 60);
    const material = new MeshLambertMaterial({
        color: 'yellow'
    });

    sphere = new Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    scene.add(sphere);
};

const animateObject = () => {
    sphere.rotation.y += 0.01;
};

const createMirror = (
    width,
    height,
    x = 0,
    y = 0,
    z = 0,
    rotX = 0,
    rotY = 0,
    rotZ = 0
) => {
    // const material = new MeshLambertMaterial({
    //     color: 0xffffff
    //     // side: DoubleSide
    // });
    const geometry = new PlaneBufferGeometry(width, height);

    const mesh = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: screenWidth * window.devicePixelRatio,
        textureHeight: screenHeight * window.devicePixelRatio,
        color: 0x889999,
        recursion: 1
    });

    // const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(
        ThreeMath.degToRad(rotX),
        ThreeMath.degToRad(rotY),
        ThreeMath.degToRad(rotZ)
    );

    scene.add(mesh);
    return mesh;
};

const lighters = [];

class Lighter {
    constructor(
        color,
        radius,
        height,
        x = 0,
        y = 0,
        z = 0,
        rotX = 0,
        rotY = 0,
        rotZ = 0
    ) {
        this.light = new PointLight(color, 1, 15);

        this.material = new MeshBasicMaterial({
            color: color
            // side: DoubleSide
        });
        this.geometry = new CylinderBufferGeometry(radius, radius, height);

        this.mesh = new Mesh(this.geometry, this.material);

        // const mesh = new Mesh(geometry, material);
        this.light.position.set(x, y, z);
        this.mesh.rotation.set(
            ThreeMath.degToRad(rotX),
            ThreeMath.degToRad(rotY),
            ThreeMath.degToRad(rotZ)
        );

        this.light.add(this.mesh);

        scene.add(this.light);
    }
}

const animateLighters = time => {
    lighters.forEach(lighter => {
        lighter.mesh.rotation.x += 0.005;

        lighter.mesh.rotation.y += 0.005;

        lighter.mesh.rotation.z += 0.005;
    });
};

const createFloor = () => {
    const material = new MeshLambertMaterial({
        color: 0xffffff
    });
    const geometry = new PlaneBufferGeometry(30, 30);
    const mesh = new Mesh(geometry, material);

    mesh.position.y = -10;
    mesh.rotation.x = ThreeMath.degToRad(-90);

    scene.add(mesh);
};

const init = () => {
    createScene();
    createLights();

    // createObject();

    const mirror1 = createMirror(30, 30, 15, 0, 0, 0, -90, 0);
    const mirror2 = createMirror(30, 30, -15, 0, 0, 0, 90, 0);
    const mirror3 = createMirror(30, 30, 0, 0, -15, 0, 0, 0);

    createFloor();

    lighters.push(new Lighter(0x80ff80, 0.3, 20, 0, 0, 0, 10, 10, 10));
    lighters.push(new Lighter(0x0040ff, 0.3, 20, 0, 0, 0, 17, 24, 80));
    lighters.push(new Lighter(0xff0040, 0.3, 20, 0, 0, 0, 29, 11, 54));
    lighters.push(new Lighter(0xffaa00, 0.3, 20, 0, 0, 0, 9, -70, 3));

    window.addEventListener('resize', handleWindowResize);

    render();
};

const render = time => {
    renderer.render(scene, camera);
    controls.update();
    stats.update();
    TWEEN.update();

    // animateObject();
    animateLighters(time);

    requestAnimationFrame(render);
};

const handleWindowResize = () => {
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    renderer.setSize(screenWidth, screenHeight);
    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();
};

init();
