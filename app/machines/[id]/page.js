import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function machinePage({params}){
    const { id } = await params
    const {data :machine}= await supabase.from('machines').select('*').eq('id',id).single()
    const {data : docs}= await supabase.from('documents').select('*').eq('machine_id',id)
    if (!machine) return <div>Machine not found</div>
    return (
        <div>
            <h1>{machine.name}</h1>
            <h2>Documents</h2>
            <ul>
                {docs.map((doc)=>(
                    <li key={doc.id}>
                        <Link href={doc.file_url} target="_blank">{doc.name}</Link>
                    </li>
                ))}
            </ul>
            {/* You can add more details or components related to the machine here */}
        </div>
    )
}