## Solar Panel Planner - Voyage 52 team 22 

## 🔗 [LIVE APP LINK]()

## About Project 👋

This app is a part of [Chingu platform](https://www.chingu.io/) 6-week coding experience called Voyage. The team of multiple developers, scrum masters and designers is assembled randomly and given a deadline and requirements of an app they need to build. This app is **front-end only**, you can read more about how it works in the section _"How it works / Features"_. This was Voyage52 and it happened in November and December 2024. The app is created using Vite, React, Redux toolkit and Tailwind css as primary languages.

<br>

---

## Table of content 📝

0. About Project
1. Requirements & Specifications
2. How it works / Features
3. Technologies & Dependencies used
4. Prerequisites
5. Clone & Run locally
6. Team
7. Special Thanks

<br>

---

## Requirements & Specifications ❗

The following define the minimum requirements and ideas for features you may implement to enhance this app, if time permits.

#### Structure

- This is a purely frontend application. No backend is required.
- You may use any languages, tools, or libraries you prefer when designing and building this app.
- You may **_NOT_** use AI-based solution generators like GitHub Copilot.
- Useful links and resources:
  - [Los Angeles Addresses](https://catalog.data.gov/dataset/addresses-in-the-city-of-los-angeles/resource/cfcd5dce-b96c-43e8-bd36-aac11d14bf7d)
  - [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  - [Google Maps API](https://developers.google.com/maps/documentation/routes/overview#how_to_use_the_routes_api)

#### Styling

- Surprise us!!! Use your team's creativity to make this app distinctive.
- Add a footer containing a link to your team's GitHub repo.
- In general, you will find these [UI design principles](https://www.justinmind.com/ui-design/principles) helpful.
- Recommend using this resource for [clean CSS](https://israelmitolu.hashnode.dev/writing-cleaner-css-using-bem-methodology).

#### Functionality

- Overview
  Develop a single-page application (SPA) for solar panel application.

- Resident Interface
  Allow residents to submit a request for a solar panel evaluation by completing a web form with: - Name - Email - Phone Number - Address (validated against a provided dataset of Los Angeles addresses) - The user can either type their own address manually or - Can type the street and then choose from a list of suggested addresses corresponding to the typed street - Implement an autocomplete functionality - Preferred timeslot

  - Allow residents to cancel the form
  - Notify residents that their preferred timeslot is only indicative and that they will receive confirmation a few hours before the scheduled visit.
  - Store the request status (e.g., pending, visited) using local storage or [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
  - Allow residents to cancel an appointment by calling a specific phone number (e.g., 1-800-123-4567) provided in their confirmation message when they submit an appointment application.

- Admin Interface

  - Implement a login system accessible through /admin URL where city hall employees can enter an approved email to access the Admin page (no complex authentication required, emails can be validated against a list in a .env file).
  - Display all appointment requests submitted by residents.
  - Allow employees to retrieve the most efficient planning for a specified time period (e.g., daily, weekly, etc) by selecting a specific type of output: list view, map view, or both.
  - Provide an option to export the planned visits (regardless of the type of view selected) in a downloadable format (PDF, Excel, etc.) and which will always include details such as visit time slot, resident’s contact information, and address.

  - Algorithmic Planning

    - Develop a scheduling algorithm that optimizes visit order. This algorithm can be implemented in 2 ways (choose one or a combination of both)
    - The algorithm can be implemented either by using your own logic rules: using an average time for traffic, using the proximity of an address to another one, always starting with the furthest address, etc
    - The algorithm can be implemented either by using an external API like Google Routes API or Google Maps API, for calculating distances between 2 addresses for example.
    - The algorithm can be implemented by using a combination of your own logical rules and an external API
    - Prioritize efficiency, aiming to minimize travel time between consecutive visits.
    - Example Simple Algorithm: For adjacent addresses, order them by street name and house number for consecutive visits and attempt to respect the preffered timeslot selected by the resident.

- Data Management

  - Use local storage or [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) to temporarily save resident requests.
  - Implement data validation to ensure addresses match the provided dataset from [Los Angeles Addresses](https://catalog.data.gov/dataset/addresses-in-the-city-of-los-angeles/resource/cfcd5dce-b96c-43e8-bd36-aac11d14bf7d).

- User Interface and Experience
  - Use responsive design techniques to ensure the application is accessible and functional across various devices and screen sizes.

#### Extras (Not Required)

- Admin Interface
  - Implement a "Mark as visited" functionality, to signify that a resident has been visited.

#### Acceptance Criteria

- Resident Interface

  - Users can submit requests with valid addresses, personal details, and timeslots.
  - Preferred timeslots are submitted but are not guaranteed.
  - Requests persist across sessions in local storage or IndexedDB.

- Admin Interface

  - Admins can view all resident requests.
  - Admins can generate an optimized visit schedule in a map format where each point on the map corresponds to an address and has a sequence associated with it which indicates the order in which the addresses should be visited.
  - Admins can generate an optimized visit schedule in a list format in the order in which addresses should be visited
  - Admins can export any of these views, and each export should also contain the details of each resident like name, contact details and actual address
  - The login restricts access to approved city hall employee emails only.

- Scheduling Algorithm

  - Planning considers the efficiency of visit order based on address and time constraints.
  - Schedule export format includes time slot, address, and contact information for each appointment.

  <br>

---

## How it works / Features ⚙️

Because of the app's complexicity, I will explain only the main components. There are 3 main pages. All the other components either live inside them or, are highly interconnected with them. There is also a navbar that is a part of all 3 pages.

#### `Homepage.jsx` Component

- On Homepage, the user can see what this app is about, and be taken to ResidentPage.jsx by clicking the only two buttons that exist on the Homepage, and also see the footer.

#### `ResidentPage.jsx` Component

- On Resident Page, the user can fill out a form to submit a request for solar panel compatibility checkup. The form contains 1 field on the right for a date and time and 4 fields on the left for the rest of the data. Below that, the user can see the request that he/she already submitted.

#### `AdminPage.jsx` Component

- Admin Page is gatekept from users by a login form. After the admin logs in using the email, the admin can see the database of **all** the requests and where are those locations on the map. When the user submits a request, it will be added into this database.

**Notice:** The rest of the data in the database are fake requests from local database. Same goes for admin login thats keeping users from accessing this database being displayed to them. This app is front end **ONLY** therefore, it does not have real admin login authentication nor real database remote state. Its all stored in redux global state and its made so that it persists, using browser's local storage.

<br>

## Technologies & Dependencies used 📦

- **Google maps api:** necessary for a map to show location pins of all the people who submited requests.

- **Reduxjs toolkit:** for having a centralized place for storing and manipulating multiple states.

- **jspdf:** for having a feature to export/download data from the app, onto the user's computer.

- **Moment:** for formatting all the dates into human readable form.

- **React schedule meeting:** for feature of selecting the date on ResidentPage.jsx.

- **React toastify:** for notifications that pop up after an action, like successful or unsuccessful login/form submit.

- **React search autocomplete:** for a feature on ResidentPage.jsx where the user needs to input address, this package will allow autocomplete.

- **Uuid:** for generating unique IDs for elements.

- **Tailwind css:** for styling.

- **Vite:** as app creation tool and development experience.

dependencies:

- "@react-google-maps/api": "^2.20.3",
- "@reduxjs/toolkit": "^2.3.0",
- "@vis.gl/react-google-maps": "^1.4.0",
- "axios": "^1.7.9",
- "esbuild": "^0.24.0",
- "framer-motion": "^11.12.0",
- "jspdf": "^2.5.2",
- "moment": "^2.30.1",
- "react": "^18.3.1",
- "react-dom": "^18.3.1",
- "react-icons": "^5.3.0",
- "react-redux": "^9.1.2",
- "react-router-dom": "^6.28.0",
- "react-schedule-meeting": "^4.2.3",
- "react-search-autocomplete": "^8.5.2",
- "react-toastify": "^10.0.6",
- "uuid": "^11.0.3"

devDependencies:

- "@eslint/js": "^9.13.0",
- "@types/react": "^18.3.12",
- "@types/react-dom": "^18.3.1",
- "@vitejs/plugin-react": "^4.3.3",
- "autoprefixer": "^10.4.20",
- "eslint": "^9.13.0",
- "eslint-plugin-react": "^7.37.2",
- "eslint-plugin-react-hooks": "^5.0.0",
- "eslint-plugin-react-refresh": "^0.4.14",
- "globals": "^15.11.0",
- "postcss": "^8.4.47",
- "tailwindcss": "^3.4.14",
- "vite": "^5.4.10"

<br>

---

## Prerequisites 📚

Ensure you have the following installed on your system:

    Node.js v18.00.0
    npm or yarn

<br>

---

## Clone & Run locally 🏃‍♂️

1. **Clone the Repository:**

   - On the GitHub repo page, click the green "Code" button.

   - Copy the HTTPS URL.

2. **Open the Terminal:**

   - Open the terminal by typing "cmd" in your desktop's start menu, **OR**

   - Right-click on the desktop and select "Git Bash Here" (if you have Git Bash installed), **OR**

   - Open Visual Studio Code's terminal by clicking "Terminal" -> "New Terminal" inside the editor.

3. **Navigate to Your Project Location:**

   - In the terminal, navigate to your desired location (e.g., desktop) using the command: `cd desktop`. Adjust the path if you want your project is located elsewhere.

   - Ensure that your terminal's address is inside the project folder.

4. **Clone the Repository:**

   - Run the command: `git clone /link/`. Replace `/link/` with the HTTPS URL from step 1.

5. **Enter the Project Directory:**

   - Navigate into the cloned repository by typing: `cd /folder-name/`. Replace `/folder-name/` with the name of the cloned folder.

6. **Install Dependencies:**

   - Run the command: `npm install` to install all the necessary dependencies.

7. **Start the Project:**

   - Run the command: `npm run dev` or `yarn dev` to start the project, if the project is created using Vite. You will need to manually open the browser address at [localhost:5173/](http://localhost:5173/)

<br>

---

## Team 🎇

- Anita Boakye-Yiadom - Scrum Master: [GitHub](https://github.com/AnitaBoakye) / [LinkedIn](https://linkedin.com/in/anitaboakyeyiadom/)

- Predrag Jandric - Developer: [GitHub](https://github.com/Predrag-Jandric) / [LinkedIn](https://www.linkedin.com/in/predrag-jandric/)

- Ayumi Sato - Developer: [GitHub](https://github.com/ayumi-ayumi) / [LinkedIn](https://www.linkedin.com/in/ayumi-sato/)

- Noora Saleh - Scrum Master: [GitHub](https://github.com/NooraHakim1) / [LinkedIn](https://www.linkedin.com/in/noora-hakim-156144244/)

- Ikram Maizi - Developer: [GitHub](https://github.com/ikrammaizi) / [LinkedIn](https://www.linkedin.com/in/ikram-maizi-6142011bb/)

<br>

---

## Special Thanks 🙏

We as a whole team would like to thank the [Chingu platform](https://www.chingu.io/) for providing us this opportunity to practice our communication and coding skills in this simulated work envoronment.

<br>

---
