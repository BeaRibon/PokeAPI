window.onload = function () {
  var form = document.querySelector('.form');
  form.addEventListener('submit', function (event) {

    event.preventDefault();
  });
};

let inf = document.querySelector('.inf');

inf.style.display = 'none';

function modal() {

  var modal = document.getElementById("myModal");
  var btn = document.getElementById("openModal");
  var span = document.getElementsByClassName("close")[0];


  btn.onclick = function () {
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}


let url = 'https://pokeapi.co/api/v2';
let idpokemon = 0

async function pokemon() {

  let namepokemon = document.querySelector('.input');
  let name = document.querySelector('#name');
  let ability = document.querySelector('#ability');
  let experi = document.querySelector('#experi');
  let elements = document.querySelector('#elements');

  if (namepokemon.value == '') {
    alert('Digite algo!!');
    document.querySelector(".inf").style.display = "none";
    return;
  }

  try {

    const response = await fetch(`${url}/pokemon/${namepokemon.value.toLowerCase()}`);
    const data = await response.json();

    console.log(response.status);

    idpokemon = data.id
    const newname = await (data.name.charAt(0).toUpperCase() + data.name.substring(1));
    const newhab = await data.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.substring(1));
    const newelem = await data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1));

    inf.style.display = 'block';
    name.textContent = `Nome: ${newname}`;  
    ability.textContent = `Habilidade: ${newhab}`;
    experi.textContent = `Experiência: ${data.base_experience}`;
    elements.textContent = `Tipo: ${newelem}`;
    const sour = await data.sprites.front_default;
    document.getElementById('img').src = sour;

    namepokemon.value = "";

  } catch (error) {
    if (error == `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON` || error.status == `404 Not Found`) {
      document.getElementById('myModal').style.display = 'block';
      document.querySelector(".inf").style.display = "none";
      document.getElementById('texthis').style.display = 'none'; 
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        document.getElementById('myModal').style.display = "none";
        document.getElementById('texthis').style.display = 'block';
        texttitle.style.paddingTop = '0';
        texttitle.textContent = "História do Pokémon";
        gif.setAttribute('src', './img/pikachu-pokemon.gif');
      }
      let texttitle = document.querySelector("#title");
      texttitle.textContent = "Não encontramos o pokémon";
      texttitle.style.paddingTop = '25%'
      let gif = document.querySelector('.gifhistoria')
      gif.setAttribute('src', './img/pikachu-sad.gif');
      
    } else {
      console.error('Erro:', error);
    }
  }
  namepokemon.value = "";
}


let arrayremove = [];


async function listfavorites() {
  const listfav = document.querySelector(".slides-list");
  const colors = {
    normal: '#aa9',
    fire: '#f42',
    water: '#39f',
    electric: '#fc3',
    grass: '#7c5',
    ice: '#6cf',
    fighting: '#b54',
    poison: '#a59',
    ground: '#db5',
    flying: '#89f',
    psychic: '#f59',
    bug: '#ab2',
    rock: '#ba6',
    ghost: '#66b',
    dragon: '#76e',
    dark: '#111',
    steel: '#aab',
    fairy: '#e9e'
  }

  try {
    if (localStorage.getItem('idfavs')) {
      const  listStorage = localStorage.getItem('idfavs');
      let arraylistStorage = JSON.parse(listStorage);
      for (let i = 0; i < arraylistStorage.length; i++) {
        const response = await fetch(`${url}/pokemon/${arraylistStorage[i].idpokemon}`);
        const data = await response.json();
        let fav = document.createElement('li');
        fav.classList.add("slide");
        let img = document.createElement('img');
        img.classList.add("imgfav");
        let textname = document.createElement('p');
        let btnremove = document.createElement('button');
        btnremove.classList.add("btnremove");
        btnremove.textContent = "Excluir";
        textname.textContent = `Nome: ${data.name.charAt(0).toUpperCase() + data.name.substring(1)}`;
        img.setAttribute('src', data.sprites.front_default);
        fav.insertAdjacentElement('beforeend', img);
        fav.insertAdjacentElement('beforeend', textname);
        fav.insertAdjacentElement('beforeend', btnremove);
        listfav.appendChild(fav);
        const type = data.types[0].type.name;
        fav.style.backgroundColor = colors[type];
        btnremove.addEventListener('click', () => {
          let index = arraylistStorage.indexOf(arraylistStorage[i]);
          console.log(index);
          confirm("Deseja deletar?");
          arraylistStorage.splice(index, 1);
          localStorage.setItem('idfavs', JSON.stringify(arraylistStorage));
          clearlist();
          listfavorites();
        });

      }

    } else {
      console.log('Não há dados no localStorage para o array.');
      let avise = document.createElement('p');
      avise.textContent = "Não existe favoritos";
      avise.style.color = "#d2dcf0";
      avise.style.fontWeight = 'bold';
      avise.style.fontSize = '65%';
      avise.style.marginLeft = '23%';
      avise.style.marginTop = '2rem';
      let sectionfav = document.querySelector('.fav');
      sectionfav.appendChild(avise);
    }
  } catch (error) {
    console.log(error)
  }
}

listfavorites();


function clearlist() {
  location.reload();
}

let id = [];


function favorite() {
  try {
    if (localStorage.getItem('idfavs') === null) {
      id = [];
    } else {
      id = JSON.parse(localStorage.getItem("idfavs"));
    }
    id.push({ idpokemon });
    localStorage.setItem('idfavs', JSON.stringify(id));
    clearlist();
    listfavorites();

  } catch (error) {
    console.log(error);
  }
}

