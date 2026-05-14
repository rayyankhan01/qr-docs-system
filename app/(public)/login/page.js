'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { Button, TextField,Card,CardContent,Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'


export default function LoginPage(){

    const [id,SetID]=useState('')
    const [password,SetPassword]=useState('')
    const [error,setError]=useState('')
    const router = useRouter()


     const handleLogin = async () => {
        const email = `${id}@sevenspikes.internal`    
        console.log('Logging in with:', email)
        const { data, error:authError } = await supabase.auth.signInWithPassword({ email, password })
        console.log('Auth result:', data, authError)

        if (authError) {
            setError(authError.message)
            return
        }
            console.log('Pushing to dashboard...')
        router.push('/dashboard')
    }
    return (
            <Box sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', display: 'flex' }}>
                <Card sx={{ width: 400 }}>
                    <CardContent>
                        <Typography variant="h5">Login</Typography>
                        {error && <Typography color="error">{error}</Typography>}
                        <TextField label="Staff ID" value={id} onChange={(e)=>SetID(e.target.value)} fullWidth margin="normal"/>
                        <TextField label="Password" type="password" value={password} onChange={(e)=>SetPassword(e.target.value)} fullWidth margin="normal"/>
                        <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                    </CardContent>
                </Card>


            </Box>  
    )
}
