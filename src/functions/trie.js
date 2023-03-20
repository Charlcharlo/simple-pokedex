import { kebabCase } from "lodash";
import { parseName } from "./general";

const ALPHABET_SIZE = 27;
 
// trie node
class TrieNode
{
    constructor()
    {
        this.isEndOfWord = false;
        this.children = new Array(ALPHABET_SIZE);
        for (let i = 0; i < ALPHABET_SIZE; i++)
            this.children[i] = null;
        this.value = null;
    }
}
 
let root;
 
// If not present, inserts key into trie
    // If the key is prefix of trie node,
    // just marks leaf node
function insert(key) {
    let level;
    let length = key.name.length;
    let index;
       
    let node = root;
       
    for (level = 0; level < length; level++) {
        index = key.name[level].charCodeAt(0) - 'a'.charCodeAt(0);
        
    // Check for "-"
    if(index === -52) {
        index = 27;
    }

    if (node.children[index] == null)
        node.children[index] = new TrieNode();
        node = node.children[index];
    }

       
    // mark last node as leaf
    node.isEndOfWord = true;
    node.value = key;

    node.value.displayName = parseName(key.name);
}
 
// Returns true if key presents in trie, else false
function search(key) {
    function findPossible(node, results) {
        if(node.children) {
            const possibleRes = node.children.filter((val) => {
                return val !== null
            });
    
            possibleRes.forEach(element => {
                if(element.isEndOfWord) {
                    results.push(element.value);
                }
                findPossible(element, results);
            });
        }
        return results;
    };

    key = kebabCase(key);

    let level;
        let length = key.length;
        let index;
        let node = root;
        let results = []
       
        for (level = 0; level < length; level++)
        {
            index = key[level].charCodeAt(0) - 'a'.charCodeAt(0);
            
            // Check for "-"
            if(index === -52) {
                index = 27;
            }

            if (node.children[index] == null) {
                return results;
            }

            node = node.children[index];
        }

        if(node.isEndOfWord) {
            results.push(node.value);
        }

        results = findPossible(node, results);

        return results;
};
 
// Construct trie
function buildTree(array) {
    root = new TrieNode();
    array.forEach(element =>{
        insert(element);
    })
}

export {root, buildTree, search}