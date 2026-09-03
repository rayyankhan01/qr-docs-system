'use client'

import {useRouter} from 'next/navigation'
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material'
import {supabase} from '@/lib/supabase'
const ROLES = ['admin','staff']
export default function StaffTable ({staff, isAdmin}) {
    const router = useRouter();

    const handleRoleChange = async (id,newRole)=>{
        const {error} = await supabase.from('profiles').update({role:newRole}).eq('id',id)
        if(error){
            alert('Error updating role:'+ error.message)
            return
        }
        router.refresh()
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {staff.map((person) =>(
                    <TableRow key={person.id}>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>
                            {isAdmin ? (
                                <Select value ={person.role} size="small" onChange={(e) => {handleRoleChange(person.id,e.target.value)}}>
                                        {ROLES.map((r) => (<MenuItem key={r} value={r}>
                                            {r}
                                        </MenuItem>))}
                                </Select>
                            ):person.role}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}