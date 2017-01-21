
class App {

    static get FIRST_VISIT_KEY() {
        return "storage-first-visit";
    }

    constructor() {
        console.log(Framework7);

        this.$$ = Dom7;
        this.storage = window.localStorage;
        this.app = new Framework7({
            material: true
        });
        this.mainView = this.app.addView('.view-main');

        document.addEventListener("deviceready", this.onDeviceReady);

        this.checkFirstVisit();

        $(".nav-messages").click(() => {
            this.mainView.router.loadPage('messages.html');
        });

        $("#button-issue").click(() =>{
            this.mainView.router.loadPage('form.html');
        });
    }

    checkFirstVisit() {
        // comment out 'if' to debug
        if (this.storage.getItem(App.FIRST_VISIT_KEY) == null) {
            //$(".nav-forward").show();
            this.mainView.router.loadPage('intro.html');
            this.storage.setItem(App.FIRST_VISIT_KEY, "-");
            /*$(".nav-forward").click(function() {
                $(this).hide();
            });*/
        }
    }
    
    onDeviceReady() {
        console.log("device ready");

    }
}

export default App;
