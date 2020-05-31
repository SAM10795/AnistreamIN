IMAGE_URL = "img_url";
ANIME_TITLE = "title";
ANIME_SCORE = "score";
EPISODES = "eps";
PLATFORM = "platform";
COMMENTS = "comments";
GENRES = "genres";

var ascending = true;

//alphabetical = 0
//score = 1
//date = 2
var sortMethod = 0;
var filterData = data;

function clickAlphAZ()
{
	var topText = document.querySelector(".value text");
	topText.textContent = "Title (A - Z)";
	ascending = true;
	sortMethod = 0;
	updateContainer();
}

function clickAlphZA()
{
	var topText = document.querySelector(".value text");
	topText.textContent = "Title (Z - A)";
	ascending = false;
	sortMethod = 0;
	updateContainer();
}

function clickScoreLH()
{
	var topText = document.querySelector(".value text");
	topText.textContent = "Score (Low - High)";
	ascending = true;
	sortMethod = 1;
	updateContainer();
}

function clickScoreHL()
{
	var topText = document.querySelector(".value text");
	topText.textContent = "Score (High - Low)";
	ascending = false;
	sortMethod = 1;
	updateContainer();
}

function clickDateON()
{
	var topText = document.querySelector(".value text");
	topText.textContent = "Updated (Old - New)";
	ascending = true;
	sortMethod = 2;
	updateContainer();
}

function clickDateNO()
{
	var topText = document.querySelector(".value text");
	topText.textContent = "Updated (New - Old)";
	ascending = false;
	sortMethod = 2;
	updateContainer();
}

function sortScore(a,b)
{
	if(ascending)
	{
		return a["score"] - b["score"];
	}
	else
	{
		return b["score"] - a["score"];
	}
}

function sortTitle(a,b)
{
	if(a["title"] > b["title"])
	{
		if(ascending)
		{
			return 1;
		}
		else
		{
			return -1;
		}
	}
	else
	{
		if(ascending)
		{
			return -1;
		}
		else
		{
			return 1;
		}
	}
}

function sortDate(a,b)
{
	var d1 = new Date(a["updated"]);
	var d2 = new Date(b["updated"]);
	if(ascending)
	{
		return d1.getTime() - d2.getTime();
	}
	else
	{
		return d2.getTime() - d1.getTime();
	}
}

function getGenreText(genres)
{
	var i=0;
	var retVal = "";
	for(i=0;i<genres.length;i++)
	{
		if(i == (genres.length - 1))
		{
			retVal = retVal + genres[i];
		}
		else
		{
			retVal = retVal + genres[i] + ", ";
		}
	}
	return retVal;
}

function remakeContainer()
{
	var container = document.querySelector(".anime-container");
	container.remove();
	var mainContainer = document.querySelector(".container");
	var animeContainer = document.createElement("div");
	animeContainer.setAttribute('class','anime-container');
	mainContainer.appendChild(animeContainer);
}

/*
<div class = "anime-object">
	<div class="anime-title">
		7 Seeds
	</div>
	<div class="anime-info">
		<span class="anime-episodes">
			<span class="material-icons">playlist_play</span><span>12</span>
		</span>
		<span class="anime-score">
			<span class="material-icons">star_rate</span><span>6.52</span>
		</span>
	</div>
	<div class="anime-genres">
		Sci-Fi, Adventure, Mystery, Psychological, Drama, Romance, Shoujo
	</div>
	<div class="anime-img-container" style="background-image: url(&quot;https://cdn.myanimelist.net/images/anime/1305/96703.jpg&quot;);">
	</div>
	<div class="anime-platform">
			<span class="material-icons">ondemand_video</span><span>Netflix</span>
	</div>
	<div class="anime-comments">
	</div>
</div>


*/

function makeanimeobject(animeData)
{
	var animeObject = document.createElement("div");
	animeObject.classList.add("anime-object");
	
	var animeTitle = document.createElement("div");
	animeTitle.classList.add("anime-title");
	animeTitle.textContent = animeData[ANIME_TITLE];
	
	animeObject.appendChild(animeTitle);
	
	var animeInfo = document.createElement("div");
	animeInfo.classList.add("anime-info");
	
	var animeScore = document.createElement("span");
	animeScore.classList.add('anime-score');
	
	var animeScoreIcon = document.createElement("span");
	animeScoreIcon.classList.add('material-icons');
	animeScoreIcon.style.fontSize = "14px";
	animeScoreIcon.textContent = "star_rate";
	
	var animeScoreVal = document.createElement("span");
	animeScoreVal.textContent = animeData[ANIME_SCORE];
	
	animeScore.appendChild(animeScoreIcon);
	animeScore.appendChild(animeScoreVal);
	animeInfo.appendChild(animeScore);
	
	var animeEpisodes = document.createElement("span");
	animeEpisodes.classList.add('anime-episodes');
	
	var animeEpisodesIcon = document.createElement("span");
	animeEpisodesIcon.classList.add('material-icons');
	animeEpisodesIcon.style.fontSize = "14px";
	animeEpisodesIcon.textContent = "playlist_play";
	
	var animeEpisodesVal = document.createElement("span");
	animeEpisodesVal.textContent = animeData[EPISODES];
	
	animeEpisodes.appendChild(animeEpisodesIcon);
	animeEpisodes.appendChild(animeEpisodesVal);
	animeInfo.appendChild(animeEpisodes);
	
	animeObject.appendChild(animeInfo);
	
	var animeGenre = document.createElement("div");
	animeGenre.classList.add('anime-genres');
	animeGenre.textContent = getGenreText(animeData[GENRES]);
	
	animeObject.appendChild(animeGenre);
	
	var animeImgcontainer = document.createElement("div");
	animeImgcontainer.setAttribute('class','anime-img-container');
	animeImgcontainer.style.backgroundImage = "url(\'"+animeData[IMAGE_URL]+"\')";
	
	animeObject.appendChild(animeImgcontainer);
	
	var animePlatform = document.createElement("div");
	animePlatform.classList.add('anime-platform');
	
	var animePlatformIcon = document.createElement("span");
	animePlatformIcon.classList.add('material-icons');
	animePlatformIcon.style.fontSize = "18px";
	animePlatformIcon.textContent = "ondemand_video";
	
	var animePlatformVal = document.createElement("span");
	animePlatformVal.textContent = animeData[PLATFORM];
	
	animePlatform.appendChild(animePlatformIcon);
	animePlatform.appendChild(animePlatformVal);
	animeObject.appendChild(animePlatform);
	
	var animeComments = document.createElement("div");
	animeComments.classList.add('anime-comments');
	animeComments.textContent = animeData[COMMENTS];
	
	if(animeData[COMMENTS].length > 0)
	{
		animeObject.appendChild(animeComments);
	}	
	return animeObject;	
}

function populateInit()
{
	var results = document.querySelector("div.results");
	filterData = data.sort(sortTitle);
	results.innerHTML = filterData.length + " entries";
	clickAlphAZ();
}

function updateContainer()
{
	remakeContainer();
	container = document.querySelector(".anime-container");
	switch(sortMethod)
	{
		case 0:
		{
			filterData.sort(sortTitle);
			break;
		}
		case 1:
		{
			filterData.sort(sortScore);
			break;
		}
		case 2:
		{
			filterData.sort(sortDate);
			break;
		}
		default:
		{
			break;
		}
	}
	let magicGrid = new MagicGrid({
		container: '.anime-container',
		animate: true,
		items: filterData.length,
		gutter: 16,
		static: false,
		useMin: true
	});

	magicGrid.listen();
	
	filterData.forEach(object => {container.appendChild(makeanimeobject(object));});
	
	magicGrid.positionItems();
}

function includesNoCase(substr,arr)
{
	var retVal = false;
	var i=0;
	var array_el;
	for(i=0;i<arr.length;i++)
	{
		if(arr[i])
		{
			array_el = arr[i].toLowerCase();
			retVal = retVal || array_el.includes(substr);
		}
	}
	return retVal;
}

function filterText(animeObject)
{
	let title = animeObject["title"].toLowerCase();
	let platform = animeObject["platform"].toLowerCase();
	return title.includes(this.toLowerCase()) || includesNoCase(this.toLowerCase(),animeObject["title_alt"]) 
		|| includesNoCase(this.toLowerCase(),animeObject["genres"]) || platform.includes(this.toLowerCase());
}

function searchText()
{
	var searchStr = document.querySelector("div.search-bar input").value;
	var results = document.querySelector("div.results");
	if(searchStr)
	{
		if(searchStr.length >= 3)
		{
			filterData = data.filter(filterText,searchStr);
			updateContainer();
			results.innerHTML = filterData.length + " results found for "+searchStr;
		}
		else
		{
			return;
		}
	}
	else
	{
		filterData = data.sort(sortTitle);
		updateContainer();
		results.innerHTML = filterData.length + " entries";
	}
}