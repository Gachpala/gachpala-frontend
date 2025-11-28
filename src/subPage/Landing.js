import Container from "@/components/container";
import Journey from "@/components/journey";
import Arrival from "@/components/arrival";
import Banner from "@/components/banner";
import PopularItems from "@/components/popularItems";

export default function Landing() {
  return (
    <>
      <Banner />

      <Container>
        <Arrival />
        {/* <Collection /> */}
        <PopularItems />
      </Container>
    </>
  );
}
