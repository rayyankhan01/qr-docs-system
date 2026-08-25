'use client'
import React from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import  DocumentTabs  from '@/components/documents/DocumentTabs';
import Alert from '@mui/material/Alert';

export default function EditMachineView({ machine, docs }) {

    const [name, setName] = useState(machine.name);
    const [newDocs, setNewDocs] = useState(docs.map(doc => ({ ...doc, file: null })) );   
    const [message,setMessage] = useState('')
    // const DOCUMENT_TYPES =['Vehicle Registration','Insurance','Third Party Certificate']

    // const [docsState, setDocsState] = useState(docs.map(doc => ({...doc,file:null})));


    const router = useRouter();

    const handleSaveName = async () => {
        const { error }= await supabase.from('machines').update({ name }).eq('id', machine.id);
        if(error){
            setMessage({ text: 'Error updating machine name: ' + error.message, type: 'error' });
        }
        else 
        {
            setMessage({ text: 'Machine name updated successfully', type: 'success' });
        }
        router.refresh()
    }
    const handleDocChange =(index,field,value)=>{
        setNewDocs(newDocs.map((doc,i)=>i===index?{...doc,[field]:value}:doc))
    }

    const handleSaveDocs = async()=>{
        for (const doc of newDocs){
            if(!doc.file)continue;

            const filePath = `${machine.id}/${Date.now()}_${doc.file.name}`;
            const {error:uploadError} = await supabase.storage.from('documents').upload(filePath,doc.file);
            if(uploadError){
                setMessage({ text: 'Error uploading document: ' + uploadError.message, type: 'error' });
                return;
            }

            const {data:urlDate} = supabase.storage.from('documents').getPublicUrl(filePath);

            const {error:updateError}= await supabase.from('documents').update({
                file_url:urlDate.publicUrl,
                file_type:doc.file.type,
                expiry_date:doc.expiry_date,
            }).eq('id',doc.id);
            if(updateError){
                setMessage({ text: 'Error saving document: ' + updateError.message, type: 'error' });
                return;
            }
        }
        setMessage({ text: 'Documents saved successfully', type: 'success' });
        router.refresh()
    }




    return(
        <div>
            <h1>Edit Machine</h1>
            <TextField label="Machine Name" value={name} onChange={(e) => setName(e.target.value)} />


            <Button variant="contained" onClick={handleSaveName}>
                Save
            </Button>
            {message && <Alert severity={message.type === 'success' ? 'success' : 'error'}>{message.text}</Alert>}

            <h2>Documents</h2>
            <DocumentTabs docs={newDocs}onDocChange={handleDocChange}></DocumentTabs>
            <Button variant="contained" onClick={handleSaveDocs} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                Save Documents
            </Button>
        </div>
    )
}
