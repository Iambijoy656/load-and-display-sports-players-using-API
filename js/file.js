// ৮. চ্যালেঞ্জ-১
// the meal db এর খালতো ভাই the sports db থেকে কিছু জিনিস এনে দেখাবে। একজাক্টলি কি দেখাতে হবে। সেটা আমি বলে দিবো না। তুমি ওদের ওয়েবসাইট এ যাও। সেখানে কি কি লেখা আছে সেগুলা পড়ো। api গুলা এর ছোট করে কি কি করে বলা আছে। সেগুলা দেখো। তারপর কিছু ডাটা লোড করো। সেই ডাটাগুলো দেখাও। এইখানে সার্চ ফাংশনালিটি ইমপ্লিমেন্ট করো। অনেকটা mealdb এর মতো। আবার কোন একটাতে ক্লিক করলে সেটার ডিটেল দেখাবে।
// ৯. চ্যালেঞ্জ-২
// দেখো sports db এর জন্য যে ওয়েবসাইট বানাবে সেখানে একটা লোডিং স্পিনার যোগ করতে পারো কিনা। জিনিসটা একটু কঠিন মনে হতে পারে। তাও দেখানোর চেষ্টা করো। এইটা আমরা এক সময় দেখিয়ে দেব। তবে তার আগে তুমি দেখো গুগলে সার্চ দিয়ে কিছু বের করতে পারো কিনা।




const loadPlayers = (search) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=Danny%20Welbeckhttps://www.thesportsdb.com/api/v1/json/{APIKEY}/searchplayers.php?t={TeamName}&p=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayers(data.player))


}

const displayPlayers = (players) => {
    console.log(players)

    const playersContainer = document.getElementById('players-container');

    playersContainer.innerHTML = ``;

    players.forEach(player => {
        console.log(player)
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-card', 'lg:h-auto', 'md:h-auto', 'border', 'border-gray-500', 'text-white')

        playerDiv.innerHTML = `
        
        <figure><img class="w-full lg:h-auto md:h-auto" src="${player.strCutout ? player.strCutout : "../images/not-found.jpg"} " /></figure>
        <div class="card-body">
          <h2 class="card-title">${player.strPlayer}</h2>
          <p>ID: ${player.idPlayer}</p>
          <p>ID-Team: ${player.idTeam}</p>
          <p>Position: ${player.strPosition}</p>
          <p>Sport: ${player.strSport}</p>
          <button onclick="loadPlayerDetails(${player.idPlayer})" class="player-btn bg-sky-700 text-gray-300 font-bold mt-4 py-2">DETAILS</button>
        </div>
     
        `;

        playersContainer.appendChild(playerDiv)


    });
}

const searchPlayer = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log("searching", searchText)
    loadPlayers(searchText);
    searchField.value = '';



}


const loadPlayerDetails = (idPlayer) => {
    // console.log('player ID', idPlayer)
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayerDetails(data.players[0]))
}

const displayPlayerDetails = (player) => {
    // console.log(details)
    const playerDetails = document.getElementById('display-player-details');
    window.scrollTo(0, 400)
    playerDetails.innerHTML = `
    <figure><img class="w-full lg:h-auto md:h-auto" src="${player.strCutout ? player.strCutout : "../images/not-found.jpg"} " /></figure>
    <div class="card-body">
      <h2 class="card-title">${player.strPlayer}</h2>
      <p>ID: ${player.idPlayer}</p>
      <p>ID-Team: ${player.idTeam}</p>
      <p>Position: ${player.strPosition}</p>
      <p>Sport: ${player.strSport}</p>
    `

}

loadPlayers('');