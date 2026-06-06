'use client'

import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import { Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const columns = [
    { field: 'name', headerName: 'Machine Name', flex: 1 },
    { field: 'created_at', headerName: 'Date Added', flex: 1, 
      valueFormatter: (params) => params?.slice(0, 10) },
      {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
        <ActionsCell id={params.id} />
    )
}
]
function ActionsCell({ id }) {
    const router = useRouter()

    return (
        <Box>
            <IconButton size="small" onClick={() => router.push(`/machines/${id}/manage`)}>
                <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => router.push(`/machines/${id}/edit`)}>
                <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => handleDelete(id)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    )
}
export default function MachinesTable({ machines }) {
    const router = useRouter()

    return (
        <DataGrid
            rows={machines}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            onRowClick={(params) => router.push(`/machines/${params.id}/manage`)}
            sx={{ cursor: 'pointer' }}
        />
    )
}