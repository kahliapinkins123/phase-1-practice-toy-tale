let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection');
  const toyForm = document.querySelector('.add-toy-form');
  let input = document.querySelectorAll('.input-text');
  let toyName = input[0];
  let toyUrl = input[1];
 
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
      let likes = toy['likes'];
      
      div.className = 'card';
      img.className = 'toy-avatar';
      btn.className = 'like-btn';
      btn.id = toy['id'];

      h2.textContent = toy['name'];
      img.src = toy['image'];
      p.textContent = `${likes} Likes`;
      btn.textContent = 'Like';

      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(btn);

      toyCollection.appendChild(div);
      
      btn.addEventListener('click', e => {
        let thisToyId = toy.id;
        likes++;
        const configObj = {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json',
          Accept: 'application/json'
          },

          body: JSON.stringify({
            'likes': likes
          })
        }
        fetch(`http://localhost:3000/toys/${thisToyId}`,configObj);
        p.textContent = `${likes} Likes`      
      })
    }

  })

  //creates and posts a new toy
  toyForm.addEventListener('submit', e => {
    e.preventDefault();
    const configurationObj = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      
      body: JSON.stringify({
        "name": `${toyName.value}`,
        "image": `${toyUrl.value}`,
        "likes": 0
      }
      )


    }
    fetch('http://localhost:3000/toys', configurationObj)

    //In the future, I'll create a seperate function for creating an element
      let div = document.createElement('div');
      let h2 = document.createElement('h2');
      let img = document.createElement('img');
      let p = document.createElement('p');
      let btn = document.createElement('button');
      
      
      div.className = 'card';
      img.className = 'toy-avatar';
      btn.className = 'like-btn';

      h2.textContent = toyName.value;
      img.src = toyUrl.value;
      p.textContent = `${0} Likes`;
      btn.textContent = 'Like';

      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(btn);

      toyCollection.appendChild(div);   
  })

  //I'd add event listener in in my seperate function as well
});

