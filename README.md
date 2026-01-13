# SSMP  
## Service de Suivi du Métro Parisien

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/fr/archive/0/01/20211228035137%21RATP.svg" alt="RATP" height="70"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/ce/IdFMobilit%C3%A9s.svg/960px-IdFMobilit%C3%A9s.svg.png" alt="Île-de-France Mobilités" height="70"/>
</p>



## 1. Présentation générale

**SSMP (Service de Suivi du Métro Parisien)** est un projet de plateforme web visant à **modéliser, estimer et visualiser la circulation des rames du métro parisien** sur une carte interactive, à partir de **données publiques ouvertes**.

Le projet a pour objectif de transformer des données brutes (horaires, trafic, fréquences, perturbations) en une **représentation spatiale et temporelle cohérente**, compréhensible et exploitable.

STMP ne fournit **pas** de localisation GPS réelle des trains, mais une **estimation dynamique basée sur des modèles temporels et topologiques du réseau**.



## 2. Problématique technique

Les données publiques de transport présentent plusieurs limites :

- Absence de position GPS des rames
- Données horaires parfois théoriques
- Trafic communiqué de manière qualitative (normal / ralenti / interrompu)
- Variabilité réelle des temps de parcours

STMP cherche à répondre à cette problématique en construisant un **modèle d’estimation des positions** à partir de contraintes connues et mesurables.



## 3. Hypothèses de travail

Le projet repose sur les hypothèses suivantes :

- Une rame circule toujours **entre deux stations connues**
- Le temps de parcours entre deux stations est **approximable**
- Les perturbations affectent principalement la **vitesse effective**
- Les données GTFS et GTFS-RT fournissent une base temporelle fiable
- Une estimation cohérente est plus utile qu’une précision illusoire



## 4. Sources de données

### 4.1 Données statiques
- Tracés des lignes
- Liste des stations
- Ordre des stations
- Correspondances
- Horaires théoriques (GTFS)

### 4.2 Données dynamiques
- États du trafic par ligne
- Messages de perturbation
- Fréquences de passage
- Retards déclarés (GTFS-RT / Navitia)

### 4.3 Fournisseurs envisagés
- Île-de-France Mobilités Open Data
- Navitia API
- Flux GTFS et GTFS-RT officiels



## 5. Modélisation du réseau

Le réseau est modélisé comme un **graphe orienté** :

- **Nœuds** : stations
- **Arêtes** : segments inter-stations
- Chaque arête possède :
  - une distance
  - un temps de parcours théorique
  - un coefficient de trafic dynamique

Ce modèle permet :
- le calcul de progression
- la simulation de déplacement
- l’adaptation aux perturbations



## 6. Modèle de circulation des rames

Chaque rame simulée est définie par :

- Une ligne
- Une direction
- Une station de départ
- Une station cible
- Un horaire de départ
- Un état dynamique (en station / en circulation)

### Calcul de position
La position d’une rame est calculée selon :

Le temps de parcours ajusté dépend :
- du temps théorique
- du multiplicateur de trafic
- des événements réseau



## 7. Gestion du trafic

Les états de trafic influencent directement le modèle :

// 

Un arrêt prolongé fige la progression jusqu’à reprise du trafic.



## 8. Mise à jour temporelle

- Rafraîchissement périodique des données (API)
- Recalcul continu des positions
- Synchronisation serveur → client
- Cache temporaire pour limiter les appels API



## 9. Représentation cartographique

La carte affiche :
- Les lignes avec leurs couleurs officielles
- Les stations
- Les rames estimées (symboles mobiles)
- L’état du trafic par ligne
- Les sens de circulation

La visualisation privilégie la **cohérence visuelle et temporelle** plutôt que la précision absolue.



## 10. Architecture technique envisagée

### Frontend
- Pas encore définie

### Backend
- Pas encore définie

### Infrastructure
- Pas encore définie



## 11. Limites connues

- Positions estimées, non certifiées
- Dépendance à la qualité des données open data
- Variabilité réelle non toujours détectable

Ces limites sont **assumées et documentées**.



## 12. Positionnement du projet

STMP est :
- Un projet technique
- Un outil pédagogique
- Une expérimentation autour des données de transport

Il n’a **aucune affiliation officielle** avec la RATP ou Île-de-France Mobilités.



## 13. État du projet

Le projet est actuellement en **phase de conception et de modélisation**.

Les prochaines étapes incluent :
- Implémentation du modèle réseau
- Intégration des premières sources de données
- Prototype cartographique fonctionnel



## Licence

MIT
