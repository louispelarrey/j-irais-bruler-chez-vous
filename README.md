Installer les dépendances :

npm install

Installer une dépendance (que ce soit pour le front ou le back) :

  Faire à la racine :
  
  npm install nomDeLaDépendance

Démarrer le front :

nx serve front-web

Démarrer le back (requiert d'avoir démarré la db) :

nx serve back-web

Démarrer la db :

docker compose up -d
