import { Box, Typography, Stack } from '@mui/material'

/**
 * Shown where a list, table or panel has nothing in it yet. Always give the
 * user the next action if there is one — an empty screen with no way forward
 * is a dead end.
 *
 * <EmptyState
 *     icon={<DescriptionOutlinedIcon />}
 *     title="No documents yet"
 *     description="Attach a registration, insurance and third party certificate."
 *     action={<Button variant="contained">Add documents</Button>}
 * />
 */
export default function EmptyState({ icon, title, description, action, sx }) {
    return (
        <Stack
            spacing={1.5}
            sx={{
                alignItems: 'center',
                textAlign: 'center',
                px: 3,
                py: 6,
                ...sx,
            }}
        >
            {icon && (
                <Box
                    sx={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        bgcolor: 'sand.200',
                        color: 'text.secondary',
                        '& .MuiSvgIcon-root': { fontSize: 26 },
                    }}
                >
                    {icon}
                </Box>
            )}

            <Box>
                <Typography variant="h6" component="p">
                    {title}
                </Typography>
                {description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5, maxWidth: '44ch', mx: 'auto' }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>

            {action && <Box sx={{ pt: 0.5 }}>{action}</Box>}
        </Stack>
    )
}
