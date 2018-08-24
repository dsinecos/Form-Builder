# References

#### Libraries used
  - React-Native and Expo
  - Nativebase (As the UI kit)
  - Redux-form (For integrating the form with redux store)
  - Redux-persist (To provide form data persistence across application restarts)

## Steps

1. #### Create the basic form components using Nativebase

2. #### Connect the form component to redux store via `redux-form`
    ##### Objectives
    - Integrate fields with redux-form's `Field` component
    - Have dynamic form names against which the form data is stored in redux store (which will correspond to a combination of UserID and FormID)
      - [Reference - Order of using `connect` and `reduxForm` - To access props from reduxForm](https://github.com/erikras/redux-form/issues/3424)
      - [Reference - Example in redux-form documentation](https://redux-form.com/7.4.2/docs/faq/howtoconnect.md/)
    - For adding a dynamic form name to store form data against
      - [Reference - For adding a dynamic form name](https://stackoverflow.com/a/40688745/7640300)
      - [Reference - For adding a dynamic form name - Github issue](https://github.com/erikras/redux-form/issues/603)
    - Building a reducer plugin for dynamic form names
      - [Reference - Adding a plugin to extend the default form-reducer - redux-form documentation](https://redux-form.com/7.4.2/docs/api/reducerplugin.md/)
      - [Reference - Building a reducer plugin for dynamically named forms](https://stackoverflow.com/a/49918816/7640300)
      - [Reference - Building a reducer plugin for dynamically named forms - Github Issue](https://github.com/erikras/redux-form/issues/3050#issuecomment-308002277)


3. #### Setting up redux-persist
    ##### Objectives
    - Setup redux-persist@4.6.0 [Reference - Redux@4.x Documentation](https://github.com/rt2zz/redux-persist/tree/v4)
      - Integrate with redux-form to persist form data
      - Delay rendering of components until persisted form data has been loaded
        - Reference - [Build a component that does not render the app until rehydration completes](https://stackoverflow.com/questions/46895278/offline-state-not-rehydrating-with-redux-offline)
    - Migrate to redux-persist@5.x 
      - [Reference - Redux@5.x Documentation](https://github.com/rt2zz/redux-persist)
      - [Reference - Tutorial on migrating to @5.x](https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975)

4. #### Setting up redux-offline
    - [Reference - Make your offline-first React app with Redux-Offline](http://jslancer.com/blog/2017/05/23/no-internet-no-problem/)
    - [Reference - Introducing Redux Offline: Offline-First Architecture for Progressive Web Applications and React Native](https://hackernoon.com/introducing-redux-offline-offline-first-architecture-for-progressive-web-applications-and-react-68c5167ecfe0)
    - [Reference - Adding Offline support to Redux](https://medium.com/@ianovenden/adding-offline-support-to-redux-ac8eb8873035)
    - [Reference - Creating an Offline-First React Native App](https://medium.com/@ballinst/creating-an-offline-first-react-native-app-ecdf0dcd853c)

5. #### Setting up the rendering engine to render forms from JSON