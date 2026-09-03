import {createClient} from '@/lib/supabaseServ'
import StaffTable from '@/components/staff/StaffTable'
import {PageHeader, SectionCard} from '@/components/ui'
import {Box} from '@mui/material'



export default async function StaffPage() {

    const supabase = await createClient();
    const {data:{user}}= await supabase.auth.getUser();
    const {data:currentProfile} = await supabase.from('profiles').select('role').eq('id',user.id).single()
    const {data:staff,error:staffError} = await supabase.from('profiles').select('id,name,role')
    if(staffError) return <div>Error loading staff data: {staffError.message}</div>



    return (
        <Box>
            <PageHeader title='Staff Management' description='Manage staff members and their roles'/>
            <SectionCard title ='Staff Members'>
                <StaffTable staff={staff} isAdmin={currentProfile?.role === 'admin'}/>
            </SectionCard>
        </Box>
    )
}