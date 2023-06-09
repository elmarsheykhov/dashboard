import React, { useState } from "react";
import "./Table.css";
function Table({
  headData,
  bodyData,
  setId,
  basket,
  setBasket,
  setBasketProducts,
  productCount,
  setProductCount,
  string,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [clicked, setClicked] = React.useState(false);

  const itemsPerPage = Number(selectedLimit);
  const totalPages = Math.ceil(bodyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  if (endIndex > bodyData.length) {
    endIndex = bodyData.length;
  }
  const slicedData = bodyData.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //This is for Products
  const handleBasket = (e, item) => {
    if (e.target.checked) {
      setBasket([...basket, item]);
      setProductCount(productCount + 1);
    } else {
      setBasket(basket.filter((basketItem) => basketItem !== item));
      setProductCount(productCount - 1);
    }
  };
  React.useEffect(() => {
    if (basket) {
      setBasketProducts(basket);
    }
  }, [basket]);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const displayPages = [];
    const currentPageIndex = currentPage - 1;
    const maxPageNumbersToShow = 5;
    const showEllipsis = pageNumbers.length > maxPageNumbersToShow;

    if (!showEllipsis) {
      displayPages.push(...pageNumbers);
    } else {
      if (currentPage <= Math.ceil(maxPageNumbersToShow / 2)) {
        displayPages.push(...pageNumbers.slice(0, maxPageNumbersToShow));
        displayPages.push("...");
      } else if (
        currentPage >=
        totalPages - Math.floor(maxPageNumbersToShow / 2)
      ) {
        displayPages.push("...");
        displayPages.push(...pageNumbers.slice(-maxPageNumbersToShow));
      } else {
        const startIndex =
          currentPageIndex - Math.floor(maxPageNumbersToShow / 2);
        const endIndex = startIndex + maxPageNumbersToShow - 1;
        displayPages.push("...");
        displayPages.push(...pageNumbers.slice(startIndex, endIndex));
        displayPages.push("...");
      }
    }

    return (
      <div className="pagination d-flex justify-content-between align-items-center">
        <div className="limit fs-5">
          <select
            name="limit"
            value={selectedLimit}
            onChange={(event) => setSelectedLimit(event.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          {displayPages.length > 1 && (
            <div className="pagination_block d-flex py-2">
              {displayPages.map((pageNumber, index) => (
                <div
                  key={index}
                  className={`page-number py-2 px-3 ${
                    pageNumber === currentPage ? "active" : ""
                  } ${pageNumber === "..." ? "ellipsis" : ""}`}
                  onClick={
                    pageNumber === "..."
                      ? null
                      : () => handlePageClick(pageNumber)
                  }
                >
                  {pageNumber}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-4 table_component">
        <table className="table mb-3">
          <thead>
            <tr>
              {headData.map((item, index, headData) => (
                <th key={index} className="head_elements p-3">
                  {item}
                </th>
              ))}
              <th className=" p-3 text-center ">Info</th>
              <th className=" p-3 text-center">{string}</th>
            </tr>
          </thead>
          <tbody>
            {slicedData.map((item, index) => (
              <tr key={index}>
                {headData.map((key) => {
                  if (key === "image") {
                    return (
                      <td key={key} className="p-3">
                        <img
                          src={item[key]}
                          alt={item["title"]}
                          width="50"
                          height="50"
                        />
                      </td>
                    );
                  }
                  return (
                    <td
                      key={key}
                      className="p-3"
                      style={{ whiteSpace: "pre-line", maxWidth: "500px" }}
                    >
                      {typeof item[key] === "object"
                        ? `rate: ${JSON.stringify(
                            item[key].rate
                          )}\ncount: ${JSON.stringify(item[key].count)}`
                        : item[key]}
                    </td>
                  );
                })}
                <td className="text-center p-2">
                  <i
                    className="table_icon  bx bx-info-circle"
                    onClick={() => {
                      setId(index + selectedLimit * (currentPage - 1) + 1);
                    }}
                  ></i>
                </td>
                <td className="text-center p-2">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={
                      basket &&
                      basket.some((basketItem) => basketItem.id === item.id)
                    }
                    onChange={(e) => handleBasket(e, item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </>
  );
}

export default Table;
