'use client'

import DocumentTabs from '../documents/DocumentTabs'
import { supabase } from '@/lib/supabase'
import { TextField, Button, Box } from '@mui/material'
import { useState } from 'react'

import Container from '@mui/material/Container';

export default function MachineForm(){

    const [form,setForm] = useState({name:''})
    const [docs, setDocs] = useState([
    { name: 'Vehicle Registration', file: null },
    { name: 'Insurance', file: null }
])
    const [loading,setLoading]= useState(false)
    const [message,setMessage] = useState('')
    

    const handleFormChange =(e)=>{
            setForm({...form,[e.target.name]:e.target.value})
    }


    const handleDocChange = (index,field,value)=>{
        const updated= [...docs]
        updated[index][field]=value
        setDocs(updated)
    }
    
    // const addDocRows =(newDocs)=>{
    //     setDocs([...docs,...newDocs])
    // }

    // const removeDocRow = (index)=>{
    //     setDocs(docs.filter((_,i)=>i!==index))
    // }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        if (!form.name) {
        setMessage('Machine name is required')
        setLoading(false)
        return
            }

            const docsWithoutFiles = docs.filter(doc => !doc.file)
            if (docsWithoutFiles.length > 0) {
                setMessage('Please attach a file to all documents')
                setLoading(false)
                return
            }
        const {data:machine, error :machineError} = await supabase.from('machines').insert([form]).select().single()

        if(machineError){
                setMessage('Error saving machine'+ machineError.message)
                setLoading(false)
                return
        }

        for (const doc of docs){
            if (!doc.file) continue

            const filePath = `${machine.id}/${Date.now()}_${doc.file.name}`

            const {error : uploadError} = await supabase.storage.from('documents').upload(filePath,doc.file)

            if(uploadError){
                setMessage('Error Uploading File '+ uploadError.message)
                setLoading(false)
                return
            }

            const {data :urlData} = supabase.storage.from('documents').getPublicUrl(filePath)
            const docsWithoutFiles = docs.filter(doc => !doc.file)
            if (docsWithoutFiles.length > 0) {
                setMessage('Please attach a file to all documents')
                setLoading(false)
                return
            }
            await supabase.from('documents').insert([{
                machine_id:machine.id,
                name:doc.name,
                file_url:urlData.publicUrl,
                file_type: doc.file.type
            }])

            setMessage('Machine and documents saved !')
            setForm({name : '', location:'', description:''})
            setDocs([{name : '', file :null}])
            setLoading(false)
        }
        setForm({name : '', location:'', description:''})
        setLoading(false)
    }   

  

    return (
        <main style={{ padding: '4rem', maxWidth: '1200px' }}>    
           <h1>Add Machine</h1>   
           <Container style ={{padding:'1rem', border:'1px solid #ccc' , paddingLeft: '2rem'}}>
            <form onSubmit={handleSubmit} style={{}}>
               <h3>Machine Details</h3>
             
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
    
                                <TextField
                                name="name"
                                label="Machine name"
                                value={form.name}
                                onChange={handleFormChange}
                                required
                                fullWidth
                                />

                                {/* <TextField
                                name="location"
                                label="Location"
                                value={form.location}
                                onChange={handleFormChange}
                                fullWidth
                                /> */}

                                {/* <TextField
                                name="description"
                                label="Description"
                                value={form.description}
                                onChange={handleFormChange}
                                fullWidth
                                /> */}  
                    <h3>Documents</h3>
                    <DocumentTabs   docs={docs} 
                                    onDocChange={handleDocChange}
                                   />

                </Box>
                                        

              

            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={loading} sx={{ mt: 2 }}>
                {loading ? 'Saving...' : 'Save Machine'}
            </Button>
             <p style={{marginTop:'1rem', color: message.includes('Error') ? 'red' : 'green'}}>{message}</p>
        
            </form>  
               </Container>
        </main>
    )
}