import fs from 'fs';

const HTML_PATH = './build/index.html';
let HTML_STRING = '';
const cleanSlash = (str) => {
  if (str.startsWith('/')) {
    return str;
  }
  return `/${str}`;
};
export default (replaceInfo) => {
  const publicUrl = process.env.PUBLIC_URL || '';
  if (!HTML_STRING) HTML_STRING = fs.readFileSync(HTML_PATH, 'utf8');
  let HTML_CLONE = HTML_STRING;
  replaceInfo.forEach((item) => {
    if (Array.isArray(item.with)) {
      if (item.string.startsWith('<link')) {
        HTML_CLONE = HTML_CLONE.replace(item.string, item.with.map(link => `<link
             rel="stylesheet"
             href="${publicUrl}${cleanSlash(link.file)}"/>`).join('\n'));
      } else if (item.string.startsWith('<script')) {
        HTML_CLONE = HTML_CLONE.replace(item.string, item.with.map(script => `<script
            type="text/javascript"
             src="${publicUrl}${cleanSlash(script.file)}"></script>`).join('\n'));
      }
    } else {
      HTML_CLONE = HTML_CLONE.replace(item.string, item.with);
    }
  });
  return HTML_CLONE;
};
