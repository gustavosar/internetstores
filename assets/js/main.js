/* Expander Hamburguer Menu */

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
            toggle.classList.toggle("bx-x");
        });
    }
};
showMenu("header-toggle", "nav-menu");


/* Expander Sub Menu & icon animation */

function dropDown(a) {
    var li = a.parentElement,
        submenu = li.getElementsByTagName("ul")[0];
    submenu.style.display = submenu.style.display == "block" ? "none" : "block";

    submenuico = li.getElementsByTagName("i")[0];
    submenuico.style.transform =
        submenuico.style.transform == "rotate(180deg)" ?
        "rotate(360deg)" :
        "rotate(180deg)";

    return false;
}


/* Icon Code */

var iconCode =
    '<a href="#" onclick="return dropDown(this)"><i class="bx bx-chevron-down dropdown__icon" ></i></a>';


/* Public API Service */

var url = "https://api.jsonbin.io/b/5fdcc5e0e3d1c5322508f9f9";

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();

var data = JSON.parse(xhttp.responseText);


/* Menu Main Template */

function Template(item) {
    return `
            <li class="nav__item dropdown">
            <a href="${item.link}" class="nav__link">${item.label}</a>
            ${item.icon ? iconCode : ""}
            ${item.submenu ? subMenu(item.submenu) : ""}
            </li>
            `;
}


/* Submenu Template */

function subMenu(submenu) {
    return `
        <ul class="dropdown__menu">
            ${submenu
              .map(
                (item) => `
            <li class="nav__item dropdown">
            <a href="${item.link}" class="nav__link">${item.label}</a>
            ${item.submenu ? iconCode : item.icon}
            ${
              item.submenu
                ? (item.icon = iconCode && subMenu(item.submenu))
                : ""
            }
            </li>
            `
              )
              .join("")}
        </ul>
    `;
}
document.getElementById("dynamicMenu").innerHTML = `
    ${data.map(Template).join("")}
`;