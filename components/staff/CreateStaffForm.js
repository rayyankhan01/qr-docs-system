'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import { TextField, Button, Select, MenuItem, Box, Alert } from '@mui/material'
export default function createStaffForm({isSuperAdmin}) {
    const router = useRouter()
    const [form,setForm] = useState({staffId:'',password:'',name:'',role:'staff'})
    const [message,setMessage]= useState(null)
    const [loading,setLoading] = useState(false)
    // check for super admin to determine available roles in the form
    const roles = isSuperAdmin ? ['admin','staff'] : ['staff']

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const res = await fetch('/api/staff/',{
            method:'POST',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        })
        const data = await res.json()
        if(!res.ok){
            setMessage({text:data.error, type :'error'})
            setLoading(false)
            return
        }
        setMessage({type:'success', text :data.message})
        setForm({staffId:'',password:'',name:'',role:'staff'})
        setLoading(false)
        router.refresh()
    }


    return(
        <Box component='form' onSubmit={handleSubmit} sx={{display:'flex', flexDirection:'column', gap:2, width:'300px'}}>
            <TextField label ='Staff ID' name= 'staffId' value = {form.staffId} onChange = {handleChange} required/>
            <TextField label ='Password' name = 'password' type = 'password' value = {form.password} onChange = {handleChange} required/>
            <TextField label ='Name' name = 'name' value = {form.name} onChange = {handleChange} required/>
            <Select name ='role' value = {form.role} onChange = {handleChange}>
                {roles.map((r)=><MenuItem key = {r} value = {r}>{r}</MenuItem>)}
            </Select>
            <Button type = 'submit' variant = 'contained' disabled = {loading}>
                {loading? 'Creating...':'Create Staff Account'}
            </Button>
            {message && <Alert severity ={message.type}>{message.text}</Alert>}
        </Box>
    )


}