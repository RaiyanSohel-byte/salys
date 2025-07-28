'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { MdCheck, MdClose, MdLogout } from 'react-icons/md'
import { DialogDemo } from '../ui/edit_profile_dialogue/dialogue'
import { Button } from '../ui/button'
import { removeTokens } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

const ProfileWithActivity = ({ onCloseDialog }) => {
  const allDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  const allActivityStatus = ['check', 'check', 'check', 'check', 'check', 'check', 'cross']
  const router = useRouter()

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
      <div className="min-h-screen bg-[#060F25] px-0 md:px-10 py-8">
      <div className="w-full space-y-6">
        {/* User Profile Card */}
        <div className="bg-[#0E1B38] rounded-none md:rounded-xl px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src="/avater.png"
                alt="Profile"
                width={90}
                height={90}
                className="rounded-full border-4 border-blue-500"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Md Sohanur Rahman</h2>
              <p className="text-[#57A3FF] text-sm mt-1">mdsohanurhig316@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end md:justify-start">
            <DialogDemo />
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

        {/* Activity Card */}
        <div className="bg-[#0E1B38] rounded-none md:rounded-xl px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h3 className="text-xl text-white font-semibold mb-2 sm:mb-0">Your Activity</h3>
            <select
              className="text-white bg-[#0E1B38] border border-[#197BFF] px-3 py-1 rounded"
              value={dayRange}
              onChange={handleDayChange}
            >
              <option value={3}>3 Days</option>
              <option value={5}>5 Days</option>
              <option value={7}>7 Days</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-between sm:justify-around gap-4">
            {days.map((day, index) => {
              const isCheck = activityStatus[index] === 'check'
              return (
                <div key={day} className="flex flex-col items-center text-white text-sm">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isCheck ? 'bg-[#197BFF]' : 'bg-[#FF4D4D]'
                    }`}
                  >
                    {isCheck ? (
                      <MdCheck className="text-white" size={20} />
                    ) : (
                      <MdClose className="text-white" size={20} />
                    )}
                  </div>
                  <span className="mt-2">{day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileWithActivity
