import { jwtDecode } from "jwt-decode"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";
import { AuthService, OpenAPI } from "@/lib/api"
import { NextAuthOptions, getServerSession } from "next-auth";
import { User } from "./User";


interface DecodedJwt {
    exp: number; // Expiration time (seconds since epoch)
    iat: number; // Issued at time (seconds since epoch)
    jti: string; // JWT ID
    user_id: number; // User ID
    first_name: string; // User's first name (optional)
    last_name: string; // User's last name (optional)
    username: string; // Username
    email: string; // User's email (optional)
}


export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                let user;
                const cookieStore = cookies()

                try {
                    const res = await AuthService.authLoginCreate(credentials!) as any

                    const payload = jwtDecode<DecodedJwt>(res.access!)
                    
                    cookieStore.set('auth-token', res.access!,{
                        maxAge:payload.exp,
                        sameSite:'strict'
                    })
                    user =  {
                        id: payload.user_id,
                        first_name:payload.first_name,
                        last_name:payload.last_name,
                        username:payload.username,
                        email:payload.email
                    }
                } catch (error) {
                    user = null
                }
                return user as any
            }
        })
    ],
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/sign-in'
    },
    callbacks:{
        async session({ session, token, user }) {
            const cookieStore = cookies()

            // Send properties to the client, like an access_token from a provider.
            const userToken = cookieStore.get('auth-token')?.value
            const payload = jwtDecode<DecodedJwt>(userToken!)
            if(payload){
                session.user = {
                    ...session.user,
                    //@ts-ignore
                    first_name:payload.first_name,
                    last_name:payload.last_name,
                    username:payload.username,
                }

            }
            return session
        },
    }
}

export const getServerAuthSession = () => getServerSession(authOptions)