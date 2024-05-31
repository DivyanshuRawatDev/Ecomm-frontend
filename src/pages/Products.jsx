import React, { useEffect } from "react";
import Cards from "../components/products/Cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import SkeletonCard from "../utils/SkeletonCard";

const Products = () => {
  const dispatch = useDispatch();

  const { products:data, isLoading, isError } = useSelector((store) => {
    return store.product;
  });

  console.log(data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="flex justify-center">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 max-w-screen-xl">
        {isLoading
          ? skeletonArray.map((_, index) => (
              <SkeletonCard key={index} isLoading={true} />
            ))
          : data?.data?.map((item, index) => <Cards key={index} data={item} />)}
      </div>
    </div>
  );
};

export default Products;
