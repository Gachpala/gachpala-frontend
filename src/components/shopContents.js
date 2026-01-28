"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, interSec } from "@/lib/fonts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { productReducer } from "@/app/slices/products_slices";
import { useSearchParams } from "next/navigation";

export default function ShopContents() {
  let productData = useSelector((state) => state.products.product);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(!productData);

  console.log(productData, selectedCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!productData) {
        try {
          setIsLoading(true);
          let data = await axios.get("https://dummyjson.com/products");
          dispatch(productReducer(data.data.products));
        } catch (error) {
          console.error("Failed to fetch products:", error);
          setIsLoading(false);
        }
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on selected category and update loading state
  useEffect(() => {
    if (productData) {
      if (selectedCategory) {
        const filtered = productData.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === selectedCategory.toLowerCase(),
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(productData);
      }
      setIsLoading(false);
    }
  }, [productData, selectedCategory]);

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
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 20 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            // Show products when loaded
            filteredProducts
              .slice(0, 20)
              .map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  img={product.thumbnail}
                  alt={product.title}
                  title={product.title}
                  price={`${product.price}`}
                />
              ))
          ) : (
            // Show empty state when no products
            <div className="col-span-4 text-center py-10">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
