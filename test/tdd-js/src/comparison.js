/**
 * Either object is not null or undefined
 * @param {*} o1 
 * @param {*} o2 
 */
const passSanityCheck = (o1, o2) =>
    (o1 != null) && 
    (o2 != null) && 
    (typeof o1 != "undefined") && 
    (typeof o2 != "undefined") 

/**
 * Compare 2 objects (deeply)
 * @param {*} o1 
 * @param {*} o2 
 */
const objectsEqual = (o1, o2) => 
    !passSanityCheck(o1, o2)
        ? false
        : typeof o1 === 'object' && Object.keys(o1).length > 0 
            ? Object.keys(o1).length === Object.keys(o2).length 
                && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
            : o1 === o2;

/**
 * Compare 2 arrays of objects
 * @param {*} a1 
 * @param {*} a2 
 */
const arraysEqual = (a1, a2) => 
    !passSanityCheck(a1, a2)
        ? false
        : a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx])); 
    

export { objectsEqual, arraysEqual }