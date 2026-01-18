"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import { inter, interSec } from "@/lib/fonts";
import { useSelector } from "react-redux";

export default function Shop() {
  let productData = useSelector((state) => state.products.product);
  console.log(productData);

  return (
    <section>
      <div className=" bg-[#ebeee3] p-18 mb-[130px] ">
        <Container>
          <div className=" bg-[#ebeee3]  ">
            <p
              className={`${inter.className} text-xl font-bold text-gray-800 mb-2`}
            >
              Shop Page
            </p>
            <p className={` ${interSec.className} text-md `}>
              home / <span className="text-gray-600">shop</span>
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className=" grid grid-cols-4 gap-6 ">
          {Array.isArray(productData) &&
            productData
              .slice(0, 12)
              .map((product) => (
                <Product
                  key={product.id}
                  img={product.thumbnail}
                  alt={product.title}
                  title={product.title}
                  price={`${product.price}`}
                />
              ))}
        </div>
      </Container>
    </section>
  );
}
