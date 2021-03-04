import React, { useState } from 'react'

const SearchBar = ({ fetchNasaData, input, setInput }) => {
  const [placeholder, setPlaceholder] = useState('Effectuez une recherche')

  const onSubmit = () => {
    if (input.length >= 3) {
      fetchNasaData(
        `https://images-api.nasa.gov/search?q=${encodeURI(input)}&page=1`,
      )
    } else {
      setInput('')
      setPlaceholder('3 caractères minimum')
    }
  }

  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="search-container">
      <input
        className="searchbar__input"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="searchbar__btn" type="submit">
        <img src="/img/search.png" alt="" class="icon-search"></img>
      </button>
      </div>
    </form>
  )
}

export default SearchBar
