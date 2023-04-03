import { LogoutIcon } from '@heroicons/react/outline'
import { startOfDay } from 'date-fns'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useRecoilState } from 'recoil'
import { dateState } from '../atoms/dateAtom'
import { editProfileModalState } from '../atoms/modalAtom'
import Header from '../components/ui/Header'
import Loading from '../components/ui/Loading'
import ProfileEditModal from '../components/profile/ProfileEditModal'
import { auth } from '../firebase'
import useUser from '../hooks/useUser'
import ProfileDetails from '../components/profile/ProfileDetails'
import Button from '../components/ui/Button'
import Layout from '../components/layout'
import { IoFlame } from 'react-icons/io5'

function Profile() {
  const [value, setValue] = useRecoilState(dateState)
  const router = useRouter()
  const [modalOpen, setModalOpen] = useRecoilState(editProfileModalState)

  const { loadingUser, user } = useUser()

  const [flameStreak, setFlameStreak] = useState(0); // Initialize the flame streak to 0

  useEffect(() => {
    setValue(startOfDay(new Date()))
    setModalOpen(false)
  }, [])

  const handleSignout = async () => {
    signOut(auth)
    router.push('/login')
  }

  const incrementFlameStreak = () => {
    setFlameStreak((prevStreak) => prevStreak + 1);
  }

  const resetFlameStreak = () => {
    setFlameStreak(0);
  }

  return (
    <Layout>
      {loadingUser && <Loading />}
      {!loadingUser && (
        <>
          <ProfileEditModal />
          <Header />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="">
                <h2 className="text-2xl">Hi, {user?.name}</h2>
                <span className="text-xs text-slate-400">
                  Member Since :{' '}
                  <Moment format="MMM DD yyyy">
                    {user.createdAt.toDate()}
                  </Moment>
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-md bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Personal Details</h2>
                <Button onClick={() => setModalOpen(true)}>Edit profile</Button>
              </div>
              <div className="flex flex-col space-y-2 p-2 text-lg">
                {!loadingUser && <ProfileDetails user={user} />}
              </div>
            </div>
            <div className="mt-5 flex w-full items-center justify-center">
              <Button
                onClick={handleSignout}
                iconRight={<LogoutIcon className="ml-2 h-5" />}
              >
                Sign out
              </Button>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center">Version 1.4</h2>
          <h2 className="text-sm font-semibold text-center">Build: 030423</h2>
            <h1 className='text-center mt-5'> <div className="flex justify-center">
            <IoFlame className="text-red-500" />
          </div>Add your weight within 24 hours of the date to earn a flame</h1>
        </>
      )}
    </Layout>
  )
}

export default Profile

          
