# msgshare

pastebin but for your text messages

_url:_ [msgshare.com](msgshare.com)

## Flow

1. User enters there text messages in a text box
1. Frontend parses and formats it
1. Saves the raw content into Supabase and generates a unique URL
1. Whenever user opens the url, it'll display the rendered text message

## Stack

Minimalistic stack with just a frontend and db

- Frontend: Vue
- DB: [Supabase](supabase.com)
