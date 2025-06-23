# TP Node.js - TravelNow-Diginamic Anthony_SRC

Une plateforme de réservation de voyages développée avec Node.js, Express, MongoDB et EJS.

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB (local ou Atlas)
- npm ou yarn

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer l'application

```bash
npm run dev
```

## Tests

```bash
#Lance tous les tests en mode watch
npm run test

#Lance un test spécifique
npm run test /test/example.test.js "
```

## Variables d'environnement - Template

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel_booking?retryWrites=true&w=majority
```

## Test en mode administrateur

1. **Copier ce template d'objet utilisateur dans atlas sur MongoDb**
2. **Dans votre cluster, selectionnez la collection users**
3. **Cliquez sur insert Document et choissisez format JSON**

```bash
{
  "firstname": "Admin",
  "lastname": "Test",
  "email": "admin@mail.com",
  "password": "$2b$10$rOjQX8UVkKKOF.Gz8Qs8/.vQ8B0q7Z1YqX3qGh6FjJ0Y8xM2L3K4G",
  "phone": "0123456789",
  "role": "admin"
}
```

**logs de connexion**

```bash
email:admin@mail.com
password:Test123
```

## Démarrage rapide

1. **Copier le template des variables d'environnement** dans un fichier `.env`
2. **Modifier les valeurs** selon votre configuration
3. **Installer les dépendances** : `npm install`
4. **Démarrer l'application** : `npm run dev`
5. **Ouvrir votre navigateur** : `http://localhost:3000`
