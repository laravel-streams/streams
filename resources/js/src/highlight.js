import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('php', php);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.initHighlighting();

//import 'highlight.js/styles/solarized-dark.css';
import 'highlight.js/styles/tomorrow-night.css';