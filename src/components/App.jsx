import '../styles.css';
import Header from './Header';
import SearchBar from './SearchBar';
import DexEntry from './DexEntry';
import { useState } from 'react';
import { Collapse } from '@mui/material';
// import fetchMon from '../functions/fetch';

function App() {
  const [dexData, setDexData] = useState(null);
  const [monPresent, setMonPresent] = useState(false);

  async function createEntry(mon) {
    const data = await mon;
    setDexData(data);
    setMonPresent(true);
    console.log(data);
  }
  // fetchMon();
  return (
    <div>
      <Header />
      <div className="main-body">
        <SearchBar 
          createEntry = {createEntry}
        />
        {monPresent &&
          <DexEntry 
            dexData = {dexData}
          />
        }
      </div>
    </div>
  );
}

export default App;
