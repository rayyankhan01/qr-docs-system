import { createClient } from "@/lib/supabaseServ"
import { Box, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import MachinesTable from "@/components/machines/MachinesTable"
import EmptyState from "@/components/ui/EmptyState"
import LinkButton from "@/components/ui/LinkButton"

export default async function MachinesPage() {
    const supabase = await createClient()
    const { data: machines, error: machinesError } = await supabase.from('machines').select('*')

    // A failed query is the only case where there is nothing worth rendering.
    // An empty list is not — see below.
    if (machinesError) return <div>Could not fetch machines : {machinesError.message}</div>

    // Declared once, rendered in two places: the header and the empty state.
    const addButton = (
        <LinkButton variant="contained" href="/machines/add" startIcon={<AddIcon />}>
            Add Machine
        </LinkButton>
    )

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Machines</Typography>
                {addButton}
            </Box>

            {machines.length === 0 ? (
                <EmptyState
                    icon={<PrecisionManufacturingIcon />}
                    title="No machines yet"
                    description="Add your first machine to start attaching documents and generating QR codes."
                    action={addButton}
                />
            ) : (
                <MachinesTable machines={machines} />
            )}
        </Box>
    )
}

