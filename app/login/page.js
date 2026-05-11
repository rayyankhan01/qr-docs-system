'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function LoginPage(){

    const [id,SetID]=useState('')
    const [password,SetPassword]=useState('')
    const [error,SetError]=useState('')
    const router = useRouter()


    const handleLogin=async()=>{
        const email = `${staffId}@sevenspikes.internal`
        const {data:user,error} =
         await supabase.auth.signInWithPassword({
            email:{email},
            password:password
        })
        if(error){
            SetError(error.message)
        }
    
    router.push('/dashboard')
    return (
            <Container>



            </Container>  
    )
    }
}