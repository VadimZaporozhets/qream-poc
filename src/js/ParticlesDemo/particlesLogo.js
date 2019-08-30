import {
    PointsMaterial,
    Points,
    Geometry,
    Vector3,
    VertexColors,
    Color,
    TextureLoader
} from 'three';
import { TimelineMax, Power4, Linear } from 'gsap';

let geometry,
    verticesLength,
    deltas = [];

export const createLogo = (pointsData, scene) => {
    const imageData = pointsData[0];
    const texture = new TextureLoader().load('src/assets/halftone.png');

    const material = new PointsMaterial({
        vertexColors: VertexColors,
        color: 0xffffff,
        size: 4,
        map: texture,
        transparent: true
    });
    geometry = new Geometry();

    imageData.forEach(point => {
        geometry.vertices.push(
            new Vector3(point[0], point[1], Math.random() * 15)
        );
        geometry.colors.push(
            // new Color(Math.random(), Math.random(), Math.random())
            new Color(0, 0, 0)
        );
        deltas.push(Math.random() * 2 - 1);
    });

    console.log(geometry.vertices);

    verticesLength = geometry.vertices.length;

    const pointsLogo = new Points(geometry, material);

    scene.add(pointsLogo);
};

const animationObj = {
    dX: -1
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
        onRepeat: () => {
            console.log(animationObj.dX);
        },
        ease: Linear
    })
        .to(animationObj, 1, {
            dX: 1,
            onComplete: () => {
                console.log(animationObj.dX);
            }
        })
        .to(animationObj, 1, {
            dX: -1,
            onComplete: () => {
                console.log(animationObj.dX);
            }
        });
};
