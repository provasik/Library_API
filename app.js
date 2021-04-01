const express = require("express")
const bp = require('body-parser')
const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// get all books
app.get('/book', (req, res) => {
    res.send(library)
})

// get  books by tags
app.get('/book/tags', (req, res) => {

    var tagsList = []
    library.map(item => tagsList.push(item.tags))

    res.send(tagsList)
})

// get  books by ID
app.get('/book/:id', (req, res) => {
    var id = req.params.id
    var bookWithSameID = []
    library.map(item => item.id == id && bookWithSameID.push(item))

    res.send(bookWithSameID)
})

// post  create a new book
app.post('/book', (req, res) => {

    var isExist = false
    library.map(item => item.id == req.body.id ? isExist = true : "")

    if (isExist) {
        res.send("Book already exist ")
    } else {
        res.send("Create new book")
        library.push(req.body)
        isExist = false
    }
})

// delete  delete a book
app.delete('/book/:id', (req, res) => {
    var searchIndex = library.findIndex(library => library.id == req.params.id)

    if (searchIndex >= 0) {
        library.splice(searchIndex, 1)
        res.send("Delete book")
        searchIndex = false
    } else {
        res.send("book do not exist ")
    }

})

// put  upgrate a book
app.put('/book/:id', (req, res) => {
    var searchIndex = library.findIndex(library => library.id == req.params.id)

    if (searchIndex >= 0) {
        library.splice(searchIndex, 1)
        library.push(req.body)
        res.send("Delete book")
        searchIndex = false
    } else {
        res.send("book do not exist ")
    }

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})






const library = [{
        "title": "Robinson Crusoe",
        "author": "Daniel Defoe",
        "pages": 300,
        "tags": [
            "adventure",
            "history"
        ],
        "id": 0
    },
    {
        "title": "The Unbearable Lightness of Being",
        "author": "Milan Kundera",
        "pages": 250,
        "tags": [
            "philosophical",
            "novel"
        ],
        "id": 1
    },
    {
        "title": "Nausea",
        "author": "Jean-Paul Sartre",
        "pages": 120,
        "tags": [
            "philosophical",
            "existentialism",
            "novel"
        ],
        "id": 2
    },
    {
        "title": "Nausea 22222",
        "author": "Jean-Paul Sartre",
        "pages": 120,
        "tags": [
            "philosophical",
            "existentialism",
            "novel"
        ],
        "id": 2
    },
]
