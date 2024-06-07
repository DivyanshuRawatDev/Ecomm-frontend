import React, { useEffect, useState } from "react";
import Cards from "../components/products/Cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import SkeletonCard from "../utils/SkeletonCard";

const Products = () => {
  const dispatch = useDispatch();
  const {
    products: data,
    isLoading,
    isError,
  } = useSelector((store) => store.product);

  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [category, setFilterCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(
      fetchProducts({
        searchQuery,
        sort,
        order,
        category,
        currentPage,
        itemsPerPage,
      })
    );
  }, [dispatch, searchQuery, sort, order, category, currentPage]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => {
    const [sortField, sortOrder] = e.target.value.split("_");
    setSort(sortField);
    setOrder(sortOrder);
  };
  const handleFilterChange = (e) => setFilterCriteria(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);

  const totalPages = data?.totalPage || 4;
  const skeletonArray = Array.from({ length: itemsPerPage });

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-screen-xl mb-4">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-wrap justify-between items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="p-2 border rounded w-full md:w-1/3 mb-2 md:mb-0"
          />
          <select
            value={`${sort}_${order}`}
            onChange={handleSortChange}
            className="p-2 border rounded w-full md:w-1/4 mb-2 md:mb-0"
          >
            <option value="">Sort by</option>
            <option value="title_asc">Title: A-Z</option>
            <option value="title_desc">Title: Z-A</option>
          </select>
          <select
            value={category}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full md:w-1/4 mb-2 md:mb-0"
          >
            <option value="">Filter by</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
        {isLoading
          ? skeletonArray.map((_, index) => (
              <SkeletonCard key={index} isLoading={true} />
            ))
          : data?.data?.map((item, index) => <Cards key={index} data={item} />)}
      </div>

      <div className="flex justify-center p-4 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 mx-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
