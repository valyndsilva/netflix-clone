import React, { useContext } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import TmdbContext from "../context/TmdbContext";
import { DebounceInput } from "react-debounce-input";
function Search() {
  const { handleSearch, searchTerm, setSearchActive } = useContext(TmdbContext);
  return (
    <form className="hidden md:inline-flex items-center">
      <SearchIcon
        className="absolute inset-y-0 my-auto !h-7 !w-8 ml-2 border-r border-transparent peer-focus:border-red-300 peer-focus:stroke-gray-500 text-white cursor-pointer hidden md:inline-flex"
        onClick={() => setSearchActive((prev) => !prev)}
      />
      {/* <input
        type="search"
        name="search"
        id="search"
        className="searchInput relative peer  z-10  bg-transparent w-12 h-10   cursor-pointer outline-none pl-12 focus:border focus:w-full focus:border-gray-300 focus:cursor-text focus:pl-12 focus:pr-4"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)} //works with option1
        // onChange={handleSearch} //works with option 2
        placeholder="Title, people, genres"
      /> */}
      <DebounceInput
        type="search"
        name="search"
        id="search"
        className="searchInput relative peer  z-10  bg-transparent w-12 h-10   cursor-pointer outline-none pl-12 focus:border focus:w-full focus:border-gray-300 focus:cursor-text focus:pl-12 focus:pr-4"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)} //works with option1
        // onChange={handleSearch} //works with option 2
        placeholder="Title, people, genres"
      />
    </form>
  );
}

export default Search;
