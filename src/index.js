let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection');
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys').then(resp => resp.json())
  .then(function(toyObj){
    for(const toy of toyObj){
      let div = document.createElement('div');
      let h2 = document.createElement('h2');
      let img = document.createElement('img');
      let p = document.createElement('p');
      let btn = document.createElement('button');
      
      div.className = 'card';
      img.className = 'toy-avatar';
      btn.className = 'like-btn';
      btn.id = toy['id'];

      h2.textContent = toy['name'];
      img.src = toy['image'];
      p.textContent = `${toy['likes']} Likes`;
      btn.textContent = 'Like';

      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(btn);

      toyCollection.appendChild(div);
    }
  })
  const configurationObj = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    
    body: JSON.stringify(
      [
        {
        "id": 1,
        "name": "Woody",
        "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
        "likes": 5
        },
        {
        "id": 2,
        "name": "Buzz Lightyear",
        "image": "http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png",
        "likes": 8
        },
        {
        "id": 3,
        "name": "Mr. Potato Head",
        "image": "https://vignette.wikia.nocookie.net/universe-of-smash-bros-lawl/images/d/d8/Mr-potato-head-toy-story.gif/revision/latest?cb=20151129131217",
        "likes": 3
        },
        {
        "id": 4,
        "name": "Slinky Dog",
        "image": "https://www.freeiconspng.com/uploads/slinky-png-transparent-1.png",
        "likes": 4
        },
        {
        "id": 5,
        "name": "Rex",
        "image": "http://umich.edu/~chemh215/W11HTML/SSG5/ssg5.2/FRex.png",
        "likes": 1
        },
        {
        "id": 6,
        "name": "Bo Peep",
        "image": "http://4.bp.blogspot.com/_OZHbJ8c71OM/Sog43CMFX2I/AAAAAAAADEs/0AKX0XslD4g/s400/bo.png",
        "likes": 2
        },
        {
        "id": 7,
        "name": "Hamm",
        "image": "https://cdn140.picsart.com/244090226021212.png?r1024x1024",
        "likes": 0
        },
        {
        "id": 8,
        "name": "Little Green Men",
        "image": "http://www.pngmart.com/files/3/Toy-Story-Alien-PNG-File.png",
        "likes": 1
        }
      ]
    )
  }

  fetch('http://localhost:3000/toys', configurationObj);
});

