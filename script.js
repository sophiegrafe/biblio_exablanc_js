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
const titreSectionEssai = '<h2>Les éssais</h2>';

/* création des variables grilles de carte pour chaque section */
let gridCardBd = '<section>';
let gridCardRoman = '<section>';
let gridCardEssai = '<section>';

/* générer les cartes avec les données du tableau "books" */
for (const el of books) {
  const divCard = `
  <div class="card">
    <div class="idCard">${el.id}</div>
    <img class="card_img" src="images/${el.image}" alt=""/>
    <h3 class="card_title">${el.titre.substring(0, 20)}</h3>
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

/* création du panier */
const elInCart = 0;
const divPanier = `
<div id="myCart">
  <i class="fas fa-cart-plus"></i>
  <span id="elInCart">${elInCart}</span>
</div>`;

/* injection dans la div "app" */
app.innerHTML = titreSite + divPanier
  + titreSectionBd
  + gridCardBd
  + titreSectionRoman
  + gridCardRoman
  + titreSectionEssai
  + gridCardEssai;

/* -------------------EVENTS-------------------------*/

/* +++++++++ Fonction pour générer des popups Info +++++++*/
/** ***************** version 1 *************************** */
// function popupTraitment() {
//   const lesBtnInfo = document.querySelectorAll('.card-btn-info');
//   for (const btn of lesBtnInfo) {
//     btn.addEventListener('click', () => {
//       const btnIdStr = btn.parentNode.querySelector('.idCard').innerHTML;
//       const btnId = parseInt(btnIdStr, 10);
//       let popupInfo = '';
//       books.forEach((el) => {
//         if (btnId === el.id) {
//           popupInfo += `
//         <div id="popupInfo">
//           <i class="far fa-times-circle"></i>
//           <img class="card_img" src="images/${el.image}" alt=""/>
//           <h3>${el.titre}</h3>
//           <h4>Auteur : ${el.auteur[0]}, ${el.auteur[1]}</h4>
//           <p>${el.resume}</p>
//           <h5>Disponible : ${el.disponible ? 'oui' : 'non'}</h5>
//         </div>`;
//           app.innerHTML += popupInfo;
//           const closeCrossPopup = document.querySelector('.fa-times-circle');
//           closeCrossPopup.addEventListener('click', () => {
//             const popupInfoToRemove = document.querySelector('#popupInfo');
//             popupInfoToRemove.remove();
//           });
//         }
//       });
//     });
//   }
// }
// popupTraitment();

// document.body.addEventListener('click', (e) => {
//   if (e.target.matches('.card-btn-info')) {
//     popupTraitment();
//   }
// });

/** ************************ version 2 ******************************* */
// (problème pour relancer la fonction popupTraitement()
// utilisation d'un delegate qui va chercher la même classe que la fonction --> '.card-btn-info'
// j'essaye de simplifier la fonction à partir de là */
// function popupTraitment(btn) {
//   const btnIdStr = btn.target.parentNode.querySelector('.idCard').innerHTML;
//   const btnId = parseInt(btnIdStr, 10);
//   books.forEach((el) => {
//     if (btnId === el.id) {
//       const popupInfo = `
//         <div id="popupInfo">
//           <i class="far fa-times-circle"></i>
//           <img class="card_img" src="images/${el.image}" alt=""/>
//           <h3>${el.titre}</h3>
//           <h4>${el.auteur[1] !== undefined
//           ? `Auteurs : ${el.auteur[0]}, ${el.auteur[1]}`
//           : `Auteur : ${el.auteur[0]}`}</h4>
//           <p>${el.resume}</p>
//           <h5>Disponible : ${el.disponible ? 'oui' : 'non'}</h5>
//         </div>`;
//       app.innerHTML += popupInfo;
//       const closeCrossPopup = document.querySelector('.fa-times-circle');
//       closeCrossPopup.addEventListener('click', () => {
//         const popupInfoToRemove = document.querySelector('#popupInfo');
//         popupInfoToRemove.remove();
//       });
//     }
//   });
// }
// document.body.addEventListener('click', (btn) => {
//   if (btn.target.matches('.card-btn-info')) {
//     popupTraitment(btn);
//   }
// });

/** ************************ version 3 ******************************* */
// tout en un
document.body.addEventListener('click', (btn) => {
  if (btn.target.matches('.card-btn-info')) {
    const btnIdStr = btn.target.parentNode.querySelector('.idCard').innerHTML;
    const btnId = parseInt(btnIdStr, 10);
    books.forEach((el) => {
      if (btnId === el.id) {
        const popupInfo = `
        <div id="popupInfo">
          <i class="far fa-times-circle"></i>
          <img class="card_img" src="images/${el.image}" alt=""/>
          <h3>${el.titre}</h3>
          <h4>${el.auteur[1] !== undefined ? `Auteurs : ${el.auteur[0]}, ${el.auteur[1]}` : `Auteur : ${el.auteur[0]}`}</h4>        
          <p>${el.resume}</p>
          <h5>Disponible : ${el.disponible ? 'oui' : 'non'}</h5>    
        </div>`;
        app.innerHTML += popupInfo;
        const closeCrossPopup = document.querySelector('.fa-times-circle');
        closeCrossPopup.addEventListener('click', () => {
          const popupInfoToRemove = document.querySelector('#popupInfo');
          popupInfoToRemove.remove();
        });
      }
    });
  }
});

// Fonction pour traiter la réservation
const lesBtnReserver = document.querySelectorAll('.card-btn-reserver');
for (const btn of lesBtnReserver) {
  btn.addEventListener('click', () => {
    const btnId = btn.parentNode.querySelector('.idCard').innerHTML;
  });
}

// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';
