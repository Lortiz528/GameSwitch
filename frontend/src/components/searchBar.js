import { useState } from "react";

export default function SearchBar({ users, searchFor }) {
  const [search, setSearch] = useState();

  const handleTextChange = (event) => {
    setSearch(event.target.value);
    searchFor(users, search);
  };

  return (
    <section>
      <form
        className="search-bar"
        onSubmit={(event) => {
          event.preventDefault();
          searchFor(users, search);
        }}
      >
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          placeholder="gamertag, game, rank..."
          onChange={handleTextChange}
        />
      </form>
    </section>
  );
}