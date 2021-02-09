import Prism from 'prismjs';
import AnchorJS from 'anchor-js';
import Clipboard from 'clipboard';
import * as tocbot from 'tocbot';

import { ServiceProvider } from '@streams/core';

export class AppServiceProvider extends ServiceProvider {

    public register() {

        // this.app.factory('modal', () => {
        //     return Modals;
        // });
    }

    public boot() {

        /**
         * Setup the code examples
         */
        let examples = Array.prototype.slice.call(
            document.querySelectorAll('pre > code')
        );

        examples.forEach(function (code, index) {

            code.setAttribute('id', 'code-' + (index + 1));

            Prism.highlightElement(code);

            // let copy = document.createElement('button');

            // copy.textContent = 'copy';
            // copy.setAttribute('data-clipboard-target', '#code-' + (index + 1));
            // copy.classList.add('copy-to-clipboard');

            // code.parentNode.insertBefore(copy, code.nextSibling);

            // let clipboard = new ClipboardJS('.copy-to-clipboard');

            // clipboard.on('success', function (event) {
            //     event.trigger.classList.add('copied');
            // });
        });

        const anchors = new AnchorJS();

        anchors.options = {
            placement: 'left',
        };

        anchors.add('.doc-body h2, .doc-body h3, .doc-body h4');
        
        tocbot.init({

            // Where to render the table of contents.
            tocSelector: '.ls-doc__toc',
            // Where to grab the headings to build the table of contents.
            contentSelector: '.doc-body',
            // Which headings to grab inside of the contentSelector element.
            headingSelector: 'h2,h3,h5',
            // Headings that match the ignoreSelector will be skipped.
            ignoreSelector: '.toc-ignore',
            // For headings inside relative or absolute positioned containers within content.
            hasInnerContainers: false,
            // Main class to add to links.
            linkClass: 'toc-link',
            // The sections that are hidden will open
            // and close as you scroll to headings within them.
            collapseDepth: 5,
            // Smooth scrolling enabled.
            scrollSmooth: true,
            // Smooth scroll duration.
            scrollSmoothDuration: 0,
            // Callback for scroll end.
            // Can also be used to account for scroll height discrepancies from the use of css scroll-padding-top
            headingsOffset: 1,
            // Timeout between events firing to make sure it's
            // not too rapid (for performance reasons).
            throttleTimeout: 50,
            // Element to add the positionFixedClass to.
            positionFixedSelector: null,
            // Fixed position class to add to make sidebar fixed after scrolling
            // down past the fixedSidebarOffset.
            positionFixedClass: 'is-position-fixed',
            // fixedSidebarOffset can be any number but by default is set
            // to auto which sets the fixedSidebarOffset to the sidebar
            // element's offsetTop from the top of the document on init.
            fixedSidebarOffset: 'auto',
            // includeHtml can be set to true to include the HTML markup from the
            // heading node instead of just including the textContent.
            includeHtml: false,
            // If there is a fixed article scroll container, set to calculate titles' offset
            scrollContainer: null,
            // prevent ToC DOM rendering if it's already rendered by an external system
            skipRendering: false,
        });
    }
}
