'use client'

import {useRouter} from 'next/navigation'
import {Button, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, IconButton, DialogActions, Dialog, DialogContent, DialogTitle} from '@mui/material'
import {supabase} from '@/lib/supabase'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
const ROLES = ['admin','staff']
export default function StaffTable ({staff, isSuperAdmin}) {
    const router = useRouter();
    const [removeUser,setRemoveUser] = useState(null)
    const handleRoleChange = async (id,newRole)=>{
        const {error} = await supabase.from('profiles').update({role:newRole}).eq('id',id)
        if(error){
            alert('Error updating role:'+ error.message)
            return
        }
        router.refresh()
    }

    const handleRemove = async()=>{
        const res = await fetch ('/api/staff',{
            method:'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id:removeUser.id})
        })
        const data = await res.json()
        if(!res.ok)
        {
            alert ('Error removing staff : '+ data.error)
            setRemoveUser(null)
            return
        }
        setRemoveUser(null)
        router.refresh()
    }


    return (
        <>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {staff.map((person) =>(
                    <TableRow key={person.id}>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>
                            {isSuperAdmin ? (
                                <Select value ={person.role} size="small" onChange={(e) => {handleRoleChange(person.id,e.target.value)}}>
                                        {ROLES.map((r) => (<MenuItem key={r} value={r}>
                                            {r}
                                        </MenuItem>))}
                                </Select>
                            ):person.role}
                        </TableCell>
                        <TableCell>
                            <IconButton size = 'small' color = "error" onClick={()=> setRemoveUser(person)}>
                                <DeleteIcon fontSize = "small"/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <Dialog open ={Boolean(removeUser)} onClose ={()=>setRemoveUser(null)} >
            <DialogTitle> Remove {removeUser?.name}?</DialogTitle>
                <DialogContent>
                    This will permanently delete their account and revoke their access. This cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setRemoveUser(null)}>Cancel</Button>
                    <Button variant ="contained" color= "error" onClick={handleRemove}>Remove</Button>
                </DialogActions>
           
        </Dialog>
        
        
        </>
      
    )
}