import { Box, Typography, Breadcrumbs, Link as MuiLink, Stack } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'

/**
 * Standard top-of-page block: optional breadcrumbs, a title, an optional
 * supporting line, and a slot on the right for the page's primary action.
 *
 * <PageHeader
 *     title="Machines"
 *     description="Every machine on site and the documents attached to it."
 *     breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Machines' }]}
 *     action={<Button variant="contained">Add machine</Button>}
 * />
 */
export default function PageHeader({ title, description, breadcrumbs, action, sx }) {
    return (
        <Box sx={{ mb: 3, ...sx }}>
            {breadcrumbs?.length > 0 && (
                <Breadcrumbs
                    separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
                    sx={{ mb: 1 }}
                >
                    {breadcrumbs.map((crumb, i) => {
                        const isLast = i === breadcrumbs.length - 1
                        if (isLast || !crumb.href) {
                            return (
                                <Typography key={crumb.label} variant="body2" color="text.secondary">
                                    {crumb.label}
                                </Typography>
                            )
                        }
                        return (
                            <MuiLink key={crumb.label} component={Link} href={crumb.href} variant="body2">
                                {crumb.label}
                            </MuiLink>
                        )
                    })}
                </Breadcrumbs>
            )}

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ alignItems: { sm: 'flex-start' }, justifyContent: 'space-between' }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="h4" component="h1">
                        {title}
                    </Typography>
                    {description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: '60ch' }}>
                            {description}
                        </Typography>
                    )}
                </Box>

                {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
            </Stack>
        </Box>
    )
}
