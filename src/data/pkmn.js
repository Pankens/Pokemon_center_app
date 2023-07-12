// --- Métodos

let getPkmn = async (id = null) => {
  if (id == null) {
    return await fetch('http://devmiguelfg.pythonanywhere.com/pokemon/')
      .then((response) => response.json())
      .catch((error) => console.log(error));
  } else {
    return await fetch('http://devmiguelfg.pythonanywhere.com/pokemon/' + id)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
};

export let pkmns = () => getPkmn();
