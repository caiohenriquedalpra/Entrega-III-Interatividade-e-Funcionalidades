/**
 * @param {HTMLElement} field
 * @param {string} message
 */
const displayError = (field, message) => {
    field.classList.add('error');
    
    let errorElement = document.getElementById(`${field.id}-error`);
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = `${field.id}-error`;
        errorElement.classList.add('error-message');
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    errorElement.textContent = message; 
};

/**
 * @param {HTMLElement} field
 */
const clearError = (field) => {
    field.classList.remove('error');
    const errorDisplay = document.getElementById(`${field.id}-error`);
    if (errorDisplay) errorDisplay.remove();
};

/**
 * @param {HTMLFormElement} formElement
 * @returns {boolean}
 */
export const validateForm = (formElement) => {
    let isValid = true;
    const fields = formElement.querySelectorAll('[data-validate]');

    fields.forEach(field => {
        clearError(field);
        
        if (field.hasAttribute('required') && field.value.trim() === '') {
            isValid = false;
            displayError(field, 'Este campo é obrigatório.');
            return;
        } 
        
        if (field.type === 'email' && field.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
             isValid = false;
             displayError(field, 'O formato do e-mail é inválido.');
             return;
        }

        const minLength = field.getAttribute('minlength');
        if (minLength && field.value.length < parseInt(minLength)) {
            isValid = false;
            displayError(field, `É necessário no mínimo ${minLength} caracteres.`);
            return;
        }
    });

    return isValid;
};