
import "./src/highlight"


const bashes = document.querySelectorAll('.language-bash');
bashes.forEach(bash => {
    bash.closest('pre').classList.add('language-bash');
    bash.classList.add('c-scrollbar');
});
