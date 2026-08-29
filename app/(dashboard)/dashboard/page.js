// 'use client'

// import { useState } from 'react'
import { createClient } from '@/lib/supabaseServ'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'

import {EXPIRY_WARNING_DAYS, getExpiryStatus} from '@/lib/expiry'
import AlertRangeSelect from '@/components/dashboard/AlertRangeSelect'
import {StatusChip, SectionCard} from '@/components/ui'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
export default async function DashboardPage({searchParams}){
    const supabase = await createClient();
    const {data : {user} } = await supabase.auth.getUser();
    const {days} = await searchParams
    const rangeDays = Number (days)|| EXPIRY_WARNING_DAYS
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate()+ rangeDays)

    if (!user) { redirect('/login') }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id',user.id).single()

    // const {data:alerts} = await supabase.
    //     from('documents')
    //     .select('id,name,expiry_date,machines(name)')
    //     .lte('expiry_date', cutoff.toISOString().split('T')[0])
    //     .order('expiry_date')
    const {data:alerts,error:alertsError} = await supabase
            .from('documents')
            .select('id,name,expiry_date,machines(name)')
            .lte('expiry_date', cutoff.toISOString().split('T')[0])
            .order('expiry_date')
    if(alertsError) return <div>Could not fetch alerts: {alertsError.message}</div>
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

        <SectionCard title='Document Alerts'>
            <AlertRangeSelect defaultDays={rangeDays}/>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Machine</TableCell>
                            <TableCell>Document</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alerts.map((doc)=> (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.machines?.name}</TableCell>
                                <TableCell>{doc.name}</TableCell>
                                <TableCell>{new Date(doc.expiry_date).toLocaleDateString()}</TableCell>
                                <TableCell><StatusChip status = {getExpiryStatus(doc.expiry_date,rangeDays)}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </SectionCard>


   
        </div>
 
    )
}