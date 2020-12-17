// SYSTEM FLOW Time Counter
(()=> {

    class Counters{
        constructor(elem){
            this.counter = elem;
            this.endDate = new Date(elem.dataset.sysflowCounter).getTime();
            this.days = 0;
            this.hours = 0;
            this.mins = 0;
            this.secs = 0;
            this.daysField = elem.querySelector("[data-sysflow-counter-days]");
            this.daysValue = this.daysField ? this.daysField.querySelector("[data-sysflow-counter-days-value]") : null;
            this.hoursField = elem.querySelector("[data-sysflow-counter-hours]");
            this.hoursValue = this.hoursField ? this.hoursField.querySelector("[data-sysflow-counter-hours-value]") : null;
            this.minsField = elem.querySelector("[data-sysflow-counter-mins]");
            this.minsValue = this.minsField ? this.minsField.querySelector("[data-sysflow-counter-mins-value]") : null;
            this.secsField = elem.querySelector("[data-sysflow-counter-secs]");
            this.secsValue = this.secsField ? this.secsField.querySelector("[data-sysflow-counter-secs-value]") : null;
            this.assignEvents();
        }
    
        assignEvents() {
            this.startCounter();
        }
    
        startCounter() {
            this.tick();
        }
    
        tick() {
            const now = new Date().getTime();
            const t = this.endDate - now;
    
            if(t<1000){
                this.counter.style.display = "none";
                return
            }
    
            this.days = Math.floor(t / (1000 * 60 * 60 * 24));
            this.hours = Math.floor(
                (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            this.mins = Math.floor(
                (t % (1000 * 60 * 60)) / (1000 * 60)
            );
            this.secs = Math.floor((t % (1000 * 60)) / 1000);
            
            if(this.days>0 && this.daysValue){
                this.daysValue.innerText = this.days;
            } else if(this.daysField){
                this.daysField.style.display = "none";
            }
    
            if((this.days>0 || this.hours>0) && this.hoursValue){
                this.hoursValue.innerText = this.hours;
            } else if(this.hoursField){
                this.hoursField.style.display = "none";
            }
    
            if((this.days>0 || this.hours>0 || this.mins>0) && this.minsValue){
                this.minsValue.innerText = this.mins;
            } else if(this.minsField){
                this.minsField.style.display = "none";
            }
    
            if(this.secsValue){
                this.secsValue.innerText = this.secs;
            } else if(this.secsField){
                this.secsField.style.display = "none";
            }
    
            setTimeout(this.tick.bind(this), 1000);
        }
    }

    const counters = document.querySelectorAll('[data-sysflow-counter]');

    if(counters) {
        counters.forEach(counter => {
            new Counters(counter);
        })
    }
    
})();
