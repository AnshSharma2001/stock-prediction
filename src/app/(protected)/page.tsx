
"use client"
import React from 'react'
import {useRouter} from 'next/navigation'

const LandingPage = () => {
  const router = useRouter()

  return (
    <div>
      <>
        {router.push('/dashboard')}
      </>
    </div>
  )
}

export default LandingPage
