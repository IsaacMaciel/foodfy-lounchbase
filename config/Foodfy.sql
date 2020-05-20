DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP DATABASE if  EXISTS foodfy;
CREATE DATABASE  foodfy;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "is_admin" BOOLEAN NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()), 
  "reset_token" text,
  "reset_token_expires" text
);

CREATE TABLE "chefs" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()) 

);
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
  "user_id" integer,
  "chef_id" integer,
  "title" text NOT NULL,
  "ingredients" text [] NOT NULL,
  "preparation" text [] NOT NULL,
  "information" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);



ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");


-- create delete cascade
ALTER TABLE "recipes" DROP CONSTRAINT IF EXISTS recipes_user_id_fkey,
ADD CONSTRAINT recipes_user_id_fkey
FOREIGN KEY ("user_id") REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER TABLE "recipe_files" DROP CONSTRAINT IF EXISTS recipe_files_recipe_id_fkey,
ADD CONSTRAINT recipe_files_recipe_id_fkey 
FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") 
ON DELETE CASCADE;

ALTER TABLE "chefs" DROP CONSTRAINT IF EXISTS chefs_file_id_file_id_fkey,
ADD CONSTRAINT chefs_file_id_file_id_fkey
FOREIGN KEY ("file_id") REFERENCES "files" ("id") 
ON DELETE CASCADE;




-- procedures
DROP TRIGGER IF EXISTS set_timestamp ON recipes;
DROP TRIGGER IF EXISTS set_timestamp ON chefs;
DROP TRIGGER IF EXISTS set_timestamp ON users;
DROP FUNCTION IF EXISTS trigger_set_timestamp;


-- PROCEDURE
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END
$function$

-- UPDATE timestamp recipes
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- UPDATE timestamp chefs
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- UPDATE timestamp users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- connect pg simple table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

