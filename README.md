# ReactChat 

## Overview
React Chat is an innovative web application designed to revolutionize online communication. By leveraging the power of React, JavaScript, and other cutting-edge technologies, we've created a platform that combines simplicity with advanced functionality. Users can log in with their GitHub accounts, personalize their profiles, and effortlessly connect with friends for instant messaging and real-time communication. React Chat stands out with its intuitive interface, responsive design, and the ability to create group chats, all wrapped in a customizable UI that adapts to users' preferences.

**Deployed Site:** [ReactChat](https://webwarefin.wpi.brandonlui.com/)  - Note: The site is hosted on Render and may require additional load time upon initial access after periods of inactivity.

![ReactChat Screenshot](https://i.imgur.com/ljaqZ12.jpeg)

## Installation
* Clone the repo and install dependencies `npm install` (server and client directory):
* Fill out the `.env.example` file and rename it to `.env` (server and client directory):
* Start the server with `npm run dev` (server and client directory):
* Open the client's local server in your browser

## Project ideation
* **Main Idea:**  Modern chat application with GitHub authentication and customizable profiles
* **Target Audience:** Developers, students, and professionals seeking a user-friendly chat solution
* **Purpose:** To provide a seamless and engaging chat experience with a focus on customization and accessibility

## Key Features
* **GitHub Authentication:** Seamlessly integrate with GitHub for secure login.
* **Profile Customization:** Allow users to add a bio and choose a theme to personalize their profile.
* **Messaging:** Streamline the process of finding and messaging friends, with support for group chats.
* **Responsive Design:** Ensure a consistent and enjoyable user experience across devices.
* **Color Customization:** Offer a palette of 10 colors for users to customize the look and feel of the application, enhancing accessibility for color-blind users.

## Technologies and Frameworks
* **Frontend:** React provides a dynamic and interactive user interface.
* **Backend:** JavaScript and Node.js facilitate real-time updates and data manipulation.
* **Database:** Mongoose simplifies MongoDB interactions with a schema-based approach.
* **Authentication:** Passport.js for GitHub OAth and JWT (JSON Web Tokens) is used for secure session management and data transmission between the client and server, ensuring that user data remains confidential and secure during communication.
* **Development Tools:** Nodemon automates server restarts, and Vite accelerates the development process with fast bundling and hot module replacement.
* **Styling:** TailwindCSS enables efficient styling directly in HTML, offering a flexible and modern design system.

## Development Challenges and Solutions
* **Data Flow Management:** Designed a coherent architecture to manage data flow between frontend and backend components, ensuring scalability and maintainability.
* **Microservices Architecture:** Implemented a microservices architecture to enhance scalability and maintainability, ensuring that each component can be developed, deployed, and scaled independently.
* **Desynchronization Issues:** Addressed component loading failures by ensuring data from the backend is fetched before rendering frontend components.
* **Cross-Site Restrictions:** Overcame CORS (Cross-Origin Resource Sharing) issues by configuring the server to allow requests from the client, enabling seamless communication between the two.
* **Session Management:** Originally had session based authentication but had problems since application is a distributed system. Switched to JWT for secure session management.

## Team Contributions
* **William:** Led the development of the chat feature and the main UI layout.
* **Ethan:** Developed the settings feature and supported backend operations.
* **Ryan:** Worked on the settings feature and frontend implementation.
* **Brandon:** Developed the profile feature and backend development.
* **Lucca:** Contributed to the profile feature and frontend development.

## Accessibility Enhancements
Implemented a color customization feature, offering 10 distinct colors to enhance navigation for color-blind users. Additionally, large, bold text, panes, icons, and hover/focus animations were used to improve overall usability and accessibility.

### Future Enhancements
* **Show Users in Group:** Display a list of users currently in the group chat, enhancing visibility and facilitating easier communication.
* **Edit Group Conversation:** Allow group administrators to edit the group's name, description, or other settings directly within the chat interface.
* **Leave Conversation:** Provide an option for users to leave a group chat, improving flexibility and user control over their participation.
* **Notifications:** Implement a notification system to alert users of new messages, mentions, or other important events, enhancing engagement and responsiveness.
* **Typing Indicators:** Show real-time typing indicators to let users know when someone is composing a message, fostering a more interactive and immediate communication experience.
* **Online/Offline Status:** Display the online/offline status of users, providing a quick visual cue about their availability.
* **Image Uploads:** Enable users to upload images or other media directly into the chat, enriching conversations with visual content.
