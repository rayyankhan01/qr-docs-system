import { Card, CardContent, Box, Typography, Divider, Stack } from '@mui/material'

/**
 * A titled panel. Use one per logical group on a page — "Machine details",
 * "Documents", "Danger zone" — instead of loose headings on the background.
 *
 * <SectionCard title="Documents" description="PDF, JPG or PNG." action={<Button/>}>
 *     ...
 * </SectionCard>
 */
export default function SectionCard({
    title,
    description,
    action,
    children,
    footer,
    disablePadding = false,
    sx,
}) {
    const hasHeader = Boolean(title || description || action)

    return (
        <Card sx={sx}>
            {hasHeader && (
                <>
                    <Box sx={{ px: 2.5, py: 2 }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
                        >
                            <Box sx={{ minWidth: 0 }}>
                                {title && (
                                    <Typography variant="h6" component="h2">
                                        {title}
                                    </Typography>
                                )}
                                {description && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                                        {description}
                                    </Typography>
                                )}
                            </Box>
                            {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
                        </Stack>
                    </Box>
                    <Divider />
                </>
            )}

            {disablePadding ? children : <CardContent>{children}</CardContent>}

            {footer && (
                <>
                    <Divider />
                    <Box sx={{ px: 2.5, py: 1.75, bgcolor: 'sand.50' }}>{footer}</Box>
                </>
            )}
        </Card>
    )
}
