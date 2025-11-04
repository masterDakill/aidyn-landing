# ⚡ Builder.io - Quick Start (5 minutes)

## 🎯 Configuration en 3 Étapes

### ✅ Étape 1: Démarrer le serveur (1 min)

```bash
npm run dev
```

Votre site sera sur **http://localhost:3000**

Vérifiez que vous voyez dans la console:
```
✅ Builder.io components registered: Hero, Features, InteractiveTestimonials, Contact
```

---

### ✅ Étape 2: Configurer Builder.io (2 min)

1. **Allez sur**: https://builder.io
2. **Connectez-vous** ou créez un compte gratuit
3. **Dans Models** → Vérifiez que le modèle "page" existe
   - Si non: Créez-le (+ New Model → Name: `page`, Type: Page)
4. **Dans le modèle "page"**:
   - Preview URL: `http://localhost:3000`
   - Activez "Show Preview"
   - Sauvegardez

---

### ✅ Étape 3: Créer votre première page (2 min)

1. **Content** → **+ New** → Sélectionnez "page"
2. **Configurez**:
   - Name: `Test Builder`
   - URL: `/test-builder`
3. **Glissez-déposez** un composant "Hero" depuis "Custom Components"
4. **Publiez** (bouton Publish en haut à droite)
5. **Testez**: http://localhost:3000/test-builder

---

## 🎉 C'est fait!

Votre première page Builder.io est en ligne!

### 🔄 Prochaines étapes:

**Option A: Ajouter une section éditable**
```tsx
// Dans src/app/page.tsx, entre deux sections:
import BuilderSection from '@/components/builder/BuilderSection'

<BuilderSection sectionName="promotional-banner" />
```

**Option B: Créer plus de pages**
- Landing pages: `/landing/promo-noel`
- Pages marketing: `/campagne/linkedin`
- Pages événements: `/webinar/demo-ai`

**Option C: Faire de l'A/B Testing**
- Ouvrez votre page dans Builder.io
- Cliquez sur "+ Add Variant"
- Testez différentes versions!

---

## 📚 Documentation Complète

Pour le guide complet avec toutes les options:
→ Consultez [BUILDER_TRANSITION_GUIDE.md](./BUILDER_TRANSITION_GUIDE.md)

---

## 🆘 Problème?

**Les composants n'apparaissent pas?**
- Rechargez l'éditeur Builder.io (Ctrl+R)
- Vérifiez que le serveur local tourne

**Page 404?**
- Vérifiez que la page est publiée (pas en draft)
- Attendez 60 secondes puis rechargez

**Autre problème?**
→ Consultez la section Troubleshooting dans [BUILDER_TRANSITION_GUIDE.md](./BUILDER_TRANSITION_GUIDE.md)

---

**Questions? support@builder.io** 📧
