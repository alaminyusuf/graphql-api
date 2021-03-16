import mongoose from 'mongoose'

const connetToDB = async () => {
    try {
        // In production or when using with Atlas do not let your mongo Uri open (crictical vulnerability)
        await mongoose.connect('mongodb://localhost:27017/graphql-api', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        }),
            console.log(`mongoose is connected...`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connetToDB