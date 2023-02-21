import '../styles.css';
import Header from './Header';
import SearchBar from './SearchBar';
// import fetchMon from '../functions/fetch';

function App() {
  // fetchMon();
  return (
    <div>
      <Header />
      <div className="main-body">
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
