//code to display photo in side, with photographer name
//create 2 arrays, one of all photographer names, and another with all photos from "images" file
const photoguys = []
photoguys[0] = "Aron Visuals"
photoguys[1] = "Roberto Nickson"
photoguys[2] = "Anna Shvetz"
const photos = []
photos[0] = "url(./images/quotebg.png)"
photos[1] = "url(./images/quotebg1.jpg)"
photos[2] = "url(./images/quotebg2.jpg)"

//pick a random photo to display
const randomInt = (max, min) => Math.round(Math.random() * (max - min)) + min;
random = randomInt(0, 2)
document.body.style.backgroundImage = photos[random]

//display photographer's name
let photoguyname = document.getElementById("photoguy")
photoguyname.textContent = "Photo by " + photoguys[random]

// code for checking if entered password and username is correct
let correctusername = "user";
let correctpassword = "password";

// get html form and button elements
const form = document.getElementById("loginform")
const submitbutton = document.getElementById("submitbutton")

// check if entered password and username are correct on button click
submitbutton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked button")
    const username = form.username.value
    const password = form.password.value

    // if correct, load main page
    if (username === correctusername && password === correctpassword){
        window.location = "./htmlpages/homepage.html";
    }

    //otherwise, alert user using browser alert 
    else{
      alert("You've entered the wrong password or username");
      form.username.value = "";
      form.password.value = "";
    }
})
