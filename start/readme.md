# Vite

Start by going over the [Vite explanation](https://devinekask.github.io/workflows/vite-01-intro)

Name your project 'fake-door' and use the 'vanilla' template, no Typescript, JavaScript is fine.

You can skip the last part about subdirectories (for now, maybe just read it)

## Clean up

We are about to remove some files we don't need.

- Remove the `public` folder and its contents
- Remove the `counter.js` file
- Remove the `javascript.svg` file
- Remove the `style.css` file

If you have the dev server running, you will encounter some errors. Don't worry: read the message and remove the imports that are responsible for the errors.

Make a commit for these changes.

## Build up

- Replace the `<div id="app"></div>` in the HTML with the provided HTML. Be sure to keep the `<script type="module">` tag.
  - Vite will throw an error again. Remove the JavaScript code to add the HTML and to set up the counter. (make the file empty)
  - Notice the `<script type="module" src="/main.js"></script>` line in the HTML.
- Create a new `css` directory copy the provided CSS files into it
  - To use this CSS, we have to import it via JavaScript, so import the `style.css` file in the `main.js` file

  ```css
  import "/css/style.css";
  ```

  - You could do the same for the reset.css, but there is also the option to import it via CSS. Add the following line to the `style.css` file

  ```css
  @import url("reset.css");
  ```

Make a commit for these changes.

## Submit

Let us handle the form submission, kind of... We will just log a message to the console for now. We could talk with a webservice to store the email address, but we will do that another time.

```javascript
const init = () => {
  const $form = document.querySelector("form");

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submitted")
    event.target.reset();
  });
}

init();
```

Make a commit for these changes.

## Modules import

Let us celebrate when a visitor submits its email address by throwing some confetti. We can use the [js-confetti](https://www.npmjs.com/package/js-confetti) package for this.

Let's make a feature branch for this.

First, we need to install the package

  ```bash
  npm install js-confetti
  ```

Then we can import it in the `main.js` file

  ```js
  import confetti from "js-confetti";
  ```

In the [documentation](https://www.npmjs.com/package/js-confetti#usage) you can see how to use the package. We have to create an instance of JSConfetti first and call addConfetti() when we want to throw confetti. You can figure this one out yourself.

Make a commit for these changes and merge the feature branch.

## Production build

Run `npm run build`, you should see a `dist` directory being created. To test this build, you can run `npm run preview`` to get a 🥁... preview

Check the console for errors

## Inlined images

Change the door image to the 'door100.png' version an run the build again. Check the output in te console and spot the difference.

Make a commit for these changes.
