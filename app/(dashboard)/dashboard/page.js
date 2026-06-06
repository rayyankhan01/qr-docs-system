// 'use client'

// import { useState } from 'react'
import { createClient } from '@/lib/supabaseServ'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default async function DashboardPage(){
    const supabase = await createClient()
    // const [error,setError]=useState('')
    const {data : {user} } = await supabase.auth.getUser()

    if (!user) { redirect('/login') }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id',user.id).single()

    return (
        <div>  
              {/* <DashboardLayout role={profile?.role}></DashboardLayout> */}
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard! Please select a section from the menu.</p>
            <p>Your role: {profile?.role}</p>

                 {profile?.role === 'admin' && (
            <div>
                <h2>Admin Section</h2>
                <p>Manage staff, machines, and documents</p>
            </div>
        )}

        {profile?.role === 'staff' && (
            <div>
                <h2>Staff Section</h2>
                <p>Add and view machines</p>
            </div>
        )}
   
        </div>
 
    )
}