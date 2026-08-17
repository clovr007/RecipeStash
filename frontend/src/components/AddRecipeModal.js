import { useState } from "react";

import api from "../api/axios";


function AddRecipeModal({ onClose, onRecipeAdded }) {

    const [recipe, setRecipe] = useState({
        title: "",
        source_url: "",
        ingredients_list: ""
    });


    const [error, setError] = useState("");


    const handleChange = (e) => {

        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            const response = await api.post(
                "recipes/",
                recipe
            );


            onRecipeAdded(response.data);

            onClose();


        } catch (error) {

            console.log(error);

            setError(
                "Could not add recipe."
            );

        }

    };


    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    Add Recipe
                </h2>


                <button
                    className="close-button"
                    onClick={onClose}
                >
                    ✕
                </button>


                <form onSubmit={handleSubmit}>

                    <label>
                        Recipe Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={recipe.title}
                        onChange={handleChange}
                        placeholder="Eg. Chocolate Cake"
                        required
                    />


                    <label>
                        Recipe URL
                    </label>

                    <input
                        type="url"
                        name="source_url"
                        value={recipe.source_url}
                        onChange={handleChange}
                        placeholder="https://..."
                        required
                    />


                    <label>
                        Ingredients
                    </label>

                    <textarea
                        name="ingredients_list"
                        value={recipe.ingredients_list}
                        onChange={handleChange}
                        placeholder="2 eggs&#10;1 cup flour&#10;1 cup sugar"
                        rows="6"
                        required
                    />


                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}


                    <button type="submit">
                        Add Recipe
                    </button>

                </form>

            </div>

        </div>

    );

}


export default AddRecipeModal;