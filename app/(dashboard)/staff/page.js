import {createClient} from '@/lib/supabaseServ'
import StaffTable from '@/components/staff/StaffTable'
import CreateStaffForm from '@/components/staff/CreateStaffForm'
import {PageHeader, SectionCard} from '@/components/ui'
import {Box} from '@mui/material'
import { redirect } from 'next/navigation'


export default async function StaffPage() {

    const supabase = await createClient();
    const {data:{user}}= await supabase.auth.getUser();
    const {data:currentProfile} = await supabase.from('profiles').select('role, is_super_admin').eq('id',user.id).single()
    const {data:staff,error:staffError} = await supabase.from('profiles').select('id,name,role')
    if(staffError) return <div>Error loading staff data: {staffError.message}</div>
    const isAdmin = currentProfile?.role ==='admin'
    const isSuperAdmin = currentProfile?.is_super_admin === true 
    if(!isAdmin) redirect ('/dashboard')

    return (
        <Box>
            <PageHeader title='Staff Management' description='Manage staff members and their roles'/>
            <SectionCard title ='Staff Members'>
                <StaffTable staff={staff} isSuperAdmin={currentProfile?.is_super_admin}/>
            </SectionCard>
              <SectionCard title = "Add Staff">
                    {isAdmin && <CreateStaffForm isSuperAdmin={isSuperAdmin}/>}
                </SectionCard>
        </Box>
    )
}