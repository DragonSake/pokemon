let allPokemons = [];
let currentPokemon = null;

// 1. Haal de Pokémon lijst op zodra het script laadt
function fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=493')
    .then(response => response.json())
    .then(data => {
        allPokemons = data.results;
        nextPokemon(); // Start direct de eerste ronde
    })
    .catch(err => {
        console.error("Fout bij het laden van de PokeAPI:", err);
        document.getElementById('message').innerText = "ERROR";
    });
}

// 2. Kies een willekeurige Pokémon en toon het silhouet
function nextPokemon() {
    // Reset invoerveld en berichten
    document.getElementById('guess-input').value = '';
    document.getElementById('message').innerText = '';
    
    // Kies een willekeurige Pokémon uit de geladen lijst
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    currentPokemon = allPokemons[randomIndex];

    const formattedName = currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);

    console.log(`Answer: ${formattedName}`);

    // Haal het ID-nummer uit de PokeAPI url (bijv. van "https://pokeapi.co/api/v2/pokemon/1/")
    const urlParts = currentPokemon.url.split('/');
    const pokemonId = urlParts[urlParts.length - 2]; 

    // Bouw de gevraagde GitHub sprite URL met het ID
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    // Toon de afbeelding en zet hem terug op silhouet (verwijder 'guessed' class)
    const imgElement = document.getElementById('pokemon-image');
    imgElement.src = imageUrl;
    imgElement.classList.remove('guessed');
    imgElement.style.display = 'block';
}

// 3. Controleer of de speler de juiste naam heeft ingevuld
// 3. Controleer of de speler de juiste naam heeft ingevuld
function checkGuess() {
    if (!currentPokemon) return;

    const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    const messageElement = document.getElementById('message');
    const imgElement = document.getElementById('pokemon-image');
    const pokemonName = currentPokemon.name.toLowerCase();

    // Reset de animatie-class (voor de pop-and-spin)
    messageElement.classList.remove('pop-and-spin');
    void messageElement.offsetWidth; // Trigger een reflow om de animatie te kunnen herhalen

    if (userGuess === pokemonName) {
        const formattedName = currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);
        
        messageElement.innerText = `It is ${formattedName}!`;
        messageElement.style.color = "#FFCB05"; // HIER: Zet de kleur terug naar Geel bij een goed antwoord!
        imgElement.classList.add('guessed'); 
    } else {
        messageElement.innerText = "Incorrect, try again ❌";
        messageElement.style.color = "red"; // Zet op rood bij een fout antwoord
    }
}

// Luister ook of de speler op 'Enter' drukt in het invoerveld
document.getElementById('guess-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Start het spel op zodra de pagina klaar is
fetchPokemons();
