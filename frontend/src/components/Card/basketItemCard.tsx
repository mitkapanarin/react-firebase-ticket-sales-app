import React from "react";
import dayjs from "dayjs";

interface BasketItemCardProps {
  date: Date;
  image: string;
  location: string;
  title: string;
  removeItem?: undefined;
  isSaved: boolean;
  handleBookmarkClick: () => void;
  price: number;

  quantity?: number;
}

const BasketItemCard: React.FC<BasketItemCardProps> = ({
  date,
  image,
  location,
  title,
  removeItem,
  price,
  quantity,
}) => {
  return (
    <div className="mb-10">
      <div>
        <img
          className="rounded-t-lg"
          src={
            image ||
            "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ehfzal2gmtz3gj35nwr4.png"
          }
          alt={title}
          style={{ width: "250px", height: "200px" }}
        />
        <div className="p-5">
          {price} x {quantity} = {price * (quantity as number)}
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-0">
            {title}
          </h5>
          <p className="mb-2 text-gray-400 text-sm">
            {dayjs(date).format("dddd, MMMM D, YYYY")}
          </p>
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 my-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            {location}
          </span>
          <button
            onClick={removeItem}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            type="button"
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketItemCard;
