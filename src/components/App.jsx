import '../styles.css';
import Header from './Header';
import SearchBar from './SearchBar';
import DexEntry from './DexEntry';
import { useState, useEffect } from 'react';
// import { Collapse } from '@mui/material';
// import fetchMon from '../functions/fetch';

function App() {
  const [ready, setReady] = useState(true);
  const [dexData, setDexData] = useState(null);
  const [monPresent, setMonPresent] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const [flex, setFlex] = useState(null);

  useEffect(() => {
      window.addEventListener('resize', () => {
          setWidth(window.innerWidth);
      })
  },
  []

  )
  useEffect(() => {
      if (width < 600) {
          setFlex(true);
      } else {
          setFlex(false);
      }
  },
  [width]);

  async function createEntry(mon) {
    setMonPresent(false);
    setReady(false);
    const data = await mon;
    setDexData(data);
    setReady(true);
    setMonPresent(true);
  }
  // fetchMon();
  return (
    <div>
      <Header />
      <div className="main-body">
        <SearchBar 
          createEntry = {createEntry}
          setEntry = {setReady}
        />
        {monPresent &&
          <div className="entry-view">
            <DexEntry
              createEntry = {createEntry}
              dexData = {dexData}
              flex = {flex}
            />
          </div>
        }
        {
          !ready &&
          <h1 className="bit-title" style={{color: "var(--blackBlue)"}}>Loading...</h1>
        }
      </div>
    </div>
  );
}

export default App;
