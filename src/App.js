
class App {

    static get FIRST_VISIT_KEY() {
        return "storage-first-visit";
    }

    static get FIRST_VISIT_DATA(){
        return "storage-first-visit-data";
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

        $(".nav-messages").click(() => {
            this.mainView.router.loadPage('messages.html');
        });

        $("#button-issue").click(() =>{
            this.mainView.router.loadPage('form.html');
        });

        this.onMessagesInit();
        this.onHomeInit();
        this.checkFirstVisit();
    }

    onHomeInit() {
        this.app.onPageInit('home', (page) => {
            this.onSkeletonInit();

            const formData = JSON.parse(this.storage.getItem(App.FIRST_VISIT_DATA));
            $("#prof-description").text(formData.name);

        });
    }

    onSkeletonInit() {
        console.log("ok");
        $(".skeleton-view")
            .scrollTop($("body").height()/2)
            .scrollLeft($("body").width()/4);

        $("#skeleton-internal").click(() => {
            $(".skeleton-view img").attr("src", "img/internal.png");
        });
        $("#skeleton-external").click(() => {
            $(".skeleton-view img").attr("src", "img/external.png");
        });

        const self = this;
        $(".skeleton-view .main").click(function(e){
            console.log(e.offsetX, e.offsetY);
            console.log(e.clientX, e.clientY);
            $(".skeleton-view .pain").css({
                top: (e.clientY - 15) + "px",
                left: (e.clientX - 15)+ "px"
            }).show();

            const clickedLink = this;
            self.app.popover('.popover-about', $("#skeleton-external")[0]);
        });

        $("#severity-range").on("input", (e) => {
            //console.log(e.target.value);
            const sc = 10 + (e.target.value/100) * 80;
            $(".skeleton-view .pain").width(sc).height(sc);
        });
        $(".popover-about button").click(() => {
            self.app.closeModal(".popover-about");
            self.mainView.router.loadPage('results.html');
        });
    }

    onMessagesInit() {
        this.app.onPageInit('messages', function (page) {
            console.log("msg initialized");

            $(".chat-discussion").animate({ scrollTop: "3000000px" });

            $("#message-submit").click(() => {
                const textval = $("#message-textarea").val();
                if (!textval) return;

                $(".chat-discussion").append(
                    `<div class="chat-message left">
                        <img class="message-avatar" src="img/a4.jpg" alt=""/>
                        <div class="message">
                            <a class="message-author" href="chat_view.html#"> Alex Smith </a>
                            <span class="message-date"> Now </span>
                            <span class="message-content">
                            ${textval}
                        </span>
                        </div>
                    </div>`
                );
                $(".chat-discussion").animate({ scrollTop: "3000000px" });
                $("#message-textarea").val("");
            });
            console.log(App.FIRST_VISIT_DATA)
        });
    }

    checkFirstVisit() {
        // comment out 'if' to debug
        if (true || this.storage.getItem(App.FIRST_VISIT_KEY) == null) {
            //$(".nav-forward").show();
            this.mainView.router.loadPage('intro.html');
            this.storage.setItem(App.FIRST_VISIT_KEY, "-");
            /*$(".nav-forward").click(function() {
                $(this).hide();
            });*/
        }

        this.app.onPageInit('intro', (page) => {
            console.log("intro initialized");
            $("#btn-introform-submit").click(() => {
              const formData = this.app.formToData('#intro-form');
              this.storage.setItem(App.FIRST_VISIT_DATA, JSON.stringify(formData));
              this.mainView.router.loadPage('index.html');  
            });  
        });
    }
    
    onDeviceReady() {
        console.log("device ready");

    }
}

export default App;
