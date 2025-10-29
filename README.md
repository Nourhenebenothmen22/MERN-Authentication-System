# 🚀 MERN Authentication System

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

Une application complète d'authentification développée avec la stack MERN (MongoDB, Express, React, Node.js) avec gestion des utilisateurs, réinitialisation de mot de passe et interface moderne.

## ✨ Fonctionnalités

### 🔐 Authentification
- **Inscription** avec validation des champs
- **Connexion** sécurisée avec JWT
- **Déconnexion** avec nettoyage des tokens
- **Persistance** de la session utilisateur

### 🔒 Sécurité
- **Mots de passe hashés** avec bcrypt
- **Tokens JWT** pour l'authentification
- **Routes protégées** côté frontend et backend
- **Validation** des données d'entrée

### 📧 Gestion des mots de passe
- **Réinitialisation** du mot de passe
- **Vérification par email**
- **Liens sécurisés** avec expiration

### 🎨 Interface Utilisateur
- **Design moderne** avec Tailwind CSS
- **Responsive** pour tous les appareils
- **Navigation dynamique** selon l'état d'authentification
- **Feedback utilisateur** en temps réel

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** + Vite
- **React Router DOM** pour la navigation
- **Tailwind CSS** pour le styling
- **Context API** pour la gestion d'état
- **Axios** pour les requêtes HTTP

### Backend
- **Node.js** avec Express.js
- **MongoDB** avec Mongoose
- **JWT** pour les tokens d'authentification
- **bcryptjs** pour le hashage des mots de passe
- **Nodemailer** pour l'envoi d'emails
- **CORS** pour les requêtes cross-origin

## 📦 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou Atlas)
- npm ou yarn

### 1. Clone du repository
```bash
git clone https://github.com/Nourhenebenothmen22/MERN-Authentication-System.git
cd mern-auth-system

2. Configuration du Backend
cd server
npm install

Créez un fichier .env dans le dossier server :
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=<ton_secret>
NODE_ENV=development


3. Configuration du Frontend

cd ../client
npm install

4. Démarrage de l'application
Terminal 1 - Backend
cd server
npm run dev

Terminal 2 - Frontend
cd client
npm run dev

🗂️ Structure du Projet
mern-auth-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   ├── public/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── package.json
└── README.md

