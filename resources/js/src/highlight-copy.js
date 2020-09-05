
if (navigator && navigator.clipboard) {
    
    document.querySelectorAll('pre > code').forEach(function (codeBlock) {
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.classList.add('c-copy-code__icon');
        const clipboard = navigator.clipboard;

        button.className = 'c-copy-code';
        button.type = 'button';
        button.appendChild(icon);
        codeBlock.parentNode.appendChild(button);

        button.addEventListener('click', () => {
            console.log('clickeds')
            clipboard.writeText(codeBlock.innerText).then(function () {
               
                button.blur();

                button.classList.add('c-copy-code__copied')

                setTimeout(function () {
                    button.classList.remove('c-copy-code__copied')
                }, 2000);
            }, function (error) {
                button.innerText = 'Error';
            });
        })
    });
} else if ( window.location.protocol == 'http:' ) {
    alert('Copy to clipboard functionality will not work unless you use a secure origin');
}