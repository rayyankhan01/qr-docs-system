import { createClient } from "@/lib/supabaseServ"
import { Box, Button, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import Link from "next/link"
import MachinesTable from "@/components/machines/MachinesTable"

export default async function MachinesPage() {
    const supabase = await createClient()
    const { data: machines } = await supabase.from('machines').select('*')

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Machines</Typography>
                <Link href="/machines/add">
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Add Machine
                    </Button>
                </Link>
            </Box>
            <MachinesTable machines={machines} />
        </Box>
    )
}