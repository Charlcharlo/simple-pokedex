import { ClickAwayListener } from "@mui/base";
import { Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import Results from "./Results";
import { buildTree, search } from "../functions/trie-redo";

export default function SearchBar({ createEntry }) {
  const [barFocus, setBarFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResult] = useState([]);
  const [trie, setTrie] = useState({});

  function showResults() {
    setBarFocus(true);
    setFocus(null);
  }

  function hideResults() {
    setBarFocus(false);
    setFocus(null);
  }

  //Create Trie

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        const trie = buildTree(results);
        setTrie(trie);
      });
  }, []);

  //Update List

  useEffect(() => {
    const result = search(query, trie);
    setResult(result);
  }, [query, trie]);

  //Arrow Keys

  const [focus, setFocus] = useState(null);

  function chooseItem(i) {
    setFocus(i);
  }

  //Set listener for up and down arrows
  useEffect(() => {
    function keyListener(event) {
      if (results.length > 0) {
        const end = results.length - 1;
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocus((prevVal) => {
            if (prevVal === null || prevVal === end) {
              return 0;
            } else {
              return prevVal + 1;
            }
          });
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocus((prevVal) => {
            if (prevVal === null || prevVal === 0) {
              return end;
            } else {
              return prevVal - 1;
            }
          });
        } else if (event.key === "Tab") {
          event.preventDefault();
        }
      }
    }

    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [results]);

  useEffect(() => {
    if (focus != null) {
      //Set focus on selected item in the list
      const targetId = `result-${focus}`;
      const target = document.getElementById(targetId);
      target.focus();
      //click item on Enter press
      function findOnEnter(event) {
        if (event.key === "Enter") {
          target.click();
        }
      }
      document.addEventListener("keydown", findOnEnter);
      return () => document.removeEventListener("keydown", findOnEnter);
    }
  }, [focus]);

  return (
    <div>
      <ClickAwayListener onClickAway={hideResults}>
        <div className="search-block">
          <input
            onFocus={showResults}
            onChange={(event) => {
              setQuery(event.target.value);
              chooseItem(null);
            }}
            value={query}
            className="search-bar"
            type="text"
            placeholder="Type here to start searching"
          />
          <Collapse in={barFocus}>
            <div className="results-container">
              <Results
                createEntry={createEntry}
                hideResults={hideResults}
                list={results}
                focus={focus}
                chooseItem={chooseItem}
              />
            </div>
          </Collapse>
        </div>
      </ClickAwayListener>
    </div>
  );
}
