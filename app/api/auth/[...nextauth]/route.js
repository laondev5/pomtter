import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database';
import User from '@models/user'

console.log({
    clientId: process.env.GOODLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOODLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        })
    ],
    async session({session}){
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.is = sessionUser._id.toString();
        return session;
    },

    async signIn({profile}){
        try{
            await connectToDB()

            // check if a user already exists
            const userExist = await User.findOne({
                email: profile.email,
            })
            // if not ccreate new user
            if(!userExist){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
            return true
        }catch(error){
            console.log(error)
            return false
        }
    },
    secret: process.env.GOOGLE_CLIENT_SECRET,
})

export {handler as GET, handler as POST}