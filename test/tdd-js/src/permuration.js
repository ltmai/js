/**
 * Check if two strings are permutaions
 * @param {*} word1 
 * @param {*} word2 
 */
const isPermutation = (word1, word2) => {
    if (!(word1 && word2)) {
        return false;
    }

    if (word1.length != word2.length) {
        return false;
    }

    let array1 = [...word1].sort();
    let array2 = [...word2].sort();
    
    return (''.concat(array1) === ''.concat(array2));
};

export { isPermutation };

