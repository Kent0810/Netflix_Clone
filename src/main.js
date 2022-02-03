const API_Key = "74c33f4d1e5b00eabcc5202866942c02";
//Get Genres: https://api.themoviedb.org/3/genre/movie/list?api_key=74c33f4d1e5b00eabcc5202866942c02&language=en-U
//Search Genres: https://api.themoviedb.org/3/discover/movie?api_key=74c33f4d1e5b00eabcc5202866942c02&with_genres=16
var genresAPI = "https://api.themoviedb.org/3/discover/movie?api_key=74c33f4d1e5b00eabcc5202866942c02&with_genres="
var getCategory = "https://api.themoviedb.org/3/discover/movie?api_key=74c33f4d1e5b00eabcc5202866942c02&with_genres="
var getMovie1 = "https://api.themoviedb.org/3/movie/"
var getMovie2 = "/videos?api_key=74c33f4d1e5b00eabcc5202866942c02"
var YoutubeLink = "https://www.youtube.com/embed/"

const x = "https://image.tmdb.org/t/p/original";
const banner = document.querySelector(".banner");
const banner_title = document.querySelector(".banner-title")
const banner_paragraph = document.querySelector(".banner-paragraph")


fetch('https://api.themoviedb.org/3/discover/tv?api_key=74c33f4d1e5b00eabcc5202866942c02&with_networks=213')
    .then(response => response.json())
    .then(data => {
        const slide = document.querySelectorAll(".swiper-slide-1")
        for (var i = 0; i < data.results.length; i++) {
            var backdrop = data.results[i].poster_path;
            var myImage = new Image();
            myImage.src = x + backdrop;
            slide[i].appendChild(myImage);

        }
    });

fetch('https://api.themoviedb.org/3/movie/popular?api_key=74c33f4d1e5b00eabcc5202866942c02&language=en-US&page=1')
    .then(response => response.json())
    .then(data => {
        const slide = document.querySelectorAll(".swiper-slide-2")
        for (var i = 0; i < data.results.length; i++) {
            var backdrop = data.results[i].backdrop_path;
            var myImage = new Image();
            myImage.src = x + backdrop;
            slide[i].appendChild(myImage);
            //SET ID!!!!!!!!!!!!!
            for (var j = 0; j < 20; j++) {
                slide[j].setAttribute("id", data.results[j].id)
            }
            //Random Slide Function
            randomSlideFunc(data);
            //Banner Change On Click
            slide[i].addEventListener('click', (e) => {
                console.log(e.target.src)
                banner.style.backgroundImage = 'url(' + e.target.src + ')'
                // Get Banner Title And Description On Click
                for (var i = 0; i < slide.length; i++) {
                    if (e.target.src == x + data.results[i].backdrop_path) {
                        banner_title.innerHTML = data.results[i].original_title;
                        banner_paragraph.innerHTML = data.results[i].overview;
                        banner.setAttribute("id", e.target.parentElement.id)
                    }
                }
                // Styling for banner
                Object.assign(banner.style, {
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                })
                //On Click Scroll Back To Top
                window.scrollTo({ top: 0, behavior: 'smooth' })
                window.clearInterval(myTimer);

                myTimer = window.setInterval(ticker, 15000);
                document.body.scrollTop = 0;//Go with scroll-behavior: smooth; in css to achive this
            })
        }
    });
function ticker() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=74c33f4d1e5b00eabcc5202866942c02&language=en-US&page=1')
        .then(response => response.json())
        .then(data => {
            var ran = Math.floor((Math.random() * 20));
            var randomSlide = data.results[ran].backdrop_path;
            var ranTitle = data.results[ran].original_title;
            var ranDescription = data.results[ran].overview;
            banner_title.innerHTML = ranTitle;
            banner_paragraph.innerHTML = ranDescription
            banner.style.backgroundImage = 'url(' + x + randomSlide + ')';
            banner.setAttribute("id", data.results[ran].id)
            Object.assign(banner.style, {
                backgroundPosition: "top center",
                backgroundSize: "cover",
            })
        })
}
var myTimer = window.setInterval(ticker, 15000)
function randomSlideFunc(data) {
    // Random Banner In The Begining
    var ran = Math.floor((Math.random() * 20));
    var randomSlide = data.results[ran].backdrop_path;
    var ranTitle = data.results[ran].original_title;
    var ranDescription = data.results[ran].overview;
    banner_title.innerHTML = ranTitle;
    banner_paragraph.innerHTML = ranDescription
    banner.style.backgroundImage = 'url(' + x + randomSlide + ')';
    banner.setAttribute("id", data.results[ran].id)
    Object.assign(banner.style, {
        backgroundPosition: "top center",
        backgroundSize: "cover",
    })
}

async function getGenres() {
    return (await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=74c33f4d1e5b00eabcc5202866942c02&language=en-US")).json();
}
async function getPoster(genres) {
    return (await fetch("https://api.themoviedb.org/3/discover/movie?api_key=74c33f4d1e5b00eabcc5202866942c02&with_genres=" + genres)).json();
}
document.addEventListener("DOMContentLoaded", async () => {
    let genresArray = [];
    try {
        genresArray = await getGenres();
    }
    catch (e) {
        console.log("Error!");
        console.log(e);
    }
    creatingCategory(genresArray.genres)
})

async function creatingCategory(genresArray) {
    const genresName = [];
    for (let i = 0; i < genresArray.length; i++) {
        genresName.push(genresArray[i].name);
    }
    let genresInfo = new Array(genresName.length);

    for (let i = 0; i < genresArray.length; i++) {
        genresInfo[i] = await getPoster(genresArray[i].id);
    }
    addingDom(genresInfo, genresName);
    addingDropDownContent(genresName);
}
function addingDom(genresInfo, genresName) {
    // console.log(genresInfo[0].results[0].id)
    //Add Each Category Container
    for (let i = 0; i < genresInfo.length; i++) {
        let netflix_slider = document.createElement("div");
        document.querySelector(".netflix_body").appendChild(netflix_slider);
        netflix_slider.className = "netflix-slider jsSlider ";
    }
    const container = document.querySelectorAll(".jsSlider");
    //add swiperJs into Category Container
    for (let i = 0; i < genresInfo.length; i++) {
        let swiper_mySwiper = document.createElement("div");
        container[i].appendChild(swiper_mySwiper);
        swiper_mySwiper.className = "swiper mySwiper jsmySwiper";
    }
    const subContainer = document.querySelectorAll(".jsmySwiper")
    //add title and button next/prev
    for (let i = 0; i < subContainer.length; i++) {
        let title = document.createElement("div");
        let swiper_button_next = document.createElement("div");
        let swiper_button_prev = document.createElement("div");
        subContainer[i].appendChild(title);
        subContainer[i].appendChild(swiper_button_next);
        subContainer[i].appendChild(swiper_button_prev);
        title.className = "title";
        title.textContent = genresName[i]
        swiper_button_next.className = "swiper-button-next";
        swiper_button_prev.className = "swiper-button-prev";
    }
    //add Wraper for the slide
    for (let i = 0; i < subContainer.length; i++) {
        let swiper_wrapper = document.createElement("div");
        subContainer[i].appendChild(swiper_wrapper);
        swiper_wrapper.className = "swiper-wrapper jsWraper";
    }
    const subsubContainer = document.querySelectorAll(".jsWraper");
    //add slide
    for (let i = 0; i < subsubContainer.length; i++) {
        for (let j = 0; j < 20; j++) {
            let swiper_slide = document.createElement("div");
            subsubContainer[i].appendChild(swiper_slide);
            swiper_slide.className = "swiper-slide swiper-slide-" + (i + 4);
            //add ID
            swiper_slide.setAttribute("id", genresInfo[i].results[j].id);
        }
    }
    //add each poster
    for (let flag = 0; flag < genresInfo.length; flag++) {
        const slide = document.querySelectorAll(".swiper-slide-" + (flag + 4))
        for (var i = 0; i < genresInfo[flag].results.length; i++) {
            var backdrop = genresInfo[flag].results[i].backdrop_path;
            var myImage = new Image();
            myImage.src = x + backdrop;
            slide[i].appendChild(myImage);
            slide[i].addEventListener('click', (e) => {
                banner.style.backgroundImage = 'url(' + e.target.src + ')';
                // Get Banner Title And Description On Click
                for (var j = 0; j < slide.length; j++) {
                    if (e.target.src == x + genresInfo[flag].results[j].backdrop_path) {
                        banner_title.innerHTML = genresInfo[flag].results[j].original_title;
                        banner_paragraph.innerHTML = genresInfo[flag].results[j].overview;
                        banner.setAttribute("id", e.target.parentElement.id)
                    }
                }
                // console.log(e.target.parentElement.id)
                Object.assign(banner.style, {
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                })
                //Reset Interval On Click
                window.clearInterval(myTimer);
                myTimer = window.setInterval(ticker, 15000);
                document.body.scrollTop = 0;//Go with scroll-behavior: smooth; in css to achive this
            })
        }
    }
    console.log("ALL DOM IS LOADED")
    addSwiperJS();
}
function addingDropDownContent(genresName) {
    var dropdown_content = document.querySelector(".dropdown-content");
    for (let i = 0; i < genresName.length; i++) {
        var genres_link = document.createElement("a");
        genres_link.textContent = genresName[i];
        genres_link.href = "#";
        dropdown_content.appendChild(genres_link);
    }
}



//Movie Box
var movie_navigate_container = document.querySelector(".movie_navigate_container");
var icon = {
    fa_times: document.querySelector(".close_btn"),
    fa_play: document.querySelector(".banner-play"),
    fa_search: document.querySelector(".fa-search"),
    fa_home: document.querySelector(".fa-home"),
    fa_calendar: document.querySelector(".fa-calendar"),
    fa_user: document.querySelector(".fa-user"),
    fa_plus: document.querySelector(".fa-plus")
};
var iframe = document.querySelector(".video-js")

function removeVideo(){
    movie_navigate_container.removeAttribute("id");
    myTimer = window.setInterval(ticker, 15000);
    movie_navigate_container.style.visibility = "hidden";
    movie_navigate_container.style.opacity = 0
    iframe.src = "";
}


icon.fa_times.addEventListener("click",removeVideo)

document.addEventListener("keydown",(e)=>{
    if(e.keyCode == 27){    
        removeVideo();
    }
})
var movie_title = document.querySelector(".movie_title")
var movie_overview = document.querySelector(".movie_overview")
//START FETCHING FOR INFO
async function getMovieInfo(movieID) {
    return (await fetch(getMovie1 + movieID + getMovie2)).json();
}
icon.fa_play.addEventListener("click", async () => {
    //adding Active//
    movie_navigate_container.setAttribute("id", "active")
    clearInterval(myTimer);
    movie_navigate_container.style.visibility = "visible";
    movie_navigate_container.style.opacity = 1;
    movie_title.textContent = banner_title.innerHTML;
    movie_overview.textContent = banner_paragraph.innerHTML
    let movieArray = [];
    try {
        movieArray = await getMovieInfo(banner.id);
    }
    catch (e) {
        console.log("Error!");
        console.log(e);
    }
    iframe.src = YoutubeLink + movieArray.results[0].key

    // console.log(YoutubeLink+movieArray.results[0].key +"&output=embed")
})



function hiddenMain(){
    document.querySelector(".banner").style.visibility = "hidden"
    document.querySelector(".banner").style.opacity = "0"
    var Netflix_slider = document.querySelectorAll(".netflix-slider")
    for (var i = 0; i < 21; i++) {
        Netflix_slider[i].style.visibility = "hidden"
        Netflix_slider[i].style.opacity = "0"
    }
}
function ActivateMain(){
    hiddenSearch();
    hiddenUser();
    document.querySelector(".banner").style.visibility = "visible"
    document.querySelector(".banner").style.opacity = "1"
    var Netflix_slider = document.querySelectorAll(".netflix-slider")
    for (var i = 0; i < 21; i++) {
        Netflix_slider[i].style.visibility = "visible"
        Netflix_slider[i].style.opacity = "1"
    }
}
function hiddenSearch(){
    document.querySelector(".search_mainContainer").style.visibility = "hidden";
    document.querySelector(".search_mainContainer").style.opacity = "0"
}
function ActivateSearch(){
    hiddenMain();
    hiddenUser();
    document.querySelector(".search_mainContainer").style.visibility = "visible";
    document.querySelector(".search_mainContainer").style.opacity = "1"
}
function hiddenUser(){
    document.querySelector(".user_container").style.visibility = "hidden";
    document.querySelector(".user_container").style.opacity = "0"
}
////////////////////////////User////////////////////
function ActivateUserPage(){
   hiddenSearch();
   hiddenMain();
    document.querySelector(".user_container").style.visibility = "visible";
    document.querySelector(".user_container").style.opacity = "1"
}





//Search 

icon.fa_search.addEventListener("click", () => {
    ActivateSearch();
    document.body.scrollTop = 0;//Go with scroll-behavior: smooth; in css to achive this
    icon.fa_search.style.borderBottom = "4px red solid"
    icon.fa_home.style.borderBottom = "none"
    icon.fa_calendar.style.borderBottom = "none"
    icon.fa_user.style.borderBottom = "none"
    icon.fa_plus.style.borderBottom = "none"

})
icon.fa_home.addEventListener("click", () => {
    ActivateMain();
    document.body.style.overflowY = "scroll";
    document.body.scrollTop = 0;//Go with scroll-behavior: smooth; in css to achive this
    icon.fa_home.style.borderBottom = "4px red solid"
    icon.fa_search.style.borderBottom = "none";
    icon.fa_calendar.style.borderBottom = "none"
    icon.fa_user.style.borderBottom = "none"
    icon.fa_plus.style.borderBottom = "none"
})
icon.fa_calendar.addEventListener("click",()=>{
    icon.fa_calendar.style.borderBottom = "4px red solid"
    icon.fa_search.style.borderBottom = "none";
    icon.fa_home.style.borderBottom = "none"
    icon.fa_user.style.borderBottom = "none"
    icon.fa_plus.style.borderBottom = "none"
})
icon.fa_plus.addEventListener("click",()=>{
    icon.fa_plus.style.borderBottom = "4px red solid"
    icon.fa_search.style.borderBottom = "none";
    icon.fa_calendar.style.borderBottom = "none"
    icon.fa_user.style.borderBottom = "none"
    icon.fa_home.style.borderBottom = "none"
})
icon.fa_user.addEventListener("click",()=>{
    ActivateUserPage();
    document.body.scrollTop = 0
    if(window.screen.width<420){
        document.body.style.overflowY = "scroll"
    }
    else{
        document.body.style.overflowY = "hidden"
    }
    icon.fa_user.style.borderBottom = "4px red solid"
    icon.fa_search.style.borderBottom = "none";
    icon.fa_calendar.style.borderBottom = "none"
    icon.fa_home.style.borderBottom = "none"
    icon.fa_plus.style.borderBottom = "none"
    
})


///////////////////////////////////ADD SWIPER.JS//////////////////
function addSwiperJS() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer: true,
        breakpoints: {
            100: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },

    });
    console.log("SWIPERJS HAS BEED INITIALIZED");
}
/////////////////////////////USER INPUT///////////////
var keyboard = {
    input: document.querySelector(".keyboard_content"),
    output: document.querySelector(".use-keyboard-input")
};
keyboard.input.addEventListener("click", (e) => {
    if (e.target.className != "space_bar" && e.target.className != "back_space") {
        keyboard.output.innerHTML += e.target.innerHTML;
    }
    else if (e.target.className == "back_space") {
        var temp = keyboard.output.innerHTML.slice(0, keyboard.output.innerHTML.length - 1)
        keyboard.output.innerHTML = temp
    }
    else if (e.target.className == "space_bar") {
        keyboard.output.innerHTML += " ";
    }
})

////////////////////////////////////////////SWIPER LINE
////////////////////////////////////////////380 and 213