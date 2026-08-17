import QrCodeView from "@/components/qr/QrCodeView"
import {createClient} from "@/lib/supabaseServ"
import { Container } from "@mui/material"

export default async function qrPage({params}){
    


    const { id } = await params
    const supabase = await createClient()
    const { data: machine } = await supabase.from('machines').select('*').eq('id', id).single()
    if (!machine) return <div>Machine not found</div>
    return(
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{machine.name}</h1>
            <p>View the documents for machine {machine.name}</p>
            <QrCodeView id={id} />
        </div>
    )
}