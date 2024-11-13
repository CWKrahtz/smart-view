# Smart View
<a id="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url] 
[![Forks][Forks]][Forks-url]
[![Starsgazers][Stars]][Stars-url]
# 
<div align="center">
  <a href="https://github.com/CWKrahtz/smart-view">
    <img src="https://github.com/CWKrahtz/smart-view/blob/master/assets/adaptive-icon.png" alt="Smart-View" width="200" height="auto">
  </a>

  <h3 align="center">Smart View</h3>

  <p align="center">
    Smart View is an AI assitaance aplication that help label images
    <br />
    <br />
    <a href="https://github.com/CWKrahtz/smart-view"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/DVIkhTU_Shw">View Demo</a>
    ·
    <a href="https://github.com/CWKrahtz/smart-view/issues">Report Bug</a>
  </p>
  <br />
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#highlights">Highlights</a></li>
    <li><a href="#chalenges">Chalanges</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#peer-review">Peer Review</a></li>
    <li><a href="#licence">Licence</a></li>
    
  </ol>
</details>

## About the Project

![Mockup1][mockup1]
![Mockup2][mockup2]
![Mockup3][mockup3]

Smart View uses the power of AI to assist users with generating relevant labels for the images.
users will be able to use these labels to categorise their images into appropriate albums or use it to add relevant #tags to your sosial media posts.
With each image being labeld users will be able to view all their previous uploads and their labels.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

- ![ReactNative](https://img.shields.io/badge/ReactNative-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)


## Getting Started

### Prerequisites

- [![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
- [![.Net](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)


### Installation

1. Clone the frontend repo
   ```sh
   https://github.com/CWKrahtz/smart-view.git
   ```
2. Install the node modules for Smart View
   ```sh
   cd smart-view
   ```
   then
   ```sh
   npm i
   ```
3. Configure Environment Variables
   Create a .env file with the following variable ' GOOGLE_CLOUD_VISION_API_KEY ' and your own Google Vision api key
   ```bash
   GOOGLE_CLOUD_VISION_API_KEY=YOUR_API_KEY
   ```
   
#### Running the Application
<p>To run the application locally, use the following command:</p>

In the root of Smart View
  ```bash
  npm run start
  ```
<p>The API should now be running at `exp://192.168.0.112:8081`.</p>

   
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features
### 1. Authentication
- Secure login and registration process to safeguard user data
- Firebase Authentication

### 2. Image
- Processing & AI Analysis
  - Users can pick images from their device gallery
  - Selected images are analyzed using Google Cloud Vision API
  - AI generates labels/tags for the images
- Storage and management
  - Images are uploaded and stored in Firebase Storage
  - Each image is associated with its AI-generated labels
  - Images are linked to specific user accounts
- Gallery/Album View
  - Users can view all their uploaded images
  - Each image shows its associated AI-generated labels
- Filtering System
  - Users can filter images based on their AI-generated labels
  - Filter dropdown menu shows all available labels
  - Dynamic filtering updates the image gallery in real-time

## Highlights
  - Dashboard
    - Upload image from your mobile device
    - Analyse image with AI
    - Saving User image to profile with labels
    - Display of image and labels
  - Uploads
    - View all images
    - Filter select functional, update with new select
  - Single View
    - Image display
    - Labels display

## Chalanges
  - Adding a All selection to the filter
    - Can either add All label to filter when labels are saved
    - Or add a All picker value in the fronend.
  - Main struggle was getting the filter to call the images with selected label.

## Future Implementation
  - Dashboard
    - Take picture
    - More lables (refresh for new labels)
  - Profile
    - Update profile information
    - Delete profile
  - Uploads
    - All filter
    - Update filter to have multiple label search
  - Single
    - Update labels (refresh for new labels)
    - Remove labels

## Acknowledgements
* [React Native](https://reactnative.dev/docs/environment-setup)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [Expo](https://docs.expo.dev/)

## Contributors

<div style="display: flex; flex-direction: row ; justify-content: space-between;">
  <div style="text-align: center;">
    <a href="https://github.com/CWKrahtz/Elementium-frontend">
      <img src="https://github.com/CWKrahtz.png" alt="Christian Krahtz" width="100px">
    </a>
    <br>
    <sub>Christian Krahtz</sub>
  </div>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Peer Review
  From the 4 users that tested the application (Cameron, Hannah, Eddie, and Erik) these are the feedback I received. For the tasks the users where given they gave the task a score of 5 (walk in the park).

  ### Surprices
  _The speed and robustness_ - Cameron
  _Single view selection of previous uploaded images_ - Erik
  _I was surprised that the filter feature worked not that I doubted that it would but the fact that it was able to detect specific images out of all the images uploaded was very cool_ - Hannah
  _No it was pretty straight forward_ - Eddie

  ### Likes
  _The filtering feature to group images of similar elements_ - Cameron
  _The filtering system of images that have similar labels._- Erik
  _I really liked the filter feature that helps to detect the labels of the images I think this is very useful_ - Hannah
  _I liked the way it labels and group similar images_ - Eddie

  ### Dislikes
  _Not being able to scroll to see all the tags on the image upload page._ - Cameron
  _Some more options for image selection, and unnecessary popups._ - Erik
  _The only thing is the spacing on the label tags underneath the images can be slightly readjusted but other than that everything else is perfect_ - Hannah
  _The lack of loaders to communicate something is happening in the background_ - Eddie

  ### User Frustration
  _"It was a little unclear after uploading an image to not see a major change in the call to action. perhaps changing the colours of the buttons or changing the text to 'select a different phot' to create a change in clarity"_ - Cameron
  _I think the profile tab should be the last tab on the nav bar because I found myself clicking the middle button on the nav bar to go to the next page and expecting it to be the album page but instead it was the profile page which can be a bit confusing_ - Hannah


## Licence

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/CWKrahtz/smart-view.svg?style=for-the-badge
[contributors-url]: https://github.com/CWKrahtz/smart-view/graphs/contributors
[Forks]: https://img.shields.io/github/forks/CWKrahtz/smart-view.svg?style=for-the-badge
[Forks-url]: https://github.com/CWKrahtz/smart-view/forks
[Stars]: https://img.shields.io/github/stars/CWKrahtz/smart-view.svg?style=for-the-badge
[Stars-url]: https://github.com/CWKrahtz/smart-view/stargazers
[mockup1]: assets/readme/mockups/mockup1.png
[mockup2]: assets/readme/mockups/mockup2.png
[mockup3]: assets/readme/mockups/mockup3.png
