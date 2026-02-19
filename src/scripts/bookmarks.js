export const addLine = (id) => {
    const saveBookmarked = localStorage.getItem("bookmarked")
    if (!saveBookmarked) {
        const newBookmarked = [].push(id)
        localStorage.setItem("bookmarked", newBookmarked)
    } else {
        saveBookmarked.push(id)
        localStorage.setItem("bookmarked", saveBookmarked)
    }
}

export const removeLine = (id) => {
    const saveBookmarked = localStorage.getItem("bookmarked")
    if (saveBookmarked) {
        delete saveBookmarked.find(saved => saved.id === id)
        localStorage.setItem("bookmarked", saveBookmarked)
    }
}