import QrCodeView from "@/components/qr/QrCodeView"


export default async function qrPage({params}){
    
    const { id } = await params
    
    return(
        <div>
            <h1>QR Code Page</h1>
            <p>This page will display the QR code for the machine.</p>
            <QrCodeView id={id} />
        </div>
    )
}