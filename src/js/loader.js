export const removeLoader = () => {
    const body = document.body;
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading');

        setTimeout(() => {
            loader.parentNode.removeChild(loader);
        }, 2000);
    }, 4000);
};
