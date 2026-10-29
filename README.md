# LMGUAF

LMGUAF est une plateforme sociale mobile-first pensée pour la création, la découverte, la communication et l’intelligence artificielle intégrée.

## Aperçu

- Réseau social moderne avec flux, stories, reels, profils et messages
- UI orientée mobile, française, premium et responsive
- Authentification Supabase, routes protégées, sécurité server-side
- Assistant IA MGUAF AI avec route externe et configuration sécurisée
- Architecture documentée pour un déploiement Vercel + Supabase

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Lucide React

## Démarrage rapide

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d’environnement

Copiez le fichier `.env.example` et remplissez les valeurs correspondantes.

Important :
- Ne jamais exposer la clé API IA dans le frontend.
- Le fournisseur IA ne doit être utilisé qu’à travers un endpoint serveur.
- Les services payants sont possibles uniquement si le projet est configuré et budgetisé explicitement.

## Structure du projet

```text
app/
  api/
  ai/
  login/
  register/
  forgot-password/
  explore/
  create/
  reels/
  profile/
  messages/
  notifications/
  stories/
  saved/
  settings/
  privacy/
  terms/
  admin/
components/
lib/
public/
supabase/
```

## Sécurité

- Validation côté serveur pour les opérations sensibles
- Aucune clé secrète dans le code front
- Politiques RLS à configurer côté Supabase
- Vérification des rôles admin et des privilèges utilisateurs

## Limites connues

- L’application est un scaffold fonctionnel et sécurisé d’architecture, pas un backend complet prêt à production sans configuration Supabase et fournisseur IA.
- Les flux de données sont documentés et préparés, mais doivent être connectés à une base réelle pour devenir complètement opérationnels.
- L’IA est désactivée tant qu’aucune clé n’est fournie.

## Déploiement

1. Créer un projet Supabase
2. Appliquer les migrations SQL dans `supabase/migrations/`
3. Configurer les RLS policies
4. Configurer le stockage d’avatars, médias et stories
5. Déployer le projet sur Vercel
6. Ajouter les variables d’environnement de production

## Documentation complémentaire

Les fichiers de migration et les policies sont présents dans le dossier `supabase/`.
