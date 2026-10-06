# JobRadar – Smart Job Hunt Dashboard
### PWA · Firebase Sync · Naukri + LinkedIn

---

## ✅ COMPLETE SETUP GUIDE — Do This Once

---

### STEP 1 — Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Name it: `jobradar` (or anything you like)
4. Disable Google Analytics (not needed) → **Create project**
5. Wait for it to finish (~10 seconds) → **Continue**

---

### STEP 2 — Enable Realtime Database

1. In your Firebase project, click **"Build"** in the left sidebar
2. Click **"Realtime Database"**
3. Click **"Create database"**
4. Choose **"Start in test mode"** (for now — you're the only user)
5. Select region: **asia-southeast1** (Singapore — closest to Pune)
6. Click **Enable**

---

### STEP 3 — Register a Web App and Get Your Config

1. Click the ⚙️ gear icon (top left) → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **`</>`** (web) icon
4. App nickname: `jobradar-web` → click **Register app**
5. You'll see a block like this — **copy the whole thing**:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "jobradar-abc12.firebaseapp.com",
  databaseURL:       "https://jobradar-abc12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "jobradar-abc12",
  storageBucket:     "jobradar-abc12.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abc123def456"
};
```

---

### STEP 4 — Paste Config into index.html

1. Open `index.html` in any text editor (VS Code, Notepad, anything)
2. Find this block near the top (around line 15):

```js
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN",
  databaseURL:       "PASTE_YOUR_DATABASE_URL",
  ...
};
```

3. **Replace the entire block** with your copied config from Step 3
4. Save the file

---

### STEP 5 — Push to GitHub

```bash
# First time setup:
git init
git add .
git commit -m "init: JobRadar PWA with Firebase"

# Create a new repo on github.com called "job-radar" (private), then:
git remote add origin https://github.com/ash-webops/job-radar.git
git branch -M main
git push -u origin main
```

---

### STEP 6 — Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings** → **Pages** (left sidebar)
3. Under **"Branch"** → select `main` → folder `/root`
4. Click **Save**
5. Wait ~2 minutes → your app is live at:
   `https://ash-webops.github.io/job-radar/`

---

### STEP 7 — Install on Android as PWA

1. Open Chrome on your Android phone
2. Go to `https://ash-webops.github.io/job-radar/`
3. Tap the Chrome menu (⋮ top right)
4. Tap **"Add to Home screen"**
5. Name it **JobRadar** → tap **Add**
6. It now lives on your home screen like an app ✅

---

## 🔄 HOW DATA WORKS

| Data | Where stored | Syncs across devices? |
|------|-------------|----------------------|
| Your CV skills | Device (localStorage) | ❌ — upload once per device |
| Applied jobs | Firebase Realtime DB | ✅ — instant sync everywhere |
| Tab/days settings | Device (localStorage) | ❌ — per device preference |

**Applied jobs flow:**
- Log a job on your phone → Firebase saves it
- Open on laptop 30 seconds later → it's already there
- After 24 hours → auto-deleted from Firebase on all devices

---

## 🔒 SECURITY NOTES

- Your Firebase config (apiKey etc.) is safe to be in public code
  — these keys only grant access if your database rules allow it
- Your database is in "test mode" which means anyone with the URL can
  read/write — this is fine since only you know the URL
- If you want extra security later: Firebase → Realtime Database →
  Rules → add: `".read": false, ".write": false` then set user auth

---

## 📦 FILE STRUCTURE

```
job-radar/
├── index.html        ← Main app (edit firebaseConfig here)
├── manifest.json     ← PWA install config
├── sw.js             ← Service worker (offline cache)
├── README.md         ← This file
└── icons/
    ├── icon-192.png  ← Android home screen icon
    └── icon-512.png  ← Splash screen icon
```

---

## 🔧 MAKING UPDATES

```bash
# Edit index.html, then:
git add .
git commit -m "update: [what you changed]"
git push
# GitHub Pages auto-deploys in ~1 minute
```

---

## ❓ TROUBLESHOOTING

**"Firebase not configured" banner still showing?**
→ Check that you replaced ALL 7 placeholder values in firebaseConfig
→ Make sure databaseURL is included — it's easy to miss

**Applied jobs not syncing?**
→ Check browser console (F12) for Firebase errors
→ Make sure Realtime Database is enabled (not Firestore)
→ Make sure you're using the same Firebase project on both devices

**PWA not installing on Android?**
→ Must be opened in Chrome (not Samsung Browser or Firefox)
→ Must be served over HTTPS (GitHub Pages does this automatically)
→ Clear Chrome cache and try again
