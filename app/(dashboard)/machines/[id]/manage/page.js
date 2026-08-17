import { createClient } from '@/lib/supabaseServ'
import ManageMachineView from '@/components/machines/ManageMachineView'

export default async function ManageMachinePage({ params }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: machine } = await supabase.from('machines').select('*').eq('id', id).single()
    const { data: docs, error : docsError } = await supabase.from('documents').select('*').eq('machine_id', id)

    if (!machine) return <div>Machine not found</div>
    if (docsError) return <div>Could not fetch documents : {docsError.message}</div>

    // called from the client componet when the user clicks it gives a
    //  popup card with generated qr code
    return <ManageMachineView machine={machine} docs={docs} />
}