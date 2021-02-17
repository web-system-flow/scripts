(()=> {
    class Cookies {
        constructor(elem) {
            this.KEY_COOKIE = "SYSFLOW.COOKIE";

            this.cookie = elem;

            this.url = elem.dataset.sysflowCookie;

            this.acceptBtn = this.cookie.querySelector("[data-sysflow-cookie-accept]");

            this.cookieStatus = localStorage.getItem(this.KEY_COOKIE);

            this.assignEvents();
        }

        assignEvents() {
            if (!this.cookieStatus) {
                this.appendCookie();
            } else {
                this.removeCookie();
            }
        }

        appendCookie() {
            setTimeout(() => {
                this.cookie.classList.remove("invisible");
            }, 100);
            this.acceptBtn.addEventListener("click", this.acceptCookie.bind(this));
        }

        removeCookie(){
            this.cookie.style.display = "none";
        }

        acceptCookie() {
            localStorage.setItem(this.KEY_COOKIE, true);
            this.removeCookie();
            if(this.url!=="0" && this.url!=="false"){
                this.sendWebhook();
            } 
        }

        sendWebhook() {
            const dataToSent = {
                location: window.location.href
            };
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", this.url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(dataToSent));
        }

    }

    const cookie = document.querySelector('[data-sysflow-cookie]');
    if (cookie) {
        new Cookies(cookie);
    }

})();