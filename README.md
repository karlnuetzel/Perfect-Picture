# Perfect Picture

## Description

Perfect Picture is a simple, fun, and addicting online multiplayer game built for mobile devices.

## How does it work?

First host a new game, invite your friends, and send out a photo. Then wait for your friends to send a photo that most closely resembles the one you sent out. The closest match wins the round and gets to choose the photo for the next round.

## How does it work (really)?

Perfect Picture's UI is built using the Ionic Framework. Combining HTML, CSS, and TypeScript, Ionic builds a mobile UI that is compatible on both Android and iOS devices.

The UI is supported by a server-side JavaScript framework running on AWS. This framework receives and processes calls from the UI and calls Google's Cloud Vision API for photo comparison. It also communicates with MongoDB, which is used to store the app's data.
