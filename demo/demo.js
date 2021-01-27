import * as Eta from "https://deno.land/x/eta@v1.12.1/mod.ts"
import MyEtaPlugin from "../plugin.js"

// RUN
// deno run --unstable --allow-read demo.js


// Eta templates
Eta.configure({ 
  async: true,
  views: Deno.cwd(),
  plugins: [MyEtaPlugin],
})

console.time("Time to render")

const html = await Eta.renderFile("page.eta");

console.log(html)

console.timeEnd("Time to render")

