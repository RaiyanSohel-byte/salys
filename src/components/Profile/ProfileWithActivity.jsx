'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdCheck, MdClose, MdLogout } from 'react-icons/md'
import { DialogDemo } from '../ui/edit_profile_dialogue/dialogue'
import { Button } from '../ui/button'
import { removeTokens } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { useAxios } from '@/providers/AxiosProvider'
import { FaCircleUser } from "react-icons/fa6";

const ProfileWithActivity = ({  onCloseDialog , userData , handleUpdate }) => {
  const allDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  const allActivityStatus = ['check', 'check', 'check', 'check', 'check', 'check', 'cross']
 
  const router = useRouter()

  const axios = useAxios()

  const [dayRange, setDayRange] = useState(7)

  const handleDayChange = (e) => {
    setDayRange(Number(e.target.value))
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Logout button clicked!'); // Debug log
    
    // Close the dialog first
    if (onCloseDialog) {
      onCloseDialog();
      // Wait a bit for the dialog to close
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0059FF',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel',
        background: '#1a1f2e',
        color: '#ffffff',
        customClass: {
          popup: 'swal-high-zindex'
        }
      });

      console.log('Modal result:', result); // Debug log

      if (result.isConfirmed) {
        console.log('User confirmed logout'); // Debug log
        // Clear tokens and redirect to login
        removeTokens();
        
        // Show success message
        await Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          background: '#1a1f2e',
          color: '#ffffff',
          confirmButtonColor: '#0059FF',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'swal-high-zindex'
          }
        });

        console.log('Redirecting to login...'); // Debug log
        // Redirect to login page
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to logout. Please try again.',
        icon: 'error',
        background: '#1a1f2e',
        color: '#ffffff',
        confirmButtonColor: '#0059FF',
        customClass: {
          popup: 'swal-high-zindex'
        }
      });
    }
  }

  const days = allDays.slice(0, dayRange)
  const activityStatus = allActivityStatus.slice(0, dayRange)

  


  return (
    <>
      <style jsx global>{`
        .swal-high-zindex {
          z-index: 99999 !important;
        }
        .swal2-container {
          z-index: 99999 !important;
        }
      `}</style>
      <div className=" bg-[#060F25] px-0 md:px-10 py-8">
      <div className="w-full space-y-6">
        {/* User Profile Card */}
        <div className="bg-[#0E1B38] rounded-none md:rounded-xl px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
             {userData?.image ? (
                <Image
                  src={userData?.profile_image}
                  alt="Profile"
                  width={90}
                  height={90}
                  className="rounded-full border-4 border-blue-500"
                />
              ) : (
               <FaCircleUser size={100} className='text-blue-100'/>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{userData?.name || 'Unknown User'}</h2>
              <p className="text-[#57A3FF] text-sm mt-1">{userData?.email || 'Unknown Email'}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end md:justify-start">
            <DialogDemo userData={userData} handleUpdate={handleUpdate} />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
              type="button"
            >
              <MdLogout className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        
        
      </div>
    </div>
    </>
  )
}

export default ProfileWithActivity
