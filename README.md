<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://res.cloudinary.com/n10eta/image/upload/v1639114980/readme/UntitledcareTracker_1_lrqwmk.png" alt="Logo" width="400" height="200" >
</p>

<h1 align="center">Care Tracker Frontend</h1>
<h3 align="center">
	<a href="https://caretracker.netlify.app/">Live URL</a>
</h3>
  
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#artefacts">Artefacts</a></li>
        <li><a href="#backend-repo">Backend Repo</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#test-credentials">Test Credentials</a></li>
        <li><a href="#tools-and-libraries">Tools And Libraries</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]] -->
<a href="https://caretracker.netlify.app/">
<p align="center">
    <img src="https://res.cloudinary.com/n10eta/image/upload/v1639121632/readme/dashboard_l3lxdj.png" alt="Logo" width="650" height="350" >
</p>
</a>

We are living in the age of pandemics, where taking care of personal and loved ones health is the most important. When it comes to storing and searching different medical reports physically in our home is really a difficult task. With care tracker, we are providing an application where you can store your reports in one place and track your health on the basis of these reports. We are also providing different features like doctor consultation, the emergency feature which can be a great help during some emergencies.

### Artefacts

<a href="https://drive.google.com/file/d/1unWSM2pNwCFSErJVX_6IkvcM5oiOUhWK/view?usp=sharing">PRD</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://drive.google.com/file/d/1nZJF6_Xssem140UtKJgr4g48XMWpcQtQ/view?usp=sharing">HLD</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://drive.google.com/file/d/1U1ArjVvM7aBLXzaLXK_ItxYeRzZRy5w8/view?usp=sharing">One Pager</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://app.swaggerhub.com/apis/akshayawasthi3/CareTracker/0.1">API documentation</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://www.figma.com/proto/gwX1uTPgceU8ou25OU2cwW/dashboardModule?node-id=74%3A86&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=74%3A86">Wireframes</a>

### Backend Repo

[Backend Repo](https://github.com/pesto-students/caretaker-be-n10-eta)

**Mission:**

To empower everyone to take health seriously and can track their health ease, as we all know health is wealth.

**Vision:**

Our vision is to provide basic information about someone who is facing some emergency so that proper treatment, as well as contact with the family, can be done.

**Goals:**

- Simple solutions for the problems.
- Help the people in need.
- To make the proper awareness about tracking health.

**Features:**

- A dashboard to track the heath on the basis of reports uploaded.
- Consultation with doctor.
- Generate QR code for some emergency.
- Simple and consistent UI.
- Multiple Payment Option.

### Built With

<p align="center">
	<a href="https://www.javascript.com/">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638979947/readme/128px-JavaScript-logo_vlutit.png" title="JavaScript" height="100">
	</a>
	<a href="https://reactjs.org/">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638979422/readme/react-logo_aiqchy_ppt4p0.png" title="React" height="100">
	</a>
	<a href="https://redux.js.org/">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638979437/readme/redux-logo_g2vd7e_jcex50.png" title="Redux" height="100">
	</a>
	<a href="https://firebase.google.com/">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638979578/readme/firebase-logo_v8dzdj_cjreko.png" title="Firebase" height="100">
	</a>
	<a href="https://github.com/features/actions">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638979457/readme/github-action-logo_yamrxz_sbthhy.png" title="Github Actions" height="100">
	</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://razorpay.com/">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638979465/readme/Razorpay-logo_bzojzt_qwpghx.png" title="Razorpay Payment Gateway" height="100">
	</a>
	<a href="https://www.netlify.com/">
		<img src="https://res.cloudinary.com/n10eta/image/upload/v1638980033/readme/Netlify-Logo.wine_f5rioq.png" title="Netlify" height="100">
	</a>
</p>

<!-- GETTING STARTED -->

## Getting Started

Following are the simple steps to run this project.

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

- firebase
  ```sh
  npm install firebase -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clonehttps://github.com/pesto-students/caretaker-fe-n10-eta.git careTracker-fe
   ```
2. Set environment variables

REACT_APP_SERVER_URL=https://stark-island-21254.herokuapp.com/<br />
REACT_APP_ORG_ID=<br />
REACT_APP_DYTE_URL=<br />
REACT_APP_FIREBASE_API=<br />
REACT_APP_AUTH_DOMAIN=<br />
REACT_APP_PROJECT_ID=<br />
REACT_APP_STORAGE_BUCKET=<br />
REACT_APP_MESSAGING_SENDER_ID=<br />
REACT_APP_APP_ID=<br />
REACT_APP_MEASUREMENT_ID=<br />
REACT_APP_PAY_ID=<br />

3. Install NPM packages
   ```sh
   cd caretaker-fe-n10-eta && npm install
   ```
4. Run
   ```sh
   npm start
   ```
5. Open http://localhost:3000 to view it in the browser

6. Run Test cases
   ```sh
   npm test
   ```

## Test Credentials

To login in the app as user use no. 9999999999 and otp 111111</br>
To login in the app as doctor use no. 8888888888 and otp 222222</br>
To login in the app as admin use no. 7777777777 and otp 333333</br>

<!--Tools-->

## Tools and Libraries

- [Redux] - State Management
- [Jest] - Unit testing
- [React-testing-Library] - Integration testing
- [Dyte] - Call SDK
- [Billboard] - Charts
- [Prettier] - Automatic code formatting
- [AntDesign] - UI library

<!-- Contributors -->

## Contributors

Akshay Awasthi - [GiHub](https://github.com/akshayawasthi3) - [Email](mailto:akshayawasthi3@gmail.com)

Kapil Harode - [GiHub](https://github.com/kapilharode) - [Email](mailto:kapilharodek4@gmail.com)

Dinesh Yadav - [GiHub](https://github.com/dinesh0191) - [Email](mailto:dinesh0191@gmail.com)

<!-- [product-screenshot]: https://res.cloudinary.com/emarat/image/upload/v1631802213/homepage-screenshot_n2dxwk.png -->
