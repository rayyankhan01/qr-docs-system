'use client'
import React from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import  DocumentTabs  from '@/components/documents/DocumentTabs';
import Alert from '@mui/material/Alert';
import { SectionCard } from '../ui';
import { Container, Stack, Box} from '@mui/material';
import PageHeader from '../ui/PageHeader';
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

            // for filecleanup for files replace 
            // for deletion of machines, make sure replaced files delete in the storage bucket 
            if(doc.file_url){
                const oldPath = decodeURIComponent(doc.file_url.split('/documents/')[1])
                if(oldPath){
                    await supabase.storage.from('documents').remove([oldPath])
                }
            }

        }
        setMessage({ text: 'Documents saved successfully', type: 'success' });
        router.refresh()
    }




    return(
        // <div>
        //     <h1>Edit Machine</h1>
        //     <TextField label="Machine Name" value={name} onChange={(e) => setName(e.target.value)} />


        //     <Button variant="contained" onClick={handleSaveName}>
        //         Save
        //     </Button>
        //     {message && <Alert severity={message.type === 'success' ? 'success' : 'error'}>{message.text}</Alert>}

        //     <h2>Documents</h2>
        //     <DocumentTabs docs={newDocs}onDocChange={handleDocChange} requireFields={false}></DocumentTabs>
        //     <Button variant="contained" onClick={handleSaveDocs} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
        //         Save Documents
        //     </Button>
        // </div>
    <Box sx ={{maxWidth: 800, marginLeft: '4rem'}}> 
        <PageHeader
            title="Edit Machine "
            description={`Edit machine details and documents for ${machine.name}`}
            size="large"
        />
        { message && <Alert severity={message.type === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>{message.text}</Alert>   }
        <Stack spacing = {3}>
            <SectionCard title="Machine Details">
                <Stack direction="row" spacing={2}>
                    <TextField
                        label = "Machine Name"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveName}>
                        Save
                    </Button>
                </Stack>
            </SectionCard>

            <SectionCard title ='Documents' >
                <DocumentTabs docs ={newDocs} onDocChange={handleDocChange} requireFields ={false}></DocumentTabs>  
                <Button variant="contained" onClick={handleSaveDocs} sx={{ mt: 2 }}>
                    Save Documents
                </Button>
            </SectionCard>
        </Stack>
        
    </Box>


    )
}
