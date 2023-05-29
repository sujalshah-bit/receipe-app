"use client";
import Nav from "@/components/nav";
import { FC, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { get } from "http";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  interface Receipe {
    // Define the type for a single receipe object
    // Adjust the properties according to your actual data structure
    _id: string;
    name: string;
    ingredients: string[];
    instruction: String;
    cookingTime: number;
    imageUrl: string;
    userOwner: string;
  }
  const [data, setdata] = useState<Receipe[]>([]);
  const router = useRouter();
  const callAbout = async () => {
    try {
      const res = await fetch("https://receipe-app-api.vercel.app/auth", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
  
      if (res.status !== 200) {
        router.replace("/login");
        const error = new Error("login plzz");
        throw error;
      }
    } catch (error) {
      console.log("dd", error);
    }
  };
  const getReceipe = async () => {
    try {
      const gCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        ?.split("=")[1];
      const resp = await fetch("https://receipe-app-api.vercel.app/receipes/getreceipe", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ gCookie }),
      });

      const responseData = await resp.json();

      setdata(responseData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    callAbout();
    getReceipe();
  }, []);

  return (
    <>
      <section className="  bg-[#28282B] text-[#F9F6EE] lato font-bold ">
        <Nav />
        <section className=" h-90vh w-full mt-10 md:mt-14  sm:w-[500px] md:w-[700px] xl:w-[1200px] m-auto min-h-[100vh]">
          {data.map((elem, idx) => {
            return (
              <>
                <Link href={`/receipe/${elem._id}`}>
                  <div className=" mb-3 text-lg text-white border-[1px] rounded-sm p-3 border-gray-500  flex flex-col md:flex-row gap-3 h-[250px] md:h-full ">
                    <div className="  md:w-[70%]  md:h-[30vh]">
                      <h3 className="text-2xl ">{elem.name}</h3>
                      <p className="md:text-lg mt-2 max-h-[75px] md:max-h-[21vh] overflow-y-hidden">
                        {elem.instruction}
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundImage: `url(${elem.imageUrl})`,
                      }}
                      className="  bg-center bg-cover bg-no-repeat w-full h-[100px] md:w-[30%] md:h-[30vh] "
                    ></div>
                  </div>
                </Link>
              </>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Page;
