### Présentation

  

Application pour les manifestants de Paris. L'application va permettre d'organiser et gérer des manifestations ainsi que des annonces pour brûler des poubelles seul ou à plusieurs.

  

### Installation

  

1/ Cloner le projet

```sh

git clone https://github.com/louispelarrey/jbcv

```

2/ Installer l'environnement et les dépendances

```sh

cd jbcv

```

```sh

docker compose up -d

```
```sh

npm install

```
Si les DB ne sont pas crées automatiquement (via tools/), créer à la main via PGAdmin :

 - db_user
 - db_auth
 - db_message
 - db_trash
 - db_manifestation


  

### Lancement

1/ Lancer les API

```sh

make serveAll

```

2/ Démarrer le front :

```sh

npx nx serve front-web

```

  

## Prérequis

- Docker

- npm

- git
