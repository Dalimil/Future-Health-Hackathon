
import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import "framework7";
import App from './App';


// DOM ready
$(function() {
    console.log("DOM ready");
    const app = new App();
});

