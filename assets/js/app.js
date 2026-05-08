const content =
    document.getElementById("content");

const navLinks =
    document.querySelectorAll(".nav-link");

/* =========================
   LOAD PAGE
========================= */

async function loadPage(page){

    try{

        /* CURRENT CONTENT */

        const currentPage =
            content.querySelector(".page-transition");

        /* SLIDE OUT */

        if(currentPage){

            currentPage.classList.add("slide-out");

            await new Promise(resolve =>
                setTimeout(resolve,500)
            );

        }

        /* FETCH NEW PAGE */

        const response =
            await fetch(`./pages/${page}.html`);

        const data =
            await response.text();

        /* INSERT PAGE */

        content.innerHTML = `

            <div class="page-transition">

                ${data}

            </div>

        `;

        /* START TYPING */

        startTyping();

    }catch(error){

        console.log(error);

    }

}

/* =========================
   NAVIGATION
========================= */

navLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        const page =
            link.getAttribute("href");

        /* ACTIVE LINK */

        navLinks.forEach(nav=>{

            nav.classList.remove("active");

        });

        link.classList.add("active");

        /* LOAD PAGE */

        loadPage(page);

        /* URL HASH */

        window.location.hash = page;

    });

});

/* =========================
   INITIAL PAGE
========================= */

window.addEventListener("DOMContentLoaded",()=>{

    const page =
        window.location.hash.replace("#","")
        || "home";

    loadPage(page);

});

/* =========================
   TYPING EFFECT
========================= */

function startTyping(){

    const typing =
        document.querySelector(".typing");

    if(!typing) return;

    const words = [

        "Frontend Dev",
        "Designer",
        "Freelancer"

    ];

    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;

    function type(){

        const currentWord =
            words[wordIndex];

        if(!deleting){

            typing.textContent =
                currentWord.substring(
                    0,
                    charIndex++
                );

            if(charIndex >
               currentWord.length){

                deleting = true;

                setTimeout(type,1000);

                return;

            }

        }else{

            typing.textContent =
                currentWord.substring(
                    0,
                    charIndex--
                );

            if(charIndex < 0){

                deleting = false;

                wordIndex =
                    (wordIndex + 1)
                    % words.length;

            }

        }

        setTimeout(
            type,
            deleting ? 70 : 120
        );

    }

    type();

}
