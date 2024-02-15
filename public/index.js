const navs = document.getElementsByClassName("nav");


function open_nav_bar() {
    document.getElementById("mobile-nav").classList.add("active")
    document.body.classList.add("nav-bar-opened")
}

function close_nav_bar() {
    document.getElementById("mobile-nav").classList.remove("active")
    document.body.classList.remove("nav-bar-opened")
}

// close nav bar when any anchor tag is clicked in te open nav bar
const refs = document.getElementsByClassName("section")

for (let i = 0; i < refs.length; i++) {
    const ref = refs[i];
    ref.addEventListener("click", e => {
        close_nav_bar()
    })
}


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

    if (inputName.length != 0 && letters.test(inputName)) {
        valid = true;
    }

    return [nameField, valid];
}

function valEmail() {
    let valid = false;
    const splitEmail = email.value.trim().split("@");
    const emailsExt = ["gmail.com", "yahoo.com", "outlook.com"];

    // if (email.value.trim() !== "" &&) {

    // }

    if (email.value.trim().length > 0 && emailsExt.indexOf(splitEmail[1]) != 0) {
        notif = "  Email address extension not valid";
    }

    if (typeof splitEmail[0] === "string" && emailsExt.indexOf(splitEmail[1]) >= 0) {
        valid = true;
    }

    return [email, valid];
}

function valInputs() {
    let valid = false;

    const invalids = [];
    const valids = [];

    const resultName = valName();
    const resultEmail = valEmail();
    const array = [resultName, resultEmail];

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
            element.style.borderColor = "var(--invalid-input)";
        }
        // AFTER CHANGING BOTTOM-BORDER LINE TO RED, UPON CORRECT ENTRY, CHANGE THE COLOR LINE TO GREEN
        for (let i = 0; i < valids.length; i++) {
            const element = valids[i];
            element.style.borderColor = "var(--my-black)"; // default border settings

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
        e.preventDefault()
    }
});

document.getElementById("year").textContent = new Date().getFullYear()

function set_slideshow_active() {
    const navigators = document.getElementsByClassName("nav")

    for (let i = 0; i < navigators.length; i++) {
        const nav = navigators[i];

        if (nav.classList.contains("active")) {
            // remove the active on the navigator itself
            nav.classList.remove("active")

            const slide = nav.dataset.points_to

            // remove the active on the slide
            document.getElementById(slide.toString()).classList.remove("active")

            let next_index = (i + 1) % navigators.length
            navigators[next_index].classList.add("active")
            let next_slide = navigators[next_index].dataset.points_to
            document.getElementById(next_slide.toString()).classList.add("active")

            break
        }


    }
}

function handleIntersection(entries) {
    entries.map(entry => {
        if (entry.isIntersecting) {
            set_slideshow_active()
        }
    })
}

const my_observer = new IntersectionObserver(handleIntersection, { threshold: 1 })
my_observer.observe(document.getElementById("about"))