export function cn(...classes) { return classes.filter(Boolean).join(' '); }
export function truncate(str, len = 100) { return str && str.length > len ? str.slice(0, len) + '...' : str; }
export function slugify(str) { return str.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/[\s_-]+/g,'-').replace(/^-+|-+$/g,''); }
export function generateSessionId() { return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9); }
