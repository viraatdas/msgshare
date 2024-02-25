# msgshare

[![Netlify Status](https://api.netlify.com/api/v1/badges/17a21ba3-2c88-44cf-93d9-b3e61f5d8b04/deploy-status)](https://app.netlify.com/sites/msgshare/deploys)

pastebin but for your text messages

_url:_ [msgshare.com](https://msgshare.com/)

![Demo of website](assets/demo.gif)

## Flow

1. User enters there text messages in a text box
1. Frontend parses and formats it
1. Saves the raw content into Supabase and generates a unique URL
1. Whenever user opens the url, it'll display the rendered text message

## Stack

Minimalistic stack with just a frontend and db

- Frontend: Vue
- DB: [Supabase](supabase.com)
