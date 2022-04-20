# Part 2 


1. What is the difference between Component and PureComponent? Give an example where it might break my app

- The main difference is that PureComponent does a shallow comparison on React state and prop values.
- PureComponent implements shouldComponentUpdate() by default, whereas React Component doesn't.
- Due to the way PureComponent does it's shallow comparisons, the time where an app may break is where PureComponent is being used and inside the PureComponent props/state are being mutated. 

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

- If you are using shouldComponentUpdate to avoid unnecessary renders then context will interfere with this potentially.
- As the context api is checking the value of the provider always, anytime this updates it will trigger a re-render in any component using this value and it's children, regardless if shouldComponentUpdate be there or not. So this could lead to bugs down the line if you weren't aware of this.
- Use Memo if you need to prevent re-render of a component when using context.

3. Describe 3 ways to pass information from a component to its PARENT.

- You can pass a callback function in the parent as a prop to the child component like below:

```javascript
// Parent compoent
childCallback(value) {
    // value passed from child
}

return {
    <Child sendToParent={this.childCallback}/>
}

// Child component
this.props.sendToParent(childValue);
```

- You can utilise the context API and put the Parent information in a new file. Using context providers will mean various components can utilise the information.
- You can also utilise Redux state management in order to act as the store so that child components and parent components can access information.

4. Give 2 ways to prevent components from re-rendering.

- React.Memo can be used to prevent re-rendering, which does a shallow comparison of new and old props, if the same it skips rendering.
- Instead of utilising useState() to manage state where it shouldn't need to trigger a re-rendering, you could utilise useRef() which would still manage the state but not re-render the component.

5. What is a fragment and why do we need it? Give an example where it might break my app.

- React fragments let you wrap a list of children elements without adding extra nodes to the DOM because fragments are not rendered to the DOM.
- It means the speed of the app is improved and less memory is used due to fewer DOM nodes.
- It may break an app if you expect your Fragment to be called in a certain context, but as you usually build components to be reusable, it may be used elsewhere without this context. Hence, not explicitly defining the wrapper element here and using Fragment may get you into trouble.

6. Give 3 examples of the HOC pattern.

-  React-Redux uses a HOC called connect to map store state to props.
- React-Router’s withRouter HOC provides route context to components needing access to history APIs
- HOC that renders different components based on a status such as logged in or not

7. What's the difference in handling exceptions in promises, callbacks and
async...await.

- Technically callback functions are not asynchronous by nature, unless inside them you use promises, setTimeouts etc. So you could throw an error properly if you can make the callback async.
- Promises are async by nature and they allow chaining of a 'catch' block in result of an error (or simply the 'reject' state).
- Async/await is just another form of promise, but written in a more user friendly way for understanding and it eliminates the use of callbacks in .then() and .catch().

8. How many arguments does setState take and why is it async.

- Two arguments, an updater/value and callback.
- It is async to allow state updates to happen when needed, not all the time. If it was synchronous the page may crash and cause bad user experience, because too many expensive actions will be taking place.

9. List the steps needed to migrate a Class to Function Component.

- Change the 'Class' to a 'function' e.g. function Hello(props)
- Remove the render method but keep the inside return
- Convert any class methods to functions as they won't work inside Functional components
- Remove references to 'this' - they won't be useful outside Class components
- We need to remove the constructor. But inside the constructor 'this.state', which should be converted to utilise 'useState' hook.
- Remove event handler bindings, they are not required.
- Convert any references of 'this.setState()' to the useState hook e.g. setSomething()
- Anywhere there is a 'this.setState()' which includes a callback function, replace it with the useEffect() hook, as this now takes care of this.
- Replace all lifecycle methods like componentDidMount(), componentWillMount() and componentDidUpdate() with useEffect() hooks.

10. List a few ways styles can be used with components.

- CSS and SCSS like normal can used with styling using the className property
- You can use inline styling.
- You can have CSS-in-JS which is where you pass a JS object which has CSS instructions as a variable.
- Styled components can be used, they style the component inside the same file and also this means the component name from usual html naming like div, h1, p etc can be customised and renamed on the component level inside the file. 
- Material UI is an option also, you have access to a large library of tested styled elements which you can customise all in the same JS file, you can add styling properties directly to you Material UI components also.

11. How to render an HTML string coming from the server.

- You'd use the below property (dangerouslySetInnerHTML) inside your component:

```
<div dangerouslySetInnerHTML="Hello &middot; there" />;
```