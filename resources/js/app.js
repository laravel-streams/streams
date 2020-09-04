
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('php', php);
hljs.registerLanguage('bash', bash);
hljs.initHighlighting();
import 'highlight.js/styles/gruvbox-dark.css';


const bashes = document.querySelectorAll('.language-bash');
bashes.forEach(bash => {
    bash.closest('pre').classList.add('language-bash');
});
