import {
    PointsMaterial,
    Points,
    Geometry,
    Vector3,
    VertexColors,
    Color
} from 'three';

export const createLogo = (pointsData, scene) => {
    const imageData = pointsData[0];
    const material = new PointsMaterial({
        vertexColors: VertexColors,
        color: 0xffffff,
        size: 2
    });
    const geometry = new Geometry();

    imageData.forEach(point => {
        geometry.vertices.push(
            new Vector3(point[0], point[1], Math.random() * 10)
        );
        geometry.colors.push(
            new Color(Math.random(), Math.random(), Math.random())
        );
    });

    const pointsLogo = new Points(geometry, material);

    console.log(scene);

    scene.add(pointsLogo);
};
