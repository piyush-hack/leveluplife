function confpass(){
    var psd = document.getElementById('psd').value;
    var confpsd = document.getElementById('confpsd').value;
    var warning = document.getElementById('warn');
    if(psd == confpsd){
        warning.innerHTML = ' ✔ Password Configured!';
        warning.style.color = "green";
    }else{
        warning.innerHTML = ' ✖ Same Pass Not Entered!';
        warning.style.color = "red";
    }
}

function enablesubmit(){
    var psd = document.getElementById('psd').value;
    var confpsd = document.getElementById('confpsd').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var submit = document.getElementById('submit');
    var warnname = document.getElementById('warnname');
    var confcolor = warnname.style.color;
     
    if(psd != null & confpsd != null & name != null & email != null & psd==confpsd & confcolor=='green' ){
        submit.disabled = '';
    }else{
        submit.disabled = 'disabled';
    }
}


function checkname(){
    var allnames = document.getElementById('allnames').innerHTML;
    var name = document.getElementById('name').value;
    var warnname = document.getElementById('warnname');

    console.log(typeof allnames);
    var isname = allnames.includes(name);
    if(isname==false){
        warnname.innerHTML = ' ✔ Username Configured!';
        warnname.style.color = "green";
    }else{
        warnname.innerHTML = ' ✖ Username Already Exisiting!';
        warnname.style.color = "red";
    }

}