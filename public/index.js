const navs = document.getElementsByClassName("nav"),
    all_images_pairings = {
        'img/pic (1).webp' : 'img/pic (1).jpg',
        'img/pic (2).webp' : 'img/pic (2).png',
        'img/pic (3).webp' : 'img/pic (3).jpg',
        'img/pic (4).webp' : 'img/pic (4).jpg',
        'img/pic (5).webp' : 'img/pic (5).jpg',
        'img/pic (6).webp' : 'img/pic (6).png',
        'img/pic (7).webp' : 'img/pic (7).png',
        'img/pic (8).webp' : 'img/pic (8).png',
        'img/pic (9).webp' : 'img/pic (9).png',
        'img/pic (10).webp' : 'img/pic (10).jpg',
        'img/pic (11).webp' : 'img/pic (11).png',
    }

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


// function allows the auto-play and switching of slides 
// document.addEventListener("DOMContentLoaded", e => {
function start_slideshow() {
    let current_slide = 0
    const navs = document.querySelectorAll("div.nav")

    function showSlide(index) {
        navs.forEach(nav => {
            nav.classList.remove("active")

            document.getElementById(nav.dataset.points_to).classList.remove("active")
        })
        // Show the slide at the given index
        navs[index].classList.add("active")
        const slide_id = navs[index].dataset.points_to

        document.getElementById(slide_id).classList.add("active")
    }

    function nextSlide() {
        // Increment current slide index
        current_slide++;
        // If it exceeds the number of slides, loop back to the first slide
        if (current_slide >= navs.length) {
            current_slide = 0;
        }
        // Show the next slide
        showSlide(current_slide);

        // fetch delay time stored in the data attribute and convert to a number
        const slide_delay = parseInt(navs[current_slide].dataset.time_delay)

        // delay the slide for that particular amount of time
        setTimeout(nextSlide, slide_delay * 1000);
    }

    showSlide(current_slide);

    // go to the next slide
    nextSlide()
}


const form = document.forms['contactMe'];
const submit = document.getElementById("btn_submit");
const nameField = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

function valName() {
    let valid = false, tooltipText;
    const inputName = nameField.value.trim();
    let letters = /[A-Za-z]+$/;

    if (!letters.test(inputName)) tooltipText = "Please remove any number or special character"

    if (inputName.length != 0 && letters.test(inputName)) valid = true;

    return [nameField, valid, tooltipText];
}

function valEmail() {
    let valid = false, tooltipText;
    const splitEmail = email.value.trim().split("@");
    const emailsExt = ["gmail.com", "yahoo.com", "outlook.com"];

    // if (email.value.trim() !== "" &&) {

    // }

    if (emailsExt.indexOf(splitEmail[1]) === -1) {
        tooltipText = "Email address extension not valid";
    }

    if (typeof splitEmail[0] === "string" && emailsExt.indexOf(splitEmail[1]) >= 0) {
        valid = true;
    }

    return [email, valid, tooltipText];
}

function valInputs() {
    let valid = true;

    const invalids = [];
    const valids = [];

    const resultName = valName();
    const resultEmail = valEmail();
    const array = [resultName, resultEmail];
    console.log("array: ", array);

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        console.log("element: ", element);

        if (!element[1]) {
            // index 0 represents the element itself and index 2 represents the tooltipText
            invalids.push({ element: element[0], tooltipText: element[2] });
        } else {
            valids.push(element[0]);
        }
    }

    // AFTER CHANGING BOTTOM-BORDER LINE TO RED, UPON CORRECT ENTRY, CHANGE THE COLOR LINE TO DEFAULT
    for (let i = 0; i < valids.length; i++) {
        const element = valids[i];

        const error_icon = element.dataset.error_icon;

        document.getElementById(error_icon).classList.remove("on")

        element.style.borderColor = ""; // clear previous color thereby defaulting the color.

        document.querySelectorAll("span.tooltip").forEach(each_tooltip => {
            each_tooltip.textContent = ""
        })
    }

    if (invalids.length != 0) {

        // TO CHANGE THE COLOR OF THE LINE FOR THE INVALID INPUTS TO RED
        for (let i = 0; i < invalids.length; i++) {
            const field = invalids[i]

            const error_icon = field.element.dataset.error_icon;

            const icon = document.getElementById(error_icon)

            icon.classList.add("on")

            icon.nextElementSibling.innerText = field.tooltipText

            field.element.style.borderColor = "var(--red)";
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

async function submitForm(formDataJSON) {
    try {
        const response = await axios.post('/submit', formDataJSON)

        response.data.status === 1
            ?
            document.dispatchEvent(myEvent)
            :
            console.log("error");

        return response.data.status

    } catch (err) {
        console.error(err);
    }
}

form.addEventListener("submit", e => {
    e.preventDefault()
    
    //that is if validate Input is false
    if (!valInputs()) {
        return;
    }

    const formData = new FormData(e.target), formDataJSON = {}
    formData.forEach((value, key) => {
        formDataJSON[key] = value
    })

    submitForm(formDataJSON)
});

document.getElementById("year").textContent = new Date().getFullYear()


function handleIntersection(entries) {
    entries.map(entry => {
        if (entry.isIntersecting) {
            start_slideshow()
            my_observer.unobserve(document.getElementById("about"))
        }
    })
}

const my_observer = new IntersectionObserver(handleIntersection, { threshold: 1 })
my_observer.observe(document.getElementById("about"))

// create my custom event to be listened by script in html
const myEvent = new CustomEvent('data-sent', {
    detail : { success : 1},
    bubbles: true,
    cancelable : true
})

const dialog = document.getElementById("image-viewer")

function openDialog() {
    dialog.showModal()

    document.addEventListener("click", e => {
        console.log(e.target);

        // if(e.target !== 'img#image') return;

        e.target.classList.toggle("scaled-in")
    })
}

function closeDialog() {
    dialog.close()
}

document.getElementById("close-dialog").addEventListener("click", () => {
    closeDialog()
})

function render_img_at_index(num) {
    active_image_previewed = all_images_location[num]

    document.getElementById("image").setAttribute('src', all_images_pairings[active_image_previewed])
}

function render_previous_img () {
    let previous_img_index;

    const current_img_index = all_images_location.indexOf(active_image_previewed)

    if (current_img_index === 0) {
        previous_img_index = all_images_location.length - 1
    } else {
        previous_img_index = current_img_index - 1
    }

    render_img_at_index(previous_img_index)
}

function render_next_img () {
    let following_img_index;

    const current_img_index = all_images_location.indexOf(active_image_previewed)

    if (current_img_index + 1 === all_images_location.length) {
        following_img_index = 0
    } else {
        following_img_index = current_img_index + 1
    }

    render_img_at_index(following_img_index)
}

const works = document.querySelectorAll("img.work")
let active_image_previewed = "", all_images_location = []

for (let i = 0; i < works.length; i++) {
    const work = works[i];
    all_images_location.push(work.getAttribute('src'))
    
    work.addEventListener("click", () => {
        openDialog()

        active_image_previewed = work.getAttribute('src');

        document.getElementById("image").setAttribute('src', all_images_pairings[active_image_previewed])
    })
}

document.getElementById("left-arrow").addEventListener("click", () => {
    render_previous_img()
})

document.getElementById("right-arrow").addEventListener("click", () => {
    render_next_img()
})

document.addEventListener("keydown", e => {
    if (!dialog.open) return
    else if (e.key === 'ArrowRight') render_next_img()
    else if (e.key === 'ArrowLeft') render_previous_img()
})

