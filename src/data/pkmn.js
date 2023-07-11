// --- Métodos

let getPkmn = async (id = null) => {
  if (id == null) {
    return await fetch('http://127.0.0.1:5000/pokemon')
      .then((response) => response.json())
      .catch((error) => console.log(error));
  } else {
    return await fetch('http://127.0.0.1:5000/pokemon/' + id)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
};

export let pkmns = () => getPkmn();
