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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  console.log(productData, selectedCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!productData) {
        try {
          setIsLoading(true);
          let data = await axios.get("https://api.gachpala.com/products");
          dispatch(productReducer(data.data));
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
            product.category_name &&
            product.category_name.toLowerCase() ===
            selectedCategory.toLowerCase(),
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(productData);
      }
      setIsLoading(false);
      setCurrentPage(1); // Reset to first page on filter change
    }
  }, [productData, selectedCategory]);

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, endIdx);

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
            <p className="mt-2 text-gray-700 text-sm">
              Showing {startIdx + 1}-{Math.min(endIdx, totalProducts)} of{" "}
              {totalProducts} products
            </p>
          </div>
        </Container>
      </div>

      <Container className=" max-w-[1400px]! bg-[#ebeee3] rounded-2xl " >
        <div className="grid grid-cols-4 mx-auto p-x-4 py-14 ">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: productsPerPage }).map((_, i) => (
              <ProductSkeleton key={i} className={` my-8 `} />
            ))
          ) : Array.isArray(currentProducts) && currentProducts.length > 0 ? (
            // Show products when loaded
            currentProducts.map((product) => (
              <Product
                className="my-8 mx-auto "
                key={product.id}
                id={product.id}
                img={product.image_url === "" ? product.thumbnail : product.image_url}
                alt={product.name}
                title={product.name}
                price={`${product.price}`}
                description={product.description}
                stock={product.stock}
                category_id={product.category_id}
                category_name={product.category_name}
                is_featured={product.is_featured}
                created_at={product.created_at}
                status={product.status}
                weight={product.weight}
                dimensions={product.dimensions}
              />
            ))
          ) : (
            // Show empty state when no products
            <div className="col-span-4 text-center py-10">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
