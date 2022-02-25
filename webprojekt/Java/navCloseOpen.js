function navCloseOpen(){
			
	var nav = document.getElementById("nav1");
	var navtext = document.getElementById("nav1_text");
	var navi = document.getElementsByClassName("navi");
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	if (nav.style.visibility == "visible"){
		
		nav.style.visibility = "hidden";
		nav_background.style.visibility = "hidden";
		document.getElementById("hamburg").checked = false;	
		
			navi[0].style.marginLeft = "-500px";
			navi[1].style.marginLeft = "-500px";
			navi[2].style.marginLeft = "-500px";
			navi[3].style.marginLeft = "-500px";
			navi[4].style.marginLeft = "-500px";
			navi[5].style.marginLeft = "-500px";

		if (w >= 1100){
			nav.style.width = "10px";
		}
	}
	else{
		
		nav.style.visibility = "visible";
		nav_background.style.visibility = "visible";
	
		document.getElementById("hamburg").checked = true;
		
			navi[0].style.marginLeft = "0px";
			navi[1].style.marginLeft = "0px";
			navi[2].style.marginLeft = "0px";
			navi[3].style.marginLeft = "0px";
			navi[4].style.marginLeft = "0px";
			navi[5].style.marginLeft = "0px";

		if (w >= 1100){
			nav.style.width = "500px";
		
		}
		if (w <= 1100){
			nav.style.width = "100%";
		}
	}
}

var slideIndex = 1;
var timer = 6000;

function closeNav(){
	document.getElementById("hamburg").checked = false;
}

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	
	if (1 > slides.length) {
		slideIndex = 1
	}
	
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	
	for (i = 0; i < dots.length; i++) {
		if (slideIndex == 0){
			slideIndex = 3;
		}
		if (slideIndex == 4){
			slideIndex = 1;
		}
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].classList.add("active");
}

function slideshow() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1
	}  
	
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
	setTimeout(slideshow, timer);
}

   


