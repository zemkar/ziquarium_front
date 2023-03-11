# Ziquarium 
### Online store project

##### Basic Features
JWT based user registration and login.

Create/Update/Delete fishes and plants for registered editors.

Publication of data only with the permission from administrator. Not approved data can see only creator or admin. 

If the item is in stock, then it can be purchased by paying through the stripe.
For some products, you can set temporary promotional discounts and/or quantity discounts.

------------

##### Technologies Used
- React.js
- Redux
- Typescript
- Axios
- Stripe
- Toastify
- Bootstrap



 [Backend using Django, DRF](https://github.com/zemkar/ziquarium)
 
### Quick Start
 Clone this repository to your local machine.
###### if you use Docker:
- from the project folder cloned from github
- in terminal run `docker build . -t ziquarium-react` for creating image
- after that run `docker run -p 3000:80 -d ziquarium-react` for launching and [go check how it work](http://localhost:3000)


###### without Docker:
- make sure you have it installed node.js
- from the project folder cloned from github
in terminal run `npm start`
- after launch, node.js will open the project page in the browser

### ToDo list:

- make a calculator to calculate the bioburden of selected fish in an aquarium
- open access to discussions and add descriptions to items
- add aquarium equipment to the database with modifiers for the calculator
- add the possibility of exchanging goods between users



