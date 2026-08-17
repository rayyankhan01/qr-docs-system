import { Chip } from '@mui/material'

// Maps the domain words you are likely to store on a document or machine onto
// a colour and a readable label. Add rows here rather than passing colours in
// at the call site, so one status always looks the same everywhere.
const STATUSES = {
    complete: { color: 'success', label: 'Complete' },
    valid: { color: 'success', label: 'Valid' },
    active: { color: 'success', label: 'Active' },
    uploaded: { color: 'success', label: 'Uploaded' },

    pending: { color: 'warning', label: 'Pending' },
    expiring: { color: 'warning', label: 'Expiring soon' },
    incomplete: { color: 'warning', label: 'Incomplete' },

    missing: { color: 'error', label: 'Missing' },
    expired: { color: 'error', label: 'Expired' },
    rejected: { color: 'error', label: 'Rejected' },

    draft: { color: 'default', label: 'Draft' },
    inactive: { color: 'default', label: 'Inactive' },
    archived: { color: 'default', label: 'Archived' },
}

/**
 * <StatusChip status="missing" />           →  red "Missing"
 * <StatusChip status="valid" label="OK" />  →  green "OK"
 *
 * An unrecognised status falls back to a neutral chip showing the raw value,
 * so a new status in the database never renders as a blank space.
 */
export default function StatusChip({ status, label, size = 'small', sx }) {
    const key = String(status ?? '').toLowerCase()
    const match = STATUSES[key]

    return (
        <Chip
            size={size}
            variant="outlined"
            color={match?.color ?? 'default'}
            label={label ?? match?.label ?? status ?? 'Unknown'}
            sx={sx}
        />
    )
}
