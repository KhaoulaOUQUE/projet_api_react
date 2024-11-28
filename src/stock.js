import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Composant React pour afficher la liste des produits
const Stock = () => {
    // Utilisation de useState pour gérer l'état des produits
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Utilisation de useEffect pour appeler l'API au démarrage
    useEffect(() => {
        // Fonction pour récupérer les produits via Axios
        const fetchProduits = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stock');
                setProduits(response.data); // Mise à jour de l'état des produits
                setLoading(false); // Arrêt de l'affichage du chargement
            } catch (err) {
                setError('Une erreur est survenue lors de la récupération des produits');
                setLoading(false);
            }
        };

        fetchProduits(); // Appeler la fonction lors du chargement du composant
    }, []); // Le tableau vide [] signifie que l'effet se produit une seule fois

    // Affichage du composant selon l'état de la requête
    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Produits en stock</h1>
            <ul>
                {produits.map((produit) => (
                    <li key={produit.id}>
                        {produit.nom} - {produit.quantite}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stock;