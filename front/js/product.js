

// Récupération de la chaine de requête dans l'url
const appelIdProduit = window.location.search;

// Extraire seulement l'Id 
const url = new URLSearchParams(appelIdProduit)
const id = url.get("id")

// Affichage produit par l'id
const response = fetch(`http://localhost:3000/api/products/${id}`);

async function getProduits(){
    const listeProduits =  await fetch(`http://localhost:3000/api/products/${id}`)
    const listeProduitsMiseEnForme = await listeProduits.json()
    console.log(listeProduitsMiseEnForme)
    return listeProduitsMiseEnForme 
}

    
(async function main(){
    const canape = await getProduits()


        // Création <img> pour faire apparaitre l'image produit 
        const produitImage = document.createElement("img");
        let conteneurProduitImage = document.getElementsByClassName("item__img")[0];
    
        conteneurProduitImage.appendChild(produitImage);
        produitImage.setAttribute("src", canape.imageUrl);

        // Ajout du nom du produit dans le h1
        const conteneurProduitTitre = document.getElementById('title')
        conteneurProduitTitre.append(canape.name)

        // Ajout du prix du produit 
        const conteneurProduitPrix = document.getElementById('price')
        conteneurProduitPrix.append(canape.price)

        // Ajout de la decription du produit
        const conteneurProduitDescription = document.getElementById('description')
        conteneurProduitDescription.append(canape.description)
    
        //Ajout de la liste déroulante de couleurs 
        const conteneurProduitCouleurs = document.getElementById('colors')
        for (color of canape.colors) {
            conteneurProduitCouleurs.options[conteneurProduitCouleurs.options.length] = new Option(color, color)
        }   
        // .............................................................................................................................
        
        // Ajout infos produit choisi par l'utilisateur 
       
        
        const ajouterAuPanierBouton = document.getElementById('addToCart')
        ajouterAuPanierBouton.addEventListener('click', function(){
            let cart = localStorage.getItem('cart')
           
            if (cart != null){
                cart = JSON.parse(localStorage.getItem('cart'))
            }else{
                cart = []
            }
            
            const nombreProduit = document.getElementById('quantity').value
            const couleurProduit = document.getElementById('colors').value
            const produitPanier = {
                "id":canape._id,
                "colors":couleurProduit,
                "qty":parseInt(nombreProduit)          
            }
            if (couleurProduit == "" || nombreProduit == 0){
                return false
            }
            const produitFound = cart.find(produit => produit.id == produitPanier.id && produit.colors == produitPanier.colors );
            
            if (produitFound){
                produitFound.qty += produitPanier.qty
                
            }else{
                cart.push(produitPanier)
            }
           
            alert("Produit(s) ajouté(s) au panier !")
        
            localStorage.setItem('cart',JSON.stringify(cart))
        })
       
}
)()





