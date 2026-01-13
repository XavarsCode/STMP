# STMP - Service de Traçage du Métro Parisien

🚇 Un système de suivi en temps semi-réel des métros parisiens

## Description

STMP est une application web qui permet de suivre les trains du métro parisien en temps semi-réel sur une carte interactive. Le système récupère les horaires du métro et utilise un algorithme pour déterminer la position approximative des trains entre les stations.

## Fonctionnalités

✅ **Visualisation en temps semi-réel** : Affichage des trains sur une carte interactive de Paris
✅ **Suivi par ligne** : Sélection de lignes de métro spécifiques (1, 4, 6, 14)
✅ **Identification des trains** : Numéros de trains pour traçabilité des rames
✅ **Informations sur les modèles** : Affichage des caractéristiques des matériels roulants (MP14, MP73, MF77, etc.)
✅ **Algorithme de positionnement** : Calcul de la position des trains basé sur les horaires et la vitesse moyenne
✅ **Interface interactive** : Carte Leaflet avec stations, lignes et trains
✅ **Mise à jour automatique** : Actualisation toutes les 3 secondes

## Technologies utilisées

- **HTML5/CSS3** : Structure et style de l'interface
- **JavaScript** : Logique applicative et algorithmes
- **Canvas API** : Rendu de la carte interactive
- **OpenStreetMap coordinates** : Données GPS des stations

## Structure du projet

```
STMP/
├── index.html          # Page principale
├── styles.css          # Feuilles de style
├── app.js              # Logique applicative et algorithmes
├── metro-data.js       # Données des lignes et modèles de métro
└── README.md           # Documentation
```

## Utilisation

1. Ouvrez `index.html` dans un navigateur web moderne
2. Sélectionnez une ligne de métro en cliquant sur un bouton de ligne
3. Visualisez les stations, la ligne et les trains en mouvement sur la carte
4. Cliquez sur les marqueurs pour obtenir plus d'informations
5. Consultez les informations des trains actifs dans la barre latérale

## Algorithme de positionnement

L'algorithme calcule la position des trains en utilisant :

1. **Vitesse moyenne** : Basée sur les caractéristiques de chaque ligne (22-40 km/h)
2. **Intervalle entre trains** : Temps moyen entre deux trains (85-120 secondes)
3. **Interpolation linéaire** : Position calculée entre deux stations
4. **Simulation de mouvement** : Mise à jour continue de la position

### Formule de base :

```javascript
position = station_actuelle + (station_suivante - station_actuelle) × progression
progression += (vitesse / 3600) / (intervalle / durée_mise_à_jour)
```

## Modèles de matériel roulant

### MP14 (Lignes 1, 4, 14)
- **Constructeur** : Alstom
- **Années** : 2018-présent
- **Caractéristiques** : 100% automatique, climatisation, vidéo surveillance
- **Capacité** : 708 passagers

### MP73 (Ligne 6)
- **Constructeur** : ANF/CIMT
- **Années** : 1974-1978
- **Caractéristiques** : Conduite manuelle, portes électriques
- **Capacité** : 394 passagers

### MF77 (Lignes 7, 8, 13)
- **Constructeur** : ANF/Alsthom
- **Années** : 1978-1984
- **Caractéristiques** : Matériel sur fer, freinage électrique
- **Capacité** : 522 passagers

## Données en temps réel

Actuellement, l'application utilise une simulation pour démontrer le concept. Pour une implémentation en production, vous pouvez intégrer les APIs suivantes :

- **API RATP** : https://data.ratp.fr/api/
- **Île-de-France Mobilités** : https://prim.iledefrance-mobilites.fr/fr/apis
- **API Pierre Grimaud** : https://api-ratp.pierre-grimaud.fr/v4/

## Évolutions futures

- [ ] Intégration avec les APIs RATP en temps réel
- [ ] Ajout de toutes les lignes de métro (actuellement 4 lignes)
- [ ] Prédiction des retards et incidents
- [ ] Notifications push pour les utilisateurs
- [ ] Mode hors-ligne avec cache des données
- [ ] Historique des trajets
- [ ] Calcul d'itinéraires optimisés

## Compatibilité

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Libre d'utilisation et de modification

## Auteur

XavarsCode

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
