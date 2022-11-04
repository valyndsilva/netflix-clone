# Getting Started:

## Create TypeScript Project:

Use create-next-app with the --ts, --typescript flag like so:

```
npx create-next-app@latest --typescript project-name
```

## Setup Tailwind in your project:

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

### Configure your template paths in your tailwind.config.js file content:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS in ./styles/globals.css file:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Enable CSS Nesting:

You need to install postcss-import via npm/yarn:

```
npm install postcss-import
```

Then change your postcss.config.js to:

```
module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
    }
}
```

### Start your build process:

```
npm run dev
```

### Start using Tailwind’s utility classes to style your content. Ex:

```
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

```

## Setup Material UI and Icons:

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

## Fix hydration UI mismatch issues:

We need to wait until the component has mounted open pages/\_app.tsx:

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    //To fix hydration UI mismatch issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <Component {...pageProps} />;
}

export default MyApp;

```

## Create a custom 'Document' file:

create \_document.js in pages folder and paste code from https://nextjs.org/docs/advanced-features/custom-document

## Setting up Nextjs with typescript, eslint, prettier and husky:

```
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react
npm install --save-dev @next/eslint-plugin-next
npm install eslint-config-next
npx eslint --init
npm install --save-dev prettier
```

To avoid conflict with eslint and prettier

```
npm install --save-dev eslint-config-prettier
```

The .eslintrc.js file should look like this and we add prettier to extends and add settings:

```
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  },
  settings: {
    react: {
      version: "detect",
    }
  }
}

```

### Create a .prettierrc file with the following:

```

{
  "endOfLine": "lf",
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5"
}

```

### Run prettier to reformat the files:

```
prettier --write .
```

### Create a .vscode folder in root directory and in it a settings.json file.

In settings.json:

```

{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "esource.fixAll.format": true
  }
}

```

This tells eslint to fix any auto fixable problems when we hit save and the prettier runs after that and format the changes we made.

### Setup Husky:

Next we install husky to setup a pre git commit hooks. It checks 4 things:
No Prettier warnings in the code
No ESLint warnings in the code
No compling errors in the code from typescript
Check if you can run a valid build using Next.js next build

Install Husky and update package.json scripts with "prepare": "husky install":

```
npx husky-init
npm install
```

A .husky folder is created with a sample pre-commmit.json file

In package.json we create 5 different scripts to test various things:

```
// Runs tsc command on cli and pretty print any warnings or errors that it produces
"check-types": "tsc --pretty --noEmit",
// asks prettier to check all the files excluding the ones in the prettierignore file for formatting issues.
"check-format": "prettier --check",
// Asks eslint to check for any linting warning or errors in any ts. tsx or js file
"check-lint": "eslint . --ext ts --ext tsx --ext js --ext jsx",
// Tells prettier to automatically re-write all the files with proper formatting
"format": "prettier --write .",
// test-all runs all commands above in sequence
"test-all":"npm run check-format && npm run check-lint && npm run check-types && npm run build"
```

The package.json scripts will look like this:

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --no-cache",
    "prepare": "husky install",
    "check-types": "tsc --pretty --noEmit",
    "check-format": "prettier --check",
    "check-lint": "eslint . --ext ts --ext tsx --ext js --ext jsx",
    "format": "prettier --write .",
    "test-all": "npm run check-format && npm run check-lint && npm run check-types && npm run build"
  },
```

We need to check all succeed before a commit is to be made.
Open the .husky/pre-commmit.json file:

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Check tsconfig standards
npm run check-types ||
(
    echo 'Failed Type Check!!! Make the required changes listed above.';
    false;
)

# Check Prettier standards
npm run check-format ||
(
    echo 'Prettier Check Failed!!! Run "npm run format", add changes and try commit again.';
    false;
)

# Check ESLint standards
npm run check-lint ||
(
    echo 'ESLint Check Failed!!! Make the required changes listed above, add changes and try commit again.';
    false;
)

# If everything passes... try to run a build
    echo 'Your code looks good!!! Trying to build now...';

    npm run build ||
(
    echo 'Next build Failed!!! View the errors above to see why.';
    false;
)

# If it builds we can commit
    echo 'Your code passed all checks!!! Code is being commited now...';

```

### Fix Common Errors:

If you run into an error:
The Next.js plugin was not detected in your ESLint configuration. See https://nextjs.org/docs/basic-features/eslint#migrating-existing-config

In the .eslintrc.js in the root add to extends:

```
"plugin:@next/next/recommended",

```

If you receive an error:
ESLint: Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.

In the .eslintrc.js in the root add to parserOptions:

```
 parserOptions: {
    project: "tsconfig.json",
    ...
  },
```

## Deploy to Vercel

Install and configure Vercel CLI.
$ npm i -g vercel
In terminal, at the root of the project write:
$ vercel

When you run npm run build you might receive an error like:
rror occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
FetchError: invalid json response body at http://localhost:3000/api/getHero reason: Unexpected token < in JSON at position 0
If this happens switch from ISR to SSR in index.tsx.

Setup axiosClient in lib/axiosClient.tsx:

```
npm install axios query-string
```

Authenticated server-side rendering with Next.js and Firebase Authentication
https://colinhacks.com/essays/nextjs-firebase-authentication
A collection of cookie helpers for Next.js:

```
npm install nookies
```

https://firebase.google.com/docs/admin/setup

```
npm install firebase-admin
```

## Implement Authentication in NextJs with Firebase:

https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/

In .env.local add:

```
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=<YOUR_API_KEY>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<YOUR_DOMAIN>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
```

Next, create a firebase config instance in lib/firbaseConfig.tsx:

```
import firebase from "firebase/compat/app";
import "firebase/auth";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
// if a Firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials);
}

export default firebase;


```

Listening for Firebase changes In lib/useFirebaseAuth.tsx:

```
import { useState, useEffect } from "react";
import firebase from "./firebaseConfig";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
}

```

Then create a new use Context in context/AuthUserContext:

```
import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "../lib/useFirebaseAuth";

export const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}
// // custom hook to use the authUserContext and access authUser and loading
// export const useAuth = () => useContext(AuthUserContext);

```

Create a custom hook to access the context value in hooks/useAuth.tsx:

```
import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";

// custom hook to use the AuthUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);

```

Then, in our \_app.js, wrap this provider around your application. This ensures that the children components will be able to access your user context:

```
import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthUserProvider } from "../context/AuthUserContext";

function MyApp({ Component, pageProps }: AppProps) {
  // To fix hydration UI mismatch issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <AuthUserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;

```

Creating protected routes:
Protected routes are pages or sections of your app that should only be accessed by certain users. In this case, only logged-in users should access this content. To set this up, get the authUser and loading from your custom useAuth() hook. With these variables in place, check if Firebase is still fetching data (i.e., loading is true), and, if not, whether authUser is null. If that is the case, then the user isn’t logged in and you should redirect them to the login page.

Create a new page loggedIn.tsx:

```
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const LoggedIn = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    //Your logged in page
    <h1>I'm Logged In!</h1>
  );
};

export default LoggedIn;

```

Adding login, sign-up, and sign-out functionalities in Next.js:
In lib/useFirebaseAuth.tsx we can add many built-in functions for signing in, creating users, and signing out.
We use firebase.auth() to access the different functions (signInWithEmailAndPassword, createUserWithEmailAndPassword, and signOut).

The updated useFirebaseAuth.tsx will look like:

```
import { useState, useEffect } from "react";
import firebase from "./firebaseConfig";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () => firebase.auth().signOut().then(clear);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}

```

Next, update the default value in your context file.

```
import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "../lib/useFirebaseAuth";

export const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}
```

Creating the sign-up page:
In your sign-up page, use your useAuth hook to retrieve your function for creating a user once again. createUserWithEmailAndPassword takes two parameters: email and password.

After finishing form validation, call this function. If it returns successfully with an authUser, then you can redirect the user accordingly.

Create a SignUp.tsx component:

```
import React, { useState } from "react";
import { auth } from "../lib/firebaseClient";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router.js";
import Link from "next/link.js";
import Header1 from "./Header1";
import { useAuth } from "../hooks/useAuth";

export default function SignUp() {
  //   const router = useRouter();
  //   const [firstName, setFirstName] = useState("");
  //   const [emailAddress, setEmailAddress] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState(null);

  //   // check form input elements are valid
  //   const isInvalid = firstName === "" || password === "" || emailAddress === "";

  //   const handleSignUp = (event) => {
  //     event.preventDefault();

  //     createUserWithEmailAndPassword(auth, emailAddress, password)
  //       .then(() => {
  //         updateProfile(auth.currentUser, {
  //           displayName: firstName,
  //           photoURL: Math.floor(Math.random() * 5) + 1,
  //         }).then(() => {
  //           router.push("/browse");
  //         });
  //       })
  //       .catch((error) => {
  //         setFirstName("");
  //         setEmailAddress("");
  //         setPassword("");
  //         setError(error.message);
  //       });
  //   };

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  // check form input elements are valid
  const isInvalid =
    firstName === "" ||
    passwordOne === "" ||
    passwordTwo === "" ||
    emailAddress === "";

  const { createUserWithEmailAndPassword } = useAuth();

  const handleSignUp = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(emailAddress, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
          router.push("/logged_in");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <>
      <Header1>
        <div className="flex flex-col min-h-[560px] bg-black/75 rounded-md box-border w-full max-w-[450px] pt-16 px-16 pb-10 m-auto mb-24">
          <h1 className="text-white text-3xl font-bold mb-7">Sign Up</h1>
          {/* {!error && <Form.Error>I'm an error!</Form.Error>} */}
          {error && (
            <div className="bg-[#e87c03] rounded-md text-sm my-4 mx-0 text-white p-4 px-5">
              {error}
            </div>
          )}
          <form
            className="flex flex-col max-w-[450px] w-full"
            onSubmit={handleSignUp}
            method="POST"
          >
            <input
              type="text"
              className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
              placeholder="First name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <input
              type="email"
              className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
              placeholder="PasswordOne"
              value={passwordOne}
              onChange={({ target }) => setPasswordOne(target.value)}
              autoComplete="off"
            />
            <input
              type="password"
              className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
              placeholder="PasswordTwo"
              value={passwordTwo}
              onChange={({ target }) => setPasswordTwo(target.value)}
              autoComplete="off"
            />
            <button
              className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
              disabled={isInvalid}
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <p className="text-[#737373] text-left text-md font-medium">
            Already a user?{" "}
            <Link href="/login" className="no-underline hover:underline">
              <span className="text-white cursor-pointer"> Sign in now.</span>
            </Link>
          </p>
          <p className="mt-2 text-sm text-left text-[#8c8c8c]">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </p>
        </div>
      </Header1>
    </>
  );
}

```

Next, create a signup.tsx page:

```
import React from "react";
import { Footer, SignUp } from "../components";

function signup() {
  return (
    <div>
      <SignUp />
      <Footer />
    </div>
  );
}

export default signup;

```

Adding a sign-out button:
Signing out is also very straightforward. Grab the signOut() function from useAuth() and add it to a button or a link.
Ex: In pages/loggedIn.tsx:

```
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

// import { Container, Row, Col } from "reactstrap";

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    //Your logged in page
    <div>
      <h1>I'm Logged In!</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default LoggedIn;

```

Creating a login page:
Retrieve signInWithEmailAndPassword() from useAuth() and pass in the user’s email and password. If they are correct, redirect the user, and, if not, display the correct error message.

Create a Login.tsx component:

```
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header1 from "./Header1";
import { useAuth } from "../hooks/useAuth";

function Login() {
  //   const router = useRouter();
  //   const [emailAddress, setEmailAddress] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");

  //   // check form input elements are valid
  //   const isInvalid = password === "" || emailAddress === "";

  //   const handleSignIn = (event) => {
  //     event.preventDefault();

  //     signInWithEmailAndPassword(auth, emailAddress, password)
  //       .then(() => {
  //         // push to the browse page
  //         router.push("/browse");
  //       })
  //       .catch((error) => {
  //         setEmailAddress("");
  //         setPassword("");
  //         setError(error.message);
  //       });
  //   };

  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // check form input elements are valid
  const isInvalid = password === "" || emailAddress === "";

  const { signInWithEmailAndPassword } = useAuth();

  const handleSignIn = (event) => {
    setError(null);
    signInWithEmailAndPassword(emailAddress, password)
      .then((authUser) => {
        router.push("/logged_in");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };
  return (
    <Header1>
      <div className="flex flex-col min-h-[560px] bg-black/75 rounded-md box-border w-full max-w-[450px] pt-16 px-16 pb-10 m-auto mb-24">
        <h1 className="text-white text-3xl font-bold mb-7">Sign In</h1>
        {/* {!error && <Form.Error>I'm an error!</Form.Error>} */}
        {error && (
          <div className="bg-[#e87c03] rounded-md text-sm my-4 mx-0 text-white p-4 px-5">
            {error}
          </div>
        )}
        <form
          className="flex flex-col max-w-[450px] w-full"
          onSubmit={handleSignIn}
          method="POST"
        >
          <input
            type="email"
            className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
            placeholder="Email address"
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
          />
          <input
            type="password"
            className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="off"
          />
          <button
            className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
            disabled={isInvalid}
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p className="text-[#737373] text-left text-md font-medium">
          New to Netflix?
          <Link href="/signup" className="no-underline hover:underline">
            <span className="text-white cursor-pointer"> Sign up now.</span>
          </Link>
        </p>
        <p className="mt-2 text-sm text-left text-[#8c8c8c]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </p>
      </div>
    </Header1>
  );
}

export default Login;

```

Next, create a login.tsx page:

```
import React from "react";
import { Footer, Login } from "../components";

interface Props {};

function login({}: Props) {
  return (
    <div>
      <Login />
      <Footer />
    </div>
  );
}

export default login;

```

https://stackoverflow.com/questions/71193348/firebase-storage-access-to-fetch-at-has-been-blocked-by-cors-policy-no-ac