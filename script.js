getPokemons();

//Get data from pokemon-mockapi
async function getPokemons() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151", {
    // fetch the data from api
    method: "GET"
  });
  const pokemonData = await data.json(); // converting the data into json format
  var dataX = pokemonData.results;

  //console.log(dataX);
  const noOfPages = Math.ceil(dataX.length / 10);
  const pagination = document.querySelector(".pagination");
  for (let i = 1; i <= noOfPages; i++) {
    const page = document.createElement("button");
    page.innerText = i;
    pagination.append(page);
    // page

    page.onclick = function () {
      var z = page.innerText;
      z--;
      const pageUsers = dataX.slice(z * 10, z * 10 + 10);
      document.querySelector(".pokemonContent").innerHTML = "";
      Split(pageUsers);
    };
  }
  const firstTenUsers = dataX.slice(0, 10);
  // console.log(firstTenUsers);
  // console.log("No of Pokemons are ", dataX.length);
  Split(firstTenUsers);
  function Split(firstTenUsers) {
    firstTenUsers.forEach((pokemon) => {
      // getting the url of each object present in the data
      localStorage.setItem("url", pokemon.url);
      getInnerData(); // calling InnerData function as it is array of objects
    });
  }
}

async function getInnerData() {
  let url = localStorage.getItem("url");
  let innerData = await fetch(url, {
    // fetching the innnerData present in each url
    method: "GET" // to get the details of each pokemon
  });
  let pokeInnerData = await innerData.json(); //converting the innerdata int json format
  // console.log(pokeInnerData);
  //  console.log(pokeInnerData.moves[0].move.name);
  //console.log(pokeInnerData);
  pokemonContent(pokeInnerData); //calling the pokemonContnent by passing innerData as parameter
}

function pokemonContent(pokeInnerData) {
  let innerContent = document.querySelector(".pokemonContent");
  let abilityName = [];
  let moveName = [];
  let { id } = pokeInnerData;
  console.log(id);
  pokeInnerData.abilities.forEach((x) => abilityName.push(x.ability.name)); // get each ability of every pokemon
  pokeInnerData.moves.forEach((x) => moveName.push(x.move.name)); // get each move of every pokemon
  let weight = pokeInnerData.weight; // get weight of every pokemon
  //console.log(weight)
  let uniquepokemon = document.createElement("div"); // alloting the data as per the requirement in UI using jQuery
  uniquepokemon.innerHTML = `                                   
    <div class="innerdata card m-5">
        <div class="card-body response">
            <div class="img-div">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"></img>
                <h1 class="pokemonname card-title text-light">${pokeInnerData.name.toUpperCase()}</h1>
            </div>
            <div class"contentData">
                <p class="abilities card-text font-weight-bold"><span class="inner-headers text-light">Abilities:</span><span class="abilityData ml-3 ">${abilityName}</span></p>
                <div class="moves card-text d-flex font-weight-bold"><span class="inner-headers  text-light">Moves:</span>
                    <p class="moveNameData ml-3">${moveName}</p>
                </div>
                <p class="weight card-text font-weight-bold"><span class="inner-headers  text-light">Weight:</span><span class="weightData ml-3">${weight}</span></p>
            </div>
        </div>    
    </div>`;
  length--;
  innerContent.append(uniquepokemon);
}
