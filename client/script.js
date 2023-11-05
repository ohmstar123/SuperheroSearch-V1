document.getElementById('addSuperhero').addEventListener('click', addListOfHeros)
document.getElementById('refreshBtn').addEventListener('click', refresh)
document.getElementById('nameBtn').addEventListener('click', getName)
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
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

function getName(){
    searchValue = document.getElementById('nameInput').value

    fetch(`/api/superheroes/name/${searchValue}`)
    .then(res => res.json())
    .then(data => {
        

        //console.log(data)
        const results = document.getElementById('results')
        while(results.firstChild){
            results.removeChild(results.firstChild)
        }

        const preElement = document.createElement('pre')
        preElement.appendChild(document.createTextNode(JSON.stringify(data, null, 2)))
        results.appendChild(preElement)

    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
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
            res.json()
            .then((data) => {
                console.log(data)
            })
            .catch(err => console.log('Failed to get json object'))
        }
        else{
            console.log('Error: ', res.status)
        }
    }))
    .catch()
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