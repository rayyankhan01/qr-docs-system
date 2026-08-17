'use client'

import { ListItem } from '@mui/material'
import Link from 'next/link'

/**
 * A MUI ListItem that navigates, same reasoning as LinkButton: `component={Link}`
 * can't be written directly in a server component because Link is a function
 * and functions aren't serializable across the server/client boundary.
 */
export default function LinkListItem({ href, children, ...props }) {
    return (
        <ListItem component={Link} href={href} {...props}>
            {children}
        </ListItem>
    )
}