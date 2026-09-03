import { createClient} from '@/lib/supabaseServ'
import { NextResponse } from 'next/server'
import {createAdminClient} from '@/lib/supabaseAdmin'

export async function POST(request){
    const supabase = await createClient()
    const { data:{user}} = await supabase.auth.getUser()
    if(!user){
        return NextResponse.json({error:'Not authenticated'}, {status:401})
    }

    const {data :profile} = await supabase.from('profiles').select('role, is_super_admin').eq('id',user.id).single()

    if(profile?.role !== 'admin'){
        return NextResponse.json({error:'Admin access required'}, {status:403})
    }


    const {staffId, password, role, name } = await request.json()

    if(!staffId || !password || !role || !name){
        return NextResponse.json({error:'Missing required fields'}, {status:400})
    }
    if (role === 'admin' && !profile?.is_super_admin) { 
        return NextResponse.json({error:'Only a Super Admin can create admin accounts'}, {status:403})
    }

    const adminClient = await createAdminClient()
    const email = `${staffId}@sevenspikes.internal`

    const {data:newUser, error : createError} = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })

    if(createError){
        return NextResponse.json({error:createError.message}, {status:400 })
    }
    // insert through priviliged server route to bypass RLS policy
    const {error:profileError} = await adminClient.from('profiles').insert({
        id:newUser.user.id,
        role,
        name,
    })

    if(profileError){
        return NextResponse.json({error:profileError.message}, {status:400 })
    }

    return NextResponse.json({message : 'Staff account created'})

}