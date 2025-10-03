# proto-calebhasch-listapp summary

This app uses vite, vue, and supabase to creat a list of games owned by the user. Only the user can delete, add, and retrieve their own games.

# How to run locally

download project files
run "npm install"
create env.local file and VITE Variables
run "npm run dev"

# Example env variables

See in env.example

# Schema sketch

Game list table - id, user_id, game

# RLS approach

alter policy "Enable delete, select, update, and insert for users based on us"
on "public"."Game List"
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((user_id = auth.udi()));

# next steps

Add more tables, refine css, (optional) add a game library api that will provide images

# Sources cited

https://vite.dev/guide/
https://vuejs.org/guide/quick-start.html
https://supabase.com/docs/reference/javascript
https://storiesfromtheherd.com/basics-of-vue-3-js-713760d46bb1
https://chatgpt.com/
