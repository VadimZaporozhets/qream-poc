import { IcosahedronGeometry, MeshPhongMaterial, Mesh } from 'three';

import noise from './noise';

export class Pulp {
    constructor(scene, size = 150, color = 0xafa2ff, x = 0, y = 0, z = 0) {
        this.geometry = new IcosahedronGeometry(size, 4);
        this.verticesLength = this.geometry.vertices.length;
        for (let i = 0; i < this.verticesLength; i++) {
            const vector = this.geometry.vertices[i];
            vector._o = vector.clone();
        }
        this.material = new MeshPhongMaterial({
            emissive: color,
            emissiveIntensity: 0.4,
            shininess: 0
        });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;

        scene.add(this.mesh);
    }

    animatePulp(time) {
        for (let i = 0; i < this.verticesLength; i++) {
            const vector = this.geometry.vertices[i];
            vector.copy(vector._o);
            const perlin = noise.simplex3(
                vector.x * 0.006 + time * 0.0002,
                vector.y * 0.006 + time * 0.0003,
                vector.z * 0.006
            );
            const ratio = perlin * 0.4 * (0.5 + 0.1) + 0.8;
            vector.multiplyScalar(ratio);
        }
        this.geometry.verticesNeedUpdate = true;
    }
}
