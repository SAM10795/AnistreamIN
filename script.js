IMAGE_URL = "img_url"
ANIME_TITLE = "title"
ANIME_TITLE_ALT = "title_alt"
ANIME_SCORE_MAL = "score_mal"
ANIME_SCORE_ANILIST = "score_anilist"
EPISODES = "eps"
PLATFORM = "platform"
PLATFORM_URL = "platform_url"
PLATFORM_PAID = "platform_paid"
COMMENTS = "comments"
GENRES = "genres"
UPDATED = "updated"
MAL_ID = "id_mal"
ANILIST_ID = "id_anilist"
SHEET_EPISODES = "episodes"
MAL_URL = "url_mal"
ANILIST_URL = "url_anilist"

var ascending = false;
var toggleCard = !('ontouchstart' in document.documentElement);

FULL_STAR = "star ";
HALF_STAR = "star_half ";

//alphabetical = 0
//score = 1
//date = 2
var sortMethod = 2;
var platformData = data;
var displayData = platformData;

//select all = 1
//indeterminate = 0
//none selected = -1
var platformChecked = 1;
var free = 0;
var MAL = 1;
var movies = 0;

function clickAlphAZ()
{
	var topText = document.querySelector(".value");
	topText.textContent = "Title (A - Z)";
	ascending = true;
	sortMethod = 0;
	updateContainer();
}

function clickAlphZA()
{
	var topText = document.querySelector(".value");
	topText.textContent = "Title (Z - A)";
	ascending = false;
	sortMethod = 0;
	updateContainer();
}

function clickScoreLH()
{
	var topText = document.querySelector(".value");
	topText.textContent = "Score (Low - High)";
	ascending = true;
	sortMethod = 1;
	updateContainer();
}

function clickScoreHL()
{
	var topText = document.querySelector(".value");
	topText.textContent = "Score (High - Low)";
	ascending = false;
	sortMethod = 1;
	updateContainer();
}

function clickDateON()
{
	var topText = document.querySelector(".value");
	topText.textContent = "Updated (Old - New)";
	ascending = true;
	sortMethod = 2;
	updateContainer();
}

function clickDateNO()
{
	var topText = document.querySelector(".value");
	topText.textContent = "Updated (New - Old)";
	ascending = false;
	sortMethod = 2;
	updateContainer();
}

function sortScoreMal(a,b)
{
	if(ascending)
	{
		return a[ANIME_SCORE_MAL] - b[ANIME_SCORE_MAL];
	}
	else
	{
		return b[ANIME_SCORE_MAL] - a[ANIME_SCORE_MAL];
	}
}

function sortScoreAnilist(a,b)
{
	if(ascending)
	{
		return a[ANIME_SCORE_ANILIST] - b[ANIME_SCORE_ANILIST];
	}
	else
	{
		return b[ANIME_SCORE_ANILIST] - a[ANIME_SCORE_ANILIST];
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

function getStar(score)
{
	var star_rate = "";
	var score_round = Math.round(score);
	var i;
	for(i=0;i<Math.floor(score_round/2);i++)
	{
		star_rate = star_rate + FULL_STAR;
	}
	if(score_round%2 == 1)
	{
		star_rate = star_rate + HALF_STAR;
	}
	return star_rate;
}

/*
<div class="anime-object aos-init aos-animate" data-aos="fade-up">
	<a class="anime-title" title="Anime Title" href="https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood">
		Fullmetal Alchemist: Brotherhood
	</a>
	<div class="anime-img-container">
		<img src="https://cdn.myanimelist.net/images/anime/1223/96541.jpg" title="Anime Cover Image">
	</div>
	<div class="anime-brief">
		<span class="platform-icon">
			<a href="https://www.netflix.com/in/" style="color:var(--colorYellow);">
				<img src="https://img2.pngio.com/circle-netflix-logo-png-netflix-icon-png-910_910.png" style="height: 24px; width: 24px;">
			</a>
		</span>
		<span class="anime-score">8.93<span class="material-icons" style="font-size: 12px;">star</span></span>
		<span class="anime-episodes" title="Episodes available"><span class="material-icons" style="font-size: 12px;">playlist_play</span><span>64</span></span>
	</div>
</div>


*/

function makeanimeobjectcard(animeData)
{
	var animeObject = document.createElement("div");
	animeObject.classList.add("anime-object","card");
	animeObject.setAttribute('data-aos',"fade-up");
	
	var animeTitle = document.createElement("div");
	animeTitle.classList.add("anime-title","card");
	animeTitle.title = animeData[ANIME_TITLE];
	
	var animeTitleContent = document.createElement("a");
	animeTitleContent.textContent = animeData[ANIME_TITLE];
	if(MAL)
	{
		animeTitleContent.href = animeData[MAL_URL];
	}
	else
	{
		animeTitleContent.href = animeData[ANILIST_URL];
	}
	
	animeTitle.appendChild(animeTitleContent);
	animeObject.appendChild(animeTitle);
	
	var animeImgcontainer = document.createElement("div");
	animeImgcontainer.classList.add('anime-img-container',"card");
	animeImgcontainer.style.backgroundImage = "url(\'"+animeData[IMAGE_URL]+"\')";
	animeImgcontainer.title = "Anime Cover Image";
	
	animeObject.appendChild(animeImgcontainer);
	
	var animeBrief = document.createElement("div");
	animeBrief.classList.add("anime-brief","card");

	var platforms = animeData[PLATFORM].length;
	var animePlatformTop = document.createElement("span");
	animePlatformTop.classList.add('platform-top',"card");
	for(i=0;i<platforms;i++)
	{	
		var animePlatform = document.createElement("span");
		animePlatform.classList.add('platform-icon',"card");
		if(animeData[PLATFORM_PAID]) 
		{
			animePlatform.title = animeData[PLATFORM][i] + ":" 
			+ animeData[EPISODES][i] + "Eps";
		}
		else
		{	animePlatform.title = animeData[PLATFORM][i] + ":" 
			+ animeData[EPISODES][i] + "Eps";
		}
	
		var animePlatformLink = document.createElement("a");
		animePlatformLink.href = animeData[PLATFORM_URL][i];
		animePlatformLink.id = animeData[PLATFORM][i].split(" ").join("");
		animePlatformLink.textContent = animeData[PLATFORM][i][0];
	
		animePlatform.appendChild(animePlatformLink);
		animePlatformTop.appendChild(animePlatform);
	}
	animeBrief.appendChild(animePlatformTop);
	
	var animeScore = document.createElement("span");
	animeScore.classList.add('anime-score',"card");
	if(MAL)
	{
		animeScore.title = "MAL Rating";
		animeScore.title = animeData[ANIME_SCORE_MAL];
		animeScore.textContent = animeData[ANIME_SCORE_MAL];
	}
	else
	{
		animeScore.title = "Anilist Rating";
		animeScore.title = animeData[ANIME_SCORE_ANILIST];
		animeScore.textContent = animeData[ANIME_SCORE_ANILIST];
	}
	
	var animeScoreIcon = document.createElement("span");
	animeScoreIcon.classList.add('material-icons');
	animeScoreIcon.style.fontSize = "12px";
	animeScoreIcon.textContent = "star";
	
	animeScore.appendChild(animeScoreIcon);
	animeBrief.appendChild(animeScore);
	
	animeObject.appendChild(animeBrief);
	/*
	var animeEpisodes = document.createElement("span");
	animeEpisodes.classList.add('anime-episodes');
	animeEpisodes.title = "Episodes available";
	
	var animeEpisodesIcon = document.createElement("span");
	animeEpisodesIcon.classList.add('material-icons');
	animeEpisodesIcon.style.fontSize = "12px";
	animeEpisodesIcon.textContent = "playlist_play";
	
	var animeEpisodesVal = document.createElement("span");
	animeEpisodesVal.textContent = animeData[EPISODES][0];
	
	animeEpisodes.appendChild(animeEpisodesIcon);
	animeEpisodes.appendChild(animeEpisodesVal);
	animeBrief.appendChild(animeEpisodes);
	*/
	
	return animeObject;	
}

function makeanimeobjectlist(animeData)
{
	var animeObject = document.createElement("div");
	animeObject.classList.add("anime-object","list");
	animeObject.setAttribute('data-aos',"fade-up");
	
	var animeImgcontainer = document.createElement("div");
	animeImgcontainer.classList.add('anime-img-container',"list");
	animeImgcontainer.style.backgroundImage = "url(\'"+animeData[IMAGE_URL]+"\')";
	animeImgcontainer.title = "Anime Cover Image";
	
	animeObject.appendChild(animeImgcontainer);
	
	var animeBrief = document.createElement("div");
	animeBrief.classList.add("anime-brief","list");
	
	var animeHeader = document.createElement("div");
	animeHeader.classList.add("anime-header","list");

	var animeTitle = document.createElement("div");
	animeTitle.classList.add("anime-title","list");
	animeTitle.title = animeData[ANIME_TITLE];
	
	var animeTitleContent = document.createElement("a");
	animeTitleContent.textContent = animeData[ANIME_TITLE];
	if(MAL)
	{
		animeTitleContent.href = animeData[MAL_URL];
	}
	else
	{
		animeTitleContent.href = animeData[ANILIST_URL];
	}
	animeTitle.appendChild(animeTitleContent);
	
	animeHeader.appendChild(animeTitle);
	
	var animeScore = document.createElement("span");
	animeScore.classList.add('anime-score',"list");
	if(MAL)
	{
		animeScore.title = "MAL Rating";
		animeScore.title = animeData[ANIME_SCORE_MAL];
		animeScore.textContent = animeData[ANIME_SCORE_MAL];
	}
	else
	{
		animeScore.title = "Anilist Rating";
		animeScore.title = animeData[ANIME_SCORE_ANILIST];
		animeScore.textContent = animeData[ANIME_SCORE_ANILIST];
	}
	
	var animeScoreIcon = document.createElement("span");
	animeScoreIcon.classList.add('material-icons');
	animeScoreIcon.style.fontSize = "12px";
	animeScoreIcon.textContent = "star";
	
	animeScore.appendChild(animeScoreIcon);
	animeHeader.appendChild(animeScore);
	
	animeBrief.appendChild(animeHeader);
	
	var platforms = animeData[PLATFORM].length;
	var animePlatformTop = document.createElement("div");
	animePlatformTop.classList.add('platform-top',"list");
	for(i=0;i<platforms;i++)
	{	
		var animePlatform = document.createElement("span");
		animePlatform.classList.add('platform-icon',"list");
	
		var animePlatformLink = document.createElement("a");
		animePlatformLink.classList.add("list");
		animePlatformLink.href = animeData[PLATFORM_URL][i];
		animePlatformLink.id = animeData[PLATFORM][i].split(" ").join("");
		animePlatformLink.textContent = animeData[PLATFORM][i] + " | " + 
		animeData[EPISODES][i] + " Eps";
	
		animePlatform.appendChild(animePlatformLink);
		animePlatformTop.appendChild(animePlatform);
	}
	animeBrief.appendChild(animePlatformTop);
	animeObject.appendChild(animeBrief);
	
	/*
	var animeEpisodes = document.createElement("span");
	animeEpisodes.classList.add('anime-episodes');
	animeEpisodes.title = "Episodes available";
	
	var animeEpisodesIcon = document.createElement("span");
	animeEpisodesIcon.classList.add('material-icons');
	animeEpisodesIcon.style.fontSize = "12px";
	animeEpisodesIcon.textContent = "playlist_play";
	
	var animeEpisodesVal = document.createElement("span");
	animeEpisodesVal.textContent = animeData[EPISODES][0];
	
	animeEpisodes.appendChild(animeEpisodesIcon);
	animeEpisodes.appendChild(animeEpisodesVal);
	animeBrief.appendChild(animeEpisodes);
	*/
	
	return animeObject;	
}

function makeanimeobject(animeData)
{
	if(toggleCard)
	{
		return makeanimeobjectcard(animeData);
	}	
	else
	{
		return makeanimeobjectlist(animeData);
	}
}

function clickList()
{
	toggleCard = false;
	updateLayout(true);
}

function clickCard()
{
	toggleCard = true;
	updateLayout(true);
}

function updateLayout(update)
{
	var layouts = document.querySelectorAll(".viewer");
	if(toggleCard)
	{
		layouts[1].classList.add("clicked");
		layouts[0].classList.remove("clicked");
	}
	else
	{
		layouts[0].classList.add("clicked");
		layouts[1].classList.remove("clicked");
	}
	if(update)
	{
		updateContainer();
	}
}

function populateInit()
{
	document.querySelector("div.search-bar input").value = "";
	updateLayout(false);
	updateSelect();
}

function getCheckedPlatforms()
{
	var platforms = document.querySelectorAll(".dropdown .checkbox-container > input");
	var retVal = [];
	let i=0;
	for(i=1;i<platforms.length;i++)
	{
		if(platforms[i].checked)
		{
			retVal = retVal.concat(platforms[i].id);
		}
	}
	return retVal;
}

function updateContainer()
{
	remakeContainer();
	var results = document.querySelector(".results");
	var search = document.querySelector(".search-container > input");
	
	var container = document.querySelector(".anime-container");
	switch(sortMethod)
	{
		case 0:
		{
			displayData.sort(sortTitle);
			break;
		}
		case 1:
		{
			if(MAL)
			{
				displayData.sort(sortScoreMal);
			}
			else
			{
				displayData.sort(sortScoreAnilist);
			}
			break;
		}
		case 2:
		{
			displayData.sort(sortDate);
			break;
		}
		default:
		{
			break;
		}
	}
	
	if(displayData.length > 0)
	{
		let documentFragment = document.createDocumentFragment();
		displayData.forEach(object => {documentFragment.appendChild(makeanimeobject(object));});
		container.appendChild(documentFragment);
	}
	
	if(search.value.length >= 3)
	{
		if(platformChecked == 0)
		{
			results.innerHTML = displayData.length + " entries for "+ search.value + " in "+getCheckedPlatforms();
		}
		else
		{
			results.innerHTML = displayData.length + " entries for "+ search.value;
		}
	}
	else
	{
		if(platformChecked == 0)
		{
			results.innerHTML = displayData.length + " entries in "+getCheckedPlatforms();
		}
		else
		{
			results.innerHTML = displayData.length + " entries";
		}
	}
	
	setTimeout(()=>{
		spinnerVisible('none')
	}, 1000)
}

function includesNoCase(substr,arr)
{
	var retVal = false;
	var i=0;
	var array_el;
	strarr = arr.substr(1,arr.length-2);
	strarr = strarr.split(",");
	for(i=0;i<strarr.length;i++)
	{
		if(strarr[i])
		{
			array_el = strarr[i].toLowerCase();
			retVal = retVal || array_el.includes(substr);
		}
	}
	return retVal;
}

function filterText(animeObject)
{
	let title = animeObject[ANIME_TITLE].toLowerCase();
	var platforms = animeObject[PLATFORM].map(v => v.toLowerCase());
	return title.includes(this.toLowerCase()) || includesNoCase(this.toLowerCase(),animeObject[ANIME_TITLE_ALT]) 
		|| includesNoCase(this.toLowerCase(),animeObject[GENRES]) || platforms.includes(this.toLowerCase());
}

function filterPF(animeObject)
{
	var platforms = animeObject[PLATFORM].map(v => v.toLowerCase());
	return platforms.includes(this.toLowerCase())
}

function filterFree(animeObject)
{
	return (animeObject[PLATFORM_PAID].includes(Number(this))||animeObject[PLATFORM_PAID].includes(String(this)));
}

function filterMovies(animeObject)
{
	return animeObject[EPISODES].find(e=>e == "1") ;
}

function clickMovies()
{
	var toggleMovies = document.querySelector("button.movie");
	if(movies)
	{
		toggleMovies.style.backgroundColor = "unset";
		movies = 0;
	}
	else
	{
		toggleMovies.style.backgroundColor = "var(--colorCrimson)";
		movies = 1;
	}
	searchText();
}

function clickAnimeList()
{
	var animelist = document.querySelector("button.animelist");
	if(MAL)
	{
		animelist.innerHTML = "Switch to MAL"
		MAL = 0;
	}
	else
	{
		animelist.innerHTML = "Switch to Anilist"
		MAL = 1;
	}
	searchText();
}

function clickFree()
{
	var toggleFree = document.querySelector("button.labels.free");
	if(free)
	{
		toggleFree.style.backgroundColor = "unset";
		free = 0;
	}
	else
	{
		toggleFree.style.backgroundColor = "var(--colorCrimson)";
		free = 1;
	}
	searchText();
}

function filterData()
{
	var checkboxes = document.querySelectorAll(".dropdown .checkbox-container > input");
	var i;
	platformData = [];
	var selectAll = true;
	var selectNone = true;
	for(i=1;i<checkboxes.length;i++)
	{
		selectAll = selectAll && checkboxes[i].checked;
		selectNone = selectNone && (!checkboxes[i].checked);
		if(checkboxes[i].checked)
		{
			platformData = platformData.concat(data.filter(filterPF,checkboxes[i].id));
		}
	}
	if(selectAll)
	{
		checkboxes[0].checked = true;
		checkboxes[0].indeterminate = false;
		platformChecked = 1;
	}
	else if(selectNone)
	{
		checkboxes[0].checked = false;
		checkboxes[0].indeterminate = false;
		platformChecked = -1;
	}
	else
	{
		checkboxes[0].indeterminate = true;
		platformChecked = 0;
	}
	searchText();
}

function updateSelect()
{
	var selectAll = document.querySelectorAll(".dropdown .checkbox-container > input");
	if(selectAll[0].checked)
	{
		platformChecked = 1;
		platformData = data;
	}
	else
	{
		platformChecked = -1;
		platformData = [];
	}
	let i=0;
	for(i=1;i<selectAll.length;i++)
	{
		selectAll[i].checked = (platformChecked == 1);
	}
	searchText();
}

function searchText()
{
	var searchStr = document.querySelector("div.search-bar input").value;
	if(searchStr.length >= 3)
	{
		displayData = platformData.filter(filterText,searchStr);
	}
	else
	{
		displayData = platformData.sort(sortDate);
	}
	if(free)
	{
		displayData = displayData.filter(filterFree,0);
	}
	if(movies)
	{
		displayData = displayData.filter(filterMovies,0);
	}
	updateContainer();
}

function spinnerVisible(status) {
	document.getElementById('spinner').style.display = status
}

var timer;
