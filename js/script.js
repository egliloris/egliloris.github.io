const backgroundColor = document.querySelector('#bg-color');
const textColor = document.querySelector('#text-color');
const iconColor = document.querySelector('#accent-color');
const versionOld = document.querySelector('#reset');
const version2 = document.querySelector('#ver2');
const versionOld_de = document.querySelector('#reset_de');
const version2_de = document.querySelector('#ver2_de');
var colorchanging = false;
const settingsButton = document.querySelector('#settings-button');
const settings = document.querySelector('#settings');
const inner_settings = document.querySelector('#inner_settings');


/*********************** */
/* Language switcher     */
/*********************** */

/*set every style of an element with class "language_en" display:none*/
function hideEnglish(){
    var elements = document.getElementsByClassName("language_en");
    for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}

/*set every style of an element with class "language_de" display:none*/
function hideGerman(){
    var elements = document.getElementsByClassName("language_de");
    for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}

/*set every style of an element with class "language_en" display:block*/
function showEnglish(){
    var elements = document.getElementsByClassName("language_en");
    for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }
}

/*set every style of an element with class "language_de" display:block*/
function showGerman(){
    var elements = document.getElementsByClassName("language_de");
    for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }
}

function setLanguageDe(){
    hideEnglish();
    showGerman();
    //set html lang attribute to de
    document.querySelector('html').setAttribute('lang', 'de');

    window.sessionStorage.setItem('language', 'de');
}

function setLanguageEn(){
    hideGerman();
    showEnglish();
    //set html lang attribute to en
    document.querySelector('html').setAttribute('lang', 'en');

    window.sessionStorage.setItem('language', 'en');
}


//change language if German is clicked
document.querySelector('#language_switcher_DE').addEventListener('click', () => {
    setLanguageDe();
});

//change language if English is clicked
document.querySelector('#language_switcher_EN').addEventListener('click', () => {
    setLanguageEn();
});


//initially set language to english if language is set in SessionStorage
if(window.sessionStorage.getItem('language') == 'en'){
    setLanguageEn();
}
else{
    setLanguageDe();
}





/*********************** */
/* Color switcher(s)     */
/*********************** */


backgroundColor.addEventListener('change', (event) => {
    document.documentElement.style.setProperty('--color_Background', event.target.value);
    /*updateColorBackground(event.target.value.substring(1));*/
    document.documentElement.style.setProperty('--color_Highlighted',LightenDarkenColor(event.target.value, 15));
});

textColor.addEventListener('change', (event) => {
    document.documentElement.style.setProperty('--color_Text', event.target.value);
});

iconColor.addEventListener('change', (event) => {
    document.documentElement.style.setProperty('--color_Icons', event.target.value);
});

versionOld.addEventListener('click', (event) => {
    document.documentElement.style.setProperty('--color_Background', "#5CDB95");
    document.documentElement.style.setProperty('--color_Text', "#EDF5E1");
    document.documentElement.style.setProperty('--color_Highlighted', "#6beaa4");
    document.documentElement.style.setProperty('--color_Icons', '#379683');
    backgroundColor.value = "#5CDB95";
    textColor.value = "#EDF5E1";
    iconColor.value = "#379683";
});



version2.addEventListener('click', (event) => {
    document.documentElement.style.setProperty('--color_Background', "#e3f1ff");
    document.documentElement.style.setProperty('--color_Text', "#000");
    document.documentElement.style.setProperty('--color_Highlighted', "#f2ffff");
    document.documentElement.style.setProperty('--color_Icons', '#379683');
    backgroundColor.value = "#e3f1ff";
    textColor.value = "#000000";
    iconColor.value = "#379683";            
});


versionOld_de.addEventListener('click', (event) => {
    document.documentElement.style.setProperty('--color_Background', "#5CDB95");
    document.documentElement.style.setProperty('--color_Text', "#EDF5E1");
    document.documentElement.style.setProperty('--color_Highlighted', "#6beaa4");
    document.documentElement.style.setProperty('--color_Icons', '#379683');
    backgroundColor.value = "#5CDB95";
    textColor.value = "#EDF5E1";
    iconColor.value = "#379683";
});



version2_de.addEventListener('click', (event) => {
    document.documentElement.style.setProperty('--color_Background', "#e3f1ff");
    document.documentElement.style.setProperty('--color_Text', "#000");
    document.documentElement.style.setProperty('--color_Highlighted', "#f2ffff");
    document.documentElement.style.setProperty('--color_Icons', '#379683');
    backgroundColor.value = "#e3f1ff";
    textColor.value = "#000000";
    iconColor.value = "#379683";            
});


function LightenDarkenColor(col, amt) {       
    var usePound = true;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    //if color is white set it to ebebeb
    if(col == "ffffff"){
        return "#ebebeb";
    }

    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


//open settings
settingsButton.addEventListener('click', () => {
    settings.classList.add('open');  
    inner_settings.style.visibility = "visible";
});

//prevent closing settings when clicking on color picker
inner_settings.addEventListener('click', () => {
    if(event.target.id == "bg-color" || event.target.id == "text-color" || event.target.id == "accent-color"){
        colorchanging = true;
    }
});

//close settings when clicking outside of it
settings.addEventListener('click', () => {
    if(event.target.id == "settings"){
        if(colorchanging){
            colorchanging = false;
            return;
        }
        settings.classList.remove('open');
        inner_settings.style.visibility = "hidden";
    }
});

/*********************** */
/* Scrollbar switcher    */
/*********************** */


//custom scrollbars css loader
document.querySelector('#switch').addEventListener('click', () => {
 


    
    if(document.querySelector('#switch').checked){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/scrollbars.css';
        document.head.appendChild(link);
    }
    else{
        document.querySelector('link[href="css/scrollbars.css"]').remove();
    }
});

//default: load the css scrollbars.css and check the switch
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'css/scrollbars.css';
document.head.appendChild(link);
document.querySelector('#switch').checked = true;



/*********************** */
/* Card-Switcher         */
/*********************** */
document.getElementById("cardnext").addEventListener("click", function() {
    cardRight();
    buttonsWhileSwitching();
    switchTextRight();
});

document.getElementById("cardprevious").addEventListener("click", function() {
    cardleft();
    buttonsWhileSwitching();
    switchTextLeft();
});


function cardRight() {
    //get the the elements
    var left = document.getElementsByClassName("left");
    var middle = document.getElementsByClassName("middle");
    var right = document.getElementsByClassName("right");

    //get the correct elements
    left = left[0];
    middle = middle[0];
    right = right[0];

    //add the z-index to correctly switch the elements
    right.style.zIndex = 1;
    middle.style.zIndex = 0;
    left.style.zIndex = -1;


    //change the classes
    left.classList.remove("left");
    middle.classList.remove("middle");
    right.classList.remove("right");

    left.classList.add("right");
    middle.classList.add("left");
    right.classList.add("middle");
}

function cardleft() {
    //get the the elements
    var left = document.getElementsByClassName("left");
    var middle = document.getElementsByClassName("middle");
    var right = document.getElementsByClassName("right");

    //get the correct elements
    left = left[0];
    middle = middle[0];
    right = right[0];
    

    //add the z-index to correctly switch the elements
    left.style.zIndex = 1;
    right.style.zIndex = 0;
    middle.style.zIndex = -1;

    //change the classes
    left.classList.remove("left");
    middle.classList.remove("middle");
    right.classList.remove("right");
    
    left.classList.add("middle");
    middle.classList.add("right");
    right.classList.add("left");
}


function buttonsWhileSwitching(){
    //make cardnext and cardprevious not clickable
    document.getElementById("cardnext").style.pointerEvents = "none";
    document.getElementById("cardprevious").style.pointerEvents = "none";

    //make the svg's temporarily fill = grey
    document.getElementById("cardnext_svg").style.fill = "grey";
    document.getElementById("cardprevious_svg").style.fill = "grey";

    //make cardnext and cardprevious clickable after 1 second
    setTimeout(function(){
        document.getElementById("cardnext").style.pointerEvents = "auto";
        document.getElementById("cardprevious").style.pointerEvents = "auto";

        //change the svg's fill back to white
        document.getElementById("cardnext_svg").style.fill = "white";
        document.getElementById("cardprevious_svg").style.fill = "white";
    }, 1400);
}

function switchTextRight(){
    //get the text elements
    var left = document.getElementsByClassName("leftText");
    var middle = document.getElementsByClassName("middleText");
    var right = document.getElementsByClassName("rightText");

    //get the correct elements
    left = left[0];
    middle = middle[0];
    right = right[0];

    //change the classes
    left.classList.remove("leftText");
    middle.classList.remove("middleText");
    right.classList.remove("rightText");

    left.classList.add("rightText");
    middle.classList.add("leftText");
    right.classList.add("middleText");

    //add the topText class to the middle element to move it up and make it disappear
    middle.classList.add("topText");

    //after the middle is moved up, remove the topText class and add the bottomText class to make it move down for the next switch
    setTimeout(function(){
        middle.classList.remove("topText");
        middle.classList.add("bottomText");
    }, 1400);

}

function switchTextLeft(){
    //get the text elements
    var left = document.getElementsByClassName("leftText");
    var middle = document.getElementsByClassName("middleText");
    var right = document.getElementsByClassName("rightText");

    //get the correct elements
    left = left[0];
    middle = middle[0];
    right = right[0];

    //change the classes
    left.classList.remove("leftText");
    middle.classList.remove("middleText");
    right.classList.remove("rightText");

    left.classList.add("middleText");
    middle.classList.add("rightText");
    right.classList.add("leftText");

    //add the topText class to the middle element to move it up and make it disappear
    middle.classList.add("topText");

    //after the middle is moved up, remove the topText class and add the bottomText class to make it move down for the next switch
    setTimeout(function(){
        middle.classList.remove("topText");
        middle.classList.add("bottomText");
    }, 1400);
}

/*if clickableCard is clicked*/
document.getElementById("clickableCard").addEventListener("click", function() {

    /*check which id=card[i] has class middle*/
    var card = document.getElementsByClassName("middle");
    var cardId = card[0].id;

    if(cardId == "card1"){
        
    }
    else if(cardId == "card2"){
        /*load webprojekt/index*/
        window.location.href = "webprojekt/index.html";
    }
    else if(cardId == "card3"){
        /*load canvas/index*/
        window.location.href = "canvas/index.html";
    }


    
});
