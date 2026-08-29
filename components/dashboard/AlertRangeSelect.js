'use client'

import {Select, MenuItem} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

const RANGE_OPTIONS = [7,14,30,60,90]

export default function AlertRangeSelect ({defaultDays}){
        const router = useRouter()
        const searchParams = useSearchParams()

        const handleChange = (e) =>{
            const params = new URLSearchParams(searchParams)
            params.set('days', e.target.value)
            router.push(`/dashboard?${params.toString()}`)
        }

        return (
            <Select value ={defaultDays} onChange = {handleChange} size = 'small'>
                {RANGE_OPTIONS.map((d) =>(
                    <MenuItem key ={d} value ={d}>Next {d} days</MenuItem>
                ))}
            </Select>
        )

}