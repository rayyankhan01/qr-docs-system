import { supabase } from '@/lib/supabase'
import { QRCodeSVG } from 'qrcode.react'
export default async function QrCodeView({id}){

    //const {id}= await params
    //const {data:machine}= await supabase.from('machines').select('*').eq('id',id).single()
    //if (!machine) return <div>Machine not found</div>
    const url = `http://localhost:3000/machines/${id}`
    const testurl = `http://172.16.20.46:3000/machines/${id}`
    return(
        <div>
            <QRCodeSVG value={testurl} />
        </div>
    )}