import { createServerClient } from "@supabase/ssr"
import {NextResponse} from "next/server"


export async function middleware(request) {
    const response = NextResponse.next()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies:{
                getAll(){
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet){
                    cookiesToSet.forEach(({name,value,options})=>{
                        response.cookies.set(name,value,options)
                    })
                }
            }
        }
    )

    const {data:{user}}= await supabase.auth.getUser()

    if(!user){
        return NextResponse.redirect(new URL("/login",request.url))

    }
    return response 
   
}
export const config = {
    matcher:['/dashboard/:path*','/machines/\\[id]\\/manage/:path*','/machines/\\[id]\\/qr/:path*']
}