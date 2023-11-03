const express = require('express')
const app = express()
const port = 3000
//const router = express.Router()
const infoRouter = express.Router()
const fs = require('fs')
const path = require('path')

// Read superhero_info json file
const superheroData = JSON.parse(fs.readFileSync("jsonFiles/superhero_info.json", 'utf-8'))
const superheroPowers = JSON.parse(fs.readFileSync("jsonFiles/superhero_powers.json", 'utf-8'))

// Setup serving front-end code
app.use('/', express.static('client'))

// Setup middleware to do login
app.use((req, res, next) => { // For all routes
    console.log(`${req.method} request for ${req.url}`)
    next() // Keep going
})

// Parse data in body as JSON
infoRouter.use(express.json())

infoRouter.route('/') // Chain all the routes to the base prefix (/api/superheroes)
    // Get info on all the superheroes
    .get((req, res) => {
        res.send(superheroData)
    })


infoRouter.route('/:id') 
    // Get info on a superhero based on their 
    .get((req, res) => {
        const superhero = superheroData.find(h => h.id === parseInt(req.params.id))
        if (superhero){
            res.send(superhero)
        }
        else{
            res.status(404).send(`Superhero with ID: ${req.params.id} was not found!`)
        }
    })


infoRouter.route('/:id/powers')

    .get((req, res) => {
        const superhero = superheroData.find(h => h.id === parseInt(req.params.id))
        const superheroPower = superheroPowers.find(h => h.hero_names === superhero.name)

        if (superheroPower){
            res.send(superheroPower)
        }
        else{
            res.status(404).send(`Superhero powers with ID: ${req.params.id} was not found!`)
        }
    })

// Determine the base prefix for the router
app.use('/api/superheroes', infoRouter)

// Confirms the local server is running
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
//-------------------------------------------------------------------------------------------------------------------------------------------
/*
const parts = [
    {id: 100, name: 'Belt', colour: 'brown', stock: 0}, 
    {id: 101, name: 'Clip', colour: 'brown', stock: 0}, 
    {id: 102, name: 'Belt', colour: 'red', stock: 0}, 
    {id: 103, name: 'Hat', colour: 'Purple', stock: 0}, 
]

//Setup serving front-end code
app.use('/', express.static('client'))

// Setup middleware to do loggin
app.use((req, res, next) => { // For all routes
    console.log(`${req.method} request for ${req.url}`)
    next() // Keep going
})

// Parse data in body as JSON
router.use(express.json())

router.route('/') // Chain all the routes to the base prefix
    // Get a list of parts
    .get((req, res) => {
        res.send(parts)
    })

    // Create new part
    .post((req, res) => {
        const newpart = req.body
        newpart.id = 100 + parts.length

        // Send a bad request if the name field is not there
        if (newpart.name){
            parts.push(newpart)
            res.send(newpart)
        }
        else{
            res.status(400).send('Missing name')
        }
    })

router.route('/:id')
    // Get details of a given part
    .get((req, res) => {
        const part = parts.find(p => p.id === parseInt(req.params.id))
        if (part){
            res.send(part)
        }
        else{
            res.status(404).send(`Part ${req.params.id} was not found!`)
        }
    })

    // Create/replace part data for a given ID
    .put((req, res) => {
        const newpart = req.body
        console.log("Part: ", newpart)
    
        // Add ID field
        newpart.id = parseInt(req.params.id)
    
        // Replace the part with the new one
        const part = parts.findIndex(p => p.id === parseInt(newpart.id))
    
        if (part < 0){
            console.log('Creating new part')
            parts.push(req.body)
        }
        else{
            console.log('Modifying part ', req.params.id)
            parts[part] = req.body
        }
    
        res.send(newpart)
    })

    // Update stock level
    .post((req, res) => {
        const newpart = req.body
        console.log("Part: ", newpart)
    
        // Find the part
        const part = parts.findIndex(p => p.id === parseInt(req.params.id))
    
        if (part < 0){ // Not found
            res.status(404).send(`Part ${req.params.id} not found`)
        }
        else{
            console.log('Changing stock for ', req.params.id)
            parts[part].stock += parseInt(req.body.stock) // Stock property must exist
            res.send(parts[part])
        }
    })


app.use('/api/parts', router)

// Confirms the local server is running
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
*/