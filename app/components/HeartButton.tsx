"use client";

// import React, { useEffect, useState } from "react";
import useFavorite from "@/hooks/useFavorite";

import { Heart } from "lucide-react";
import { User } from "@prisma/client";
// import { sessionUser } from "../utils/fake-data";

interface HeartButtonProps {
  productId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  productId,
  currentUser,
}) => {
  // const [hasFav, setHasFav] = useState(false);
  const { hasFavorite, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  });
  // useEffect(() => {
  //   if (hasFavorite) {
  //     setHasFav(hasFavorite);
  //   }
  // }, [hasFavorite]);
  // if (hasFavorite) {
  //   setHasFav(hasFavorite);
  // }

  return (
    <div
      onClick={toggleFavorite}
      className="
        absolute
        right-5
        hover:scale-125
        transition
        cursor-pointer
      "
    >
      {hasFavorite ? (
        <Heart fill="red" strokeWidth={0} />
      ) : (
        <Heart className="text-red-500" />
      )}
    </div>
  );
};

export default HeartButton;
