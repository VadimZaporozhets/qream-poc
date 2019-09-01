import {
    PointsMaterial,
    Points,
    Geometry,
    Vector3,
    VertexColors,
    Color,
    TextureLoader
} from 'three';
import { TimelineMax, Power4, TweenLite } from 'gsap';

let geometry,
    verticesLength,
    deltas = [];

export const createLogo = (pointsData, scene) => {
    const imageData = pointsData[0];
    // const texture = new TextureLoader().load('src/assets/sphere.png');

    const material = new PointsMaterial({
        vertexColors: VertexColors,
        color: 0xffffff,
        size: 4,
        // map: texture,
        transparent: true,
        alphaTest: 0.01
    });
    geometry = new Geometry();

    imageData.forEach(point => {
        geometry.vertices.push(
            new Vector3(point[0], point[1], Math.random() * 15)
        );
        geometry.colors.push(
            // new Color(Math.random(), Math.random(), Math.random())
            new Color(1, 1, 1)
        );
        deltas.push(Math.random() * 2 - 1);
    });

    console.log(geometry.vertices);

    verticesLength = geometry.vertices.length;

    const pointsLogo = new Points(geometry, material);

    scene.add(pointsLogo);

    return geometry;
};

const animationObj = {
    dX: 0
};

const onUpdateParticles = () => {
    for (let i = 0; i < verticesLength; i++) {
        // const dX = (animationObj.dX / 2) * (Math.sin(i / 2) / 2);
        const dX = (animationObj.dX / 5) * deltas[i];
        // const dX = Math.sin(time / 1000 + i / 2) / 2;
        const dY = 0;
        const dZ = 0;

        geometry.vertices[i].add(new Vector3(dX, dY, dZ));
    }
    geometry.verticesNeedUpdate = true;
};

export const animateLogo = () => {
    const logoTimeline = new TimelineMax({
        onUpdate: onUpdateParticles,
        repeat: Infinity,
        ease: Power4.easeIn
    })
        .to(animationObj, 1.5, {
            dX: 4
        })
        .to(animationObj, 1.5, {
            dX: -4
        })
        .to(animationObj, 1.5, {
            dX: 0.4
        })
        .to(animationObj, 1.5, {
            dX: -0.4
        })
        .to(animationObj, 1.5, {
            dX: 0.4
        })
        .to(animationObj, 1.5, {
            dX: -0.4
        })
        .to(animationObj, 1.5, {
            dX: 0
        });
};
