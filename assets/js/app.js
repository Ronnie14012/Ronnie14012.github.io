const content = document.getElementById("content");
const navLinks = document.querySelectorAll(".nav-link");

/* LOAD PAGE */

async function loadPage(page){

  content.classList.add("fade-out");

  setTimeout(async ()=>{

    const response = await fetch(`pages/${page}.html`);
    const data = await response.text();

    content.innerHTML = data;

    content.classList.remove("fade-out");

  },200);

}

/* NAVIGATION */

navLinks.forEach(link=>{

  link.addEventListener("click",(e)=>{

    e.preventDefault();

    const page = link.getAttribute("href");

    /* ACTIVE CLASS */

    navLinks.forEach(nav=>nav.classList.remove("active"));
    link.classList.add("active");

    /* LOAD PAGE */

    loadPage(page);

    /* URL CHANGE */

    history.pushState(null,null,`#${page}`);

  });

});

/* INITIAL PAGE */

window.addEventListener("DOMContentLoaded",()=>{

  const page = location.hash.replace("#","") || "home";

  loadPage(page);

});

/* BACK BUTTON SUPPORT */

window.addEventListener("popstate",()=>{

  const page = location.hash.replace("#","") || "home";

  loadPage(page);

});