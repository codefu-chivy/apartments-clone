$(function() {
    var collapse = true;
    var collapseBedBath = true;
    var minAmount, maxAmount, maxVal, minVal;

    $.get("/is-secure", function(data) {
        var url;
        if (data.secure) {
            url = "https://ipapi.co/json/";
        }
        else {
            url = "https://ipapi.co/json";
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

    //Input dropdowns on click
    $("#rent-range").click(function() {
        if (collapse) {
            $(".input-collapse").addClass("input-collapse-drop");
            $(".section-collapse").addClass("min-column-drop");
            $(".arrow-rent").addClass("fa-arrow-down-rotate");
        }
        else {
            $(".input-collapse").removeClass("input-collapse-drop");
            $(".section-collapse").removeClass("min-column-drop");
            $(".arrow-rent").removeClass("fa-arrow-down-rotate");
        }
        collapse = !collapse;  
        
    });
    $(".min-option").click(function() {
        showMax(event, $(this));
    });
    $(".max-option").click(function() {
        showMin(event, $(this));
    });
    $("#max").on({"click": showMax, "keypress": function(e) {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return;
            }
            else {
                showMin(event, $(this));
            }
        }
        if (e.key === "0" && !$("#max").val()) {
            e.preventDefault();
        }
        if ((!Number(e.key) && e.key !== "0") || e.target.value.length >= 5) {
            e.preventDefault();
        }
        
    }});
    $("#min").on({"click": showMin, "keypress": function(e) {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return;
            }
            else {
                showMax(event, $(this));
            }
        }
        if (e.key === "0" && !$("#min").val()) {
            e.preventDefault();
        }
        if ((!Number(e.key) && e.key !== "0") || e.target.value.length >= 5) {
            e.preventDefault();
        }
    }});
    $("#bed-bath").click(function() {
        if (collapseBedBath) {
            $(".section-collapse-bb").addClass("input-collapse-drop");
            $(".arrow-bed-bath").addClass("fa-arrow-down-rotate");
        }
        else {
            $(".section-collapse-bb").removeClass("input-collapse-drop");
            $(".arrow-bed-bath").removeClass("fa-arrow-down-rotate");
        }
        collapseBedBath = !collapseBedBath;
    });
    $(".section-collapse-bb option").click(function() {
        handleBedBath($(this));
    });

    //Functions to handle min and max rent and bed and bath
    function showMax(event, obj) {
        if (obj) {
            if (Number(obj.val().slice(1, obj.val().length))) {
                minAmount = obj.val();
                if ($("#max").val()) {
                    var maxText = $("#max").val();
                }
                if (minAmount.indexOf("$") === -1) {
                    minAmount = "$" +  obj.val();
                }
                if (maxText) {
                    $("#rent-range").html(minAmount + "-$" + maxText);
                }
                else {
                    $("#rent-range").html(minAmount + "+");
                }
            }
            else {
                if (maxVal) {
                    $("#rent-range").html("<" + maxVal)
                }
                else {
                    $("#rent-range").html("Rent Range");
                }
            }
        }
        $("#max-column").css("display", "initial");
        $("#min-column").css("display", "none");
    }

    function showMin(event, obj) {
        var text;
        if (obj) {
            if (Number(obj.val())) {
                maxVal = obj.val();
            }
            else {
                maxVal = Number(obj.val().slice(1, obj.val().length));
            }
            if (maxVal) {
                maxAmount = obj.val();
                if (!minAmount && !$("#min").val()) {
                    $("#rent-range").html("<$" + maxVal);
                }
                else {
                    if (!minAmount) {
                        minVal = Number($("#min").val());
                        $("#rent-range").html("$" + minVal + "-$" + maxVal);
                    }
                    else {
                        minVal = Number(minAmount.slice(1, minAmount.length));
                        text = $("#rent-range").text();
                        text = text.slice(0, text.length - 1);
                        $("#rent-range").html(text + "-$" + maxVal);
                    }
                    if (minVal >= maxVal) {
                        alert("Minimum can't be greater or equal to maximum value!");
                        $("#rent-range").html("Rent Range");
                        return;
                    }
                }
            }
            $(".input-collapse").removeClass("input-collapse-drop");
            collapse = !collapse;
            minAmount = null;
        }
        else {
            $("#rent-range").html("Rent Range");
            $("#min-column").css("display", "initial");
            $("#max-column").css("display", "none");
        }
    }

    function handleBedBath(ele) {
        var selectedBed;
        var selectedBath;

        if (ele.parent().attr("id") === "beds") {
            selectedBed = ele.val();
            selectedBath = document.getElementById("baths").value;
            $("#bed-bath").html(selectedBed + " x " + selectedBath);
        }
        else {
            selectedBath = ele.val();
            selectedBed = document.getElementById("beds").value;
            $("#bed-bath").html(selectedBed + " x " + selectedBath);
        }
    }
});