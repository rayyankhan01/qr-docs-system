import {createClient} from '@/lib/supabaseServ'
import {redirect} from 'next/navigation'

import DashboardLayout from '@/components/layout/DashboardLayout'

export default async function Layout({ children }) {

    const supabase = await createClient();
    const {data : {user} } = await supabase.auth.getUser();
    if(!user) redirect('/login')
    const { data :profile} = await supabase.from('profiles').select('role, name').eq('id',user.id).single()

    return <DashboardLayout isAdmin={profile?.role === 'admin'} name = {profile?.name} role = {profile?.role}>{children }</DashboardLayout>
}