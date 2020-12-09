Les problèmes rencontrés :

# for...in ou for...of ?
Si for ... in ... écriture el[prop] ok pour aller chercher value mais si for...of... faut écrire el.prop !
- --> Pas sûre de bien comprendre la doc (MDN) :
- for ...in... : permet d'itérer sur les propriétés énumérables
d'un objet qui ne sont pas des symboles. Pour chaque propriété obtenue,
on exécute une instruction (ou plusieurs grâce à un bloc d'instructions).
- for ...of... : permet de créer une boucle Array qui parcourt un objet itérable
(ce qui inclut les objets Array, Map, Set, String, TypedArray, l'objet arguments, etc.)
et qui permet d'exécuter une ou plusieurs instructions pour la valeur de chaque propriété. 

Dans l'examen blanc v1, utilisation du for...in parce que tab objet prop --> je dois aller chercher la valeur:

```js
for (var el of bds) {
  var bd = document.createElement('ul'); // chaque bd dans une ul
  var maLigne;
  var divShortResume;
  var divResumeComplet;
  for (var prop in el) {
    if (prop !== 'id') {
      // pour ne pas afficher l'id dans la liste
      if (prop === 'titre') {
        var titreBd = document.createElement('h3');
        titreBd.innerHTML = el[prop];
        bd.prepend(titreBd);
      } else if (prop === 'image') {
        var couverture = document.createElement('img');
        couverture.src = `static/${el[prop]}`; // donner le chemin de l'img.jpeg
        bd.prepend(couverture);
      } else if (prop === 'resume') {
        maLigne = document.createElement('li');
        // creation d'un div avec le résumé court afficher par défaut
        divShortResume = document.createElement('div');
        divShortResume.className = 'shortResume_cl';
        var subResume = el[prop].substring(0, 31);
        divShortResume.innerHTML = `${prop} : ${subResume}...`;
        maLigne.append(divShortResume);

        // crétion d'un div avec le resumé complet caché
        divResumeComplet = document.createElement('div');
        divResumeComplet.className = 'resumeComplet_cl';
        divResumeComplet.innerHTML = `${prop}:${el[prop]}`;
        maLigne.append(divResumeComplet);

        // création du bouton lire plus (traitement de l'event -> voir ****EVENTS***** plus bas)
        var btnLireSuite = document.createElement('button');
        btnLireSuite.className = 'btnLireSuite_cl';
        btnLireSuite.innerHTML = 'Lire la suite';
        maLigne.append(btnLireSuite);
      } else {
        maLigne = document.createElement('li');
        maLigne.innerHTML = `${prop} : ${el[prop]}`;
      }
      bd.append(maLigne);
    }
  }
```

Est ce qu'ici j'aurai pu substituer un for...of au for...in ?
J'avais des soucis pour aller chercherer les valeurs de propriétés des objets du tableau. Le for...in semblait faire un "pas" plus en avant dans les données "imbriquées" que le for...of.

# .createElement() + setAttribute() --> Problème de CSS 
Impossible d'aller chercher la css 'section {}' avec celle créée
avec document.createElement('section')
Même en utilisant element.setAttribute('class', 'container').
==> supp de createElement()
Retour à la technique concaténation de string 