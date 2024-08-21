'use client'
import { Navbar } from 'flowbite-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand as={Link} href="https://flowbite-react.com">
          <Image src="https://flowbite.com/docs/images/carousel/carousel-1.svg" height={36} width={36} className="rounded-full" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
        </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/home" active>
          Beranda
        </Navbar.Link>
        <Navbar.Link as={Link} href="#">
          Profil
        </Navbar.Link>
        <Navbar.Link href="#">Galeri</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">kontak</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default NavBar