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
        <nav>
          <ul>
            <li><a href="#section1">RECHERCHER</a></li>
            <li><a href="https://www.nasa.gov/">NASA</a></li>
            <li><a href="#section2">ARTICLES</a></li>
          </ul>
        </nav>
        <div className="header" id="section1" style={{ backgroundImage: "url(/img/shot-by-cerqueira-0o_GEzyargo-unsplash.jpg)" }}>
          <div className="logo-container"><img src="/img/58429400a6515b1e0ad75acc.png" className="logo"></img></div>
          <div className="title-container"><h1 className="app__title">API BROWSER</h1></div>
          <SearchBar
            input={input}
            setInput={setInput}
            fetchNasaData={fetchNasaData}
          />
          <FocusModal />
          <Links links={links} fetchNasaData={fetchNasaData} />
        </div>

        <div id="section2">
        <Items
          setInput={setInput}
          items={items}
          fetchNasaData={fetchNasaData}
        /></div>
        <Links links={links} fetchNasaData={fetchNasaData} />
        {loading ? <p className="app__loader">Chargement...</p> : <></>}
      </div>
    </ModalContext.Provider>
  );
};

export default App;
