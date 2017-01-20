
class App {

    constructor() {
        console.log(Framework7);

        this.app = new Framework7({
            material: true
        });
        this.$$ = Dom7;

        document.addEventListener("deviceready", this.onDeviceReady);
    }
    
    onDeviceReady() {
        console.log("device ready");

    }
}

export default App;
