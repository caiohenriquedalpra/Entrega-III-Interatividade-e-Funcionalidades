import { setupRouter } from './router.js';
import { validateForm } from './formValidator.js';

const init = () => {
    setupRouter(); 
    
    window.addEventListener('hashchange', setupFormListener);
    setupFormListener();
};

const setupFormListener = () => {
    const form = document.getElementById('contact-form');
    
    if (form && !form.dataset.listenerAdded) {
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (validateForm(form)) {
                alert('🎉 Formulário enviado com sucesso! Dados Consistentes.');
                form.reset();
            } 
            
        });

        form.dataset.listenerAdded = 'true';
    }
}

document.addEventListener('DOMContentLoaded', init);
