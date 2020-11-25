const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,       
        trim: true,
        required: true,
        default: "Desconocido"
    },
    birthday: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    gender: {
        type: String,
        enum: ["Masculino", "Femenino", "Otro"], 
        required: true,
        default: "Otro"
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    image: {
        type: String,
        default: "https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w",
        imageName: String,
        path: String,
        originalName: String
    },
    description: String,
    skills: {
        type: [String],
        enum: ['HTML', "CSS", "JavaScript", "MongoDB", "Mongoose", "Node.js", "Express.js", "HandleBars", "React.js", "AJAX", "GitHub", "Ruby", "Phyton", "PHP", "Java", "R", "C#", "C", "C++", "GO", "Swift", "Dart", "MySQL", "SQL", "Angular", "TypeScript", "InVision", "Figma", "Sketch", "Notion", "Adobe Creative Suite", "Scrum"]
    },
    personality: {
        type: [String],
        enum: ['Decidido/a', "Flexible", "Honesto/a", "Práctico/a", "Ordenado/a", "Proactivo/a", "Sociable", "Tolerante", "Activo/a", "Colaborador/a", "Empático/a", "De trato fácil", "Creativo/a"]
    },
    languages: {
        type: [String],
        enum: ['Español', "Inglés", "Francés", "Italiano", "Alemán", "Árabe", "Chino", "Hindú", "Bengalí", "Portugués", "Ruso", "Japonés", "Indonés", "Turco", "Holandés", "Polaco", "Coreano", "Noruego", "Tailandés", "Vietnamita"]
    },
    experiences: String,
    username: {
        type: String,
        required: true,
        default: 'user',
        unique: true,        
    },
    password: {
        type: String,               
    }
}, {
    timestamps: true
})


userSchema.index({ location: '2dsphere' })

const User = mongoose.model('User', userSchema)
module.exports = User

