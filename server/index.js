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

const newHeroData = new mongoose.Schema({
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

infoRouter.route('/:tableName/getAll')
    // Get a list of all the information by a given list
    .get (async (req, res) => {
        
            const tableName = req.params.tableName;
            const newHeroInfo = mongoose.model(`${tableName}`, newHeroData, `${tableName}`);
            const allIds = await newHeroInfo.find({}).select("-_id -__v").lean();
    
            const newList = [];
    
            for (const superhero of allIds) {
                console.log(superhero)
                const superHeroPowers = {};
                for (const index in superhero) {
                    console.log(superhero[index])
                    if (superhero[index] !== "False") {
                        superHeroPowers[index] = superhero[index];
                    }
                }
                newList.push(superHeroPowers);
            }
    
            if(!allIds){
                return res.status(404).json({error:`No heroes in ${tableName} server`});
            }
            res.status(200).json(newList);
        
    
        
    })

infoRouter.route('/') // Chain all the routes to the base prefix (/api/superheroes)
    // Get info on all the superheroes
    .get(async (req, res) => {
        const allSuperheroes = await superheroInfo.find({}).select('-_id -__v')
        res.send(allSuperheroes)
    })

infoRouter.route('/allTables')
    // Get all the super
    .get(async (req, res) => {
        try{
            const collections = await mongoose.connection.db.listCollections().toArray();
            const collectionNames = collections.map((c) => c.name);
            res.send(collectionNames)
                
        }
        catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
        
    })

infoRouter.route('/:tableName/delete')
    .delete(async (req, res) => {

        //const modelNames = mongoose.modelNames();
        //const collectionNames = modelNames.map(modelName => mongoose.model(modelName).collection.name);

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map((c) => c.name);

        tableName = req.params.tableName
        try{
            if (collectionNames.includes(tableName)){
                mongoose.connection.db.collection(tableName).drop()
                res.send('table deleted')
            }
            else{
                res.status(404).send('Database with that name already exists')
            }
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })

infoRouter.route('/:tableName')
    //Get the list of superhero IDs for a given list
    .get(async(req, res) => {
        tableName = req.params.tableName
        newHeroInfo = mongoose.model(tableName, newHeroData, tableName)
        const allIds = await newHeroInfo.find({}).select('id -_id')
        try{
            if (allIds){
                res.send(allIds)
            }
            else{
                res.status(404).send('table contains no results')
            }
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })

    // Create new table in the Mongo database
    .post(async (req, res) => {
        tableName = req.params.tableName

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map((c) => c.name);
        
        try{
            if (!collectionNames.includes(tableName)){
                newHeroInfo = mongoose.model(tableName, newHeroData, tableName)
                module.exports = newHeroInfo
                res.send('New table created')
            }
            else{
                res.status(404).send('Database with that name already exists')
            }
        }
        catch (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
        
    })

    // Insert new info into a specific table
    .put(async (req, res) => {
        const superheroIds = req.body
        const tableName = req.params.tableName

        const newHeroInfo = mongoose.model(tableName, newHeroData, tableName)

        await db.collection(tableName).deleteMany({});
        
        superheroIds.forEach(async idValue => {
            try{
                const superhero = await superheroInfo.findOne({id: idValue}).select('-_id -__v')
                const powers = await superheroPowerInfo.findOne({hero_names: superhero.name}).select('-_id -__v -hero_names')
    
                const newSuperData = new newHeroInfo({
                    id: superhero.id,
                    name: superhero.name,
                    Gender: superhero.Gender,
                    'Eye color': superhero['Eye color'],
                    Race: superhero.Race,
                    'Hair color': superhero['Hair color'],
                    Height: superhero.Height,
                    Publisher: superhero.Publisher,
                    'Skin color': superhero['Skin color'],
                    Alignment: superhero.Alignment,
                    Weight: superhero.Weight,
                    Agility: powers.Agility,
                    'Accelerated Healing': powers['Accelerated Healing'],
                    'Lantern Power Ring': powers['Lantern Power Ring'],
                    'Dimensional Awareness': powers['Dimensional Awareness'],
                    'Cold Resistance': powers['Cold Resistance'],
                    Durability: powers.Durability,
                    Stealth: powers.Stealth,
                    'Energy Absorption': powers['Energy Absorption'],
                    Flight: powers.Flight,
                    'Danger Sense': powers['Danger Sense'],
                    'Underwater breathing': powers['Underwater breathing'],
                    Marksmanship: powers.Marksmanship,
                    'Weapons Master': powers['Weapons Master'],
                    'Power Augmentation': powers['Power Augmentation'],
                    'Animal Attributes': powers['Animal Attributes'],
                    Longevity: powers.Longevity,
                    Intelligence: powers.Intelligence,
                    'Super Strength': powers['Super Strength'],
                    Cryokinesis: powers.Cryokinesis,
                    Telepathy: powers.Telepathy,
                    'Energy Armor': powers['Energy Armor'],
                    'Energy Blasts': powers['Energy Blasts'],
                    Duplication: powers.Duplication,
                    'Size Changing': powers['Size Changing'],
                    'Density Control': powers['Density Control'],
                    Stamina: powers.Stamina,
                    'Astral Travel': powers['Astral Travel'],
                    'Audio Control': powers['Audio Control'],
                    Dexterity: powers.Dexterity,
                    Omnitrix: powers.Omnitrix,
                    'Super Speed': powers['Super Speed'],
                    Possession: powers.Possession,
                    'Animal Oriented Powers': powers['Animal Oriented Powers'],
                    'Weapon-based Powers': powers['Weapon-based Powers'],
                    Electrokinesis: powers.Electrokinesis,
                    'Darkforce Manipulation': powers['Darkforce Manipulation'],
                    'Death Touch': powers['Death Touch'],
                    Teleportation: powers.Teleportation,
                    'Enhanced Senses': powers['Enhanced Senses'],
                    Telekinesis: powers.Telekinesis,
                    'Energy Beams': powers['Energy Beams'],
                    Magic: powers.Magic,
                    Hyperkinesis: powers.Hyperkinesis,
                    Jump: powers.Jump,
                    Clairvoyance: powers.Clairvoyance,
                    'Dimensional Travel': powers['Dimensional Travel'],
                    'Power Sense': powers['Power Sense'],
                    Shapeshifting: powers.Shapeshifting,
                    'Peak Human Condition': powers['Peak Human Condition'],
                    Immortality: powers.Immortality,
                    Camouflage: powers.Camouflage,
                    'Element Control': powers['Element Control'],
                    Phasing: powers.Phasing,
                    'Astral Projection': powers['Astral Projection'],
                    'Electrical Transport': powers['Electrical Transport'],
                    'Fire Control': powers['Fire Control'],
                    Projection: powers.Projection,
                    Summoning: powers.Summoning,
                    'Enhanced Memory': powers['Enhanced Memory'],
                    Reflexes: powers.Reflexes,
                    Invulnerability: powers.Invulnerability,
                    'Energy Constructs': powers['Energy Constructs'],
                    'Force Fields': powers['Force Fields'],
                    'Self-Sustenance': powers['Self-Sustenance'],
                    'Anti-Gravity': powers['Anti-Gravity'],
                    Empathy: powers.Empathy,
                    'Power Nullifier': powers['Power Nullifier'],
                    'Radiation Control': powers['Radiation Control'],
                    'Psionic Powers': powers['Psionic Powers'],
                    Elasticity: powers.Elasticity,
                    'Substance Secretion': powers['Substance Secretion'],
                    'Elemental Transmogrification': powers['Elemental Transmogrification'],
                    'Technopath/Cyberpath': powers['Technopath/Cyberpath'],
                    'Photographic Reflexes': powers['Photographic Reflexes'],
                    'Seismic Power': powers['Seismic Power'],
                    Animation: powers.Animation,
                    Precognition: powers.Precognition,
                    'Mind Control': powers['Mind Control'],
                    'Fire Resistance': powers['Fire Resistance'],
                    'Power Absorption': powers['Power Absorption'],
                    'Enhanced Hearing': powers['Enhanced Hearing'],
                    'Nova Force': powers['Nova Force'],
                    Insanity: powers.Insanity,
                    Hypnokinesis: powers.Hypnokinesis,
                    'Animal Control': powers['Animal Control'],
                    'Natural Armor': powers['Natural Armor'],
                    Intangibility: powers.Intangibility,
                    'Enhanced Sight': powers['Enhanced Sight'],
                    'Molecular Manipulation': powers['Molecular Manipulation'],
                    'Heat Generation': powers['Heat Generation'],
                    Adaptation: powers.Adaptation,
                    Gliding: powers.Gliding,
                    'Power Suit': powers['Power Suit'],
                    'Mind Blast': powers['Mind Blast'],
                    'Probability Manipulation': powers['Probability Manipulation'],
                    'Gravity Control': powers['Gravity Control'],
                    Regeneration: powers.Regeneration,
                    'Light Control': powers['Light Control'],
                    Echolocation: powers.Echolocation,
                    Levitation: powers.Levitation,
                    'Toxin and Disease Control': powers['Toxin and Disease Control'],
                    Banish: powers.Banish,
                    'Energy Manipulation': powers['Energy Manipulation'],
                    'Heat Resistance': powers['Heat Resistance'],
                    'Natural Weapons': powers['Natural Weapons'],
                    'Time Travel': powers['Time Travel'],
                    'Enhanced Smell': powers['Enhanced Smell'],
                    Illusions: powers.Illusions,
                    Thirstokinesis: powers.Thirstokinesis,
                    'Hair Manipulation': powers['Hair Manipulation'],
                    Illumination: powers.Illumination,
                    Omnipotent: powers.Omnipotent,
                    Cloaking: powers.Cloaking,
                    'Changing Armor': powers['Changing Armor'],
                    'Power Cosmic': powers['Power Cosmic'],
                    Biokinesis: powers.Biokinesis,
                    'Water Control': powers['Water Control'],
                    'Radiation Immunity': powers['Radiation Immunity'],
                    'Vision - Telescopic': powers['Vision - Telescopic'],
                    'Toxin and Disease Resistance': powers['Toxin and Disease Resistance'],
                    'Spatial Awareness': powers['Spatial Awareness'],
                    'Energy Resistance': powers['Energy Resistance'],
                    'Telepathy Resistance': powers['Telepathy Resistance'],
                    'Molecular Combustion': powers['Molecular Combustion'],
                    Omnilingualism: powers.Omnilingualism,
                    'Portal Creation': powers['Portal Creation'],
                    Magnetism: powers.Magnetism,
                    'Mind Control Resistance': powers['Mind Control Resistance'],
                    'Plant Control': powers['Plant Control'],
                    Sonar: powers.Sonar,
                    'Sonic Scream': powers['Sonic Scream'],
                    'Time Manipulation': powers['Time Manipulation'],
                    'Enhanced Touch': powers['Enhanced Touch'],
                    'Magic Resistance': powers['Magic Resistance'],
                    Invisibility: powers.Invisibility,
                    'Sub-Mariner': powers['Sub-Mariner'],
                    'Radiation Absorption': powers['Radiation Absorption'],
                    'Intuitive aptitude': powers['Intuitive aptitude'],
                    'Vision - Microscopic': powers['Vision - Microscopic'],
                    Melting: powers.Melting,
                    'Wind Control': powers['Wind Control'],
                    'Super Breath': powers['Super Breath'],
                    Wallcrawling: powers.Wallcrawling,
                    'Vision - Night': powers['Vision - Night'],
                    'Vision - Infrared': powers['Vision - Infrared'],
                    'Grim Reaping': powers['Grim Reaping'],
                    'Matter Absorption': powers['Matter Absorption'],
                    'The Force': powers['The Force'],
                    Resurrection: powers.Resurrection,
                    Terrakinesis: powers.Terrakinesis,
                    'Vision - Heat': powers['Vision - Heat'],
                    Vitakinesis: powers.Vitakinesis,
                    'Radar Sense': powers['Radar Sense'],
                    'Qwardian Power Ring': powers['Qwardian Power Ring'],
                    'Weather Control': powers['Weather Control'],
                    'Vision - X-Ray': powers['Vision - X-Ray'],
                    'Vision - Thermal': powers['Vision - Thermal'],
                    'Web Creation': powers['Web Creation'],
                    'Reality Warping': powers['Reality Warping'],
                    'Odin Force': powers['Odin Force'],
                    'Symbiote Costume': powers['Symbiote Costume'],
                    'Speed Force': powers['Speed Force'],
                    'Phoenix Force': powers['Phoenix Force'],
                    'Molecular Dissipation': powers['Molecular Dissipation'],
                    'Vision - Cryo': powers['Vision - Cryo'],
                    Omnipresent: powers.Omnipresent,
                    Omniscient: powers.Omniscient,
                })

                newSuperData.save()
            }
            catch(e){
                const superhero = await superheroInfo.findOne({id: idValue}).select('-_id -__v')
                const powers = await superheroPowerInfo.findOne({hero_names: superhero.name}).select('-_id -__v -hero_names')

                const newSuperData = new newHeroInfo({
                    id: superhero.id,
                    name: superhero.name,
                    Gender: superhero.Gender,
                    'Eye color': superhero['Eye color'],
                    Race: superhero.Race,
                    'Hair color': superhero['Hair color'],
                    Height: superhero.Height,
                    Publisher: superhero.Publisher,
                    'Skin color': superhero['Skin color'],
                    Alignment: superhero.Alignment,
                    Weight: superhero.Weight,
                    Agility: false,
                    'Accelerated Healing': false,
                    'Lantern Power Ring': false,
                    'Dimensional Awareness': false,
                    'Cold Resistance': false,
                    Durability: false,
                    Stealth: false,
                    'Energy Absorption': false,
                    Flight: false,
                    'Danger Sense': false,
                    'Underwater breathing': false,
                    Marksmanship: false,
                    'Weapons Master': false,
                    'Power Augmentation': false,
                    'Animal Attributes': false,
                    Longevity: false,
                    Intelligence: false,
                    'Super Strength': false,
                    Cryokinesis: false,
                    Telepathy: false,
                    'Energy Armor': false,
                    'Energy Blasts': false,
                    Duplication: false,
                    'Size Changing': false,
                    'Density Control': false,
                    Stamina: false,
                    'Astral Travel': false,
                    'Audio Control': false,
                    Dexterity: false,
                    Omnitrix: false,
                    'Super Speed': false,
                    Possession: false,
                    'Animal Oriented Powers': false,
                    'Weapon-based Powers': false,
                    Electrokinesis: false,
                    'Darkforce Manipulation': false,
                    'Death Touch': false,
                    Teleportation: false,
                    'Enhanced Senses': false,
                    Telekinesis: false,
                    'Energy Beams': false,
                    Magic: false,
                    Hyperkinesis: false,
                    Jump: false,
                    Clairvoyance: false,
                    'Dimensional Travel': false,
                    'Power Sense': false,
                    Shapeshifting: false,
                    'Peak Human Condition': false,
                    Immortality: false,
                    Camouflage: false,
                    'Element Control': false,
                    Phasing: false,
                    'Astral Projection': false,
                    'Electrical Transport': false,
                    'Fire Control': false,
                    Projection: false,
                    Summoning: false,
                    'Enhanced Memory': false,
                    Reflexes: false,
                    Invulnerability: false,
                    'Energy Constructs': false,
                    'Force Fields': false,
                    'Self-Sustenance': false,
                    'Anti-Gravity': false,
                    Empathy: false,
                    'Power Nullifier': false,
                    'Radiation Control': false,
                    'Psionic Powers': false,
                    Elasticity: false,
                    'Substance Secretion': false,
                    'Elemental Transmogrification': false,
                    'Technopath/Cyberpath': false,
                    'Photographic Reflexes': false,
                    'Seismic Power': false,
                    Animation: false,
                    Precognition: false,
                    'Mind Control': false,
                    'Fire Resistance': false,
                    'Power Absorption': false,
                    'Enhanced Hearing': false,
                    'Nova Force': false,
                    Insanity: false,
                    Hypnokinesis: false,
                    'Animal Control': false,
                    'Natural Armor': false,
                    Intangibility: false,
                    'Enhanced Sight': false,
                    'Molecular Manipulation': false,
                    'Heat Generation': false,
                    Adaptation: false,
                    Gliding: false,
                    'Power Suit': false,
                    'Mind Blast': false,
                    'Probability Manipulation': false,
                    'Gravity Control': false,
                    Regeneration: false,
                    'Light Control': false,
                    Echolocation: false,
                    Levitation: false,
                    'Toxin and Disease Control': false,
                    Banish: false,
                    'Energy Manipulation': false,
                    'Heat Resistance': false,
                    'Natural Weapons': false,
                    'Time Travel': false,
                    'Enhanced Smell': false,
                    Illusions: false,
                    Thirstokinesis: false,
                    'Hair Manipulation': false,
                    Illumination: false,
                    Omnipotent: false,
                    Cloaking: false,
                    'Changing Armor': false,
                    'Power Cosmic': false,
                    Biokinesis: false,
                    'Water Control': false,
                    'Radiation Immunity': false,
                    'Vision - Telescopic': false,
                    'Toxin and Disease Resistance': false,
                    'Spatial Awareness': false,
                    'Energy Resistance': false,
                    'Telepathy Resistance': false,
                    'Molecular Combustion': false,
                    Omnilingualism: false,
                    'Portal Creation': false,
                    Magnetism: false,
                    'Mind Control Resistance': false,
                    'Plant Control': false,
                    Sonar: false,
                    'Sonic Scream': false,
                    'Time Manipulation': false,
                    'Enhanced Touch': false,
                    'Magic Resistance': false,
                    Invisibility: false,
                    'Sub-Mariner': false,
                    'Radiation Absorption': false,
                    'Intuitive aptitude': false,
                    'Vision - Microscopic': false,
                    Melting: false,
                    'Wind Control': false,
                    'Super Breath': false,
                    Wallcrawling: false,
                    'Vision - Night': false,
                    'Vision - Infrared': false,
                    'Grim Reaping': false,
                    'Matter Absorption': false,
                    'The Force': false,
                    Resurrection: false,
                    Terrakinesis: false,
                    'Vision - Heat': false,
                    Vitakinesis: false,
                    'Radar Sense': false,
                    'Qwardian Power Ring': false,
                    'Weather Control': false,
                    'Vision - X-Ray': false,
                    'Vision - Thermal': false,
                    'Web Creation': false,
                    'Reality Warping': false,
                    'Odin Force': false,
                    'Symbiote Costume': false,
                    'Speed Force': false,
                    'Phoenix Force': false,
                    'Molecular Dissipation': false,
                    'Vision - Cryo': false,
                    Omnipresent: false,
                    Omniscient: false,
                });
                
                newSuperData.save()
            }
        })


        
        

        //const newSuperhero = await newHeroInfo.insertOne()
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

infoRouter.route('/id/:id') 
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


infoRouter.route('/id/:id/powers')
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

infoRouter.route('/name/:name')
    // Get superhero information based on name (partial search)
    .get(async (req, res) => {
        try{
            const heroName = decodeURIComponent(req.params.name)

            const searchRegex = new RegExp('^' + heroName, 'i')

            const superhero = await superheroInfo.find({name: searchRegex}).select('-_id -__v')

            if (superhero){
                res.json(superhero)
            }
            else{
                res.status(404).send('No hero exists')
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