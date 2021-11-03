const dex = document.getElementById('dex');

const fetchGames = async () => {
    const url = "https://jak-api-dot-com.herokuapp.com/api/hobby/0";
	const res = await fetch(url);
	const data = await res.json();
	const games = data.games.map((result, index) => ({
		...result,
		id: index + 1,
	}));
	displayGames(games);
};

const displayGames = (games) => {
    const gamesHTMLString = games
        .map((game) => (`
			<li class="card" onclick="selectGame(${game.id})">
				<img class="card-image" src="${game.imageURL}"/>
				<h2 class="card-title">${game.id}. ${game.value}</h2>
			</li>
		`)).join('');
    dex.innerHTML = gamesHTMLString;
};

const selectGame = async (id) => {
	const url = `https://jak-api-dot-com.herokuapp.com/api/hobby/0`;
	const res = await fetch(url);
	const data = await res.json();
	
	displayPopup(data.games[id - 1]);
};

const displayPopup = (game) => {	
	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${game.imageURL}" />
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
