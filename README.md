# Newsbook — Your Personalized News & Awareness Companion

**Newsbook** is a full-stack, backend-driven web application designed to transform how users consume and engage with current events. The platform combines real-time news aggregation with contextual video explainers to help users not only **stay updated** but also **understand the broader picture**.

Whether you're deeply interested in topics like AI, geopolitics, or climate change—or you're just looking to stay informed in a clutter-free, personalized way—Newsbook offers an intuitive and insightful experience tailored to your preferences.

---

## 🧠 What Problem Does Newsbook Solve?

The internet is flooded with content, making it harder to extract **relevant**, **trustworthy**, and **comprehensible** news.

**Newsbook addresses this by:**

- Filtering news based on your selected interests
- Providing contextual video explainers for deeper understanding
- Organizing content into a structured, user-friendly dashboard
- Tracking your reading habits to offer a truly personalized experience

---

## 🔍 Key Features Overview

### 1. **Interest-Based Personalization**
Upon signup, users select from a range of interest categories (e.g., Technology, Space, Politics, Environment). These selections are stored and used to tailor every subsequent interaction.

### 2. **Daily Personalized News Feed**
Once interests are set, the dashboard fetches news articles from reliable APIs such as GNews or NewsData.io, filtered and sorted according to the user’s preferences.

- Articles show brief metadata (source, time, category)
- Each article comes enriched with relevant explainer videos

### 3. **YouTube Explainer Integration**
Each article includes 2–3 YouTube videos that add visual context and deeper insight.

- Uses YouTube Data API v3 to fetch topic-specific videos
- Optimized for education, news, and relevance
- Caching layer ensures quota efficiency and performance

### 4. **Detailed Article View**
Clicking any article leads to a comprehensive view:

- Full headline and article description
- Source attribution and timestamps
- Related YouTube videos
- Share/save functionalities

### 5. **Trending News Page**
Beyond personalization, users can explore what’s trending globally. This view offers a curated list of top stories across all categories, updated frequently and sorted by popularity and recency.

### 6. **Bookmarks & History**
Users can bookmark articles or videos for later and revisit what they’ve viewed through a dedicated history log. This helps reinforce learning and track information consumption over time.

### 7. **Clean UI, Mobile-Friendly Experience**
Built with Next.js and Tailwind CSS, the frontend is minimal, responsive, and built for clarity—no clutter, no distractions.

---

## 📸 App Walkthrough (Add Images Below)

### ✅ Signup / Login
Secure account creation and authentication using JWT.

<img width="1253" height="597" alt="Image" src="https://github.com/user-attachments/assets/f3a47362-a545-4db3-8ab9-aea440a24ac5" />

---

### ✅ Interest Selection Page
Users select their areas of interest, which drives content personalization.

<img width="1247" height="586" alt="Image" src="https://github.com/user-attachments/assets/3d3f2b42-6ac2-4191-8d4a-4120d2cf9e1e" />

---

### ✅ Personalized Dashboard
Your homepage—features only the articles relevant to your selected interests, each accompanied by quick metadata and video explainers.

<img width="1275" height="670" alt="Image" src="https://github.com/user-attachments/assets/49ff2538-61bd-496f-8d10-5f47f542b3b3" />

---

### ✅ Article Detail View
Dive deeper into any story. Read detailed descriptions and watch related videos directly within the platform.

<img width="1022" height="671" alt="Image" src="https://github.com/user-attachments/assets/1239479d-28c7-4338-804e-93c0f79ced2f" />

---

### ✅ Trending News Page
Stay updated on what’s globally relevant. This page showcases the top stories based on popularity and freshness.

<img width="1280" height="678" alt="Image" src="https://github.com/user-attachments/assets/0ca67e34-073b-4eea-b435-a399ca53837f" />

---

## 🧱 Backend Architecture

The backend is designed to be scalable and modular with microservices and caching to ensure performance and maintainability.

