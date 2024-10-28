#! /usr/bin/env node

console.log("Populating the atelje");

const userArgs = process.argv.slice(2);

const Pattern = require("./models/pattern.ts");
const Patterntag = require("./models/patterntag.ts");
const Project = require("./models/project.ts");

const patterns = [];
const patterntags = [];
const projects = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Connecting to DB");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createTags();
  await createPatterns();
  await createProjects();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function tagCreate(index, name) {
  const tag = new Patterntag({ name: name });
  await tag.save();
  patterntags[index] = tag;
  console.log(`Added tag: ${name}`);
}
async function createTags() {
  console.log("Adding tags");
  await Promise.all([tagCreate(0, "Top"), tagCreate(1, "Bottom"), tagCreate(2, "Dress"), tagCreate(3, "Baby"), tagCreate(4, "Toddler")]);
}

async function patternCreate(index, name, maker, description, difficulty, tags) {
  const pattern = new Pattern({ name, maker, description, difficulty, tags });

  await pattern.save();
  patterns[index] = pattern;
  console.log(`Added pattern: ${name}`);
}
async function createPatterns() {
  console.log("Adding patterns");
  await Promise.all([
    patternCreate(0, "Gilbert top", "Helen's Closet", "The Gilbert Top is a button up shirt with a camp-style collar and a relaxed fit.", "Intermediate", [
      patterntags[0],
    ]),
    patternCreate(
      1,
      "Ella Dress",
      "Silversaga Patterns",
      "The Ella dress is a romantic maxi dress. The design is fitted with a plunging v-neckline and a flared full length skirt partially on the bias.",
      "Advanced",
      [patterntags[2]]
    ),
    patternCreate(
      2,
      "Pietra pants",
      "Closet Core",
      "The Pietra Pants & Shorts are the best of both worlds; a flat front, high-waisted silhouette with the comfort of an elastic waist in the back.",
      "Intermediate",
      [patterntags[1]]
    ),
    patternCreate(3, "Dawson Top", "Helen's Closet", "The Dawson Top is a basic tee", "Beginner", [patterntags[0]]),
  ]);
}

async function projectsCreate(index, pattern, description, fabric, modifications, notes, tags) {
  const project = new Project({ pattern, description, fabric, modifications, notes });

  await project.save();
  projects[index] = project;
  console.log(`Added project: ${project}`);
}
async function createProjects() {
  console.log("Adding projects");
  await Promise.all([
    projectsCreate(
      0,
      patterns[3],
      "A light pink tee with the deeper neckline, short sleeves. Only used the serger.",
      ["CO95", "EL5"],
      "None",
      "Next time, do a broad should adjustment"
    ),
    projectsCreate(
      1,
      patterns[1],
      "A flowery dress with pink elastic neckline. Fabric from fabric godmother.",
      ["CV45", "LI55"],
      "Elastic neckline",
      "Shouldn't need a zipper"
    ),
    projectsCreate(
      2,
      patterns[2],
      "Herringbone brown pants",
      ["WO100"],
      "Removed some elastics and extra fabric in the back, added zipper",
      "Add a snap to the top, also better zipper"
    ),
    projectsCreate(
      3,
      patterns[0],
      "The best shirt, retro funky 70s flowery, in a Liberty Augusta Linen",
      ["CO45", "LI55"],
      "Added 6 centimeters in bodice, did a broad shoulder adjustment",
      "Next time, do the same adjustments, but add like, 10cm to sleeves."
    ),
  ]);
}
