/**
 * Replaces template markers with HTML-escaped values from a plain data object.
 * @param {string} templateString
 * @param {object} data
 * @returns {string}
 */
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

export const createTemplate = (templateString, data) =>
  templateString.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(data, key)
      ? escapeHtml(data[key])
      : ''
  );
