import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "lodash";
import Items from "./Items";
import SearchBar from "./SearchBar";
import Links from "./Links";
import { ModalContext, useModal } from "../contexts/modal";
import FocusModal from "./FocusModal";

const App = () => {
  const modal = useModal();
  const [input, setInput] = useState("apollo");
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const { items, links } = collection;

  const fetchNasaData = (url) => {
    setLoading(true);
    axios.get(url).then((res) => {
      setCollection(get(res, "data.collection", null));
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNasaData(`https://images-api.nasa.gov/search?q=apollo&page=1`);
  }, []);

  return (
    <ModalContext.Provider value={modal}>
      <div className="app">
        <div className="header">
          <h1 className="app__title">NASA API Browser</h1>
          <SearchBar
            input={input}
            setInput={setInput}
            fetchNasaData={fetchNasaData}
          />
          <FocusModal />
          <Links links={links} fetchNasaData={fetchNasaData} />
        </div>

        <Items
          setInput={setInput}
          items={items}
          fetchNasaData={fetchNasaData}
        />
        <Links links={links} fetchNasaData={fetchNasaData} />
        {loading ? <p className="app__loader">Chargement...</p> : <></>}
      </div>
    </ModalContext.Provider>
  );
};

export default App;
