![Taste Trail logo](https://github.com/marcoboschetti/taste_trail/blob/master/doc/logo.png?raw=true)

## Inspiration
I personally find it difficult deciding what to cook every day, specially considering what I already have available.
The inspiration for this app comes from a desire to empower and simplify the cooking experience for individuals with varying levels of culinary expertise and limited time to plan meals. 

## What it does

Taste Trail harnesses the power of AI to generate recipes and retrieve them based on the user's input. 
By seamlessly combining a vast database of recipes and some of the most recent image generation capabilities, the app aims to provide users with a seamless and delightful cooking journey, fostering creativity in the kitchen and encouraging users to explore new flavors and culinary possibilities. 
With the AI-generated recipes and mouth-watering images, cooking becomes an enjoyable and accessible experience for all, promoting a healthier and more adventurous approach to home-cooked meals.

## How I built it

![Architecture Diagram](https://github.com/marcoboschetti/taste_trail/blob/master/doc/architecture.jpg?raw=true)


The overall solution leverages TiDB Serverless database to store, retrieve and process hundreds of recipes generated previously by GPT-3 and Stable Diffusion models.

### TiDB Fully-managed Database
For the current use cases, Taste Trail stores a single table containing "recipes". For every record, this includes:
* Recipe Name
* Ingredients
* Instructions
* Cooking Time
* Difficulty Level
* Budget
* Cuisine Type
* Dietary Restrictions
* Preparation Time
* Serving Size
* Tags/Keywords

### TiDB Data Service
To process and make the required data available, the TiDB Data Service implements and exposes a RESTful API with endpoints to:

* GET Ingredients Count
* GET Ingredients by Query
* GET Recipe by ID
* GET Recipe at random
* GET Recipes by filters
* GET Recipes by partial ingredients
* GET Ingredients List
* GET Recipes by ingredients

Because I was really rusty with the MySQL-like syntax, most of the queries were developed with the assistance of TiDB's Chat2Query feature. In most cases minor tweaks were required to match the exact requirements.

### Vercel serverless functions
For every endpoint in the TiDB Data Service, there is a serverless function in Vercel developed in Golang. The function handles basic parameters parsing to prepare the HTTP incoming parameters into the arguments required by TiDB Data Service endpoints.

Additionally, Vercel handles the TiDB connection strings and access tokens, preventing the HTTP client from connecting to the DB directly. This is done not only to avoid Cross-Origin Resource Sharing, but also to eventually add additional access control policies.

### Content Generation
All recipes as well as all the images in Taste Trail were generated by AI.

The recipes were created by ChatGPT using GPT-3. After fine-tuning the prompt, ChatGPT was able to consistently generate a CSV with recipes matching the specified format and content.

All images were generated by Stable Diffusion. Stable Diffusion is a text-to-image latent diffusion model created by the researchers and engineers from CompVis, Stability AI and LAION. 
A short Python script was developed in Google Colab (using Google's free resources) to iterate over the recipe's names. For every recipe, a dozen images were generated following a very specific prompt to achieve visual consistency.

## Challenges we ran into
The main challenge was to define and iterate the tool set to achieve this result. Finding the right combination of libraries, languages and providers during the setup and scoping of the project modeled an interesting final workflow.

## Accomplishments that we're proud of
Even though the setup was super easy, I'm really proud of being able to scaffold and run Taste Trail using 100% serverless functions on free infrastructure. 

The available quotas in both TiDB and Vercel enabled me to easily create, deploy and share a fast-loading application.

## What's next for Taste Trail
I'm really looking forward to trying the POST endpoints in TiDB's Data Service. This was out of scope since some additional authentication and authorization is required to avoid abuse from the users.

Once we have user's profile integrated in Taste Trail, some key features can be implemented such as:
* Recipe rates and likes
* Custom recipe submission, voting and crowdsourced review process
* Recommendations based on preferences

Additionally, some more ambitious features could include real-time GTP-3 integration to generate a recipe in runtime if there is no match for the requested ingredients.
