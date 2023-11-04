const express = require('express')
const app = express()
const port = 27017
//const router = express.Router()
const infoRouter = express.Router()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/superheroDB')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Mongo Database'))

const superheroInfoSchema = new mongoose.Schema({
    "id":Number,
    "name":String,
    "Gender":String,
    "Eye color":String,
    "Race":String,
    "Hair color":String,
    "Height":Number,
    "Publisher":String,
    "Skin color":String,
    "Alignment":String,
    "Weight":Number,
})
const superheroInfo = mongoose.model('superheroInformation', superheroInfoSchema)
module.exports = superheroInfo

const superheroPowerSchema= new mongoose.Schema({
    "hero_names": String,
    "Agility": String,
    "Accelerated Healing": String,
    "Lantern Power Ring": String,
    "Dimensional Awareness": String,
    "Cold Resistance": String,
    "Durability": String,
    "Stealth": String,
    "Energy Absorption": String,
    "Flight": String,
    "Danger Sense": String,
    "Underwater breathing": String,
    "Marksmanship": String,
    "Weapons Master": String,
    "Power Augmentation": String,
    "Animal Attributes": String,
    "Longevity": String,
    "Intelligence": String,
    "Super Strength": String,
    "Cryokinesis": String,
    "Telepathy": String,
    "Energy Armor": String,
    "Energy Blasts": String,
    "Duplication": String,
    "Size Changing": String,
    "Density Control": String,
    "Stamina": String,
    "Astral Travel": String,
    "Audio Control": String,
    "Dexterity": String,
    "Omnitrix": String,
    "Super Speed": String,
    "Possession": String,
    "Animal Oriented Powers": String,
    "Weapon-based Powers": String,
    "Electrokinesis": String,
    "Darkforce Manipulation": String,
    "Death Touch": String,
    "Teleportation": String,
    "Enhanced Senses": String,
    "Telekinesis": String,
    "Energy Beams": String,
    "Magic": String,
    "Hyperkinesis": String,
    "Jump": String,
    "Clairvoyance": String,
    "Dimensional Travel": String,
    "Power Sense": String,
    "Shapeshifting": String,
    "Peak Human Condition": String,
    "Immortality": String,
    "Camouflage": String,
    "Element Control": String,
    "Phasing": String,
    "Astral Projection": String,
    "Electrical Transport": String,
    "Fire Control": String,
    "Projection": String,
    "Summoning": String,
    "Enhanced Memory": String,
    "Reflexes": String,
    "Invulnerability": String,
    "Energy Constructs": String,
    "Force Fields": String,
    "Self-Sustenance": String,
    "Anti-Gravity": String,
    "Empathy": String,
    "Power Nullifier": String,
    "Radiation Control": String,
    "Psionic Powers": String,
    "Elasticity": String,
    "Substance Secretion": String,
    "Elemental Transmogrification": String,
    "Technopath/Cyberpath": String,
    "Photographic Reflexes": String,
    "Seismic Power": String,
    "Animation": String,
    "Precognition": String,
    "Mind Control": String,
    "Fire Resistance": String,
    "Power Absorption": String,
    "Enhanced Hearing": String,
    "Nova Force": String,
    "Insanity": String,
    "Hypnokinesis": String,
    "Animal Control": String,
    "Natural Armor": String,
    "Intangibility": String,
    "Enhanced Sight": String,
    "Molecular Manipulation": String,
    "Heat Generation": String,
    "Adaptation": String,
    "Gliding": String,
    "Power Suit": String,
    "Mind Blast": String,
    "Probability Manipulation": String,
    "Gravity Control": String,
    "Regeneration": String,
    "Light Control": String,
    "Echolocation": String,
    "Levitation": String,
    "Toxin and Disease Control": String,
    "Banish": String,
    "Energy Manipulation": String,
    "Heat Resistance": String,
    "Natural Weapons": String,
    "Time Travel": String,
    "Enhanced Smell": String,
    "Illusions": String,
    "Thirstokinesis": String,
    "Hair Manipulation": String,
    "Illumination": String,
    "Omnipotent": String,
    "Cloaking": String,
    "Changing Armor": String,
    "Power Cosmic": String,
    "Biokinesis": String,
    "Water Control": String,
    "Radiation Immunity": String,
    "Vision - Telescopic": String,
    "Toxin and Disease Resistance": String,
    "Spatial Awareness": String,
    "Energy Resistance": String,
    "Telepathy Resistance": String,
    "Molecular Combustion": String,
    "Omnilingualism": String,
    "Portal Creation": String,
    "Magnetism": String,
    "Mind Control Resistance": String,
    "Plant Control": String,
    "Sonar": String,
    "Sonic Scream": String,
    "Time Manipulation": String,
    "Enhanced Touch": String,
    "Magic Resistance": String,
    "Invisibility": String,
    "Sub-Mariner": String,
    "Radiation Absorption": String,
    "Intuitive aptitude": String,
    "Vision - Microscopic": String,
    "Melting": String,
    "Wind Control": String,
    "Super Breath": String,
    "Wallcrawling": String,
    "Vision - Night": String,
    "Vision - Infrared": String,
    "Grim Reaping": String,
    "Matter Absorption": String,
    "The Force": String,
    "Resurrection": String,
    "Terrakinesis": String,
    "Vision - Heat": String,
    "Vitakinesis": String,
    "Radar Sense": String,
    "Qwardian Power Ring": String,
    "Weather Control": String,
    "Vision - X-Ray": String,
    "Vision - Thermal": String,
    "Web Creation": String,
    "Reality Warping": String,
    "Odin Force": String,
    "Symbiote Costume": String,
    "Speed Force": String,
    "Phoenix Force": String,
    "Molecular Dissipation": String,
    "Vision - Cryo": String,
    "Omnipresent": String,
    "Omniscient": String,
})
const superheroPowerInfo = mongoose.model('superheroPowers', superheroPowerSchema)
module.exports = superheroPowerInfo

// Read superhero_info json file
const superheroData = JSON.parse(fs.readFileSync("../jsonFiles/superhero_info.json", 'utf-8'))
const superheroPowers = JSON.parse(fs.readFileSync("../jsonFiles/superhero_powers.json", 'utf-8'))

async function fileReaderInfo(file){
    try{
        for (const superH of superheroData){
            const newHero = new superheroInfo(superH);
            await newHero.save();
        }
    }catch(error){
        console.error(`Error loading JSON file: ${error.message}`);
        return null;
    }
}

async function fileReaderPowers(file){
    try{
        for (const superH of superheroPowers){
            const newHero = new superheroPowerInfo(superH);
            await newHero.save();
        }
    }catch(error){
        console.error(`Error loading JSON file: ${error.message}`);
        return null;
    }
}


// Setup serving front-end code
//app.use('/', express.static('client'))
app.use('/', express.static(path.join(__dirname, '..', 'client')));

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


infoRouter.route('/publishers')
    // Get all the publishers
    .get(async (req, res) => {
        //const publishers = superheroData.map((superhero) => superhero.Publisher) // All publishers
        //const filteredPublishers = publishers.filter((value, index) => publishers.indexOf(value) === index) // Remove any duplicates
        try{
            const allSuperheroes = await superheroInfo.find({}).select('-_id -__v')
            allPublishers = [] 
            for(let i = 0; i < allSuperheroes.length; i++){
                allPublishers.push(allSuperheroes[i].Publisher)
                console.log(allPublishers[i])
            }

            const uniquePublishers = [...new Set(allPublishers)]
            const filteredPublishers = uniquePublishers.filter((item) => item !== '')
            //console.log(allSuperheroes)
            // if (superhero){
            //     res.send(superhero)
            // }
            // else{
            //     res.status(404).send(`Superhero with ID: ${req.params.id} was not found!`)
            // }
            res.send(filteredPublishers)
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
        //const publishers = 
        //res.send(filteredPublishers)
    })

infoRouter.route('/pattern/:filter/:pattern/:n')
    // Get the search results for the specific pattern
    .get(async (req, res) => {
        try{
            filterValue = req.params.filter
            patternValue = req.params.pattern
            nValue = req.params.n
            let projection = {
                _id: 0, // Exclude _id field
                __v: 0 // Exclude v field
            };
            const searchCondition = await superheroInfo.aggregate([{$match: {[filterValue]: patternValue}}, {$limit: parseInt(nValue)}, {$project: projection}])
            
            if (searchCondition.length !== 0){
                res.send(searchCondition)
            }
            else if (filterValue === 'Height' || filterValue === 'Weight'){
                const searchCondition = await superheroInfo.aggregate([{$match: {[filterValue]: parseInt(patternValue)}}, {$limit: parseInt(nValue)}, {$project: projection}])
                res.send(searchCondition)
            }
            else{
                res.status(404).send(`Superhero with ID: ${filterValue} was not found!`)
            }
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })

infoRouter.route('/:id') 
    // Get info on a superhero based on their ID
    .get(async (req, res) => {
        try{
            const idValue = req.params.id
            const superhero = await superheroInfo.find({id: idValue}).select('-_id -__v')
            if (superhero){
                res.send(superhero)
            }
            else{
                res.status(404).send(`Superhero with ID: ${req.params.id} was not found!`)
            }
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })


infoRouter.route('/:id/powers')
    // Get the powers of the superhero based on their ID
    .get(async (req, res) => {
        try{
            const idValue = req.params.id
            const superhero = await superheroInfo.findOne({id: idValue}).select('-_id -__v')
            const superheroPower = await superheroPowerInfo.findOne({hero_names: superhero.name}).select('-_id -__v')

            // Temp array to store powers that are true
            truePowers = {
                hero_name: superhero.name
            }

            // Search for true powers and populate the array with them
            if (superheroPower){
                for (p in superheroPower){
                    if (superheroPower[p] === 'True'){
                        truePowers[p] = true
                    }
                }
                res.send(truePowers)
            }
            else{
                res.status(404).send(`Superhero powers with ID: ${req.params.id} was not found!`)
            }
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })


// Determine the base prefix for the router
app.use('/api/superheroes', infoRouter)

// Confirms the local server is running
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    //fileReaderInfo(superheroData)
    //fileReaderPowers(superheroPowers)
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