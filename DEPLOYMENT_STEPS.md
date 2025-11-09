# 🚀 Étapes de Déploiement - Builder.io Integration

## ✅ Étape 1: Créer la Pull Request sur GitHub

**Le navigateur devrait s'être ouvert automatiquement.**

Si ce n'est pas le cas, cliquez sur ce lien:
```
https://github.com/masterDakill/aidyn-landing/compare/main...codex/adjust-design-according-to-provided-images-2025-10-17?quick_pull=1
```

**Sur la page GitHub:**

1. **Vérifier le titre** (devrait être pré-rempli):
   ```
   🚀 Intégration Builder.io + Refonte Complète Site AIDYN RPA Phase 1
   ```

2. **Coller la description** depuis `PR_DETAILS.md` (dans le même dossier)

3. **Vérifier les fichiers changés:**
   - 26 fichiers modifiés
   - +2,058 lignes ajoutées
   - Builder.io integration complète

4. **Cliquer sur "Create pull request"**

---

## ✅ Étape 2: Merger la Pull Request

**Une fois la PR créée:**

1. **Vérifier les checks** (build, tests, etc.)
   - Devrait tous passer ✅

2. **Cliquer sur "Merge pull request"**

3. **Confirmer le merge**

4. **Supprimer la branche** (optionnel mais recommandé)
   - "Delete branch" après le merge

---

## ✅ Étape 3: Configurer Vercel

### A. Ajouter la variable d'environnement

1. **Allez sur votre Dashboard Vercel:**
   ```
   https://vercel.com/dashboard
   ```

2. **Sélectionnez le projet:** `aidyn-landing`

3. **Allez dans Settings:**
   - Settings → Environment Variables

4. **Ajoutez la nouvelle variable:**
   - **Key:** `NEXT_PUBLIC_BUILDER_API_KEY`
   - **Value:** `4db9e5299a5e4e3f8495bde095aca588`
   - **Environments:** ✅ Production ✅ Preview ✅ Development

5. **Cliquez sur "Save"**

### B. Redéployer (si nécessaire)

Si Vercel n'a pas automatiquement redéployé après le merge:

1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les 3 points (•••)
4. Sélectionnez **"Redeploy"**
5. Confirmez

---

## 🎉 Vérification Finale

### 1. Vérifier le déploiement Vercel

**Attendez que le déploiement se termine (2-5 minutes)**

Statut du déploiement:
```
✅ Building
✅ Deploying
✅ Ready
```

### 2. Tester votre site en production

Visitez votre URL de production Vercel:
```
https://votre-site.vercel.app
```

**Vérifications:**
- ✅ Page d'accueil charge correctement
- ✅ Toutes les sections sont visibles
- ✅ Pas d'erreurs dans la console

### 3. Tester Builder.io

1. **Allez sur Builder.io:**
   ```
   https://builder.io/content
   ```

2. **Créez une page test:**
   - Cliquez sur "+ New" → "page"
   - URL: `/test`
   - Ajoutez vos composants personnalisés (Hero, Features, etc.)
   - Publiez

3. **Visitez votre page:**
   ```
   https://votre-site.vercel.app/test
   ```

4. **Vérifiez que les composants apparaissent**

---

## 📊 Checklist Complète

- [ ] **Étape 1:** PR créée sur GitHub
- [ ] **Étape 2:** PR mergée vers main
- [ ] **Étape 3:** Variable `NEXT_PUBLIC_BUILDER_API_KEY` ajoutée sur Vercel
- [ ] **Vérification:** Site déployé et fonctionnel
- [ ] **Vérification:** Builder.io composants disponibles
- [ ] **Vérification:** Page test créée et visible

---

## 🆘 En cas de problème

### Erreur de build Vercel

**Si le build échoue:**

1. Vérifiez les logs dans Vercel Dashboard
2. Vérifiez que `NEXT_PUBLIC_BUILDER_API_KEY` est bien configurée
3. Essayez de redéployer

### Composants Builder.io non visibles

**Si les composants ne s'affichent pas dans Builder.io:**

1. Vérifiez que la clé API est correcte
2. Rafraîchissez l'éditeur Builder.io (Ctrl+R)
3. Vérifiez la console pour des erreurs

### Page Builder.io retourne 404

**Si les pages créées dans Builder.io ne fonctionnent pas:**

1. Vérifiez que la page est bien **publiée** dans Builder.io
2. Vérifiez que l'URL commence par `/` (ex: `/test` et non `test`)
3. Attendez quelques minutes (cache)

---

## 🎯 Résultat Final

Après ces 3 étapes, vous aurez:

✅ **Site AIDYN RPA Phase 1** déployé en production
✅ **Builder.io** complètement intégré et fonctionnel
✅ **4 composants éditables** visuellement dans Builder.io
✅ **Création de pages dynamiques** sans code
✅ **Documentation complète** disponible

---

**Temps estimé total:** 10-15 minutes

🤖 Generated with Claude Code
