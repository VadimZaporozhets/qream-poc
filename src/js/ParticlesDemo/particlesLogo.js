import {
    PointsMaterial,
    Points,
    Geometry,
    Vector3,
    VertexColors,
    Color
} from 'three';
import { TimelineMax } from 'gsap';

let geometry, verticesLength;

export const createLogo = (pointsData, scene) => {
    const imageData = pointsData[0];
    const material = new PointsMaterial({
        vertexColors: VertexColors,
        color: 0xffffff,
        size: 1
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
    });

    verticesLength = geometry.vertices.length;

    const pointsLogo = new Points(geometry, material);

    scene.add(pointsLogo);
};

const animationObj = {
    range: 0,
    direction: -1
};

const onUpdateParticles = () => {
    for (let i = 0; i < verticesLength; i++) {
        const noise = animationObj.direction * Math.sin(i / 2);
        // const noise = Math.sin(i / 2);
        const dX = animationObj.range / 10 + noise;
        // const dX = Math.sin(time / 1000 + i / 2) / 2;
        const dY = 0;
        const dZ = 0;

        geometry.vertices[i].add(new Vector3(dX, dY, dZ));
    }
    geometry.verticesNeedUpdate = true;
};

export const animateLogo = time => {
    const logoTimeline = new TimelineMax({
        onUpdate: onUpdateParticles,
        repeat: Infinity,
        yoyo: true
    })
        .to(animationObj, 1, {
            range: 1,
            direction: 1
        })
        .to(animationObj, 1, {
            range: 0,
            direction: -1
        });
};
