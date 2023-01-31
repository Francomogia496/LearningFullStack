
const apiKey = '6F87ta8wMjNCUDkelEmTWl73Qyp7XTBg'

export default function getGifs({keyword = 'deku'} = {}) {
     const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`

     return fetch(apiURL)
          .then(res => res.json())
          .then(response => {
          const {data} = response
          const gifs = data.map(image => image.images.downsized_medium.url)
          return gifs
      })
}