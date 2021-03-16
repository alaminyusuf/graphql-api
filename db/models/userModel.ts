import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    // @Field(() => Int)
    // id: number

    firstName: {
        type: String,
        required: true
    }

    // @Field(() => String, { nullable: false })
    // second_name: string

    // @Field(() => String, { nullable: false })
    // password: string

    // @Field(() => String, { nullable: false })
    // email: string

})

const Schema = mongoose.model('User', userSchema);

export default Schema;