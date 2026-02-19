import {Bookmarked, icons} from "./variables.js";

const sectionWrapper = document.querySelector(".bookmark-container")

const xhr = new XMLHttpRequest()
const httpUrl = "https://api.tisseo.fr/v2/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb"
const method = "get"

let Lines = null

xhr.open(method, httpUrl)
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        Lines = JSON.parse(xhr.responseText).lines.line
        for (const line of Lines) {
            if (Bookmarked.includes(line.id)) {
                sectionWrapper.innerHTML += (`
                    <article class="design">
                        <div style="background-color: ${line.bgXmlColor}" class="bookmark-shape">
                            <img class="image" src="../assets/icons/${icons[line.transportMode.id]}" alt="mode de transport"/>
                        </div>
                        <hr>
                        <h5 title="${line.name}">${line.name}</h5>
                
                        <footer>${line.network}
                            ${line.handicappedCompliance==="1" ? `<svg class="icon-info" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m14 16l1.32 1.76C14.32 19.68 12.31 21 10 21c-3.31 0-6-2.69-6-6c0-2.43 1.46-4.5 3.55-5.45l.21 2.17C6.71 12.44 6 13.63 6 15c0 2.21 1.79 4 4 4c1.86 0 3.41-1.28 3.86-3zm5.55.11l-1.25.62L15.5 13h-4.59l-.2-2H14V9h-3.5l-.3-3c1.01-.12 1.8-.96 1.8-2a2 2 0 1 0-4 0v.1L9.1 15h5.4l3.2 4.27l2.75-1.37z"/></svg>` : ""}
                            ${line.reservationMandatory==="1" ? `<svg class="icon-info" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><defs><mask id="SVGlANxqehJ"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M9 16L34 6l4 10"/><path fill="#555" stroke-linejoin="round" d="M4 16h40v6c-3 0-6 2-6 5.5s3 6.5 6 6.5v6H4v-6c3 0 6-2 6-6s-3-6-6-6z"/><path d="M17 25.385h6m-6 6h14"/></g></mask></defs><path fill="#ffffff" d="M0 0h48v48H0z" mask="url(#SVGlANxqehJ)"/></svg>` : ""}
                            <img class="fav" src="../assets/icons/icon_bookmark_active.svg" alt=""/>
                        </footer>
                    </article>
                `)
            }
        }
    }
}
xhr.send()