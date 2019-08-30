import {
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    SpotLight,
    Scene,
    PCFSoftShadowMap
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';

export const createScene = (WIDTH, HEIGHT) => {
    const canvas = document.getElementById('canvas');
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
    });
    const scene = new Scene();
    const stats = new Stats();
    const camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    camera.position.set(0, 40, 500);
    camera.lookAt(0, 0, 0);

    // gui.add(camera.position, 'x', -100, 100)
    //     .name('camera x')
    //     .listen();

    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);

    return { scene, renderer, controls, stats, camera };
};

export const createLights = (scene, gui) => {
    const ambientLight = new AmbientLight(0xffffff, 0.3);
    const spotLight = new SpotLight(0xffffff, 1);

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
};
