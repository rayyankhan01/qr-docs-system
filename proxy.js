import { createServerClient } from "@supabase/ssr"
import {NextResponse} from "next/server"


export async function proxy(request) {
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

// Paths listed here require a logged-in user. Anything NOT listed is public,
// so add new protected routes as you build them.
//
// Deliberately absent: '/machines/:id' — that is the page QR codes point at,
// and a phone scanning one in the yard has no session.
//
// No trailing slashes: Next normalises '/machines/' to '/machines', so a
// matcher ending in '/' never matches anything.
export const config = {
    matcher:[
        '/dashboard/:path*',
        '/staff/:path*',
        '/machines',
        '/machines/add',
        '/machines/:id/manage',
        '/machines/:id/qr',
        '/machines/:id/edit',
    ]
}
