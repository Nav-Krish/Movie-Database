var movieContainer = document.getElementById('movieContainer')
var row = document.getElementById("movieRow")
movieContainer.append(row)
document.body.append(movieContainer)

var enter = document.getElementById('movieName')
enter.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        // document.getElementById("myBtn").click();
        getMovieData()
    }
})

async function getMovieData() {

    try {

        row.innerHTML = ""
        //get weather data from the openweather API using fetch
        var movieName = document.getElementById('movieName').value
        console.log(movieName)
        let url = `https://search.imdbot.workers.dev/?q=${movieName}`

        let data = await fetch(url)
        let res = await data.json()
        console.log(res)
        var d = res.description
        console.log(d, d.length)

        for (i = 0; i < d.length; i++) {
            var a = []
            a = Object.values(d[i])
            console.log(a)

            //create col
            var col = document.createElement("div")
            col.classList.add("col-lg-4")
            col.classList.add("col-sm-12")
            var card = document.createElement("div")
            card.classList.add("card")

            //card header
            var cHeader = document.createElement("div")
            cHeader.classList.add("card-header")
            cHeader.classList.add("mx-auto")
            cHeader.innerHTML = a[0];

            //add image
            var image = document.createElement("img")
            image.classList.add("card-img-top")
            image.classList.add("img-fluid")
            image.alt = `Image not available`
            image.setAttribute("src", a[8]);

            //card body - contains other details
            var cBody = document.createElement("div")
            cBody.setAttribute("class", "card-body")

            //other details
            var title = document.createElement("div")
            title.setAttribute("class", "card-text")
            title.innerHTML = `Title : ${a[0]}`

            var year = document.createElement("div")
            year.setAttribute("class", "card-text")
            year.innerHTML = `Year : ${a[1]}`

            var actors = document.createElement("div")
            actors.setAttribute("class", "card-text")
            actors.innerHTML = `Actors : ${a[4]}`

            var link = document.createElement("div")
            link.setAttribute("class", "card-text")
            link.innerHTML = `IMDB Link : <a href="${a[6]} target="_blank">Click here</a>`

            cBody.append(title, year, actors, link)
            card.append(cHeader, image, cBody)
            col.append(card)
            row.append(col)
        }

    }
    catch (err) {
        console.log("Error Found")
    }
}


