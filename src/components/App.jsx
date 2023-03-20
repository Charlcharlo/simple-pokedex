import '../styles.css';
import Header from './Header';
import SearchBar from './SearchBar';
import DexEntry from './DexEntry';
import { useState, useEffect } from 'react';

function App() {
  const [ready, setReady] = useState(true);
  const [dexData, setDexData] = useState(null);
  const [monPresent, setMonPresent] = useState(false);
  const [search, setSearch] = useState(null);
  const [space, setSpace] = useState("0");

  useEffect(() => {
    const view = document.getElementById("header");
    view.scrollIntoView({behavior: "smooth"});
  },
  []);

  //Scroll to results on completion of Search

  useEffect(() => {
    if (search !== null) {
      const view = document.getElementById("entry-container");
      view.scrollIntoView({behavior: search ? "smooth" : "auto"});
      setSearch(null)
    }
  },
  [search]
  );

  //Fetch pokemon data from API, assign to dexData object

  async function createEntry(mon, searchBar) {
    setSearch(searchBar);
    setSpace("calc(100vh - 60px)");
    if(!monPresent) {
      setReady(false);
    }
    const data = await mon;
    setDexData(data);
    setReady(true);
    setMonPresent(true);
  }

  return (
      <div>
        <Header />
        <div className="main-body">
          <SearchBar 
            createEntry = {createEntry}
            setEntry = {setReady}
          />
          <div 
            className="entry-view" 
            id="entry-container"
            style={{minHeight: space}}
          >
            {
              monPresent &&
              <DexEntry
                createEntry = {createEntry}
                dexData = {dexData}
              />
            }
            {
              !ready &&
              <div className="entry-block" id="loading">
                <h1 className="bit-title" style={{color: "var(--blackBlue)"}}>Loading...</h1>
              </div>
            }
          </div>
        </div>
      </div>
  );
}

export default App;
