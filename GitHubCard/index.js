/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// Axios GET request
axios.get('https://api.github.com/users/BaoPham92')

  /* Step 2: Inspect and study the data coming back, this is YOUR 
     github info! You will need to understand the structure of this 
     data in order to use it to build your component function 
  
     Skip to Step 3.
  */

  // Log data
  .then(res => res.data)
  .catch(err => new Error('fetch error'))
  .then(res => {
    card(res)
  })

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

// Create dom element
const card = (obj) => {
  // Create element
  const create = (
    e,
    selector = undefined,
    src = undefined,
    content = undefined,
    obj
  ) => {
    let element;
    let strCheck = typeof e === 'string'

    // Check if params exist, then do following
    if (strCheck && selector) {

      // Create element
      element = document.createElement(e);

      // Add class
      element.classList.toggle(selector);

      return element;
    } else if (strCheck && content && obj) {

      // create a tag
      const aProfile = document.createElement('a')

      // Give attr & content
      aProfile.href = obj.html_url;
      aProfile.textContent = obj.html_url;

      // Create element
      element = document.createElement(e);

      // Add text
      element.textContent = content;

      // Append a tag if true
      if (content === `Profile:`) {
        element.append(aProfile);
      }

      return element;
    } else if (strCheck && src) {
      // Create element
      element = document.createElement(e);

      // Add src
      element.setAttribute('src', src);

      return element;
    } else {
      return document.createElement(e);
    }
  }

  // Main Div
  const mainCard = (src, obj) => {
    const card = create('div', 'card')
    card.append(create('img', null, src));

    return card
  };

  // Card info
  const cardInfo = (obj) => {

    // Create div
    const divInfo = create('div', "card-info");

    // Append elements
    divInfo.append(create('h3', "name", undefined, obj.name, obj));
    divInfo.append(create('p', "username", undefined, obj.name, obj));
    divInfo.append(create('p', undefined, undefined, `Location: ${obj.location}`, obj));
    divInfo.append(create('p', undefined, undefined, `Profile:`, obj));
    divInfo.append(create('p', undefined, undefined, `Followers: ${obj.followers}`, obj));
    divInfo.append(create('p', undefined, undefined, `Following: ${obj.following}`, obj));
    divInfo.append(create('p', undefined, undefined, `Bio: ${obj.bio}`, obj));

    return divInfo;
  }

  // Stored invocations
  const main = mainCard(obj.avatar_url, obj)
  const info = cardInfo(obj)

  // Append
  main.appendChild(info)

  // Return component
  return document.querySelector('.cards').appendChild(main);
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/