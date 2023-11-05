document.getElementById('addSuperhero').addEventListener('click', addListOfHeros)

function addListOfHeros(){
    const tableName = document.getElementById('tableName').value
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