"use client";
import Nav from "@/components/nav";
import { FC, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useRouter();
  interface Data {
    email: string;
    password: string;
  }

  const initialData: Data = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState<Data>(initialData);
  const { email, password } = user;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const resp = await fetch("http://localhost:5000/auth/signup", {
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify(
          {user}
          )

      });
      if (resp.status === 402) {
        alert("Please fill all the filled ");
      } else if (resp.status === 422) {
        alert("User already exist ");
      } else {
        router.replace("/login");
      }
    } catch (err) {
      console.log("signup", err);
    }
  };
  return (
    <>
      <section className="text-white bg-[url('../../public/asset/signup.jpg')] bg-center bg-cover overflow-hidden">
        <section className="  bg-black/40 w-full h-[100vh]  ">
          <Nav />
          <div className=" flex w-full h-full justify-center items-center">
            <div className="bg-black opacity-70 w-[300px] p-3 ">
              <form
                method="POST"
                onSubmit={onSubmit}
                className="flex flex-col gap-5"
              >
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="email"
                  className="boder-2  bg-neutral-800  border-white outline-none p-1"
                />
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="boder-2 bg-neutral-800  border-white outline-none p-1"
                />
                <button>Submit {email}</button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Page;
