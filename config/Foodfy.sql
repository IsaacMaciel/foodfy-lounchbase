CREATE TABLE "Files" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL
);

CREATE TABLE "Recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" integer,
  "file_id" integer
);

CREATE TABLE "Recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" integer,
  "image" text NOT NULL,
  "title" text NOT NULL,
  "ingredients" text NOT NULL,
  "preparation" text NOT NULL,
  "information" text NOT NULL,
  "created_at" datetime NOT NULL
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "avatar_url" text NOT NULL,
  "created_at" [datetime]
);

ALTER TABLE "Recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "Files" ("id");

ALTER TABLE "Recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "Recipes" ("id");

ALTER TABLE "Recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");
