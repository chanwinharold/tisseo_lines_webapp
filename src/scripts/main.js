import {addLine, removeLine} from "./bookmarks.js";

const linesWrapper = document.querySelector(".lines-wrapper")
const saveWrapper = document.querySelector(".line-bookmark")

const btnLoadData = document.getElementById("data-loader")
const btnSortByName = document.getElementById("sort-by-name")
const btnSortByMode = document.getElementById("sort-by-mode")
const btnSortByHandicap = document.getElementById("sort-by-handicap")
const btnSortByReservation = document.getElementById("sort-by-reservation")
const btnSearch = document.querySelector(".btn-search")
const btnSave = document.querySelector(".btn-save")

const icons = {
    'commercial_mode:1' : "icon_metro.svg",
    'commercial_mode:2' : "icon_tram.svg",
    'commercial_mode:6' : "icon_telepherique.svg",
    'commercial_mode:10' : "icon_lineo.png",
    'commercial_mode:9' : "icon_navette.svg",
    'commercial_mode:3' : 'icon_bus.svg',
    'commercial_mode:4' : 'icon_transport_demande.svg'
}

const xhr = new XMLHttpRequest()
const httpUrl = "https://api.tisseo.fr/v2/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb"
const method = "get"

let Lines = null
let LinesCurent = null

btnLoadData.onclick = () => {
    xhr.open(method, httpUrl)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            Lines = JSON.parse(xhr.responseText).lines.line
            if (Lines) {addDataToHTML(Lines);}
        }
    }
    xhr.send()
}

btnSortByName.onchange = (ev) => {
    if (Lines && ev.target.checked) {
        LinesCurent = [...Lines]
        LinesCurent.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignorer les majuscules/minuscules
            const nameB = b.name.toUpperCase(); // ignorer les majuscules/minuscules
            if (nameA < nameB) {return -1;}
            if (nameA > nameB) {return 1;}
            return 0;
        })
        addDataToHTML(LinesCurent)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent)
    }
}

btnSortByMode.onchange = (ev) => {
    if (Lines && ev.target.checked) {
        LinesCurent = [...Lines]
        LinesCurent.sort((a, b) => {
            const nameA = a.transportMode.name.toUpperCase(); // ignorer les majuscules/minuscules
            const nameB = b.transportMode.name.toUpperCase(); // ignorer les majuscules/minuscules
            if (nameA < nameB) {return -1;}
            if (nameA > nameB) {return 1;}
            return 0;
        })
        addDataToHTML(LinesCurent)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent)
    }
}

btnSortByHandicap.onchange = (ev) => {
    if (Lines && ev.target.checked) {
        LinesCurent = [...Lines]
        LinesCurent = LinesCurent.filter(line => line.handicappedCompliance==="1")
        addDataToHTML(LinesCurent)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent)
    }
}

btnSortByReservation.onchange = (ev) => {
    if (Lines && ev.target.checked) {
        LinesCurent = [...Lines]
        LinesCurent = LinesCurent.filter(line => line.reservationMandatory==="1")
        addDataToHTML(LinesCurent)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent)
    }
}

btnSearch.onchange = (ev) => {
    if (Lines && ev.target.value!=="") {
        LinesCurent = [...Lines]
        LinesCurent = Lines.filter(line => {
            const name = line.name.toLowerCase()
            const value = ev.target.value.toLowerCase()
            return name.includes(value)
        })
        addDataToHTML(LinesCurent)
    } else if (Lines && ev.target.value==="") {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent)
    }
}

// if (btnSave) {
//     btnSave.onclick = (ev) => {
//         console.log(ev)
//         if (localStorage.getItem("bookmarked")?.find(l => l.id === ev.target.id)) {
//             removeLine(ev.target.id)
//         } else {
//             addLine(ev.target.id)
//         }
//     }
// }

const addDataToHTML = (Lines_) => {
    linesWrapper.innerHTML = ""
    for (const line of Lines_) {
        linesWrapper.innerHTML += (`
            <article class="line-article">
                <div class="line-infos">
                    <div class="line-icon" style="background-color: ${line.bgXmlColor}">
                        <img src="../assets/icons/${icons[line.transportMode.id]}" alt="icône d'un moyen de transport">
                    </div>
                    <div>
                        <strong><a href="./LinePage.html?id=${line.id}">${line.name}</a></strong>
                        <div>
                            <span style="text-transform: capitalize;">${line.transportMode.name}</span>
                            <span>${line.shortName}</span>
                            ${line.handicappedCompliance==="1" ? `<svg class="icon-info" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m14 16l1.32 1.76C14.32 19.68 12.31 21 10 21c-3.31 0-6-2.69-6-6c0-2.43 1.46-4.5 3.55-5.45l.21 2.17C6.71 12.44 6 13.63 6 15c0 2.21 1.79 4 4 4c1.86 0 3.41-1.28 3.86-3zm5.55.11l-1.25.62L15.5 13h-4.59l-.2-2H14V9h-3.5l-.3-3c1.01-.12 1.8-.96 1.8-2a2 2 0 1 0-4 0v.1L9.1 15h5.4l3.2 4.27l2.75-1.37z"/></svg>` : ""}
                            ${line.reservationMandatory==="1" ? `<svg class="icon-info" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><defs><mask id="SVGlANxqehJ"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M9 16L34 6l4 10"/><path fill="#555" stroke-linejoin="round" d="M4 16h40v6c-3 0-6 2-6 5.5s3 6.5 6 6.5v6H4v-6c3 0 6-2 6-6s-3-6-6-6z"/><path d="M17 25.385h6m-6 6h14"/></g></mask></defs><path fill="#ffffff" d="M0 0h48v48H0z" mask="url(#SVGlANxqehJ)"/></svg>` : ""}
                        </div>
                        <span>${line.network}</span>
                    </div>
                </div>
                <div class="line-bookmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22zm3-1a1 1 0 0 0-1 1v15.057l5.128-3.663a1.5 1.5 0 0 1 1.744 0L18 20.057V5a1 1 0 0 0-1-1z"/></g></svg>
                </div>
            </article>
        `)
    }
};
