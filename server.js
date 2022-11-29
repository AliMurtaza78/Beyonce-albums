const { response } = require('express');
const express = require('express');
const app = express();

let albums = require("./albums.json")

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Express')
});

app.get('/albums', (req, res) => {
    res.send(albums)
});

app.get('/albums/:id', (req, res) => {
    const id = req.params.id
    console.log(id)

    const particularAlbum = albums.find((album) => album.albumId === id)


    res.send(particularAlbum)
});

app.post("/albums",function(request,response){
    const album = request.body
    console.log(album)

    albums.push(album)

    response.status(201).send({success:true})
})

app.delete('/albums/:id', function(request, response) {
    const id = request.params.id
    const albumsFiltered = albums.filter(function (album) {
      return album.albumId != id
    })
    albums = albumsFiltered
  
    response.send({success: true})
  })

  app.put('/albums/:id', function(request, response) {
    const id = request.params.id  
   albums = albums.map((album) => {
        if(album.albumId == id){
            return{
        albumId: parseInt(id),
        artistName: request.body.artistName,
        collectionName: request.body.collectionName,
        artworkUrl100:
          request.body.artworkUrl100,
        releaseDate: request.body.releaseDate,
        primaryGenreName: request.body.primaryGenreName,
        url:
          request.body.url
            }
            
        }
      })
    
    response.send({success: true})
  })
  

app.listen(3000, () => console.log("Server is up and running"))