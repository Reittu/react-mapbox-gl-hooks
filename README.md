# Mapbox GL React Example (hooks)

The Mapbox GL React example rewritten with hooks and updated to use the latest styling as of March 2020.

# Setup

```
npm install
```

In the root folder create a `.env.local` file that has a key `REACT_APP_MAPBOX_TOKEN` with a value of your access token. If you do not have a token yet, you can create one for free at [mapbox.com](https://account.mapbox.com).

The `.env.local` should look like this:
```
REACT_APP_MAPBOX_TOKEN=pk.part1.part2
```

After the `.env.local` file is correctly created in the root folder (where the package.json and this file is located), simply run:

```
npm start
```