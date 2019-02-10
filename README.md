# SpotiCheck

## Branching Policy
This project uses a shrunk form of the common [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/#the-main-branches).

The central repo holds two main branches with an infinite lifetime: `master` and `dev`.  

* The **master** branch is the branch where the source code always reflects a production-ready state.  
* The **develop**(dev) branch is the branch where the source code always reflects a state with the latest delivered development changes for the next release.


Feature branches are used to develop new features for the upcoming release. They are derived from the issue board.
Every feature branch is always created from the **dev** branch and will solely be remerged into **dev**. 

Its lifetime should be as short as possible.

Commits into the master are **strictly forbidden** - always use a pull request.

## Used Docs
- [Spotify Dashboard](https://developer.spotify.com/dashboard)
- [Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- [Spotify Console](https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/)
- [cors-anywhere](https://github.com/Rob--W/cors-anywhere/)

## Angular Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
