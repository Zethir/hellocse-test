# How to run the project

This project is separated in two folders, one for the back end which is basically a laravel crud API, and one for the front end which is a VueJS framework using Typescript with a simple Vuex store.

#### Back End

The back end is located in the folder `back-api`
You will have to install the packages yourself as there are obviously not pushed on the repo.

You just have to create a new db, change your env file to match the db name and password and you can migrate.

    php artisan migrate

This app will serve as a simple star API to the front-end, you can add your own data via Postman or you can simply use the back office.

Here's an example of a valid data set:

    {
        lastname: 'Pitt',
        firstname: 'Brad',
        description: 'An handsome fella and a terrific actor',
        image: 'https://url-image.com/brad-pitt.jpg'
    }

Once you have migrated, you can run the dev server with

    php artisan serve

#### Front end

The front end folder is located in `vue-front`
This is a simple vue app with two views: `BackOffice` and `Stars`

You just have to install the packages with:

    npm install

And run the server with this command:
npm run serve

You will be listening to this address:

    http://localhost:8080

To access the back office, you have to go to this route: `/back-office`
And just go to the root `/` to get the stars once added.

I did not use third party libraries or css frameworks besides Vuex and Axios.

If you have any questions whatsoever or if I missed some instructions, feel free to ask
