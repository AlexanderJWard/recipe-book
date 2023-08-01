# Recipe Book

Recipe Book is a recipe-sharing site where foodies can share their favourite meals with other members of the community. With the ability to comment and like posts users are encouraged to engage with each other and share the love of food.

- Deployed HEROKU frontend project: [https://ajw-recipe-book.herokuapp.com/](https://ajw-recipe-book.herokuapp.com/)
- Deployed HEROKU backend API: [https://ajw-recipe-book-api.herokuapp.com/](https://ajw-recipe-book-api.herokuapp.com/)
- GitHub repository backend API: [https://github.com/AlexanderJWard/recipe-book-api](https://github.com/AlexanderJWard/recipe-book-api)

![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/90560ca7-a6e0-4190-ae98-3b9ad261f0fa)

## Table of Contents
+ [UX](#ux "UX")
  + [Site Purpose](#site-purpose "Site Purpose")
  + [Site Goal](#site-goal "Site Goal")
  + [Audience](#audience "Audience")
  + [Communication](#communication "Communication")
  + [Current User Goals](#current-user-goals "Current User Goals")
  + [New User Goals](#new-user-goals "New User Goals")
+ [User Stories](#user-stories "User Stories")
+ [Design](#design "Design")
  + [Colour Scheme](#colour-scheme "Colour Scheme")
  + [Typography](#typography "Typography")
+ [Features](#features "Features")
  + [Existing Features](#existing-features "Existing Features")
+ [Testing](#testing "Testing")
  + [Validator Testing](#validator-testing "Validator Testing")
  + [Unfixed Bugs](#unfixed-bugs "Unfixed Bugs")
+ [Technologies Used](#technologies-used "Technologies Used")
  + [Main Languages Used](#main-languages-used "Main Languages Used")
+ [Deployment](#deployment "Deployment")
+ [Credits](#credits "Credits")
  + [Content](#content "Content")
  + [Media](#media "Media")
  
## UX

### Site Purpose:

The purpose is to bring people together to share new foods and encourage people to discover new recipes and make new friends by exploring new posts.

### Site Goal:

The goal is to create a friendly environment where anyone with an interest in cooking can discover and connect with interesting people and delicious foods.

### Audience:

Anyone who has an interest in food or cooking of any sort is looking for new things to try or people to meet. People of any age or gender who have a shared interest in the food world and skilled people giving their thoughts and recipes to the community.

### Communication:

The site is laid out like a social media website allowing users to scroll through new posts, like and comment on things they enjoy or follow people with similar tastes or experiences.

### Current User Goals:

Users will want to save posts to try later or just to follow influential people who are making the food they enjoy, they will want to keep checking in to see their favourite people post new and exciting things to try in the kitchen.

### New User Goals:

To interact with existing users to learn new things and explore what the site has to offer, making new friends or helping others with techniques and tips and tricks.

### Future Goals:

- I would like to add the ability for users to rate recipes which would tally into a global rating out of 5 stars from everyone who voted.
- I would like to add a support ticket system to allow users to report issues with the site or people posting inappropriate content.

## User Stories
Here are the links to my [kanban board](https://github.com/users/AlexanderJWard/projects/4) and the user stories hosted in [Github issues](https://github.com/AlexanderJWard/recipe-book/issues)

## Design

### Wireframes:

![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/43e56fff-b3c5-4133-a292-930e2114f753)

### Database Schema:


### Colour Scheme:

I used brown and beige for the theme of cooking as I mainly thought of baking and tried to replicate the colors associated with them that match.
#FFB677
#917059

### Typography:

The used font is free and called Hero

## Features

### Existing Features:

Navigation:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/f4d45c20-61e8-4b4c-8082-083e4fda9a7f)

Explore page:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/fa4c8a90-2f68-439a-9157-2e9b9886b6fb)

Profile page:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/f431db7a-3961-4f5c-911c-d9cdc898e12a)

New recipe page:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/5986db38-45dc-4422-ab67-959b915fb8ec)

Sign in page:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/9912b124-8dcb-4a1d-a96c-82283eb3f1ab)

Sign up page:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/4f754718-45ed-4683-b397-af3d59d6687b)

404 page:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/7cdb3773-9e0f-4bea-8b60-8181c3f0f6ea)


### Features Left to Implement:
- Add more fields to the tasks on profiles
- Support tickets
- Rating system
- Group messages
- Private profiles for specified users
- Email notification for when followed users post new content

## Testing

### Manual Testing:

- CRUD tests for comments, likes, posts, follow and tasks
- Nav links tested for related pages
- Non logged in users attempting to create new posts
- Non logged in users trying to sign in and sign up
- All users logging out

### Validator Testing

EsLint has been performed, the issues can be found [here](https://github.com/AlexanderJWard/recipe-book/issues/20)

Lighthouse Accessibility:
![image](https://github.com/AlexanderJWard/recipe-book/assets/102811792/d9a4e6e9-020f-406f-9084-d263ad30a8ff)

### Unfixed Bugs

I've not got the nav bar working as intended on mobile as some of the text gets slightly obscured and I need to make the text smaller to fit nicer on tablets or mobile.

## Technologies Used
### Main Languages Used

- JS
- HTML5
- Python
- Postgres SQL
- CSS

### Frameworks, Libraries & Programs Used

Font Awesome
GitHub
Heroku
Django Rest
React Bootstrap
GitPod

## Components

Loading spinner
Navigation bar
Burger menu collapse
Infinite scroll
Axios for API

## Deployment

1. Launch coding environment, GitPod and install react:
   - npx create-react-app . --use-npm
   - npm start

2. Install packages
   - npm install react-bootstrap@4.6.0
   - npm install react-router-dom@5.3.0
   - npm install axios
   - npm install react-install-scroll-component
   - npm install jwt-decode

3. Commit changes with Git
4. Create a Heroku new project and link the GitHub repository in the Deploy section

### Connecting to the API:

   - Navigate to Heroku app API and in settings add config vars
       CLIENT_ORIGIN = https://react-app-name.herokuapp.com
       CLIENT_ORIGIN_DEV = https://gitpod(UNIQUE LINK).io
   - Remove trailing slash from above config vars
   - Create supporting axiosDefaults.js
   - Deploying to Heroku

### Deploy to Heroku:

   - In scripts part of package.json add "heroku-prebuild": "npm -g serve"
   - Create Procfile with web: gunicorn p5_drf_api.wsgi
   - Git commit and push and deploy on Heroku

## Credits

### Content
- Code Institute: This project has been created utilising the Moments walkthrough as a foundation for the website, this will be built upon to branch out my own project and stylize to make it unique.

### Media

Sign in and Sign up image: https://www.pexels.com/photo/a-person-baking-a-cake-8477970/

Cloud upload image: https://www.vecteezy.com/vector-art/2292434-upload-and-download-cloud-vector-isolated-icon

Book logo image: https://www.vecteezy.com/vector-art/6792248-book-line-icons-vector-design

Cupcakes image: https://www.pexels.com/photo/assorted-cupcakes-14105/
Banana Bread image: https://www.pexels.com/photo/shallow-focus-photography-of-sliced-brownies-1277202/
