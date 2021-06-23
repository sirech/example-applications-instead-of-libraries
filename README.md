# Applications Instead of Libraries

This is an example of two applications being distributed together through [Module Federation](https://webpack.js.org/concepts/module-federation/).

Credit to [module-federation-examples](https://github.com/module-federation/module-federation-examples/tree/master/shared-context) for the initial code.

# Running Demo

Run:

```
yarn
yarn bootstrap
yarn start
```

This will build and serve both `host` and `remote` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
