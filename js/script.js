const url = `https://pokeapi.co/api/v2/pokemon`

const target = document.querySelector(".pokemon");
const IMAGE = document.querySelector(".image");



const fetchData = async (url) =>{
    const res = await fetch(url)
    const data = await res.json()

    let pokemons = data.results
    //let id = pokemons.dataset.id;
    //console.log(pokemons)

    for(let pokemon of pokemons){
        let template = document.createElement("div")
        //let id = pokemon.parentElement.dataset.id;

        //pokemons.dataset.id = pokemon.id;
        //let id = pokemons.dataset.parentElement;

        console.log(pokemon)
        let image = await fetchImage(pokemon.url);
        
        template.innerHTML = `
        <h1 class="pokemonName">${pokemon.name}</h1>
        <div class="swiper-slide">
            <img src="${image}">
        </div>
        `
    target.append(template)

    

    template.addEventListener('click', (e) => {
        let positioClick = e.target;
        let product_id = positioClick.parentElement.id;
        //let id = e.id;
        //positioClick.setAttribute()
    
        console.log(product_id)
    });
    
    }
}

const fetchImage = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    //let pokemons = data.results

    let src = data.sprites.other.dream_world.front_default;

    return src
}

fetchData(url)
fetchImage(url)
