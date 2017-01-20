
class App {

    constructor() {
        console.log(Framework7);

        this.$$ = Dom7;
        this.app = new Framework7({
            material: true
        });
        this.mainView = this.app.addView('.view-main');
        
        document.addEventListener("deviceready", this.onDeviceReady);

        $("#welcome-continue-btn").click(() => {
            console.log("clicked");
            this.mainView.router.loadPage('messages.html');
        });

        // if new visit open ^^^^ TODO
    }
    
    onDeviceReady() {
        console.log("device ready");

    }
}

export default App;
