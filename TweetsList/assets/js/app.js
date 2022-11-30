const tweetsList = document.getElementById('lista-tweets');

//we call the functino that init all eventListeners.
eventListeners();

function eventListeners(){
     //get the add button. we can use QuerySelector/getElementById/Etc.
     document.querySelector('#formulario').addEventListener('submit', addTweet);

     //adding the click event to every item in tweets list.
     tweetsList.addEventListener('click', deleteTweet);

     //define the DOMContentLoaded event (this event is triggered when the form finish its load)
     document.addEventListener('DOMContentLoaded', initTweetsLoad);
};

//functions definition.
function addTweet(){
     const tweetTxt = document.getElementById('tweet').value;

     //create an li element to add the new tweet to the list.
     const tweetItem = document.createElement('li');
     tweetItem.innerText = tweetTxt;
     
     //add the new element to the list.
     tweetsList.appendChild(tweetItem);

     //we need a delete button for the items.
     const deleteButton = document.createElement('a');
     deleteButton.innerText = 'X';
     deleteButton.classList = 'borrar-tweet';

     //adding the delete button to the tweet.
     tweetItem.appendChild(deleteButton);

     //save tweet in localStorage.
     addTweetLocalStorage(tweetTxt);
};

function deleteTweet(e) {
     e.preventDefault();

     if(e.target.className === 'borrar-tweet'){
          //remove tweet from DOM
          e.target.parentElement.remove();

          //remove tweet from localStorage.
          removeTweetFromLocalStorage(e.target.parentElement.innerText);
     }
};

function addTweetLocalStorage(tweet) {
     let tweetsList;
     //get tweets from localStorage and add the new one.
     tweetsList = getTweetListLocalStorage();

     tweetsList.push(tweet);

     localStorage.setItem('tweetsList', JSON.stringify(tweetsList));
}

function getTweetListLocalStorage(){

     let tweetsList;

     if(localStorage.getItem('tweetsList') === null){
          tweetsList = [];
     }else{
          tweetsList = JSON.parse(localStorage.getItem('tweetsList'));
     };

     return tweetsList;
}

function initTweetsLoad() {
     let tweets;

     //get the element from localStorage.
     tweets = getTweetListLocalStorage();

     //add every element to list
     tweets.forEach(function(tweet){
          //create an li element to add the new tweet to the list.
          const tweetItem = document.createElement('li');
          tweetItem.innerText = tweet;
          
          //add the new element to the list.
          tweetsList.appendChild(tweetItem);

          //we need a delete button for the items.
          const deleteButton = document.createElement('a');
          deleteButton.innerText = 'X';
          deleteButton.classList = 'borrar-tweet';

          //adding the delete button to the tweet.
          tweetItem.appendChild(deleteButton);
     });
}

function removeTweetFromLocalStorage(tweet){

     let tweets, tweetToDelete;

     //load tweets list.
     tweets = getTweetListLocalStorage();

     //get the text of tweet to delete from localStorage.
     tweetToDelete = tweet.substring(0, tweet.length - 1);

     //deleting tweet from array
     tweets.forEach(function(tweet, index){

          if(tweetToDelete === tweet){
               tweets.splice(index, 1);
          }

     })

     localStorage.setItem('tweetsList', JSON.stringify(tweets));
}