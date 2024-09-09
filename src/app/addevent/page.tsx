import Component from '@/components/addyap'
import React from 'react'
import Header from "@/components/header"


export default function page() {
  return (
    <div className="container">
     
      <Header/>
      <div className='flex justify-center items-center h-screen'>
       <Component/>
       </div>
    </div>
  )
}
