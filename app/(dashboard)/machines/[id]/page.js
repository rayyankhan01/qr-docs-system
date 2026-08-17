import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function machinePage({params}){
    const { id } = await params
    const {data :machine, error : machineError}= await supabase.from('machines').select('*').eq('id',id).single()
    const {data : docs, error : docsError}= await supabase.from('documents').select('*').eq('machine_id',id)
    // "the query failed" and "no such machine" are different problems and
    // deserve different messages.
    if (machineError) return <div>Could not load machine : {machineError.message}</div>
    if (!machine) return <div>Machine not found</div>
    if (docsError) return <div>Could not fetch documents : {docsError.message}</div>
    return (
        <div>
            <h1>{machine.name}</h1>
            <h2>Documents</h2>
            {docs.length === 0 ? (
                <p>No documents have been attached to this machine yet.</p>
            ) : (
                <ul>
                    {docs.map((doc)=>(
                        <li key={doc.id}>
                            <Link href={doc.file_url} target="_blank">{doc.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
            {/* You can add more details or components related to the machine here */}
        </div>
    )
}