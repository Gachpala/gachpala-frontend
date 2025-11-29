import Journey from "@/components/journey";
import Container from "@/components/container";
import AboutSlider from "@/components/aboutSlider";

export default function About() {
  return (
    <section>
      <AboutSlider />
      <div className=" w-full bg-[#EBEEE3] flex flex-wrap justify-evenly items-center 2xl:py-[105px] xl:py-20 lg:py-18 md:py-16 py-10 ">
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
      </div>
      <Container>
        <Journey />
      </Container>
    </section>
  );
}
