const target = document.querySelector(".pokemon");
const IMAGE = document.querySelector(".image");
const form = document.getElementById('form');
const search = document.getElementById('search');
const filterInput = document.getElementById('pokemonFilter');
const pokemonNavInfos = document.querySelector('.pokemonInfos');
const loadMore = document.querySelector('#loadMore');
const inputBtn = document.querySelector('#inputBtn');
const preloader = document.querySelector('#preloader');

const url = `https://pokeapi.co/api/v2/pokemon`
const url2 = `https://pokeapi.co/api/v2/`
let offset = 0;


// Function to show preloader
const showPreloader = () => {
    preloader.style.display = 'block';
};

// Function to hide preloader
const hidePreloader = () => {
    preloader.style.display = 'none';
};


// Function to fetch data for multiple Pokemon
const fetchData = async () =>{
    
    try{
        showPreloader();
        const res = await fetch(`${url}?offset=${offset}`)
        const data = await res.json()
        hidePreloader();
    
        let pokemons = data.results
    
        for(let pokemon of pokemons){
            let template = document.createElement("div")    
            let image = await fetchImage(pokemon.url);
            let type = await fetchType(pokemon.url);
            const numberPokemon = pokemon.url.split("/").slice(-2,-1)[0]
            let type1 = type[0] || '';
            let type2 = type[1] || '';
            

            template.innerHTML = `
            <span>#0${numberPokemon}</span>
            <h1 class="pokemonName">${pokemon.name}</h1>
            <img src="${image}" class="pokemonImage">
            <section class="type">
                <h3 style="background-color: ${getTypeColor(type1)};">${type1}</h3>
                <h3 style="background-color: ${getTypeColor(type2)};">${type2}</h3>
            </section>
            `
        target.append(template)
        }

        /*

        target.addEventListener('click', (e) => {
            let positionClick = e.target;
            const pokemonNames = target.querySelectorAll('h1');
        
            pokemonNavInfos.classList.toggle('showNav');
            target.classList.toggle('filter');
        
            let product_id = positionClick.parentElement.innerHTML;
            if(positionClick.classList.contains('pokemonName') || positionClick.classList.contains('pokemonImage')){
                    let newCard = document.createElement('div');
                    let image = fetchSvgImage(positionClick.url);
                    newCard.innerHTML = `
                    <img src="${image}" alt="" class="pokemonInfoImage">
                    <h1 class="pokemonInfosHeading">${positionClick.parentElement.textContent}</h1>
                    `
                    pokemonNavInfos.append(newCard);
            }
            
        })
        pokemonNavInfos = "";
        */


    }catch(error){
        console.error('Error fetching data:', error);
        hidePreloader();
    }
}


// Function to get color based on type
const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
        case 'fire':
            return '#FF6749';
        case 'water':
            return '#58AEFF';
        case 'poison':
            return '#BB76AE';
        case 'grass':
            return '#92D676';
        case 'flying':
            return '#84AEFF';
        case 'bug':
            return '#BBC949';
        case 'normal':
            return '#C9C9BC';
        case 'electric':
            return '#FFD659';
        case 'ground':
            return '#E4C976';
        case 'fairy':
            return '#FFBCFF';
        case 'fighting':
            return '#C97667';
        case 'psychic':
            return '#FF76AE';
        case 'rock':
            return '#C9BC84';
        case 'steel':
            return '#BBBCC9';
        case 'ghost':
            return '#8484C9';
        case 'ice':
            return '#92E4FF';
        case 'dragon':
            return '#9284F2';
        case 'dark':
            return '#786358';
    }
};

/* Load More Data */
loadMore.addEventListener('click', () => {
    showPreloader();
    offset+=20;
    fetchData(url,offset);
    hidePreloader();
})


/* Fetch Image Data */
const fetchImage = async (url) => {
    try{
        const res = await fetch(url)
        const data = await res.json()
    
        let src = data.sprites.other.dream_world.front_default;
    
        return src;
    }catch(error){
        console.log('Error fetching image data', error)
    }
}

/* Fetch Pokemon Type */
const fetchType = async (url) => {
    try{
        const res = await fetch(url)
        const data = await res.json()
        const types = data.types.map(type => type.type.name);
        //console.log(types)

        return types
    }catch(error){
        console.log('Error fetching type data', error)
    }
}


/* Filter Pokemon */
const filterPokemons = () => {
    const filterValue = filterInput.value.toLowerCase();
    const pokemonNames = target.querySelectorAll('h1');
    

    setTimeout(() => {
        pokemonNames.forEach(pokemonName => {
            const pokemon = pokemonName.textContent.toLowerCase();
            const pokemonCard = pokemonName.parentElement;
    
            if (pokemon.includes(filterValue)) {
                pokemonCard.style.display = 'flex';
                
            } else {
                pokemonCard.style.display = 'none';
            } 
        });
    },200)
};

filterInput.value = '';

fetchData(url, offset)
fetchImage(url, offset)
fetchType(url, offset)

filterInput.addEventListener('input', filterPokemons);


