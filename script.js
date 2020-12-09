import './styles.scss';
import { books } from './src/data';
// import $ from 'jquery';
// import 'bootstrap';
// $('body').append('jquery + bootstrap works!');

const app = document.getElementById('app'); // récupération de la div dans le index.html

/* création variables de titres */
const titreSite = '<h1>Bibliothèque</h1>';
const titreSectionBd = '<h2>Les bandes-dessinées</h2>';
const titreSectionRoman = '<h2>Les romans</h2>';
const titreSectionEssai = '<h2>Mes éssais</h2>';

/* création des variables grilles de carte pour chaque section */
let gridCardBd = '<section>';
let gridCardRoman = '<section>';
let gridCardEssai = '<section>';

/* générer les cartes avec les données du tableau "books" */
for (const el of books) {
  const divCard = `
  <div class="card">
    <img class="card_img" src="images/${el.image}" alt=""/>
    <h3 class="card_title">${el.titre}</h3>
    <p class="card_resume">${el.resume.substring(0, 50)}...</p>
    <button class="card-btn-info">Info +</button>
    <button class="card-btn-reserver">Réserver</button>
  </div>`;
  // distribution des cartes ds grille dédiée
  if (el.categorie === 'bd') {
    gridCardBd += divCard;
  } else if (el.categorie === 'roman') {
    gridCardRoman += divCard;
  } else if (el.categorie === 'essai') {
    gridCardEssai += divCard;
  }
}
/* fermeture des grilles */
gridCardBd += '</section>';
gridCardRoman += '</section>';
gridCardEssai += '</section>';

/* injection dans la div "app" */
app.innerHTML = titreSite
  + titreSectionBd
  + gridCardBd
  + titreSectionRoman
  + gridCardRoman
  + titreSectionEssai
  + gridCardEssai;

/* -------------------EVENTS-------------------------*/

const lesBtnInfo = document.querySelectorAll('.card-btn-info');
for (const btn of lesBtnInfo) {
  btn.addEventListener('click', () => {});
}

const lesBtnReserver = document.querySelectorAll('.card-btn-reserver');
for (const btn of lesBtnReserver) {
  btn.addEventListener('click', () => {});
}

// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';
