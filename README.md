# e-CareBe

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a5260f24e4f4409850559a869cea154)](https://app.codacy.com/gh/BuildForSDGCohort2/e-CareBe?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDGCohort2/e-CareBe&utm_campaign=Badge_Grade_Settings)

Workflow guide for DevDeck Backend team

### The default branch is staging.

* Make a fork of the repo.

* Clone the repo to your local drive.

   ```
    git clone https://github.com/<your-github-username>/e-Care-Be.git
   ```
   replace <your-github-username> with your personal github username where you have your fork.
    
* Set the main repo as upstream on your local drive
    ```
    git remote add upstream https://github.com/BuildForSDGCohort2/e-CareBe.git
    ```
* Create a new branch for each of your features out of the staging branch,

    ```
    git checkout -b (name-of-branch)
    ```

* Install all dependencies for the project by running this code on your terminal...
    ```
    npm i
    ```
* Create a new file in the root directory of the clone with name ***.env*** and copy the content of ***.env copy*** into it.

* Update the ***.env*** file with your own preferred environment variables.

* If your database doesn't exists yet, create a database with the command:
    ```
    npx sequelize db:create
    ```
* Run the prepared migrations with:
    ```
    npx sequelize db:migrate
    ```
* Finally, start your server with nodemon
    ```
    npm run dev
    ```
* ESLint has been set-up on the project so make sure to follow lint rules for a neat code base to be achieved.
* Run the following command to check for lint issues after writing your code and fix as appropriate
    ```
    npm run lint
    ```
* Make sure to commit with a simple but meaningful commit message to aid proper team work flow.

* Push your codes to the new branch on your forked remote upstream repository

    ```
    git push origin (name-of-branch)
   ```

it is not just about the code, user workflow matters too!!

**A good commit message would look something like this...**
    
    feat: Make login check for email and password

Remember to always pull from upstreamfor us to avoid merge conflicts use the git command line
   
    git pull upstream develop


### “The most important property of a program is whether it accomplishes the intention of its user.” -C.A.R. Hoare
