const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonAbilities = document.querySelector('.pokemon__abilities');
const primaryType = document.querySelector('.primary__type')
const secondaryType = document.querySelector('.secondary__type')
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

const capitalize = (str) =>{
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data
    }   
    
}

const renderPokemon  = async (pokemon) => {
    
    pokemonName.innerHTML = 'Cargando...'

    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonWeight.innerHTML = "Peso: "+data.weight;
        pokemonAbilities.innerHTML = "Habilidades:"

        data.abilities.forEach(element => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(element.ability.name));
            pokemonAbilities.appendChild(li)
        });
        if(data.types.length == 1){
            primaryType.innerHTML = data.types[0].type.name
            secondaryType.innerHTML = " "
        }
        else{
            primaryType.innerHTML = data.types[0].type.name
            secondaryType.innerHTML = data.types[1].type.name
        }
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
    }
    else{
        pokemonName.innerHTML = "Missingno";
        pokemonNumber.innerHTML = "NaN";
        pokemonWeight.innerHTML = "Peso: -∞";
        pokemonAbilities.innerHTML="";
        for(i=0; i<3; i++){
            const li = document.createElement("li");
            li.appendChild(document.createTextNode("???"));
            pokemonAbilities.appendChild(li)
        }
        primaryType.innerHTML = "Undefined";
        secondaryType.innerHTML = "Undefined";
        pokemonImage.src = "../images/Missingno.gif";
        input.value = '';

    }
    
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', (event) => {
    event.preventDefault();
    renderPokemon(Number(pokemonNumber.innerHTML) + 1)
})

btnPrev.addEventListener('click', (event) => {
    event.preventDefault();
    renderPokemon(Number(pokemonNumber.innerHTML) - 1)
})

renderPokemon(1)