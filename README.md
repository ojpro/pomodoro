# Pomodoro Pulse
Designed for Pomodoro enthusiasts aiming for maximum productivity.



## Screenshot

![image](https://github.com/ojpro/pomodoro-pulse/assets/108437129/34b4af23-5e9a-43ef-ac89-c47fb8c56a42)

## Run Locally

Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

```bash
git clone https://github.com/ojpro/pomodoro-pulse.git
npm install
npm run dev
```

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.
Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with npm run build and run it with npm start:

```bash
npm install
npm run build
npm start
```

You should run `npm run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`).
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_GOOGLE_ANALYTICS`


## Authors

- [@ojpro](https://www.github.com/ojpro)


## License

[MIT](https://choosealicense.com/licenses/mit/)

