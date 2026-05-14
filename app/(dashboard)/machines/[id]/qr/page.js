import QrCodeView from "@/components/qr/QrCodeView"
import {supabase} from "@/lib/supabase"
import { Container } from "@mui/material"

export default async function qrPage({params}){
    


    const { id } = await params
    const { data: machine } = await supabase.from('machines').select('*').eq('id', id).single()
    return(
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{machine.name}</h1>
            <p>View the documents for machine {machine.name}</p>
            <QrCodeView id={id} />
        </div>
    )
}