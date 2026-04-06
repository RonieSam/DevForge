'use client';
import { getOrgPrefix } from '@/api/orgApi';
import { OrgContext } from '@/context/OrgContext'
import React, { useContext, useEffect, useState } from 'react'

export default function Org() {
    const {allUserOrgs,getOrgsQuery}=useContext(OrgContext)
    const [search,setSearch]=useState("")
    useEffect(()=>{
        const delay=setTimeout(()=>{
            if(search.trim().length>1){
                getOrgsQuery(search)
            }
        },400)
        return()=>clearTimeout(delay)
    },[search])

  return (
    <div className='flex flex-col p-10 items-center h-full w-full border'>
        <div className='flex-1 w-[50%] flex justify-center items-center'><input  className='border h-[50%] flex-3 p-3'value={search} placeholder='Enter Slug' onChange={(e)=>setSearch(e.target.value)}/><button className='border p-1 h-[50%] flex-1'>Create new +</button></div>
        <div className='flex-4 w-[50%]'><h1 className='text-3xl font-bold m-2'>Your Organizations</h1>
         {allUserOrgs!=null && <div className='flex flex-col'>
          <div className='border flex justify-center items-center p-3 col-span-3 font-bold'>
                <div className='flex-1 text-center'>Name</div>
                <div className='flex-1 text-center'>Slug</div>
                <div className='flex-1 text-center'>Owner</div>
            </div>
            {
            allUserOrgs.map((org)=>{return (
            <div className='border flex justify-between p-3 col-span-3' key={org.id}>
                <div className='flex-1 text-center'>{org.name}</div>
                <div className='flex-1 text-center'>{org.slug}</div>
                <div className='flex-1 text-center'>{org.owner}</div>
            </div>)})}
            </div>}
        </div>
    </div>

  )
}
