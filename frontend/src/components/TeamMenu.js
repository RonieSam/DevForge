'use client';

import { OrgContext } from '@/context/OrgContext'
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'

export default function TeamMenu({showTeams,setShowTeams}) {
  const {allUserOrgs,selectOrg}=useContext(OrgContext)
  
  
  return (
    <div  >
          {showTeams&&<div>
              <Link href="/dashboard/org" className='block border p-1 w-full flex items-center justify-center'>New Team +</Link>
                {allUserOrgs.map((org)=><div key={org.id} className='border p-1 block w-full flex items-center justify-center' onClick={()=>{selectOrg(org);setShowTeams(false)}}>{org.name}</div>)}
            </div>}
    </div>
  )
}
