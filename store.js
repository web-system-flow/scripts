// SYSTEM FLOW Store -> Save in Local Storage your Input data
(()=> {

    class Stores {
        constructor(elem) {
            this.store = elem;
            this.storeName = elem.dataset.sysflowStore;
            this.form = elem.querySelector("form");
            this.inputs = this.form.querySelectorAll("input");
            this.data = {};
            this.savedData = localStorage.getItem(this.storeName);
            this.assignEvents();
        }

        assignEvents(){
            this.getSavedData();
            this.listenToInputs();
        }

        listenToInputs(){
            this.inputs.forEach(i=> {
                i.addEventListener("keyup",this.getInputData.bind(this))
            })
        }

        getInputData(){
            this.data = {};
            this.inputs.forEach(i => {
                this.data[i.name] = i.value;
            })
            this.saveData();
        }

        getSavedData(){
            if(this.savedData){
                this.data = JSON.parse(this.savedData);
                this.inputs.forEach(i => {
                    let saved = this.data[i.name];
                    if(saved) i.value = saved;
                })
            }
        }

        saveData(){
            localStorage.setItem(this.storeName, JSON.stringify(this.data));
        }
    }

    const storages = document.querySelectorAll('[data-sysflow-store]');

    if(storages.length) {
        storages.forEach(store => {
            new Stores(store);
        })
    }

})();