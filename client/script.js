document.getElementById('addSuperhero').addEventListener('click', addListOfHeros)
document.getElementById('refreshBtn').addEventListener('click', refresh)
document.getElementById('searchDataBtn').addEventListener('click', getSearchCriteria)
document.getElementById('newListBtn').addEventListener('click', createNewList)
document.getElementById('displayListBtn').addEventListener('click', displayList)
document.getElementById('deleteListBtn').addEventListener('click', deleteList)
document.getElementById('sortDropDown').addEventListener('change', sortList)
refresh()

function refresh(){
    fetch('/api/superheroes/allTables')
    .then(res => res.json())
    .then(data => {
        
        const dropDown = document.getElementById('tableDropDown')
        deletedValue1 = 'superheroinformations'
        deleteValue2 = 'superheropowers'

        newArray = data
        newArray = newArray.filter((table) => table !== 'superheroinformations')
        newArray = newArray.filter((table) => table !== 'superheropowers')

        while(dropDown.options.length > 0){
            dropDown.remove(0)
        }

        for (index in newArray){
            const newOption = document.createElement('option')
            newOption.value = newArray[index]
            newOption.textContent = newArray[index]
            dropDown.appendChild(newOption)
        }

        // Remove current display message
        const results = document.getElementById('results')
        while(results.firstChild){
            results.removeChild(results.firstChild)
        }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

function getSearchCriteria(){
    dropDown = document.getElementById('criteraDropDown').value
    searchValue = document.getElementById('searchValue').value
    numberOfSearchesValue = document.getElementById('numberInput').value

    if ((searchValue === '' || numberOfSearchesValue === '') && dropDown !== 'Publisher' && dropDown !== 'Powers'){
        const results = document.getElementById('results')
        while(results.firstChild){
            results.removeChild(results.firstChild)
        }

        const preElement = document.createElement('pre')
        preElement.appendChild(document.createTextNode("No search value entered"))
        results.appendChild(preElement)
    }
    else if ((searchValue === '' || numberOfSearchesValue === '') && dropDown === 'Publisher' && dropDown !== 'Powers'){
        fetch('/api/superheroes/publishers')
        .then(res => res.json())
        .then(data => {
            const results = document.getElementById('results')
            while(results.firstChild){
                results.removeChild(results.firstChild)
            }

            const preElement = document.createElement('pre')
            preElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)))
            results.appendChild(preElement)
        })
    }
    else{
        if (dropDown === 'name' || dropDown === 'Race' || dropDown === 'Publisher'){
            fetch(`/api/superheroes/pattern/${dropDown}/${searchValue}/${numberOfSearchesValue}`)
            .then(res => res.json())
            .then(data => {
                try{
                    const results = document.getElementById('results')
                    while(results.firstChild){
                        results.removeChild(results.firstChild)
                    }
        
                    const preElement = document.createElement('pre')
    
                    tempArray = []
                    if (data === 'No results' || data.length === 0){
                        preElement.appendChild(document.createTextNode("No results"))
                    }
                    else{
                        var fetchPromises = data.map(item => {
                            return fetch(`/api/superheroes/id/${item.id}/powers`)
                              .then(res => res.json())
                              .then(powersData => {
                                tempArray.push(powersData)
                              });
                        });
    
                        Promise.all(fetchPromises)
                        .then(() => {
                            preElement.appendChild(document.createTextNode(JSON.stringify(tempArray, null, 2)))
                            results.appendChild(preElement)
                        });
                    }
                }
                catch(e){
                    const results = document.getElementById('results')
                    while(results.firstChild){
                        results.removeChild(results.firstChild)
                    }
                    const preElement = document.createElement('pre')
                    preElement.appendChild(document.createTextNode("No results"))
                    results.appendChild(preElement);
                }
            })
        }
        else if (dropDown === 'Powers'){
            //SEARCH BY POWER CODE GOES HERE
            const nameArray = []
            const idArray = []
            const heros = []
            
            fetch('/api/superheroes/superheropowers/getAll')
            .then(res => res.json())
            .then(data => {
                
                for (let i = 0; i < data.length; i++){
                    if (data[i].hasOwnProperty(searchValue)){
                        nameArray.push(data[i].hero_names)
                    }
                }
                
                if (nameArray.length > 0){
                    fetch('/api/superheroes/superheroinformations/getAll')
                    .then(res => res.json())
                    .then(data => {
                        
                        //console.log(nameArray[1])
                        //console.log(data[3].name)
                        const fetchPromises = [];
                        for (let j = 0; j < nameArray.length; j++){
                        
                            for (let i = 0; i < data.length; i++){
                                
                                if (nameArray[j] === data[i].name){
                                    idArray.push(data[i].id)
                                    break
                                }
                            }
                        }
                        //console.log(idArray)
                        // for (let i = 0; i < idArray.length; i++){
                        //     fetch(`api/superheroes/id/${idArray[i]}/powers`)
                        //     .then(res => res.json())
                        //     .then (data => {
                        //         heros.push(data)
                        //     })
                        // }
                        // console.log(heros)

                        for (let i = 0; i < idArray.length; i++) {
                            fetchPromises.push(
                              fetch(`/api/superheroes/id/${idArray[i]}/powers`)
                                .then(res => res.json())
                            )
                        }

                        Promise.all(fetchPromises)
                        .then(dataArray => {
                            heros.push(...dataArray);
                            const results = document.getElementById('results')
                            while(results.firstChild){
                                results.removeChild(results.firstChild)
                            }
                            const preElement = document.createElement('pre')
                            preElement.appendChild(document.createTextNode(JSON.stringify(heros, null, 2)));
                            results.appendChild(preElement);
                        })
                    })
                    
                }
            })
        }
    }
}

function createNewList(){
    const newName = document.getElementById('newListNameInput').value
    const encodedNewNameInput = encodeURIComponent(newName);

    fetch(`/api/superheroes/${encodedNewNameInput}`, {
        method: 'POST', 
        headers: {'Content-Type' : 'application/json'},
    })
    .then((res => {
        if (res.ok){
            res.text()
            .then(data => {
                const results = document.getElementById('results')
                while(results.firstChild){
                    results.removeChild(results.firstChild)
                }
                const preElement = document.createElement('pre')
                preElement.appendChild(document.createTextNode(data))
                results.appendChild(preElement)

            })
        }
    }))
}

function addListOfHeros(){
    const tableName = document.getElementById('tableDropDown').value
    const superheroIds = document.getElementById('idList').value.split(',').map(Number);

    // console.log('Table name is: ', tableName)
    // console.log('List of IDs: ', listOfIDs)

    fetch(`/api/superheroes/${tableName}`, {
        method: 'PUT', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(superheroIds)
    })
    .then((res => {
        if (res.ok){
            res.text()
            .then((data) => {
                const results = document.getElementById('results')
                while(results.firstChild){
                    results.removeChild(results.firstChild)
                }
                const preElement = document.createElement('pre')
                preElement.appendChild(document.createTextNode(data))
                results.appendChild(preElement)
            })
            .catch(err => console.log('Failed to get json object'))
        }
        else{
            console.log('Error: ', res.status)
        }
    }))
    .catch()
}

function displayList(){
    const tableName = document.getElementById('tableDropDown').value

    fetch(`/api/superheroes/${tableName}/getAll`)
    .then(res => res.json())
    .then(data => {
        const results = document.getElementById('results')
        while(results.firstChild){
            results.removeChild(results.firstChild)
        }

        preElement = document.createElement('pre')
        
        if (data.length === 0){
            preElement.appendChild(document.createTextNode("No results found"))
        }
        else{
            preElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)))
        }

        results.appendChild(preElement)
    })
}

function deleteList(){
    const tableName = document.getElementById('tableDropDown').value

    fetch(`/api/superheroes/${tableName}/delete`, {
        method: 'DELETE', 
        headers: {'Content-Type' : 'application/json'},
    })
    .then((res => {
        if (res.ok){
            res.text()
            .then(data => {
                const results = document.getElementById('results')
                while(results.firstChild){
                    results.removeChild(results.firstChild)
                }
                const preElement = document.createElement('pre')
                preElement.appendChild(document.createTextNode(data))
                results.appendChild(preElement)
            })
        }
    }))
}

function sortList(){
    const tableName = document.getElementById('tableDropDown').value
    const selectedOption = document.getElementById('sortDropDown').value
    fetch(`/api/superheroes/${tableName}/getAll`)
    .then(res => res.json())
    .then(data => {
        if (selectedOption === "name") {
            //NAME SORT
            data.sort((a, b) => {
                const valueA = a['name'].toLowerCase();
                const valueB = b['name'].toLowerCase();

                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            })

            const results = document.getElementById('results')
            while(results.firstChild){
                results.removeChild(results.firstChild)
            }
            const preElement = document.createElement('pre')
            preElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)));
            results.appendChild(preElement);

        } 
        else if (selectedOption === "Race") {
            //RACE SORT
            data.sort((a, b) => {
                const valueA = a['Race'].toLowerCase();
                const valueB = b['Race'].toLowerCase();

                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            })

            const results = document.getElementById('results')
            while(results.firstChild){
                results.removeChild(results.firstChild)
            }
            const preElement = document.createElement('pre')
            preElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)));
            results.appendChild(preElement);
        } 
        else if (selectedOption === "Publisher") {
            //PUBLISHER SORT
            data.sort((a, b) => {
                const valueA = a['Publisher'].toLowerCase();
                const valueB = b['Publisher'].toLowerCase();

                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            })

            const results = document.getElementById('results')
            while(results.firstChild){
                results.removeChild(results.firstChild)
            }
            const preElement = document.createElement('pre')
            preElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)));
            results.appendChild(preElement);
        }
        else if (selectedOption === "Powers") {
            //POWER SORT
            const temp = []
            const sorted = []
            const sortedData = []
            let counter = 0

            data.forEach(hero => {
                allValues = Object.values(hero)
                for (let i = 0; i < allValues.length; i++){
                    
                    if (allValues[i] === 'True'){
                        counter++
                    }
                }
                temp.push(counter)
                counter = 0
            });
            
            while (temp.length > 0) {
                let max = temp[0];
                let dataMax = data[0]
                let maxIndex = 0;
            
                for (let i = 1; i < temp.length; i++) {
                    if (temp[i] > max) {
                        max = temp[i];
                        dataMax = data[i]
                        maxIndex = i;
                    }
                }
            
                sorted.push(max);
                sortedData.push(dataMax)
                temp.splice(maxIndex, 1);
                data.splice(maxIndex, 1)
            }

            const results = document.getElementById('results')
            while(results.firstChild){
                results.removeChild(results.firstChild)
            }
            const preElement = document.createElement('pre')
            preElement.appendChild(document.createTextNode(JSON.stringify(sortedData, null, 2)));
            results.appendChild(preElement);
        }
    })
}

function countTrueProperties(obj) {
    return Object.values(obj).filter(value => value === 'True');
}

/*-------------------------------------------------------------------------------------------------------------------------------------
document.getElementById('get-inventory').addEventListener('click', getInventory)
document.getElementById('addItem').addEventListener('click', addInventory)



function getInventory(){
    fetch("/api/parts")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const list = document.getElementById('inventory')

        // Clear the list
        while(list.hasChildNodes()){
            list.removeChild(list.firstChild)
        }

        // Add each item to the list
        data.forEach(e => {
            const item = document.createElement('li')
            item.appendChild(document.createTextNode(`${e.name} (${e.colour}) Qty: ${e.stock}`))
            list.appendChild(item)
        });
    })
    
}

function addInventory(){
    const newpart = {
        name : document.getElementById('name').value, 
        colour : document.getElementById('colour').value, 
        stock : document.getElementById('stock').value 
    }
    console.log(newpart)

    fetch('/api/parts', {
        method: 'POST', 
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(newpart)
    })
    .then(res => {
        if (res.ok){
            res.json()
            .then(data => {
                getInventory()
                console.log(data)
                document.getElementById('status').innerText = `Created part ${data.id}: ${data.name}`
            })
            .catch(err => console.log('Failed to get json object'))
        }
        else{
            console.log('Error: ', res.status)
            document.getElementById('status').textContent = 'Failed to add item'
        }
    })
    .catch()
}

*/