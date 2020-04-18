function compareStrings(a, b) {
  if (a.flavor_text.toLowerCase() < b.flavor_text.toLowerCase()) {
    return -1;
  }
  if (a.flavor_text.toLowerCase() > b.flavor_text.toLowerCase()) {
    return 1;
  }
  return 0;
}

function removeDups(arr) {
  let newArr = [...arr];
  let noDups = [];
  let i = 0;
  for (let j = 1; j < newArr.length; j++) {
    if (j === newArr.length - 1) {
      newArr[j].flavor_text !== newArr[j - 1].flavor_text &&
        noDups.push(newArr[j]);
    }
    if (newArr[i].flavor_text !== newArr[j].flavor_text) {
      noDups.push(newArr[i]);
      i = j;
    } else {
      j++;
    }
  }
  //add id key for slide animation
  let index = 0;
  noDups.forEach((f) => {
    f.id = index;
    index++;
  });

  return noDups;
}
