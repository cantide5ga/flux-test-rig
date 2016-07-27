#flux-test-rig
[![npm](https://img.shields.io/npm/v/flux-test-rig.svg)](https://www.npmjs.com/package/flux-test-rig) [![Build Status](https://api.travis-ci.org/cantide5ga/flux-test-rig.svg?branch=master)](https://travis-ci.org/cantide5ga/flux-test-rig)

**IN PROGRESS**

###Introduction
From Facebook's [documentation](https://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html):

>By design, stores can't be modified from the outside. They have no setters. The only way new data can enter a store is through the callback it registers with the dispatcher.

flux-test-rig allows you to sanely test your Flux stores in isolation and sets up stubs/trackers via Jasmine spies for you. 

This project is a thin wrapper around [Rewire](https://www.npmjs.com/package/rewire), doing it's best to preserve type information when used with Typescript.

###Installation
```
npm install flux-test-rig --save-dev
```
Optionally Typescript type definitions via [Typings](https://www.npmjs.com/package/typings): `typings install npm:flux-test-rig --save-dev`

###Example
The flux-test-rig project tests are a great reference.

###Usage
setup:
```
var FluxTestRig = require('flux-test-rig');

rigged = FluxTestRig.rig('./MyStoreFileName.js', 'nameOfCallback');
```

getting your Store singleton:
```
store = rigged.getStore('MyStore');
```

optionally creating spies (before invoking an Action!); your rewired store will return a spy object so you can do further config:
```
var addNote = rigged.getSpy('addNote').and.callThrough();
```

use your Action API in the test as you would in your application:
```
rigged.invokeAction({
    actionType: ActionTypes.PIN_UP,
    payload: 'Do laundry'
};
```

now you are ready to assert as normal:
```
expect(addNote).toHaveBeenCalled();
expect(rigged.get('notes')).toEqual(['Do laundry']);
expect(store.getNotes()).toEqual(['Do laundry']);
```

alternatively, you can take advantage of Typescrip's static typing and code completion:
```
const rigged = rig<IStore>('./MyStoreFileName.js', 'nameOfCallback');
```
*Exposing the interface to your event emitting store will help make your application more easily testable*


 
