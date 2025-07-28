import { TaskHome } from '@/components/Chat/Task/TaskHome'
import ProtectedRoute from "@/components/Auth/ProtectedRoute"
import React from 'react'

const Page = () => {
  return (
    <>
      <div className='py-5 lg:px-52'>
         <TaskHome/>
      </div>
    </>
  )
}

export default Page
