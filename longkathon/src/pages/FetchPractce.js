import React, { useEffect, useMemo, useState } from "react";
import { updateCategoryAPI } from "../API/Category";
import styled from "styled-components";

const FetchPractice = () => {
  const [totalCount, setTotalCount] = useState(0); // 카운트의 총합
  const [categories, setCategories] = useState([
    // 임시 데이터로 설정
    { cateId: 1, name: "Category 1", color: "#EA7E7A", isHighlighted: false },
    { cateId: 2, name: "Category 2", color: "#FBA96F", isHighlighted: true },
    { cateId: 3, name: "Category 3", color: "#5BA8FB", isHighlighted: false },
  ]);


  const colorNameMap = {
    "#EA7E7A": "red",
    "#FBA96F": "orange",
    "#5BA8FB": "lightblue",
    "#002ED1": "darkblue",
    "#9ED4B6": "green",
    "#927CFF": "purple",
    "#D9A9ED": "pink",
    "#BDBDBD": "gray",
    "#424242": "black",
  };
  
  const handleIsMarkedChange = (cateId, isMarked) => {
    console.log(
      `Received update for Category ${cateId}: isHighlighted = ${isMarked}`
    );

    const updatedCategories = categories.map((category) => {
      if (category.cateId === cateId) {
        console.log(`Updating Category ${cateId} to isHighlighted: ${isMarked}`);
        return { ...category, isHighlighted: isMarked };
      }
      return category;
    });

    setCategories(updatedCategories);
    console.log("Updated categories:", updatedCategories);

    updateCategoryAPI(cateId, { isHighlighted: isMarked })
      .then((response) => {
        console.log("Category updated on server:", response);
      })
      .catch((error) => {
        console.error("Error updating category on server:", error);
      });
  };

  const handleCountChange = (change) => {
    setTotalCount((prevTotal) => prevTotal + change);
    console.log(`Total Count: ${totalCount + change}`);
  };

  const categoriesWithImages = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    return categories.map((item) => {
      const colorName = colorNameMap[item.color] || "default";
      const DeleteBackgroundColor = colorName;
      const updatedItem = { ...item, DeleteBackgroundColor };
      return updatedItem;
    });
  }, [categories]);

  useEffect(() => {
    console.log("Categories with Images Updated:", categoriesWithImages);
  }, [categoriesWithImages]);

  return (
    <div>
      <div>Total Count: {totalCount}</div>
      <div>
        {categoriesWithImages.map((item) => {
          console.log("Category Data:", item); // 각 카테고리 항목 출력

          const isDisabled = totalCount >= 4 && !item.isHighlighted;

          return (
            <PracticeBox
              key={item.cateId}
              isHighlighted={item.isHighlighted}
              onClick={() =>
                handleIsMarkedChange(item.cateId, !item.isHighlighted)
              }
              isDisabled={isDisabled}
            >
              <p>ID: {item.cateId}</p>
              <p>Name: {item.name}</p>
              <p>Color: {item.DeleteBackgroundColor}</p>
              <p>Highlighted: {item.isHighlighted ? "Yes" : "No"}</p>
              <p>Disabled: {isDisabled ? "Yes" : "No"}</p>
            </PracticeBox>
          );
        })}
      </div>
    </div>
  );
};

const PracticeBox = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  background-color: ${(props) =>
    props.isHighlighted ? "lightyellow" : "white"};
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
`;

export default FetchPractice;
