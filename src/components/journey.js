import { inter, openSans } from "@/lib/fonts";
import { BsArrowBarRight, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";

export default function Journey() {
  return (
    <section className="2xl:my-[112.5px] xl:my-[112.5px] lg:my-[112.5px] my-20 flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-col flex-col justify-between items-center gap-[30px] 2xl:mx-0 xl:mx-24 lg:mx-18 md:mx-2 mx-2 select-none ">
      <img
        src="/Container.png"
        className=" w-auto lg:w-[60%] 2xl:px-0 xl:px-0 lg:px-0 md:px-15 px-4 mr-auto "
      />
      <div className=" select-none 2xl:px-0 xl:px-0 lg:px-0 md:px-15 px-4 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-6 ">
        <h1
          className={` ${inter.className} font-normal 2xl:text-[48px] xl:text-[48px] lg:text-[48px] md:text-[38px] text-[28px] leading-12 text-black 
            2xl:mb-6 xl:mb-6 lg:mb-6 md:mb-4 mb-2 `}
        >
          Our journey
        </h1>
        <p
          className={` ${openSans.className} font-normal 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] text-[#58575B] leading-[22.5px]
             2xl:w-[498px] xl:w-[458px] lg:w-[320px] md:w-full   `}
        >
          Quis eleifend orci nunc, blandit massa, vitae. Dui nulla augue in id
          enim non. Venenatis aenean suscipit facilisis amet. Pellentesque
          nullam mi vitae neque ipsum. Quis in vitae est eu pulvinar sed. Netus
          lorem sit turpis tristique pharetra sit. Tortor ornare libero semper
          cursus. Mollis erat augue egestas laoreet est auctor.
          <br />
          <br />
          Dui nulla augue in id enim non. Venenatis aenean suscipit facilisis
          amet. Pellentesque nullam mi vitae neque ipsum. Sem magna ut pharetra
          vitae duis eu senectus sem risus. Morbi non, semper vestibulum euismod
          accumsan augue.
        </p>
        <button
          className={` ${openSans.className} font-normal 2xl;text-[13.5px] xl:text-[13.5px] md:text-[12px] text-[10px] text-white
             2xl:px-[35.44px] xl:px-[35.44px] lg:px-[35.44px] md:px-[30px] px-6 2xl:py-[21.25px] xl:py-[21.5px] lg:py-5 md:py-4 py-3 bg-black
             border-2 border-black rounded-lg 2xl:mt-[35px] xl:mt-[35px] lg:mt-[35px] md:mt-[30px] mt-6
             flex justify-center items-center gap-2 cursor-pointer
             hover:bg-transparent hover:text-black hover:border-black duration-300 ease-out `}
        >
          Read More
          <BsArrowRight className=" text-[16px] " />
        </button>
      </div>
    </section>
  );
}
