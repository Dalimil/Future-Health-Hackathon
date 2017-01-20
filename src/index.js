
import $ from 'jquery';
import App from './App'

window.$ = $;

// DOM ready
$(function() {
    console.log("DOM ready");
    const app = new App();
});

