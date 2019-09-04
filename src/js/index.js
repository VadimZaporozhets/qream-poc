import { createScene, createLights } from './ParticlesDemo/scene';
import { initLoader } from './ParticlesDemo/particlesLoader';
import { ParticlesLogo } from './ParticlesDemo/particlesLogo';
import { Pulp } from './ParticlesDemo/bg-pulp';

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const { scene, renderer, controls, stats, camera } = createScene(WIDTH, HEIGHT);

let pulp1, pulp2;

const init = async () => {
    createLights(scene);

    const particlesData = await initLoader();

    const particlesLogo = new ParticlesLogo(particlesData, scene);
    particlesLogo.animateLogo();

    pulp1 = new Pulp(scene, 150, 0xdc0073, -350, 200, 20);
    pulp2 = new Pulp(scene, 110, 0x95f9e3, 350, -200, 20);

    window.addEventListener('resize', handleWindowResize);

    render();
};

const render = time => {
    renderer.render(scene, camera);
    controls.update();
    stats.update();

    // logoGeometry.

    // animateLogo(time);
    pulp1.animatePulp(time);
    pulp2.animatePulp(time);

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
