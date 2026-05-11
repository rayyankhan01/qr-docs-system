'use client'
import QrCodeView from "@/components/qr/QrCodeView"

import { useState } from "react";
import { Dialog } from "@mui/material";
import Link from "next/link";
import {Button} from "@mui/material";

export default function ManageMachineView({ machine, docs }) {
    const [open,setOpen]=useState(false);   
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
        <Button onClick={()=>setOpen(true)} variant="contained">
            Generate QR Code
        </Button>
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <QrCodeView value={JSON.stringify({machineId:machine.id})} docs={docs}/>
        </Dialog>

        </div>
    )}