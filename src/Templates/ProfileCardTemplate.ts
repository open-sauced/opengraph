import { readFile } from "fs/promises"

export default async function ProfileCardTemplate (name: string) {
  
  const file = await readFile("public/templates/UserProfile.html");

  let string = file.toString('utf-8');
  string = string.replace("{{name}}", name);

  return string;

}
