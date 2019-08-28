import TWEEN from '@tweenjs/tween.js';
import * as dat from 'dat.gui';

import { createScene, createLights } from './ParticlesDemo/scene';
import { initLoader } from './ParticlesDemo/particlesLoader';
import { createLogo, animateLogo } from './ParticlesDemo/particlesLogo';

const gui = new dat.GUI();

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const { scene, renderer, controls, stats, camera } = createScene(WIDTH, HEIGHT);

const init = async () => {
    createLights(scene, gui);

    const particlesData = await initLoader();

    createLogo(particlesData, scene);

    animateLogo();

    window.addEventListener('resize', handleWindowResize);

    render();
};

const render = time => {
    renderer.render(scene, camera);
    controls.update();
    stats.update();
    TWEEN.update();

    // animateLogo(time);

    requestAnimationFrame(render);
};

const handleWindowResize = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
};

init();
