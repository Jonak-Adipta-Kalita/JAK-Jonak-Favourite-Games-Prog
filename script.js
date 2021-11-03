const dex = document.getElementById('dex');
const BASE_URL = "https://jak-api-dot-com.herokuapp.com/api";

const fetchGames = async () => {
    const url = `${BASE_URL}/api/hobby/0`;
	const res = await fetch(url);
	const data = await res.json();
	const games = data.games.map((result, index) => ({
		...result,
		id: index + 1,
		_imageURL: `${BASE_URL}/${result.imageURL}`
	}));
	displayGames(games);
};

const displayGames = (games) => {
    const gamesHTMLString = games
        .map((game) => (`
			<li class="card" onclick="selectGame(${game.id})">
				<img class="card-image" src="${game._imageURL}"/>
				<h2 class="card-title">${game.id}. ${game.value}</h2>
			</li>
		`)).join('');
    dex.innerHTML = gamesHTMLString;
};

const selectGame = async (id) => {
	const url = `${BASE_URL}/api/hobby/0`;
	const res = await fetch(url);
	const data = await res.json();
	
	displayPopup(data.games[id - 1]);
};

const displayPopup = (game) => {
	const imageURL = `${BASE_URL}/${game.imageURL}`

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${imageURL}" />
				<h2 class="card-title">
					${game.id + 1}. ${game.value}
				</h2>
				<p>
					<small>Platform: </small>${game.platform}
				</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchGames();
