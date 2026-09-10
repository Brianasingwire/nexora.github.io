// All hrefs are built from Vite's BASE_URL so they resolve identically from any
// page. BASE_URL always ends in a slash.
const BASE = import.meta.env.BASE_URL;

export const home = BASE;
export const services = `${BASE}services/`;
export const work = `${BASE}work/`;
export const about = `${BASE}about/`;
export const contact = `${BASE}contact/`;

// Anchors within the home page. Fully qualified, so following one from another
// page loads home and scrolls; from home itself the browser treats it as a
// same-document fragment jump and smooth-scrolls. Only #top remains — Services,
// Work, About and Contact are all their own pages now.
export const section = (id) => `${BASE}#${id}`;
