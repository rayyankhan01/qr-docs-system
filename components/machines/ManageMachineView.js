'use client'
import QrCodeView from "@/components/qr/QrCodeView"

import { useState } from "react";
import { Dialog } from "@mui/material";
import Link from "next/link";
import {Button} from "@mui/material";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";  
export default function ManageMachineView({ machine, docs }) {
    const [qrOpen,setqrOpen]=useState(false); 
    const [openDelete,setdeleteOpen]=useState(false); 
    const router = useRouter();
    const handleDelete = async () => {
        // Call your API to delete the machine
        //const response = await supabase.from('machines').delete().eq('id', machine.id);
        const {data, error}= await supabase.from('machines').delete().eq('id',machine.id).select()
        
        if (error){
            alert('Error deleting machine :'+ error.message)
            return
        }
        if (!data || data.length === 0) {
            alert('Nothing was deleted — check your RLS policy.')
            return
        }

        setdeleteOpen(false);
        router.push('/machines'); // Redirect to the machines list page after deletion
        router.refresh(); // Refresh the page to reflect the changes

        // if (response.ok) {
        //     // Handle successful deletion (e.g., redirect or show a message)
        //     alert('Machine deleted successfully');
        //     setdeleteOpen(false);
        // }
    }

    return(
       
        <div>
        <h1>{machine.name}</h1>
            <h2>Documents</h2>
          <ul>
                {docs.map((doc) => (
                    <li key={doc.id}>
                        <strong>{doc.name}:</strong>{' '}
                        <Link href={doc.file_url} target="_blank">View</Link>
                    </li>
                ))}
            </ul>
        <Button onClick={()=>setqrOpen(true)} variant="contained">
            Generate QR Code
        </Button>
                {/* <Dialog open={qrOpen} onClose={()=>setqrOpen(false)}>
                    {/* <QrCodeView value={JSON.stringify({machineId:machine.id})} docs={docs}/> */}
                    {/* <QrCodeView id={machine.id}/> */} 
                {/* </Dialog> */}
        <Button variant="outlined" sx={{ml:2}} onClick={()=>setqrOpen(true)}>
            View QR Code
        </Button>
                <Dialog open={qrOpen} onClose={()=>setqrOpen(false)}>
                    {/* <QrCodeView value={JSON.stringify({machineId:machine.id})} docs={docs}/> */}
                    <QrCodeView id={machine.id}/>
                </Dialog>
        <Button variant="contained" color="error" sx={{ml:2}} onClick={()=>setdeleteOpen(true)}>
            Delete Machine
        </Button>
                <Dialog open={openDelete} onClose={()=>setdeleteOpen(false)}>
                    Are you sure you want to delete this machine?
                    <Button variant="contained" onClick = {handleDelete} color="error" sx={{mt:2}}>
                        Confirm Delete
                    </Button>   
                </Dialog>

        </div>
    )}