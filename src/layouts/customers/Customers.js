import React from "react";
import customer_list from "../../assets/json/customers-list.json";
import Table from "../../components/table/Table";
import "./Customer.css";
import Info from "./info";
const headData = Object.keys(customer_list[0]);
const bodyData = customer_list;
const string = "Delete";
function Customers() {
  const [id, setId] = React.useState();
  return (
    <div className="customers">
      <h1 className="mb-5">Top Customers</h1>

      <Table
        headData={headData}
        bodyData={bodyData}
        setId={setId}
        string={string}
      />
      <Info id={id} setId={setId} customer_list={customer_list} />
    </div>
  );
}

export default Customers;
