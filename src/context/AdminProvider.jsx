import { useEffect, useState } from "react";

import { AdminContext } from "./AdminContext";

import products from "../data/products";
import orders from "../data/orders";
import customers from "../data/customers";

export function AdminProvider({ children }) {
  const [productList, setProductList] = useState(function () {
    const savedProducts = localStorage.getItem("codee-products");

    return savedProducts ? JSON.parse(savedProducts) : products;
  });

  const [orderList, setOrderList] = useState(function () {
    const savedOrders = localStorage.getItem("codee-orders");

    return savedOrders ? JSON.parse(savedOrders) : orders;
  });

  const [customerList, setCustomerList] = useState(function () {
    const savedCustomers = localStorage.getItem("codee-customers");

    return savedCustomers ? JSON.parse(savedCustomers) : customers;
  });

  useEffect(
    function () {
      localStorage.setItem("codee-products", JSON.stringify(productList));
    },
    [productList],
  );

  useEffect(
    function () {
      localStorage.setItem("codee-orders", JSON.stringify(orderList));
    },
    [orderList],
  );

  useEffect(
    function () {
      localStorage.setItem("codee-customers", JSON.stringify(customerList));
    },
    [customerList],
  );

  function resetAdminData() {
    setProductList(products);
    setOrderList(orders);
    setCustomerList(customers);
  }

  return (
    <AdminContext.Provider
      value={{
        productList,
        setProductList,
        orderList,
        setOrderList,
        customerList,
        setCustomerList,
        resetAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
