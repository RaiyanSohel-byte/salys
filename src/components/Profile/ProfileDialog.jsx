"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import ProfileWithActivity from '@/components/Profile/ProfileWithActivity';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ProfileDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Image 
          className='rounded-full cursor-pointer hover:ring-2 hover:ring-white/30 transition-all' 
          src={"/avater.png"} 
          alt='Profile_Image' 
          width={50} 
          height={50}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1075px] h-[550px] overflow-y-auto bg-blue-950 [&>button]:text-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <h1 className='text-center text-2xl font-bold text-white mb-6 flex-1'>Your Profile</h1>
          </DialogTitle>
          <ProfileWithActivity onCloseDialog={() => setIsDialogOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
