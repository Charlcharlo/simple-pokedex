import { kebabCase } from "lodash";
import { parseName } from "./general";

class TrieNode {
    constructor() {
        this.value = null;
        this.children = [];
        for (let index = 0; index < 30; index++) {
            this.children.push(null);
        }
    }
}

function generateIndex(character) {
    if(character === "-") {
        return 26;
    } else if(character === "0") {
        return 27;
    } else if(character === "1") {
        return 28;
    } else if(character === "5") {
        return 29;
    } else {
        return character.charCodeAt(0) - 97;
    }
}

export function buildTree(array) {
    const trie = new TrieNode();
    
    function insert(item) {
        //start at root
        let currentNode = trie;
        //check each letter
        for (let level = 0; level < item.name.length; level++) {
            const character = item.name[level];

            //assign index
            const index = generateIndex(character);

            if(currentNode.children[index] == null) {
                currentNode.children[index] = new TrieNode();
            }

            currentNode = currentNode.children[index];
        }
        currentNode.value = item;
        currentNode.value.displayName = parseName(item.name);
    }

    array.forEach(item => {
        insert(item);
    });
    return trie;
}

export function search(key, trie) {
    key = kebabCase(key);
    let node = trie;
    let results = [];

    //recursively search for other values
    function findPossible(node, results) {
        if(node.children) {
            const possibleRes = node.children.filter((val) => val !== null);
    
            possibleRes.forEach(element => {
                if(element.value) {
                    results.push(element.value);
                }
                findPossible(element, results);
            });
        }
        return results;
    };
       
    for (let level = 0; level < key.length; level++) {
        const character = key[level];
        const index = generateIndex(character, level);

            if (node.children[index] == null) {
                return results;
            }

            node = node.children[index];
        }

        if(node.value) {
            results.push(node.value);
        }

        results = findPossible(node, results);

        return results;
};