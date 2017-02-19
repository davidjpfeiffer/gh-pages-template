# GitHub Pages Template

A simple, customizable, and free GitHub Pages template

## Getting Started

- Download the project from GitHub
- Navigate to the project directory
- Install packages
- Run the serve script

```
git clone https://github.com/davidjpfeiffer/gh-pages-template
cd gh-pages-template
npm install
npm run serve
```

## Scripts

You can use the below scripts to accomplish various tasks in your project. These scripts are defined in the package.json file. Note that you must run these scripts inside the project directory.

#### Development Build

A development build compiles your SASS to CSS, moves all files from the src directory to the dist directory, and performs other tasks to improve your development environment.

```
npm run build-dev
```

#### Production Build

A production build does everything that a development build does, but it also optimizes the files for production. This means concatenating CSS and JS files, minifying HTML, CSS, and JS files, generating sitemaps, and other tasks to make the website fast.

```
npm run build-prod
```

#### Watch

A watch will open the website in a browser and watch for changes. When a file is changed, it will re-build only the changed files, inject the updated code into the browser, and refresh the browser for you all within a few miliseconds.

```
npm run watch
```

#### Deploy

You can deploy your website to GitHub Pages using the deploy script. Note that if you make changes locally and run this command it will not have any affect on the gh-pages branch. You must commit your changes and push them before running this command.

```
npm run deploy
```

## Legal

All contents are copyright © 2016 David J Pfeiffer.

This project is licensed under the MIT license. You are free to use this project for private and commercial use under the following conditions:

- You must link back to this project somewhere on your website
- You must give credit for the parts of this project that you used
- You cannot redistribute this software as your own
- You must state if changes where made
- You must include a copy of the license
