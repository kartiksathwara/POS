import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products,setProducts, allProducts, loading, error };
};

export default useFetchProducts;
