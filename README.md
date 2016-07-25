# GitHub Pages Template

A simple, customizable, and free GitHub Pages template

### Getting Started

This project requires a version of Node greater than or equal to version 4.

- Download the project from GitHub
- Navigate to the project directory
- Install packages
- Run the serve script

```
git pull https://github.com/davidjpfeiffer/gh-pages-template/
cd gh-pages-template
npm install
npm run serve
```

### Scripts

You can use the below scripts to accomplish various tasks in your project. These scripts are defined in the package.json file. Note that you must run these scripts inside the project directory.

#### Development Build

A development build compiles your SASS to CSS, moves all files from the src directory to the dist directory, and performs other tasks to improve your development environment.

```
npm run build--dev
```

#### Production Build

A production build does everything that a development build does, but it also optimizes the files for production. This means concatenating CSS and JS files, minifying HTML, CSS, and JS files, generating sitemaps, and other tasks to make the website fast.

```
npm run build--prod
```

#### Watch

A watch will open the website in a browser and watch for changes. When a file is changed, it will re-build only the changed files, inject the updated code into the browser, and refresh the browser for you all within a few miliseconds. You should always run a development build before running a watch.

```
npm run watch
```

### Deploying to GitHub Pages

You can deploy your website to GitHub Pages using the deploy script. Before you can use this script, you must first make the dist directory a subtree within your git repository. You can do this using the setupsubtree script. This command should only be executed once per git repository. For example, if you download the source files for this project and create a new repository with those files, you will have to run the setupsubtree script before you can deploy to GitHub Pages. If you fork this repository, you will not have to run the script because it has already been run in this repository.

```
npm run setupsubtree
```

The setupsubtree script pushes the dist folder from your master branch to the gh-pages branch. If this branch does not yet exist, it will create it for you. Note that if you make changes locally and run this command it will not have any affect on the gh-pages branch. You must commit these changes and push them before running the command.

```
npm run deploy
```

### Legal

All contents are copyright © 2016 David J Pfeiffer.

This project is licensed under the MIT license. You may use any part of this software, you may make changes, and you may use it for personal or business projects as long as you include a reference back to this project and give attribution for the parts of this project that you used.
