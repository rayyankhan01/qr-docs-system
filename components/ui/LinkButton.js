'use client'

import { Button } from '@mui/material'
import Link from 'next/link'

/**
 * A MUI Button that navigates, rendered as a single <a> with Next's
 * client-side routing.
 *
 * Why this exists: `<Button component={Link}>` cannot be written directly in a
 * server component, because `component` takes a function and functions are not
 * serializable across the server/client boundary. Doing it here — inside a
 * client component — means no boundary is crossed, and server components can
 * use <LinkButton href="..."> freely.
 *
 * Avoid <Link><Button/></Link>: that nests a <button> inside an <a>, which is
 * invalid HTML and confuses keyboard and screen-reader navigation.
 *
 * Takes every Button prop: variant, color, size, startIcon, sx, ...
 */
export default function LinkButton({ href, children, ...props }) {
    return (
        <Button component={Link} href={href} {...props}>
            {children}
        </Button>
    )
}
