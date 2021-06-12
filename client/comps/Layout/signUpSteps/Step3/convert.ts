const ConvertFunctions =  {
  convertFingerToNum (finger: string) {
    if (finger === "Thumb") return 0;
    if (finger === "Index") return 1;
    if (finger === "Middle") return 2;
    if (finger === "Ring") return 3;
    if (finger === "Pinky") return 4;
},

convertCurlToNum (curl: string) {
  if (curl === "No Curl") return 0;
  if (curl === "Half Curl") return 1;
  if (curl === "Full Curl") return 2;
},

convertDirectionToNum (direction: string) {
  if (direction === 'Vertical Up') return 0;
  if (direction === 'Vertical Down') return 1;
  if (direction === 'Horizontal Left') return 2;
  if (direction === 'Horizontal Right') return 3;
  if (direction === 'Diagonal Up Right') return 4;
  if (direction === 'Diagonal Up Left') return 5;
  if (direction === 'Diagonal Down Right') return 6;
  if (direction === 'Diagonal Down Left') return 7;
}

}

export default ConvertFunctions