import {createClient} from '@/lib/supabaseServ'
import EditMachineView from '@/components/machines/EditMachineView'


export default async function EditMachinePage({params}) {
    const {id} = await params
    const supabase = await createClient()
    const {data:machine,error:machineError} = await supabase.from('machines').select().eq('id',id).single()
    const {data:docs,error:docsError} = await supabase.from('documents').select().eq('machine_id',id)
    if(!machine) return <div>Machine not found</div>
    if(docsError) return <div>Documents not found:</div>

    return <EditMachineView machine={machine} docs={docs} />

}