$(function() {
    let imageArr = [
        {src: "../images/architecture.jpg", heading: "Parking", desc: "Check out rentals with plenty of parking"}, 
        {src: "../images/commuter.jpg", heading: "Be close to work", desc: "Simplify your commute, search for rentals within 45 minutes of work"}, 
        {src: "../images/dishwasher.jpg", heading: "Dishwasher", desc: "Keep the place clean with dishwasher equipped rentals"}, 
        {src: "../images/friends.jpg", heading: "Pet Friendly", desc: "Explore rentals your four-legged friends can call home"}, 
        {src: "../images/washing-machine.jpg", heading: "Washer & Dryer", desc: "Find rentals with in-unit washer & dryer"}, 
        {src: "../images/pool.jpg", heading: "Pools", desc: "View rentals with indoor and outdoor pools"},
        {src: "../images/laundromat.jpg", heading: "On-Site Laundry", desc: "Clean your duds close to home"},
        {src: "../images/gym.jpg", heading: "Fitness Center", desc: "Find your next home while staying fit"},
        {src: "../images/townhouse.jpg", heading: "Rent a townhome", desc: "Looking for a little more space, view home rentals"}
    ];
    let randomArr = [];
    for (let i = 0; i < 5; i++) {
        let randomNum = random();
        if (randomArr.length === 9) {
            randomArr.splice(0, 9);
        }
        else if (randomArr.indexOf(randomNum) !== -1) {
            while (randomArr.indexOf(randomNum) !== -1) {
               randomNum = random();
            }
        }
        $("<div class='images' style='background-image: url(" + imageArr[randomNum].src + ")'><h3>" + imageArr[randomNum].heading + "</h3><p>" + imageArr[randomNum].desc + "</div>").hide().fadeIn().prependTo($(".image-cont"));
        randomArr.push(randomNum);
    }
    function random() {
        let random = Math.floor(Math.random() * imageArr.length);
        return random;
    }
});