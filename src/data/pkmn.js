// --- Métodos

let getPkmn = async (id = null) => {
  if (id == null) {
    return await fetch('https://devmiguelfg.pythonanywhere.com/pokemon')
      .then((response) => response.json())
      .catch((error) => console.log(error));
  } else {
    return await fetch('https://devmiguelfg.pythonanywhere.com/pokemon/' + id)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
};

export let pkmns = () => getPkmn();
