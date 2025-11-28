# Scripts de Validation

Ce dossier contient des scripts utilitaires pour maintenir la qualité du projet.

## 📝 validate-translations.ts

Script de validation des fichiers de traduction i18n.

### Fonctionnalités

- ✅ Vérifie que tous les fichiers JSON sont valides
- ✅ Compare les clés entre toutes les langues
- ✅ Détecte les clés manquantes
- ✅ Détecte les clés en trop
- ✅ Affiche un rapport détaillé

### Utilisation

```bash
# Avec tsx (recommandé)
npx tsx scripts/validate-translations.ts

# Ou avec ts-node
npx ts-node scripts/validate-translations.ts
```

### Exemple de sortie

```
🔍 Validation des fichiers de traduction...

✅ EN: 487 clés chargées
✅ FR: 487 clés chargées
✅ MG: 487 clés chargées
✅ ES: 487 clés chargées
✅ ZH: 487 clés chargées
✅ DE: 487 clés chargées

📊 Analyse des clés...

✅ FR: Toutes les clés sont présentes
✅ MG: Toutes les clés sont présentes
✅ ES: Toutes les clés sont présentes
✅ ZH: Toutes les clés sont présentes
✅ DE: Toutes les clés sont présentes

==================================================
✅ Toutes les traductions sont complètes et cohérentes!
📝 487 clés validées pour 6 langues
==================================================
```

### Intégration dans le workflow

Vous pouvez ajouter ce script dans votre `package.json` :

```json
{
  "scripts": {
    "validate:i18n": "tsx scripts/validate-translations.ts",
    "precommit": "yarn validate:i18n"
  }
}
```

## 🔧 Dépendances requises

- Node.js 18+
- TypeScript
- tsx ou ts-node

## 📚 Ressources

- [Documentation i18next](https://www.i18next.com/)
- [React i18next](https://react.i18next.com/)
