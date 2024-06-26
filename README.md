# Verity

Verity is a site dedicated to finding the truth.

# Verity at a glance


![Splash Gif](https://cdn.discordapp.com/attachments/920285009099751524/925601744002625546/splash1.gif?ex=661f4bcc&is=660cd6cc&hm=882d5134ecde9b8467e09fac53ab14d800fdc76aeb34bda37ed490069a3f6d04&)
* When you first enter Verity, you're greeted with a splash page that informs you what the site is about!
* The splash page has custom css animation that only use vanilla css, html, and react

![Carousel Gif](https://cdn.discordapp.com/attachments/920285009099751524/925604498280423434/shortercar.gif?ex=661f4e5d&is=660cd95d&hm=a0ad76c0a420f8d6e4f188d4e3d695ba30b8644dba7ebe48c0c196bcc35be75b&)
* The main way to naviagte through facts is a custom carousel which was also vanilla css (no animation libraries).

![Delete Modal Gif](https://cdn.discordapp.com/attachments/920285009099751524/925606175700058153/deletemodal.gif?ex=661f4fed&is=660cdaed&hm=00a89081366b8b53af616c12bf1bfe06fe1712bea404c867f7d66d4cd2e825b0&)
* Leveraging react and redux, Verity is able to have dynamic feeling modals and buttons for a better user experience.


# Frontend Technologies Used
<img src="https://media.discordapp.net/attachments/920285009099751524/925631805267271690/frontend-tech.png?ex=661f67cb&is=660cf2cb&hm=ee814f625b0cf6df28b9e344a7efcc928ae3c6c82bbb4fcab9a3e019904db263&=&format=webp&quality=lossless&width=619&height=909" width="300"/>

# Backend Technologies Used
<img src="https://media.discordapp.net/attachments/920285009099751524/925631805057548308/backend-tech.png?ex=661f67cb&is=660cf2cb&hm=03d0078673e9501acb33e7132c257d47bffaaa64ecc17bc9e0a83881384e41ff&=&format=webp&quality=lossless&width=619&height=909" width="300"/>

# Application Architecture
<img src="https://media.discordapp.net/attachments/920285009099751524/925650376110256208/techArchnoback.png?ex=661f7917&is=660d0417&hm=99d6dc2c4225e8f940e12085083c5182704ec7595f7bfdf842bb5d48f7e625c4&=&format=webp&quality=lossless&width=1643&height=909" width="900"/>

### 1. User hit button/submits form (controlled component)/loads a page(useEffect) and hits a thunk.
### 2. The thunk sends a fetch request to the api server.
### 3. The server then sends a request to the database.
### 4. The database then returns data to the server.
### 5. The server then serves the data back to the thunk.
### 6. The thunk dispatches the action creator.
### 7. The action creator sends the action object to the reducer.
### 8. The reducer takes the action object and updates the state.
### 9. The state/store is then updated.
### 10. useSelector is then used to listen to the state a pull out a “Slice of State”.
### 11. The frontend is then updated using the information from the backend and renders the page using the frontend technology stack.

# Conclusion & Next Steps

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```
