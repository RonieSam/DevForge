import React, { useState } from 'react'

export default function OrgRequest({org,setHasRequest,sendRequest}) {
    const [msg,setMsg]=useState("")
    function handleOnSubmit(e){
        e.preventDefault()
        sendRequest(org.slug,msg);
        setHasRequest(null)
    }
  return (
    <form className='flex flex-col items-center justify-center absolute h-[40%] w-[30%] border top-60 bg-white' onSubmit={handleOnSubmit}>
        <div className='font-bold text-2xl m-2'>Send a request to join {org.name}</div>
        <textarea className='w-[80%] h-[50%] border p-2 m-3' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <div className='flex w-[70%] justify-between m-7'>
            <button type='submit' className='border bg-green-500 p-2'>Send</button>
            <button type='button' className='border bg-red-500 p-2' onClick={()=>setHasRequest(null)}>Cancel</button>
        </div>
    </form>
  )
}
