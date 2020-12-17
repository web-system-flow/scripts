// SYSTEM FLOW Showing and Hiding Container for Given Period
(()=> {
    
    class Temporals{
        constructor(elem){
            this.temporal = elem;
            this.startDate = new Date(elem.dataset.sysflowTemporalStart).getTime();
            this.endDate = new Date(elem.dataset.sysflowTemporalEnd).getTime();
            this.assignEvents();
        }

        assignEvents(){
            this.hideTemporal();
        }

        hideTemporal(){
            const now = new Date().getTime();
            if (this.endDate<now||this.startDate>now){
                this.temporal.style.display="none";
            }
        }
    }

    const temporals = document.querySelectorAll('[data-sysflow-temporal]');

    if(temporals) {
        temporals.forEach(temporal => {
            new Temporals(temporal);
        })
    }

})();