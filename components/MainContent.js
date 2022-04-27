import React from 'react'
import Header from './Header'
import ModalInput from './ModalInput'
import NavBar from './NavBar'

const MainContent = ({ children }) => {
  return (
    <main className="mx-auto flex max-w-7xl">
      <ModalInput />
      <NavBar />
      <div className="flex h-[100vh] w-full flex-col border-r-2 bg-white sm:ml-[68px] lg:ml-[240px]">
        {children}
      </div>
    </main>
  )
}

export default MainContent
