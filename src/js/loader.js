export const removeLoader = () => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.parentNode.removeChild(loader);
    }, 4000);
};
