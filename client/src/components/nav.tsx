"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useGlobalContext } from "../app/context/store";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const router = useRouter()
  const changeState = () => {
    setToggle(!toggle);
  };
  const LogOut = async () => {
    try {
      const res = await fetch('https://receipe-app-api.vercel.app/auth/logout',{
        method:'GET',
        headers:{
          Accept:'appllication/json',
          'Content-Type':"application/json"
        },
        credentials:'include'
      })
      
      router.replace('/')
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <nav className="bg-transparent flex justify-between px-3 py-1 items-center  ">
        <div className=" text-lg sm:text-base">Cooked</div>

        <ul className=" hidden sm:flex gap-3 sm:text-base">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/createreceipe">
            <li>Create Receipe</li>
          </Link>
          <Link href="/receipes">
            <li> Receipes</li>
          </Link>
        </ul>

        <div className=" hidden sm:flex gap-3 sm:text-base">
          {isLoggedIn ? (
            <button onClick={LogOut}>Log out</button>
          ) : (
            <>
              <Link href="/signup">
                <button>signup</button>
              </Link>
              <Link href="/login">
                <button>log in</button>
              </Link>
            </>
          )}
        </div>

        <div className=" sm:hidden">
          <AiOutlineMenu size={20} onClick={changeState} />
        </div>
      </nav>
      <div className="bg-transparent">
        <ul
          className={`  px-3  py-3 ${toggle ? "flexflex-col gap-1" : "hidden"}`}
        >
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/createreceipe">
            <li>Create Receipe</li>
          </Link>
          <Link href="/receipes">
            <li> Receipes</li>
          </Link>
          {isLoggedIn ? (
            <button onClick={LogOut}>Log out</button>
          ) : (
            <div className="flex flex-col">
              <Link href="/signup">
                <button>signup</button>
              </Link>
              <Link href="/login">
                <button>log in</button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
