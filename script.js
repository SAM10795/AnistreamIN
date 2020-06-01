IMAGE_URL = "img_url";
ANIME_TITLE = "title";
ANIME_TITLE_ALT = "title_alt";
ANIME_SCORE = "score";
EPISODES = "eps";
PLATFORM = "platform";
COMMENTS = "comments";
GENRES = "genres";
UPDATED = "updated";
PLATFORM_URL = "platform_url"
PLATFORM_PAID = "platform_paid"
MAL_ID = "id"
MAL_URL = "url"

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
		return a[ANIME_SCORE] - b[ANIME_SCORE];
	}
	else
	{
		return b[ANIME_SCORE] - a[ANIME_SCORE];
	}
}

function sortTitle(a,b)
{
	if(a[ANIME_TITLE].toLowerCase() > b[ANIME_TITLE].toLowerCase())
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

function getDate(d)
{
	var dateParts = d.split("-");
	var date = new Date(dateParts[2],dateParts[1]-1,dateParts[0]);
	return date;
}

function sortDate(a,b)
{
	var d1 = getDate(a[UPDATED]);
	var d2 = getDate(b[UPDATED]);
	
	if(ascending)
	{
		return d1 > d2;
	}
	else
	{
		return d2 > d1;
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
	//animeObject.setAttribute('data-aos',"fade-up");
	
	var animeTitle = document.createElement("a");
	animeTitle.classList.add("anime-title");
	animeTitle.textContent = animeData[ANIME_TITLE];
	animeTitle.title = "Anime Title";
	animeTitle.href = animeData[MAL_URL];
	
	animeObject.appendChild(animeTitle);
	
	var animeInfo = document.createElement("div");
	animeInfo.classList.add("anime-info");
	
	var animeScore = document.createElement("span");
	animeScore.classList.add('anime-score');
	animeScore.title = "MAL Rating";
	
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
	animeEpisodes.title = "Episodes available";
	
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
	animeGenre.title = "Genres";
	
	animeObject.appendChild(animeGenre);
	
	var animeImgcontainer = document.createElement("div");
	animeImgcontainer.setAttribute('class','anime-img-container');
	animeImgcontainer.style.backgroundImage = "url(\'"+animeData[IMAGE_URL]+"\')";
	animeImgcontainer.title = "Anime Cover Image";
	
	animeObject.appendChild(animeImgcontainer);
	
	var animePlatform = document.createElement("a");
	animePlatform.classList.add('anime-platform');
	animePlatform.title = "Streaming Platform";
	animePlatform.href = animeData[PLATFORM_URL];
	
	var animePlatformIcon = document.createElement("span");
	animePlatformIcon.classList.add('material-icons');
	animePlatformIcon.style.fontSize = "18px";
	animePlatformIcon.style.marginLeft = "auto";
	animePlatformIcon.textContent = "ondemand_video";
	
	var animePlatformVal = document.createElement("span");
	animePlatformVal.textContent = animeData[PLATFORM];
	
	var animePlatformPaid = document.createElement("span");
	animePlatformPaid.classList.add('material-icons');
	animePlatformPaid.style.fontSize = "18px";
	animePlatformPaid.style.marginLeft = "auto";
	if(animeData[PLATFORM_PAID] == 1)
	{
		animePlatformPaid.textContent = "attach_money";
	}
	else
	{
		animePlatformPaid.textContent = "money_off";
	}
	
	animePlatform.appendChild(animePlatformIcon);
	animePlatform.appendChild(animePlatformVal);
	animePlatform.appendChild(animePlatformPaid);
	animeObject.appendChild(animePlatform);
	
	var animeComments = document.createElement("div");
	animeComments.classList.add('anime-comments');
	animeComments.textContent = animeData[COMMENTS];
	animeComments.title = "Additional Info";
	
	if(animeData[COMMENTS].length > 0)
	{
		animeObject.appendChild(animeComments);
	}	
	return animeObject;	
}

function populateInit()
{
	var results = document.querySelector("div.results");
	filterData = data;
	results.innerHTML = filterData.length + " entries";
	clickScoreHL();
}

function updateContainer()
{
	remakeContainer();
	container = document.querySelector(".anime-container");
	container.setAttribute('data-aos','fade-up');
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
		animate: false,
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
	let title = animeObject[ANIME_TITLE].toLowerCase();
	let platform = animeObject[PLATFORM].toLowerCase();
	return title.includes(this.toLowerCase()) || includesNoCase(this.toLowerCase(),animeObject[ANIME_TITLE_ALT]) 
		|| includesNoCase(this.toLowerCase(),animeObject[GENRES]) || platform.includes(this.toLowerCase());
}

function filterFree(animeObject)
{
	return (animeObject[PLATFORM_PAID] == this);
}

function searchText()
{
	var searchStr = document.querySelector("div.search-bar input").value;
	var results = document.querySelector("div.results");
	if(searchStr)
	{
		if(searchStr.length >= 3)
		{
			if(searchStr.toLowerCase().includes("free") || 
			searchStr.toLowerCase().includes("paid") || 
			searchStr.toLowerCase().includes("premium"))
			{
				if(searchStr.toLowerCase().includes("free"))
				{
					filterData = data.filter(filterFree,0);
				}
				else
				{
					filterData = data.filter(filterFree,1);
				}
			}
			else 
			{
				filterData = data.filter(filterText,searchStr);
			}
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
		filterData = data.sort(sortScore);
		updateContainer();
		results.innerHTML = filterData.length + " entries";
	}
}