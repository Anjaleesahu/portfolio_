# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Contact form email setup

The Contact form submits to Web3Forms. Create/activate an access key for `anjaleesahu25@gmail.com`, then put it in the ignored local `.env` file:

```text
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

The access key is a browser-side Web3Forms token, not an SMTP password. Vite embeds `VITE_` variables in the client bundle, so restrict the key to the portfolio's domains in Web3Forms where supported, enable its spam protections, and never use a Gmail password or other private credential here. Set the same variable in the deployment provider and redeploy the site.

Restart `npm run dev` after changing `.env`, submit a test message, and check Web3Forms submission history and `anjaleesahu25@gmail.com` Inbox/Spam. The form reports success only when Web3Forms returns an HTTP-success response with `success: true`; this confirms service acceptance, not final inbox delivery.

If Web3Forms reports success but no email arrives, verify that the access key belongs to `anjaleesahu25@gmail.com` (the recipient is associated with the key, not selected by a `to_email` form field). Check Gmail Spam, Promotions, and Updates, and search for messages from `notify@web3forms.com`. Web3Forms notes that bounced addresses may be placed on a suppression list; contact [Web3Forms support](https://web3forms.com/help?contact=true) to check/remove a suppression if necessary. For a deployed site, update `VITE_WEB3FORMS_ACCESS_KEY` in the hosting provider and redeploy.
