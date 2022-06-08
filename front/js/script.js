//Appel de l'API

async function getListeProduits(){
    const listeProduits =  await fetch("http://localhost:3000/api/products")
    const listeProduitsMiseEnForme = await listeProduits.json()
    return listeProduitsMiseEnForme 
}
(async function main(){
    const listeCanapes = await getListeProduits()
    console.log(listeCanapes)

    for (canape of listeCanapes){
        console.log(canape)


        // Création <a> pour faire apparaitre les fiches produits 
        const produit = document.createElement("a");
        let conteneurProduit = document.getElementById("items");

        conteneurProduit.appendChild(produit);
        produit.setAttribute("href", "./product.html?id="+canape._id );

        // Création article, enfant du a 
        const articleProduit = document.createElement("article");
        produit.appendChild(articleProduit);

        // Création img enfant article 
        const imgProduit = document.createElement("img");
        articleProduit.appendChild(imgProduit);
        imgProduit.setAttribute("src",canape.imageUrl)
        imgProduit.setAttribute("alt",canape.altTxt)


        // Création h3 enfant article avec nom du produit 
        const nomProduit = document.createElement("h3");
        articleProduit.appendChild(nomProduit);
        nomProduit.setAttribute("class","productName");
        nomProduit.textContent=canape.name

        //Création p enfant article avec description du produit 
        const descriptionProduit = document.createElement("p");
        articleProduit.appendChild(descriptionProduit);
        descriptionProduit.setAttribute("class","productDescription")
        descriptionProduit.textContent=canape.description
    }
}
)()

