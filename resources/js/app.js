import "@lottiefiles/lottie-player";

import Menu from "./components/Menu.svelte";

const menu = new Menu({
    target: document.getElementById('app')
  });

 
  window.menu = menu;

export default menu;


cockhead.addEventListener('click',()=>{
  this.disabled=true
})