"use client"
import Nav from "@/components/nav";
import axios from "axios";
import { useParams } from 'next/navigation';
import { FC, useState, useEffect } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useParams();
  const id = router.id;

  interface Receipe {
    _id: string;
    name: string;
    ingredients: string[];
    instruction: string;
    cookingTime: number;
    imageUrl: string;
    userOwner: string;
  }

  const [data, setData] = useState<Receipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/receipes/id', {
          receipeId: id
        });
        const { message, receipe } = response.data;
        setData(receipe);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  return (
    <>
      <section className="bg-[#28282B] text-[#FAF9F6] font-Roboto">
        <Nav />
        <div className="mt-5 px-[14px] sm:px min-h-[100vh] w-full md:w-[500px] lg:w-[700px] xl:w-[1200px] m-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div
                className="mb-5 -0 bg-center rounded-md bg-cover bg-no-repeat w-full h-[500px]"
                style={{
                  backgroundImage: `url(${data?.imageUrl})`,
                }}
              ></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 gap-3 mb-5">
                <p className="text-xl row-span-1">
                  <span className="font-bold text-lg">Tittle:</span> {data?.name}
                </p>
                <p className="text-xl">
                  <span className="font-bold text-lg">Cooking Time: </span>
                  {data?.cookingTime} min
                </p>
              </div>
              <p className="mb-5 text-lg"><span className="font-bold ">Ingredients:</span> {data?.ingredients}</p>
              {/* ... */}
              <p className="text-lg">{data?.instruction}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
