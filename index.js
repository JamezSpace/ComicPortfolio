const images = document.querySelectorAll("section.innerwrapper img");
console.log(images);

// function wait(arr, i) {
//     return new Promise(resolve => {
//         setTimeout(console.log("hi"), 3000);
//     });
// }

async function test() {
    for (let i = 0; i < images.length; i++) {
        while (!images[i].complete) {
            const el = await wait(images, i);
            console.log(el);
            if (el.complete) {
                addClickEvent(images[i]);
                break;
            }
        }
    }
}

test();

function addClickEvent(element) {
    element.addEventListener("click", e => {
        alert("hi");
    });
}
const form = document.forms['contactMe'];
const submit = document.getElementById("btn_submit");
const nameField = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

function valName() {
    let valid = false;
    const inputName = nameField.value.trim();
    let letters = /[A-Za-z]+$/;

    if (inputName.length == 0) {
        let notif = "  Name field cannot be left blank";
    } else if (!letters.test(inputName)) {
        let notif = "  Only letter characters permitted";
    } else {
        valid = true;
    }

    return [nameField, valid];
}

function valEmail() {
    let valid = false;
    let email_exclaim = document.getElementById("email_exclaim");
    let notif = "";
    const splitEmail = email.value.trim().split("@");
    const emailsExt = ["gmail.com", "yahoo.com", "outlook.com"];

    if (email.value.trim() == "") {
        notif = "  Fill in your email address please";
        email_exclaim.style.opacity = 1;
        email_exclaim.style.animationPlayState = "running";
    }else{
        email_exclaim.style.opacity = 0;
        email_exclaim.style.animationPlayState = "paused";
    }

    if (email.value.trim().length > 0 && emailsExt.indexOf(splitEmail[1]) != 0) {
        notif = "  Email address extension not valid";
    }

    if (typeof splitEmail[0] === "string" && emailsExt.indexOf(splitEmail[1]) >= 0) {
        valid = true;
    }

    return [email, valid];
}

function valInputs(element) {
    let valid = false;

    const invalids = [];
    const valids = [];

    const resultName = valName();
    const resultEmail = valEmail();
    const array = [resultName, resultSName, resultEmail];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (!element[1]) {
            invalids.push(element[0]);
        } else {
            valids.push(element[0]);
        }
    }

    if (invalids.length != 0) {

        // TO CHANGE THE COLOR OF THE LINE FOR THE INVALID INPUTS TO RED
        for (let i = 0; i < invalids.length; i++) {
            const element = invalids[i];
            element.style.border = "1.5px solid red";
        }
        // AFTER CHANGING BOTTOM-BORDER LINE TO RED, UPON CORRECT ENTRY, CHANGE THE COLOR LINE TO GREEN
        for (let i = 0; i < valids.length; i++) {
            const element = valids[i];
            element.style.border = "1.5px solid gainsboro"; // default border settings

        }
        return false;
    }

    return valid;
}


form.addEventListener("input", e => {
    let count = 0;
    let validArray = [false, false, false];
    nameField.value.trim().length > 0 ? validArray[0] = true : validArray[0] = false;
    email.value.trim().length > 0 ? validArray[1] = true : validArray[1] = false;
    message.value.trim().length > 0 ? validArray[2] = true : validArray[2] = false;

    for (let i = 0; i < validArray.length; i++) {
        if (validArray[i]) {
            count++;
        }
    }

    if (count == 3) {
        submit.disabled = false;
        count = 0;
    } else {
        submit.disabled = true;
    }
});

submit.addEventListener("click", e => {
    //that is if validate Input is false
    if (!valInputs()) {

    }
});