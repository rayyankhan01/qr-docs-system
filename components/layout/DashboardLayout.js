'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer, List, AppBar, Toolbar, Typography, Box, ListItemButton, Menu, MenuItem, Avatar,
        ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import GroupIcon from '@mui/icons-material/Group'
import {supabase} from '@/lib/supabase'

const drawerWidth = 280

const navLinks = [
    { label: 'Dashboard', icon: DashboardIcon, href: '/dashboard' },
    { label: 'Machines', icon: PrecisionManufacturingIcon, href: '/machines' },
    { label: 'Staff', icon: GroupIcon, href: '/staff' },
]

export default function DashboardLayout({ children, isAdmin, name ,role }) {
    const pathname = usePathname()
    const router = useRouter()
    
    const visibleLinks = navLinks.filter(link=> link.href !== '/staff'||isAdmin)
    const [anchorEl,setAnchorEl] = useState(null)

    const handleLogout = async () =>{
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" >  {/*sx={{ zIndex: 1201, bgcolor: '#6B1E2A' }}*/}
                <Toolbar>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: 'gold.400' }} onClick={() => router.push('/dashboard')}>
                        Seven Spikes
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1}}>
                        QR Code Management System
                    </Typography>
                    <Box sx ={{flexGrow:1}}/>

                    
                    <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)}>
                        <Avatar sx = {{width:32, height:32, bgcolor:'gold.400',color : '#1a1a1a',border: '2px solid white'}}>
                            {name?.[0]?.toUpperCase() || '?'}
                        </Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open ={Boolean(anchorEl)} onClose ={()=>setAnchorEl(null)}>
                        <MenuItem>Hello, {name} ({role})</MenuItem>
                        <Divider/>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        // bgcolor: '#1a1a1a',
                        // color: 'white',
                        mt: '64px',
                    }
                }}
            >
                <Divider sx={{ borderColor: 'sidebar.border' }} />
                <List sx={{ mt: 1 }}>
                    {visibleLinks.map((link) => {
                        const active = pathname === link.href
                        return (
                            <ListItemButton
                                key={link.label}
                                component={Link}
                                href={link.href}
                                selected={active}
                                // sx={{
                                //     mx: 1,
                                //     borderRadius: 2,
                                //     mb: 0.5,
                                //     //bgcolor: active ? '#C9A84C' : 'transparent',
                                //     //color: active ? '#1a1a1a' : 'white',
                                //     '&:hover': {
                                //         bgcolor: active ? '#C9A84C' : '#333',
                                //     }
                                // }}
                            >
                                <ListItemIcon sx={{ color: active ? '#1a1a1a' : '#C9A84C', minWidth: 40 }}>
                                    <link.icon />
                                </ListItemIcon>
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        )
                    })}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh'}}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}