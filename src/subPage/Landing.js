import Container from "@/components/container";
import Journey from "@/components/journey";
import Arrival from "@/components/arrival";
import Collection from "@/components/collection";
import Banner from "@/components/banner";

export default function Landing() {
  return (
    <>
      <Banner />
     
      <Container>
        <Arrival />
        <Collection />
      </Container>
    </>
  );
}
