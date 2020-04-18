const typeConverter = (props) => {
  //gets props (a type name string, "fighting") finds the same type key in colorChart, returns object {"type", "hex"}
  // console.log(props);

  const colorChart = [
    { type: "", hex: "#FFF" },
    { type: "normal", hex: "#A8A77A" },
    { type: "fire", hex: "#EE8130" },
    { type: "water", hex: "#6390F0" },
    {
      type: "electric",
      hex: "#F7D02C",
    },
    { type: "grass", hex: "#7AC74C" },
    { type: "ice", hex: "#96D9D6" },
    { type: "fighting", hex: "#C22E28" },
    { type: "poison", hex: "#A33EA1" },
    { type: "ground", hex: "#E2BF65" },
    { type: "flying", hex: "#A98FF3" },
    { type: "psychic", hex: "#F95587" },
    { type: "bug", hex: "#A6B91A" },
    { type: "rock", hex: "#B6A136" },
    { type: "ghost", hex: "#735797" },
    { type: "dragon", hex: "#6F35FC" },
    { type: "dark", hex: "#705746" },
    { type: "steel", hex: "#B7B7CE" },
    { type: "fairy", hex: "#D685AD" },
  ];

  return colorChart.find((obj) => obj.type === props);
};

export default typeConverter;
