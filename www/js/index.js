

// DOM ready
$(function() {
    console.log("DOM ready");

    document.addEventListener("deviceready", onDeviceReady);
});

function onDeviceReady() {
    console.log("device ready");
}
