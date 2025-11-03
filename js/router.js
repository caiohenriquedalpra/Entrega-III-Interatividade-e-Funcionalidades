import { pages, productCardTemplate, productsData } from './pages.js';
import { createTemplate } from './templating.js';

const appContent = document.getElementById('app-content');

const loadContent = () => {
    const path = window.location.hash.slice(1) || 'home'; 
    
    const pageContent = pages[path] || pages.error404;
    
    appContent.innerHTML = pageContent;

    if (path === 'produtos') {
        const productListContainer = document.getElementById('products-list');
        if (productListContainer) {
            let renderedHTML = '';
            productsData.forEach(product => {
                renderedHTML += createTemplate(productCardTemplate, product);
            });
            productListContainer.innerHTML = renderedHTML;
        }
    }
};

export const setupRouter = () => {
    loadContent();
    
    window.addEventListener('hashchange', loadContent);
};