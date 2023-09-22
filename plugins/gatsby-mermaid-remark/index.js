const visit = require('unist-util-visit');

module.exports = ({ markdownAST } = {}) => {
  visit(markdownAST, 'code', (node) => {
    const lang = (node.lang || '').toLowerCase();
    if (lang === 'mermaid') {
      node.type = 'html';
      node.value = `<div class="mermaid">${node.value}</div>`;
    }
  });
};
