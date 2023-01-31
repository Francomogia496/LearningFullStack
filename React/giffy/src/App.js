import React, {useEffect, useState} from 'react';
import './App.css';
import getGifs from './services/getGifs';

function App() {
  const [gifs, setGifs] = useState([]);

  //useEffect executes when component is rendered.
  //without parameter (2nd parameter "[]"), useEffect is executed once.
  useEffect(function() {
    getGifs({ keyword: 'bakugo' }).then(gifs => setGifs(gifs))
  }, [])

  return (
    <div className="App">
      <section className="App-content">
        {
          gifs.map(singleGif => 
            <img src={singleGif}/>
          )
        }
        
      </section>
    </div>
  );
}

export default App;