// SYSTEM FLOW Store -> Save in Local Storage your Input data
(()=> {

    class Stores {
        constructor(elem) {
            this.store = elem;
            this.storeName = elem.dataset.sysflowStore;
            this.assignEvents();
        }

        assignEvents(){
            console.log(this.storeName);
        }
    }

    const storages = document.querySelectorAll('[data-sysflow-store]');

    if(storages.length) {
        storages.forEach(store => {
            new Stores(store);
        })
    }

})();