console.log("hello world");
//my api key WCAAUiz6GDkWmL3tPSccWvxlVWUZ9QDL

$(document).ready(function(){

//array storing list of topics to search
var topics = ["cat", "bird", "snake", "dog", "lizard", "alligator"];
console.log(topics.length);



//render buttons in button div
function renderButtons (){
//$("")
$("#button").empty();
//buttonAdder.empty();

for(var i =0 ; i < topics.length ; i++){
//create button
var buttonAdder = $("<button>");
// add text class data to button
buttonAdder.text(topics[i]);
buttonAdder.addClass("animalButton");
buttonAdder.attr("data-animal", topics[i]);
//append to button div 
$("#button").append(buttonAdder);


}
}
renderButtons();

//on click event for buttons
$("#button").on("click",".animalButton", function(){
var thisAnimal = $(this).attr("data-animal");
//console.log(thisAnimal);

// create giphy url to get json data
var giphy = "https://api.giphy.com/v1/gifs/search?q=" +
    thisAnimal + "&api_key=WCAAUiz6GDkWmL3tPSccWvxlVWUZ9QDL&limit=10";

//sends request to giphy api
$.ajax({
    url: giphy,
    method: "GET"
      })

.then(function(response) {
//saving json response to var results
var results = response.data;
console.log(results)

for (var i = 0; i < results.length; i++){
//create  animal div
var animalDiv = $("<div></div>");

//add class to target it
animalDiv.addClass("animalDiv");

//creat animal paragraph
var animalP = $("<p>");

//create animal img
var animalImg = $("<img>")

// add text to paragraph from reults
animalP.text("Rating: " + results[i].rating);

//add image url to animal img
animalImg.attr("src", results[i].images.fixed_height_still.url);
animalImg.addClass("animalImg")

// add data state default to still
animalImg.attr("data-state", "still")

// add animatte data
animalImg.attr("data-animate", results[i].images.fixed_height.url)

//add data-still
animalImg.attr("data-still", results[i].images.fixed_height_still.url)

//addppending img and paragraph to animalDiv

animalDiv.append(animalP);
animalDiv.append(animalImg);

//append image class with animal div
$("#image").prepend(animalDiv);

// end for loop
}




//end function response
})
// end on click
})


$("#image").on("click",".animalImg", function(){

//get state of clicked gif
var stateCurrent = $(this).attr("data-state");
console.log(stateCurrent);

if(stateCurrent == "still"){

    //change state to animate
    $(this).attr("data-state", "animate");
    // change image source toanimated gif
    $(this).attr("src", $(this).attr("data-animate"));
}
else{

    //change state to animate
    $(this).attr("data-state", "still");
    // change image source to still gif
    $(this).attr("src", $(this).attr("data-still"));

}
//end animate click
})

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#add").val().trim();
    console.log(newAnimal);
    topics.push(newAnimal)
    renderButtons();
})


//end doc ready
})