import Nav from "@/components/nav";

export default function Home() {
  return (
    <>
      <section className="text-white bg-[url('../../public/asset/bg.jpg')] bg-center bg-cover overflow-hidden">
        <section className="  bg-black/40 w-full h-[100vh]   ">
          <Nav />
          {/* home */}
          <section className=" h-full  flex justify-center items-center gap-3 flex-col">
            <div className="text-white p-3 font-medium md:w-[600px]">
            Welcome to Cooked, where culinary inspiration awaits! Discover a world of delicious flavors, mouthwatering dishes, and creative recipes to satisfy your taste buds. Whether youre an experienced chef or a passionate home cook, our recipe app is here to elevate your cooking game.
            </div>
            <div className="text-center  font-medium w-[110px] h-[35px] border-[2px] border-white">
              Learn More...
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
