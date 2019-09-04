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

export class ParticlesLogo {
    constructor(pointsData, scene) {
        const imageData = pointsData[0];
        this.animationObj = {
            dX: 0
        };
        this.deltas = [];
        // const texture = new TextureLoader().load('src/assets/sphere.png');

        this.material = new PointsMaterial({
            vertexColors: VertexColors,
            color: 0xffffff,
            size: 4,
            // map: texture,
            transparent: true,
            alphaTest: 0.01
        });
        this.geometry = new Geometry();

        imageData.forEach(point => {
            this.geometry.vertices.push(
                new Vector3(point[0], point[1], Math.random() * 15)
            );
            this.geometry.colors.push(
                // new Color(Math.random(), Math.random(), Math.random())
                new Color(1, 1, 1)
            );
            this.deltas.push(Math.random() * 2 - 1);
        });

        this.verticesLength = this.geometry.vertices.length;

        this.mesh = new Points(this.geometry, this.material);

        scene.add(this.mesh);
    }

    onUpdateParticles() {
        for (let i = 0; i < this.verticesLength; i++) {
            // const dX = (animationObj.dX / 2) * (Math.sin(i / 2) / 2);
            const dX = (this.animationObj.dX / 5) * this.deltas[i];
            // const dX = Math.sin(time / 1000 + i / 2) / 2;
            const dY = 0;
            const dZ = 0;

            this.geometry.vertices[i].add(new Vector3(dX, dY, dZ));
        }
        this.geometry.verticesNeedUpdate = true;
    }

    animateLogo() {
        const logoTimeline = new TimelineMax({
            onUpdate: this.onUpdateParticles.bind(this),
            repeat: Infinity,
            ease: Power4.easeIn
        })
            .to(this.animationObj, 1.5, {
                dX: 4
            })
            .to(this.animationObj, 1.5, {
                dX: -4
            })
            .to(this.animationObj, 1.5, {
                dX: 0.4
            })
            .to(this.animationObj, 1.5, {
                dX: -0.4
            })
            .to(this.animationObj, 1.5, {
                dX: 0.4
            })
            .to(this.animationObj, 1.5, {
                dX: -0.4
            })
            .to(this.animationObj, 1.5, {
                dX: 0
            });
    }
}
