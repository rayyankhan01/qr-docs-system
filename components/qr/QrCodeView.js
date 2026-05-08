'use client'

import { supabase } from '@/lib/supabase'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@mui/material'
export default function QrCodeView({id}){

    //const {id}= await params
    //const {data:machine}= await supabase.from('machines').select('*').eq('id',id).single()
    //if (!machine) return <div>Machine not found</div>
    const url = `http://localhost:3000/machines/${id}`
    const testurl = `http://172.16.20.46:3000/machines/${id}`

    const handleDownload = () => {
        const svg = document.querySelector('svg')
        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        canvas.width = 450
        canvas.height = 450
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            const pngFile = canvas.toDataURL('image/png')
            const downloadLink = document.createElement('a')
            downloadLink.download = `qr-code-${id}.png`
            downloadLink.href = pngFile
            downloadLink.click()
        }
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    return(
        <div>
            <QRCodeSVG value={testurl} size={450}/>
            <Button variant="contained" onClick={handleDownload}>
                Download QR Code
            </Button>
        </div>
    )}