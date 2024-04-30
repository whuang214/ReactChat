# React Chat
For your final project, you'll implement a web application that exhibits understanding of the course materials. 
This project should provide an opportunity to both be creative and to pursue individual research and learning goals.

## General description
React Chat is a simple online communication tool. Users log in using their GitHub account, customize their profile with a bio and theme, and easily find and message friends. With its user-friendly interface, React Chat streamlines the process of connecting and chatting, making online interactions more enjoyable and personalized.

React Chat allows users to make group chats, and customize the look of the User Interface with multiple different color options for the program. Furthermore, React Chat's intuitive interface and responsive design ensure a seamless user experience across various devices, allowing users to stay connected and chat on the go.

https://vercel.com/sso/access/request?next=%2Fsso-api%3Furl%3Dhttps%253A%252F%252Fcs4241-final-project-q0iml6m6s-brandon-luis-projects-aa96a0c8.vercel.app%252F%26nonce%3Dede224f52ffc234bfb579027aba227338c3cf9775754d3bc160a30e25c2e9746&url=cs4241-final-project-q0iml6m6s-brandon-luis-projects-aa96a0c8.vercel.app

## Information
1.) A GitHub account is necessary to utilize the application
2.) When testing, utilize two different accounts to test messaging feature between users

## Technologies/Frameworks
 - React:
React served as the frontend framework, providing a robust foundation for building dynamic and interactive user interfaces. 
 - JavaScript:
JavaScript, both on the frontend and backend, facilitated seamless communication between the client and server, enabling real-time updates and data manipulation. 
 - Mongoose:
Mongoose, a MongoDB object modeling tool, streamlined database interactions by providing a schema-based solution for managing application data. 
 - Passport:
Passport.js, a popular authentication middleware for Node.js, enhanced security by enabling authentication and authorization processes, ensuring that only authorized users could access protected routes and resources. 
 - Nodemon:
Nodemon, a utility tool, facilitated a smooth development workflow by automatically restarting the server upon file changes, eliminating the need for manual server restarts.
 - Vite:
Vite, a fast build tool, optimized the development process by providing rapid bundling and hot module replacement capabilities, enhancing productivity and accelerating the deployment of the web application. 

## Challenges
Some challenges when creating the project was designing a coherent architecture that effectively manages the flow of data between frontend and backend components. Decisions regarding the seperation of data flow patterns, and API design must be made to ensure scalability, maintainability, and performance. Along with this desynchronization was a challenge as front end styling depended on information stored in the backend. So often components failed to load as the frontend would load first without gathering the data from the backend. 
## Group
 - William: Worked on chat feature, main UI layout
 - Brandon: Worked on profile feature and backed
 - Lucca: Worked on profile feature and frontend
 - Ryan: Worked on settings feature and frontend
 - Ethan: Worked on settings feature and backend
## Accessibility
One feature that was implemented for accessiblity was the ability to change the UI's color. Offered are 10 different colors that users can chosoe from. This specific feature was implemented to help those who are color blind navigate the application better. Large and bold text with a different color was used to indicate large sections of importance. "Panes/Boxes" were used to seperate information and windows. Icons were utilized to dispaly lots of information in a small space. Hover/focus and select animations were used to give more feedback to the user, making the app easier to use.
