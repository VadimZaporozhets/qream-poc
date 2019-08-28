const size = 150;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = size;
canvas.height = size;
canvas.classList.add('tempcanvas');
const maxPointsPerImage = 15000;

//Array full of images data where all points of all images located
const gallery = [];

const imagePaths = ['src/assets/black-01.svg'];

const loadImages = (imagePaths, onLoadHandler) => {
    const imagePathsLength = imagePaths.length;
    const images = [];

    return new Promise(resolve => {
        imagePaths.forEach(path => {
            const image = new Image();
            image.src = path;
            image.onload = () => {
                images.push(image);
                if (images.length === imagePathsLength) {
                    onLoadHandler(images);
                    resolve(gallery);
                }
            };
        });
    });
};

const onLoadHandler = images => {
    images.forEach(image => {
        gallery.push(getImageData(image));
    });
};

const shuffle = a => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
};

const fillUp = (array, max) => {
    const length = array.length;
    for (let i = 0; i < max - length; i++) {
        array.push(array[Math.floor(Math.random() * length)]);
    }
    return array;
};

const getImageData = image => {
    const imageCoords = [];
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(image, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);

    const data = imageData.data;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // const red = data[((size * y) + x) * 4];
            // const green = data[((size * y) + x) * 4 + 1];
            // const blue = data[((size * y) + x) * 4 + 2];
            const alpha = data[(size * y + x) * 4 + 3];

            const coordX = 5 * (x - size / 2);
            const coordY = 5 * (size / 2 - y);

            if (alpha > 0) {
                imageCoords.push([coordX, coordY]);
            }
        }
    }

    return shuffle(fillUp(imageCoords, maxPointsPerImage));
};

export const initLoader = async () => {
    document.body.appendChild(canvas);

    const particlesData = await loadImages(imagePaths, onLoadHandler);

    return particlesData;
};
