import { createClient } from '@/lib/supabaseServ'
import Link from 'next/link'
import { Container, Alert, List, ListItem,ListItemIcon,ListItemText } from '@mui/material'
import  { PageHeader, SectionCard, EmptyState, LinkListItem} from '@/components/ui'
import DescriptionOutLinedIcon from '@mui/icons-material/DescriptionOutlined'



export default async function machinePage({params}){
    const { id } = await params
    const supabase = await createClient()
    const {data :machine, error : machineError}= await supabase.from('machines').select('*').eq('id',id).single()
    const {data : docs, error : docsError}= await supabase.from('documents').select('*').eq('machine_id',id)
    // "the query failed" and "no such machine" are different problems and
    // deserve different messages.
    if (machineError) return <Container>Could not load machine : {machineError.message}</Container>
    if (!machine) return <Container>Machine not found</Container>
    if (docsError) return <Container>Could not fetch documents : {docsError.message}</Container>
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <PageHeader title={machine.name} description="Compliance Documentation for this machine" />
                <SectionCard title="Documents">
                    {docs.length === 0?(
                        <EmptyState
                            icon={<DescriptionOutLinedIcon />}
                            title="No documents yet"
                            description="Add your first document to this machine to start tracking compliance." 
                            />
                    
                    ):(
                        <List disablePadding>
                            {docs.map((doc)=>(
                                <LinkListItem key={doc.id} href = {doc.file_url} target="_blank" disablePadding sx ={{py:1}}>
                                    <ListItemIcon>
                                        <DescriptionOutLinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={doc.name} />
                                </LinkListItem>
                            ))}
                        </List>
                    )}
                </SectionCard>



            {/* <h1>{machine.name}</h1>
            <h2>Documents</h2>
            {docs.length === 0 ? (
                <p>No documents have been attached to this machine yet.</p>
            ) : (
                <ul>
                    {docs.map((doc)=>(
                        <li key={doc.id}>
                            <Link href={doc.file_url} target="_blank">{doc.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
            You can add more details or components related to the machine here */}
        </Container>
    )
}