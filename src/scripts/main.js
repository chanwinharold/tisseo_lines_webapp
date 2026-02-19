import {addDataToHTML} from "./variables.js";

const linesWrapper = document.querySelector(".lines-wrapper")

const btnLoadData = document.getElementById("data-loader")
const btnSortByName = document.getElementById("sort-by-name")
const btnSortByMode = document.getElementById("sort-by-mode")
const btnSortByHandicap = document.getElementById("sort-by-handicap")
const btnSortByReservation = document.getElementById("sort-by-reservation")
const btnSearch = document.querySelector(".btn-search")

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
            if (Lines) {addDataToHTML(Lines, linesWrapper);}
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
        addDataToHTML(LinesCurent, linesWrapper)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent, linesWrapper)
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
        addDataToHTML(LinesCurent, linesWrapper)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent, linesWrapper)
    }
}

btnSortByHandicap.onchange = (ev) => {
    if (Lines && ev.target.checked) {
        LinesCurent = [...Lines]
        LinesCurent = LinesCurent.filter(line => line.handicappedCompliance==="1")
        addDataToHTML(LinesCurent, linesWrapper)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent, linesWrapper)
    }
}

btnSortByReservation.onchange = (ev) => {
    if (Lines && ev.target.checked) {
        LinesCurent = [...Lines]
        LinesCurent = LinesCurent.filter(line => line.reservationMandatory==="1")
        addDataToHTML(LinesCurent, linesWrapper)
    } else if (Lines && !ev.target.checked) {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent, linesWrapper)
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
        addDataToHTML(LinesCurent, linesWrapper)
    } else if (Lines && ev.target.value==="") {
        LinesCurent = [...Lines]
        addDataToHTML(LinesCurent, linesWrapper)
    }
}
