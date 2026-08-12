# CoreX Portfolio — React + Tailwind + Node.js + MongoDB

Portfolio design inspired by the uploaded CoreX-style reference image.

## Sections
1. Hero
2. Skills
3. Projects
4. Internship / Experience
5. About / Profile
6. Contact
7. Footer

## Run

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## MongoDB

Local:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/corex_portfolio
```

MongoDB Atlas can also be used.

## Customize

Edit:
`frontend/src/data/portfolio.js`

Replace:
- profile name
- profile photo
- skills
- projects
- internship / experience
- social links
- email

Contact messages are stored in MongoDB through:
`POST /api/contact`


## Personal data added

This version uses the uploaded professional photo and the information from the uploaded resume:
- Generative AI Engineer | Full Stack Developer
- IBM SkillsBuild AI Internship (6 months)
- Smart Lecture Assistant
- Financial Management System
- B.E. Electronics & Communication Engineering (2020)
- Python, React.js, Node.js, Express.js, MongoDB, ML, LLMs, RAG and AWS fundamentals

The photo is stored at:
`frontend/public/profile.png`
