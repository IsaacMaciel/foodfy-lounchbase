CREATE TABLE "files" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "recipe_id" integer,
  "file_id" integer
);

CREATE TABLE "recipes" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "chef_id" integer,
  "title" text NOT NULL,
  "ingredients" text [] NOT NULL,
  "preparation" text [] NOT NULL,
  "information" text NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "chefs" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" int,
  "created_at" timestamp NOT NULL
);

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");