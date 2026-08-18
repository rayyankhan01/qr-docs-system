'use client'

import DocumentTabs from '../documents/DocumentTabs'
import { supabase } from '@/lib/supabase'
import { TextField, Button, Box, Alert } from '@mui/material'
import { useState } from 'react'

import Container from '@mui/material/Container';
   const blankDocs = () => [
    { name: 'Vehicle Registration', file: null , expiry_date:''},
    { name: 'Insurance', file: null, expiry_date:'' },
    { name: 'Third Party Certificate', file: null , expiry_date:''},
]
export default function MachineForm(){

    const [form,setForm] = useState({name:''})
    const [docs, setDocs] = useState(blankDocs())
    const [loading,setLoading]= useState(false)
    const [message,setMessage] = useState(null)
    // const [isError,setIsError] = useState(false)

    const handleFormChange =(e)=>{
            setForm({...form,[e.target.name]:e.target.value})
    }


    const handleDocChange = (index,field,value)=>{
        //const updated= [...docs]
        //updated[index][field]=value // this makes a shallow copy
        //setDocs(updated)
        setDocs(docs.map((doc,i)=> i === index ? {...doc,[field]:value}:doc))
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
        setMessage({text:'Machine name is required', type:'error'})
        setLoading(false)
        return
            }

        const docsWithoutFiles = docs.filter(doc => !doc.file)
            if (docsWithoutFiles.length > 0) {
                setMessage({text:'Please attach a file to all documents', type:'error'})
                setLoading(false)
                return
            }
        const docsWithoutExpiry = docs.filter(doc => !doc.expiry_date)
        if (docsWithoutExpiry.length > 0) {
            setMessage({text:'Please provide an expiry date for all documents', type:'error'})
            setLoading(false)
            return
        }
        const {data:machine, error :machineError} = await supabase.from('machines').insert([form]).select().single()
        if(machineError){
                setMessage({text:'Error saving machine : '+ machineError.message,type:'error'})
                setLoading(false)
                return
        }
        

        for (const doc of docs){
            if (!doc.file) continue

            const filePath = `${machine.id}/${Date.now()}_${doc.file.name}`

            const {error : uploadError} = await supabase.storage.from('documents').upload(filePath,doc.file)

            if(uploadError){
                setMessage({text:'Error uploading document : ' + uploadError.message,type:'error'})
                setLoading(false)
                return
            }

            const {data :urlData} = supabase.storage.from('documents').getPublicUrl(filePath)
            // const docsWithoutFiles = docs.filter(doc => !doc.file)
            // if (docsWithoutFiles.length > 0) {
            //     setMessage('Please attach a file to all documents')
            //     setLoading(false)
            //     return
            // }
            const {error:docError}= await supabase.from('documents').insert([{
                machine_id:machine.id,
                name:doc.name,
                file_url:urlData.publicUrl,
                file_type: doc.file.type,
                expiry_date: doc.expiry_date
            }])

            if(docError){
                setMessage({text:'Error saving document : '+docError.message,type:'error'})
                setLoading(false)
                return
            }

            // await supabase.from('documents').insert([{
            //     machine_id:machine.id,
            //     name:doc.name,
            //     file_url:urlData.publicUrl,
            //     file_type: doc.file.type
            // }])

            // setMessage('Machine and documents saved !')
            // setForm({name : ''})
            // setDocs([{ name: 'Vehicle Registration', file: null },
            //          { name: 'Insurance', file: null }, 
            //          {name: "Third Party Certificate", file: null}])
            // setLoading(false)
        }
        setMessage({text:'Machine and documents saved !', type:'success'})
        setForm({name : ''})
        setDocs(blankDocs())
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
             {message && (
                <Alert severity={message.type === 'error' ? 'error' : 'success'}>
                    {message.text}
                </Alert>
                )}

            </form>  
               </Container>
        </main>
    )
}