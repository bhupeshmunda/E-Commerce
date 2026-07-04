import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice.js";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage.js";

function HeartIcon({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = async () =>{
    if(isFavorite){
        dispatch(removeFromFavorites(product));

        removeFavoriteFromLocalStorage(product._id);
    }
    else {
      dispatch(addToFavorites(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
    {isFavorite ? (<FaHeart className="text-pink-500"/>) : (<FaRegHeart className="text-white" />)}
  </div>;
}

export default HeartIcon;
