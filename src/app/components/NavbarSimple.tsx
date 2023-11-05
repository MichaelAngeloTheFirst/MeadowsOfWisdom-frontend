'use client';
import React, { Fragment } from 'react';
import { Navbar, Collapse, Typography, IconButton, Bars3Icon, XMarkIcon } from '@/lib/material';
import Link from 'next/link';
import { useAuthStore } from '@/app/stores/authStore';
import { logout } from '@/lib/logout';
import useStore from '../stores/useStore';
import { FaUserCircle } from 'react-icons/fa';

function NavList() {
  const { refreshToken } = useStore(useAuthStore, (state) => state) ?? {
    refreshToken: undefined,
  };
  const userAuthenticated = refreshToken ? true : false;

  const loggedInUI = (
    <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
      <Link
        href="/meadows"
        className="flex  transition-colors hover:text-blue-500"
        onClick={() => logout()}
      >
        Logout
      </Link>
    </Typography>
  );

  const loggedOutUI = (
    <>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link href="/login" className="flex  transition-colors hover:text-blue-500">
          Login
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link href="/register" className="flex  transition-colors hover:text-blue-500">
          Register
        </Link>
      </Typography>
    </>
  );

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex flex-row">{userAuthenticated ? loggedInUI : loggedOutUI}</div>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link href="/profile" className="flex items-center transition-colors hover:text-blue-500">
          <FaUserCircle size={20} />
        </Link>
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="/meadows" variant="h6" className="mr-4 cursor-pointer py-1.5">
          Meadows Of Wisdom
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
