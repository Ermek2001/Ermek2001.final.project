const apiKey = 'AG5Fck2hm23S5BpfXzlFzaALTVQwVPPo'
var keyword = ''
const searchBtn = document.getElementById('search_btn')
var limit = 30

window.onload = function () {
    showTrending()
}

function showTrending() {
    var path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
    fetch(path)
        .then((respone) => respone.json())
        .then((data) => {
            for (let i = 0; i < data.data.length; i++) {
                search_results.innerHTML += `<div class="gif-item"><img class="gif_img" src=${data.data[i].images.preview_gif.url}></img></div>`
            }

            imageLoaded()
        })
        .catch((err) => console.log(err))
}

search_form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (search_field.value != '' && search_field.value != ' ') {
        search_results.innerHTML =
            '<div class="preloader" id="preloader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>'

        let searchTxt = search_field.value

        var path = `https://api.giphy.com/v1/gifs/search?q=${searchTxt}&api_key=${apiKey}&limit=${limit}`

        fetch(path)
            .then((respone) => respone.json())
            .then((data) => {
                for (let i = 0; i < data.data.length; i++) {
                    search_results.innerHTML += `<div class="gif-item"><img class="gif_img" height="" src=${data.data[i].images.preview_gif.url}></img></div>`
                }
                imageLoaded()
            })
            .catch((err) => console.log(err))
    }
})

function imageLoaded() {
    var counter = 0
    let imgs = document.querySelectorAll('img.gif_img')
    for (let i = 0; i <= imgs.length; i++) {
        if (imgs[i]) {
            imgs[i].onload = function () {
                counter++
                if (counter == limit) {
                    preloader.classList.add('loaded')
                }
            }
        }
    }
}
