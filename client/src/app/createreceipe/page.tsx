"use client";
import Nav from "@/components/nav";
import { FC, useState, useEffect,  ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useRouter()
  const callAbout = async ()=>{
    try {
        const res = await fetch('https://receipe-app-api.vercel.app/auth',{
          method:'GET',
          headers:{
            Accept:'appllication/json',
            'Content-Type':"application/json"
          },
          credentials:'include'
        })    
        const data = await res.json()
        if(res.status !== 200 ){

          router.replace('/login')
          const error = new Error('login plzz')
          throw error
        }
      } catch (error) {
        console.log("dd",error);
      }
    }
    useEffect(() => {
      callAbout()
      }, [])



  interface Data {
    name: string;
    ingredients: string[];
    cookingTime: number;
    imageUrl: string;
    instruction: string;
  }

  const initialData: Data = {
    name: "",
    ingredients: [""], // Initialize ingredients as an empty array
    cookingTime: 0,
    imageUrl: "",
    instruction: "",
  };


  const [data, setData] = useState<Data>(initialData);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const handleIngredientsChange = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = event.target;
    const ingredients = [...data.ingredients]; // Create a copy of the array
    ingredients[idx] = value; // Update the specific element
    setData({ ...data, ingredients }); // Update the state
    
};
const addIngredient = () => {
    setData({ ...data, ingredients: [...data.ingredients, ""] });
};
const removeIngredient = () => {
    const ingredients = [...data.ingredients];
    ingredients.pop()
    setData({ ...data, ingredients });
};


const onSubmit =async (event:any) => {
  event.preventDefault()
 try {
  console.log(1);
  const gCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        ?.split("=")[1];
  // const response = await axios.post('https://receipe-app-api.vercel.app/receipes',{...data, userOwner:gCookie})
  const response = await fetch('https://receipe-app-api.vercel.app/receipes',{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({...data, userOwner:gCookie}),
  })
  
  console.log(3);
  if (response.status != 200) {
      alert ('Error Occured')
  } else{
    alert('Receiepe Saved')
    router.replace('/receipes')
  }   
 } catch (er) {
    console.log(er);
    
 }
  
}

return (
    <>
      <section className="bg-[#D3D3D3] ">
        <Nav />
        <div className="text-black flex justify-center items-center w-full min-h-[92vh]  mt-7">
          <div className="text-black bg-white box_shadow rounded-lg p-3">
            <h2 className="text-center text-lg mb-2">Create Your Receipe</h2>
            <form
              method=""
              className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-8 p-3"
              onSubmit={onSubmit}
            >
              <div className="col-span-full ">
                <input
                  onChange={handleChange}
                  value={data.name}
                  className="outline-none border-2 border-black p-[2px] rounded-sm w-full"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Tittle"
                />
              </div>
              <div className="col-span-full flex flex-col gap-3 ">
                <h2> Enter The Ingredients: </h2>
                {data.ingredients.map((elem, idx) => {
                  return (
                    <input
                      key={idx}
                      onChange={(event) => handleIngredientsChange(event, idx)}
                      value={data.ingredients[idx]}
                      className="outline-none border-2 border-black p-[2px] rounded-sm"
                      type="text"
                      name="ingredients"
                      id="ingredients"
                      placeholder={`${idx+1}: Ingredients`}
                    />
                  );
                })}
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                    type="button"
                    onClick={addIngredient}
                    className="w-[70px] h-[30px] border-2 border-black"
                    >
                    {" "}
                    Add
                    </button>
                    <button
                    type="button"
                    onClick={removeIngredient}
                    className="w-[70px] h-[30px] border-2 border-black"
                    >
                    {" "}
                    Remove
                    </button>

                </div>

              </div>
              <div className="col-span-full">
                <textarea
                  onChange={handleChange}
                  value={data.instruction}
                  className="outline-none border-2 border-black p-[2px] rounded-sm w-full h-[200px] md:h-[100px]"
                  name="instruction"
                  id="instruction"
                  placeholder="Description"
                />
              </div>
              <div className="flex flex-col gap-2" >
                <label htmlFor="cookingTime"> Cooking Time</label>
                <input
                  onChange={handleChange}
                  value={data.cookingTime}
                  className="outline-none border-2 border-black p-[2px] rounded-sm"
                  type="number"
                  name="cookingTime"
                  id="cookingTime"
                  placeholder="Cooking Time "
                />
              </div>
              <div className="flex flex-col gap-2" >
              <label htmlFor="imageUrl">Image Url</label>
                <input
                  onChange={handleChange}
                  value={data.imageUrl}
                  className="outline-none border-2 border-black p-[2px] rounded-sm"
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  placeholder="Image Url"
                />
              </div>
              
              <div className="flex items-end justify-center">
                <button
                  type="submit"
                  className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-[7px] text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 "
                >
                  Sumbit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
