/**
 * @param {string} templateString
 * @param {object} data
 * @returns {string}
 */
export const createTemplate = (templateString, data) => {
    let html = templateString;
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key]);
    }
    return html;
};