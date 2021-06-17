var x = document.getElementById("one");
x.style.display = "none";
var data = JSON.parse(x.innerHTML);
var y = document.getElementById("two");
y.innerHTML = JSON.stringify(data.beg.day1.exc1);

var datalen = 0;
for (x in data.beg) {
    createDayDiv(x);
    var noOfExc = 0;
    for (y in data.beg[x]) {
        // console.log(data.beg[x][y]);
        if (data.beg[x][y]["name"]) {
            var excname = data.beg[x][y]["name"];
            var time = data.beg[x][y]["time"];
            var imglink = data.beg[x][y]["imgsrc"];
            creatediv(x, y, excname, time, imglink);
        } else {
            creatediv(x, y, data.beg[x][y], "allday", "https://www.seekpng.com/png/detail/18-186705_cup-mug-coffee-png-image-tea-and-coffee.png");
        }
        noOfExc++;
    }
    createDoneDiv(noOfExc, x);
}

function createDayDiv(dayno) {
    var daybtn = document.createElement("button");
    daybtn.innerHTML = dayno.toUpperCase() + " EXC START ";
    daybtn.onclick = function () {
        var hideid = "hide" + dayno;
        console.log(hideid);
        var allexcsDIV = document.getElementsByClassName(hideid);
        var excform = document.getElementById("form" + dayno);

        for (var i = 0; i < allexcsDIV.length; i++) {
            if (allexcsDIV[i].style.display == "none") {
                allexcsDIV[i].style.display = "block";
            } else {
                allexcsDIV[i].style.display = "none";
            }
        }

        if (excform.style.display == "none") {
            excform.style.display = "block";
            console.log(excform.style.display);
        } else {
            excform.style.display = "none";
        }
    }

    // daybtn.classList.add("btn");
    // daybtn.classList.add("btn-warning");
    daybtn.classList.add("openbtn");


    document.getElementById("wrapper").appendChild(daybtn);

}

function creatediv(x, y, name, time, imglink) {
    var codediv = document.createElement("div");
    var codeDivHideClass = "hide" + x;
    codediv.classList.add("codediv");
    codediv.classList.add(codeDivHideClass);

    var excimg = document.createElement("img");
    excimg.src = imglink;
    excimg.classList.add("excimg");
    codediv.appendChild(excimg);

    var excname = document.createElement("div");
    excname.innerHTML = name;
    excname.classList.add("excname");
    codediv.appendChild(excname);

    var exctime = document.createElement("div");
    exctime.innerHTML = time;
    exctime.classList.add("exctime");
    var timeid = "ti" + x + y;
    exctime.setAttribute("id", timeid);
    codediv.appendChild(exctime);

    var excbtn = document.createElement("BUTTON");
    excbtn.innerHTML = "START";
    excbtn.classList.add("excbtn");
    excbtn.classList.add("btn");
    excbtn.classList.add("btn-success");
    var btnid = "st" + x + y;
    excbtn.setAttribute("id", btnid);
    excbtn.onclick = function () {
        starttimer(this.id);
    }
    codediv.appendChild(excbtn);

    codediv.style.display = "none";
    document.getElementById("wrapper").appendChild(codediv);


}

function createDoneDiv(noOfExc, dayno) {

    var formid = "form" + dayno;
    var excform = document.createElement("form");
    excform.method = "GET";
    // excform.action = "/raisestats";
    excform.setAttribute("id", formid);
    excform.style.display = "none";
    excform.classList.add("excform");

    var excpoint = document.createElement("input");
    excpoint.type = "hidden";
    excpoint.placeholder = "Points Gained";
    excpoint.required = true;
    excpoint.name = "excpoint";
    excpoint.max = 1;
    excpoint.classList.add("form-control");
    excpoint.classList.add("excpoint");
    excpoint.setAttribute("id", "excpoint" + dayno);


    var exccount = document.createElement("input");
    exccount.type = "number";
    exccount.placeholder = "NO OF EXC DONE TODAY"
    exccount.required = true;
    exccount.name = "exccount";
    exccount.max = noOfExc;
    exccount.oninput = function(){
        var excdone = document.getElementById("exccount" + dayno).value;
        var pointsgained = parseFloat(excdone/noOfExc);
        document.getElementById("excpoint" + dayno).value = pointsgained;
        console.log(excdone, noOfExc, pointsgained);
    }
    exccount.classList.add("form-control");
    exccount.classList.add("exccount");
    exccount.setAttribute("id", "exccount" + dayno);


    


    var subbtn = document.createElement("button");
    subbtn.type = "submit";
    subbtn.innerHTML = "Done";
    subbtn.name = "subbtn";
    subbtn.classList.add("btn");
    subbtn.classList.add("btn-primary");
    subbtn.classList.add("subbtn");


    excform.appendChild(exccount);
    excform.appendChild(excpoint);
    excform.appendChild(subbtn);

    document.getElementById("wrapper").appendChild(excform);
}


function starttimer(btnid) {
    console.log(btnid);
    var slicedId = btnid.slice(2,);
    var timeid = "ti" + slicedId;
    var timeStr = document.getElementById(timeid).innerHTML
    if (timeStr.includes(":")) {
        var timestrarr = timeStr.split(":");
        var timeinsec = parseInt(timestrarr[0]) * 60 + parseInt(timestrarr[1]);
        console.log(timeinsec);
        var countDownDate = new Date();
        countDownDate.setSeconds(countDownDate.getSeconds() + timeinsec);
        console.log(countDownDate);
        countDownDate = countDownDate.getTime();
        console.log(countDownDate);
        // Update the count d+own every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var timerid = "ti" + slicedId;
            // Output the result in an element with id="demo"
            document.getElementById(timerid).innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                alert("DONE EXC")
                document.getElementById(timerid).innerHTML = timeStr;
            }
        }, 1000);
    }
}

