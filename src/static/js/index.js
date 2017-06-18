$(function() {
    $.get("/is-secure", function(data) {
        var url;
        if (data.secure) {
            url = "https://ip-api.com/json/";
        }
        else {
            url = "http://ip-api.com/json";
        }
        randomizeImages(url);
    });

    //Randomize images
    function randomizeImages(url){
        $.get(url, function(data) {
        let imageArr = [
            {src: "/static/images/architecture.jpg", heading: "Parking", desc: "Check out rentals with plenty of parking in " + data.city}, 
            {src: "/static/images/commuter.jpg", heading: "Be close to work", desc: "Simplify your commute, search for rentals within 45 minutes of work"}, 
            {src: "/static/images/elevator.jpg", heading: "Elevator Access", desc: "Get around easier with elevator access"}, 
            {src: "/static/images/friends.jpg", heading: "Pet Friendly", desc: "Explore rentals your four-legged friends can call home in " + data.city}, 
            {src: "/static/images/washing-machine.jpg", heading: "Washer & Dryer", desc: "Find rentals with in-unit washer & dryer in " + data.city}, 
            {src: "/static/images/pool.jpg", heading: "Pools", desc: "View rentals with indoor and outdoor pools in " + data.city},
            {src: "/static/images/laundromat.jpg", heading: "On-Site Laundry", desc: "Clean your duds close to home in " + data.city},
            {src: "/static/images/gym.jpg", heading: "Fitness Center", desc: "Find your next home while staying fit in " + data.city},
            {src: "/static/images/townhouse.jpg", heading: "Condo Living", desc: "Search for available condos in " + data.city}
        ];
        let randomArr = [];
        let width = window.innerWidth;
        let difference = window.outerWidth;
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
            $("<div id='square" + i + "' class='images'><div class='children' style='background-image: url(" + imageArr[randomNum].src + ")'><h3>" + imageArr[randomNum].heading + "</h3><p>" + imageArr[randomNum].desc + "</p></div></div>").hide().fadeIn().prependTo($(".image-cont"));
            randomArr.push(randomNum);
        }
        function random() {
            let random = Math.floor(Math.random() * imageArr.length);
            return random;
        }
        $(window).resize(() => {
            if (window.innerWidth < width) {
                console.log("hello");
            }
        })
    });
    }
    
});