import { Card, Box, Typography, Stack } from '@mui/material'
import { alpha } from '@mui/material/styles'

/**
 * A single metric tile for the dashboard. Drop several into a responsive grid:
 *
 * <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
 *     <StatCard label="Machines" value={12} icon={<PrecisionManufacturingIcon />} />
 * </Box>
 *
 * `tone` picks the accent colour and must be a palette key:
 * 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'.
 */
export default function StatCard({ label, value, hint, icon, tone = 'secondary', sx }) {
    return (
        <Card sx={{ p: 2.5, ...sx }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography variant="overline" component="p" color="text.secondary">
                        {label}
                    </Typography>
                    <Typography variant="h3" component="p" sx={{ mt: 0.5, lineHeight: 1.1 }}>
                        {value}
                    </Typography>
                    {hint && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                            {hint}
                        </Typography>
                    )}
                </Box>

                {icon && (
                    <Box
                        sx={{
                            flexShrink: 0,
                            display: 'grid',
                            placeItems: 'center',
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            color: `${tone}.main`,
                            // Tint the chip with the icon's own hue at 12%.
                            bgcolor: (theme) => alpha(theme.palette[tone].main, 0.14),
                            '& .MuiSvgIcon-root': { fontSize: 22 },
                        }}
                    >
                        {icon}
                    </Box>
                )}
            </Stack>
        </Card>
    )
}
