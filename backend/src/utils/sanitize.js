import xss from 'xss';

export const sanitizeText = (value = '') => xss(String(value).trim());
