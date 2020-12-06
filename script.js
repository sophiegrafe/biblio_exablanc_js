import './styles.scss';
import { books } from './src/data';
// import $ from 'jquery';
// import 'bootstrap';
// $('body').append('jquery + bootstrap works!');
const app = document.getElementById('app');
const titreSite = '<h1>Bibliothèque</h1>';
const titreSectionBd = '<h2>Les bandes-dessinées</h2>';
const titreSectionRoman = '<h2>Les romans</h2>';
const titreSectionEssai = '<h2>Mes éssais</h2>';
let bdSection = '<section>';
let romanSection = '<section>';
let essaiSection = '<section>';

let gridCardBd = '';
let gridCardRoman = '';
let gridCardEssai = '';

// affichage des cartes dans les sections
// (refacto le code --> création carte 1fois puis if () gridCard += le bonne section )

for (const el of books) {
  if (el.categorie === 'bd') {
    gridCardBd += `
  <div class="card">
    <img class="card_img" src="images/${el.image}" alt=""/>
    <h3 class="card_title">${el.titre}</h3>
    <p class="card_resume">${el.resume.substring(0, 50)}...</p>
    <button class="card-button">réserver</button>
  </div>`;
  } else if (el.categorie === 'roman') {
    gridCardRoman += `
  <div class="card">
    <img class="card_img" src="images/${el.image}" alt=""/>
    <h3 class="card_title">${el.titre}</h3>
    <p class="card_resume">${el.resume.substring(0, 50)}...</p>
    <button class="card-button">réserver</button>
  </div>`;
  } else if (el.categorie === 'essai') {
    gridCardEssai += `
  <div class="card">
    <img class="card_img" src="images/${el.image}" alt=""/>
    <h3 class="card_title">${el.titre}</h3>
    <p class="card_resume">${el.resume.substring(0, 50)}...</p>
    <button class="card-button">réserver</button>
  </div>`;
  }
}
bdSection += gridCardBd;
romanSection += gridCardRoman;
essaiSection += gridCardEssai;

bdSection += '</section>';
romanSection += '</section>';
essaiSection += '</section>';

app.innerHTML = titreSite + titreSectionBd + bdSection
+ titreSectionRoman + romanSection + titreSectionEssai + essaiSection;
// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';

/* Les problèmes rencontrés :
si for ... in ... écriture el[prop] ok pour aller chercher value
si for...of... faut écrire el.prop !

impossible d'aller chercher la css 'section {}' avec celle créée
avec document.createElement('section')
Même en utilisant element.setAttribute('class', 'container').
==>
supp de createElement()
Retour à la technique concaténation de string
*/
