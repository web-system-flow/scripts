// SYSTEM FLOW Add Attribute to Form by Url Query
(()=> {

    class Query {
        constructor(initialQuery) {
            this.query = [];

            if (initialQuery) {
                this.parse(initialQuery);
            }
        }

        parse(queryString) {
            const parts = (queryString.charAt(0) === "?"
                ? queryString.slice(1)
                : queryString
            ).split("&");

            parts.forEach(part => {
                const [key, val] = part.split("=");
                this.set(key, decodeURIComponent(val));
            });
        }

        get(keyToCheck) {
            const item = this.query.find(({ key }) => key === keyToCheck);

            return item ? item.value : null;
        }

        set(keyToSet, value) {
            this.remove(keyToSet);
            this.query.push({ key: keyToSet, value });
        }

        remove(keyToRemove) {
            this.query = this.query.filter(({ key }) => key !== keyToRemove);
        }
    }


    const queries = document.querySelectorAll('[data-sysflow-query-form]');

    if(queries.length) {

        const query = new Query(window.location.search);

        queries.forEach(q => {

            const queryKey = q.dataset.sysflowQueryForm;
            const queryValue = query.get(queryKey);

            //add hidden input to the form
            if(queryValue){
                const hiddenInput = document.createElement("input");
                hiddenInput.type="text";
                hiddenInput.name=queryKey;
                hiddenInput.value=queryValue;
                hiddenInput.className="invisible";
                q.appendChild(hiddenInput);
            }
            
        })

    }

})();