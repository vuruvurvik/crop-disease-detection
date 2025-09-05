
# 🌾 Crop Disease Detection System  

![Python](https://img.shields.io/badge/Python-3.10-blue.svg)  
![Django](https://img.shields.io/badge/Django-4.x-darkgreen.svg)  
![React](https://img.shields.io/badge/React-18.x-blue.svg)  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-lightblue.svg)  
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)  
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📌 Overview  
The **Crop Disease Detection System** is an **AI-powered web application** that helps farmers and agricultural experts **detect crop diseases** from leaf images. Using **deep learning** and **computer vision**, the system classifies crop diseases with high accuracy and provides suggestions for disease management.

The project integrates:  
- **Django REST Framework** for the backend  
- **React.js** for the frontend  
- **PostgreSQL** for database storage  
- **CNN-based model** for disease classification  

---

## 🚀 Features  
✅ Upload crop leaf images for **real-time disease detection**  
✅ Supports **multiple crop types** (from the Kaggle dataset)  
✅ AI-powered **Convolutional Neural Network (CNN)**  
✅ REST APIs built with **Django & DRF**  
✅ Interactive **React-based frontend**  
✅ Stores results & user data in **PostgreSQL**  
✅ Scalable, modular, and easy to deploy  

---

## 🗂 Dataset  
We used the **FiveCropDiseaseDetection** dataset from **Kaggle**:  
🔗 [Dataset Link](https://www.kaggle.com/datasets/)  


---

## 🏗️ Tech Stack  
| Component      | Technology Used |
|---------------|------------------|
| **Frontend**  | React.js, MaterialUI |
| **Backend**   | Django, Django REST Framework |
| **Database**  | PostgreSQL |
| **Model**     | TensorFlow / Keras (CNN) |
| **Deployment**| Docker |
| **Version Control** | Git & GitHub |

---

## 📂 Project Structure  
```
CropDiseaseDetection/
│── backend/
│   ├── crop_detection/       # Django project folder
│   ├── api/                 # REST API for image classification
│   ├── models/              # Trained ML model
│   ├── database/            # PostgreSQL integration
│   ├── requirements.txt
│
│── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # App pages
│   │   ├── services/        # API integration
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
│── dataset/                # Kaggle dataset
│── trained_model/          # Saved CNN model (.h5 / .pt)
│── Dockerfile
│── docker-compose.yml
│── README.md
```

---

## 🔧 Installation & Setup  

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/vuruvurvik/crop-disease-detection.git
```

### **2️⃣ Setup the backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate      # For Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **3️⃣ Setup the frontend**
```bash
cd ../frontend
npm install
npm start
```

### **4️⃣ Configure PostgreSQL Database**
- Create a PostgreSQL database:
```sql
CREATE DATABASE crop_disease_db;
```
- Update **backend/crop_detection/settings.py** with DB credentials.

### **5️⃣ Run migrations**
```bash
cd ../backend
python manage.py makemigrations
python manage.py migrate
```

### **6️⃣ Start the Django server**
```bash
python manage.py runserver
```

### **7️⃣ Start the React app**
```bash
cd ../frontend
npm start
```

Now, visit **http://localhost:3000** 🚀

---

## 📊 Results  

| Metric       | Score |
|-------------|-------|
| Accuracy    | **94.2%** |
| Precision   | 93.7% |
| Recall      | 92.8% |
| F1-score    | 93.2% |


---

## 🤝 Contributing  
Contributions are welcome!  
1. Fork the repo  
2. Create a new branch (`feature-xyz`)  
3. Commit changes  
4. Push & create a PR  

---

## 📧 Contact  
👤 **vurvik korukonda**  
📧 Email:vurvik.korukonda@gmail.com
🔗 GitHub:(https://github.com/vuruvurvik)  
🔗 LinkedIn:(https://linkedin.com/in/vurvikkorukonda)
