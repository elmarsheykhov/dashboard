import React, { useState, useEffect, useReducer } from "react";
import Table from "../../components/table/Table";
import { Skeleton } from "antd";
import Info from "./info";

function Products() {
  const [state, setState] = useReducer();

  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = React.useState(null);
  const API_LINK = "https://fakestoreapi.com/products";
  const getProducts = async () => {
    try {
      const response = await fetch(API_LINK);

      if (!response.ok) {
        const msg = `There was an error ${response.status} ${response.statusText}`;
        throw new Error(msg);
      }
      const product = await response.json();
      setProductsData(product);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const headData =
    productsData.length > 0
      ? Object.keys(productsData[0]).filter((key) => key !== "description")
      : [];
  const bodyData = productsData;

  return (
    <div>
      <h2 className="mb-5">Top Products</h2>
      {isLoading ? (
        <div>
          <div className=" d-flex gap-5">
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
          </div>
          <div className=" d-flex gap-5">
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
          </div>
          <div className=" d-flex gap-5">
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
          </div>
          <div className=" d-flex gap-5">
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
            <Skeleton active round style={{ width: "400px" }} />
          </div>
        </div>
      ) : (
        <>
          <Table headData={headData} bodyData={bodyData} setId={setId} />
          <Info id={id} setId={setId} api={API_LINK} />
        </>
      )}
    </div>
  );
}

export default Products;