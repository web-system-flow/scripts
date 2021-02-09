// SYSTEM FLOW Store -> Save in Local Storage your Input data
(()=> {

    class Stores {
        constructor(elem) {
            this.store = elem;
            this.storeName = elem.dataset.sysflowStore;
            this.form = elem.querySelector("form");
            this.inputs = elem.querySelectorAll("input");
            this.data = {};
            this.assignEvents();
        }

        assignEvents(){
            this.listenToInputs();
        }

        listenToInputs(){
            this.inputs.forEach(i=> {
                i.addEventListener("change",this.getData.bind(this))
            })
        }

        getData(){
            this.data = {};
            this.form.querySelectorAll("input").forEach(i => {
                this.data[i.name] = i.value;
            })
            console.log(this.data)
        }

        readData(){
            localStorage.getItem(this.storeName);
        }

        saveData(){
            localStorage.setItem(this.storeName, this.data);
        }
    }

    const storages = document.querySelectorAll('[data-sysflow-store]');

    if(storages.length) {
        storages.forEach(store => {
            new Stores(store);
        })
    }

})();