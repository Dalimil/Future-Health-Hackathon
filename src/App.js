
class App {

    static get FIRST_VISIT_KEY() {
        return "storage-first-visit";
    }

    static get FIRST_VISIT_DATA(){
        return "storage-first-visit-data";
    }

    static get MSG_DATA() {
        return "storage-msg-data";
    }
    static get MSG_NAME() {
        return "storage-msg-name";
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

        this.skeletonInitialized = false;
        this.onMessagesInit();
        this.onHomeInit();
        this.checkFirstVisit();
        this.onResultsInit();
        this.onSkeletonInit();
    }   

    onResultsInit() {


        this.app.onPageInit('results', (page) => {
            $(".swipeout-solved").click((e) => {
                $(e.target).parent().parent().css("background-color", "lightgreen");
                $(".swipeout-content").css("transform", "");
                $(".swipeout-actions-left > *").css("transform", "");
                this.app.alert(` 
                    <select id="rating"> 
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>`, "Rating");
                
                $('#rating').barrating({
                theme: 'fontawesome-stars'
                    });
            });

            $("#tab-x1 a.item-link").click((e) => {
                const imgurl = ($(e.target).parent().parent().parent().find("img")[0].src);
                const msgtext = ($(e.target).parent().parent().parent().find(".item-title").text());
                console.log(msgtext);
                this.storage.setItem(App.MSG_DATA, imgurl);
                this.storage.setItem(App.MSG_NAME, msgtext);
            });
            $("#tab-x2 a.item-link").click((e) => {
                const imgurl = ($(e.target).parent().parent().find("img")[0].src);
                const msgtext = ($(e.target).parent().parent().find(".item-title").text());
                console.log(msgtext);
                this.storage.setItem(App.MSG_DATA, imgurl);
                this.storage.setItem(App.MSG_NAME, msgtext);
            });
        });
    }

    onHomeInit() {
        this.app.onPageInit('home', (page) => {
            this.onSkeletonInit();

            const formData = JSON.parse(this.storage.getItem(App.FIRST_VISIT_DATA));
            $("#main-prof-name").text(formData.name);
            $("#prof-gender").text(formData.gender);
            $("#prof-age").text(formData.age);
            $("#prof-location").text(formData.location);
            formData["physical-ill"].forEach(name => {
                $("#interest-chips").append(`<div class="chip"><div class="chip-label">${name}</div></div>`);
            });
            formData["mental"].forEach(name => {
                $("#interest-chips").append(`<div class="chip"><div class="chip-label">${name}</div></div>`);
            });
            formData["internal"].forEach(name => {
                $("#interest-chips").append(`<div class="chip"><div class="chip-label">${name}</div></div>`);
            });

            $("#tab1 a.item-link").click((e) => {
                const imgurl = ($(e.target).parent().parent().find("img")[0].src);
                const msgtext = ($(e.target).parent().parent().find(".item-title").text());
                console.log(msgtext);
                this.storage.setItem(App.MSG_DATA, imgurl);
                this.storage.setItem(App.MSG_NAME, msgtext);
            });

        });
    }

    onSkeletonInit() {
        console.log("skel init");

        $(".skeleton-view")
            .scrollTop($("body").height()/2)
            .scrollLeft($("body").width()/4);

        $("#skeleton-external").click(() => {
            $(".skeleton-view .main").attr("src", "img/external.png");
        });
        $("#skeleton-internal").click(() => {
            $(".skeleton-view .main").attr("src", "img/internal.png");
        });

        const self = this;
        $(".skeleton-view .main").click(function(e){
            console.log(e.offsetX, e.offsetY);
            console.log(e.clientX, e.clientY);
            $(".skeleton-view .pain").css({
                top: (e.clientY - 25) + "px",
                left: (e.clientX - 25)+ "px"
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

            const imgurl = localStorage.getItem(App.MSG_DATA);
            const msgname = localStorage.getItem(App.MSG_NAME);
            if(imgurl != null) {
                $("#swap-msg-name").text(msgname);
                $("#swap-msg-img").attr("src", imgurl);
            }

            const formData = JSON.parse(localStorage.getItem(App.FIRST_VISIT_DATA));
            $("#msg-my-name").text(formData.name);

            $(".chat-discussion").animate({ scrollTop: "3000000px" });

            $("#message-submit").click(() => {
                const textval = $("#message-textarea").val();
                if (!textval) return;

                const minutes = new Date().getMinutes().toString();

                const tt = new Date().getHours() + ":" + (minutes.length == 1 ? ("0" + minutes) : minutes);

                $(".chat-discussion").append(
                    `<div class="chat-message left">
                        <img class="message-avatar" src="img/avatar.png" alt=""/>
                        <div class="message">
                            <a class="message-author" href="chat_view.html#">${formData.name}</a>
                            <span class="message-date">${tt}</span>
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

        this.app.onPageInit('intro', (page) => {
            console.log("intro initialized");
            $("#btn-introform-submit").click(() => {
              const formData = this.app.formToData('#intro-form');
              this.storage.setItem(App.FIRST_VISIT_DATA, JSON.stringify(formData));
              this.mainView.router.loadPage('index.html');  
            });  

            this.introSwiper = this.app.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
        });

        if (true || this.storage.getItem(App.FIRST_VISIT_KEY) == null) {
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

		document.addEventListener("backbutton", () => {});

    }
}

export default App;
