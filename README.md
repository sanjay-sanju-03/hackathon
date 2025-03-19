# Kasaragod Cultural Heritage Platform

## Overview
The Kasaragod Cultural Heritage Platform is a web application designed to showcase the rich cultural heritage of Kasaragod, Kerala. The platform provides information about historical sites, cultural events, local cuisine, and experiences in Kasaragod. Users can explore various cultural locations, view upcoming events, and share their own experiences.

## Features
- **Home Page**: Introduction to Kasaragod's culture with a hero section and a slider showcasing key attractions.
- **Cultural Heritage**: Detailed information about various cultural sites including temples, forts, and natural attractions.
- **Cuisine**: Guide to local cuisine with recommendations for the best places to try traditional dishes.
- **Experiences**: Section for users to share their own stories and moments from Kasaragod.
- **Events**: Information about upcoming cultural events in Kasaragod.
- **Interactive Map**: Map showing the locations of cultural sites with user location tracking and routing.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Libraries**: Leaflet.js for maps, Splide.js for the image slider
- **Backend**: Python (Flask), Node.js (Express)
- **APIs**: OpenStreetMap for map tiles, Leaflet Routing Machine for directions

## Project Structure
```
hackathon/
├── backend/
│   ├── server.js
│   ├── insert.js
│   ├── models/
│   │   ├── heritage.js
│   │   └── experience.js
│   ├── routes/
│   │   ├── heritage.js
│   │   └── experience.js
│   ├── public/
│   │   ├── uploads/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── .env
├── css/
│   ├── anantapura.css
│   ├── events.css
│   ├── experience.css
│   ├── style.css
│   ├── styles.css
├── images/
│   ├── (various image files)
├── js/
│   ├── script.js
├── anantapura.html
├── app.py
├── bekal.html
├── cuisine.html
├── experience.html
├── events.html
├── house.html
├── index.html
├── map.html
└── readme.md
```

## Setup Instructions
1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/kasaragod-heritage.git
    cd kasaragod-heritage/hackathon
    ```

2. **Backend Setup**:
    - Navigate to the backend directory:
        ```sh
        cd backend
        ```
    - Install dependencies:
        ```sh
        npm install
        ```
    - Create a `.env` file and add your MongoDB connection string:
        ```env
        MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/culturalHeritage?retryWrites=true&w=majority
        ```

3. **Run the Backend Server**:
    ```sh
    node server.js
    ```

4. **Run the Frontend**:
    Open your web browser and navigate to `http://localhost:3000`.

## Usage
- **Home Page**: Navigate through the main attractions using the image slider.
- **Cultural Heritage**: Click on the cards to view more details about each cultural site.
- **Cuisine**: Explore the local dishes and find the best places to try them.
- **Experiences**: Share your own stories and view others' experiences.
- **Events**: Stay updated with the latest cultural events happening in Kasaragod.
- **Map**: Use the interactive map to find cultural locations and get directions.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact [your email].

---

&copy; 2024 Cultural Heritage Platform. Built for Kasaragod.