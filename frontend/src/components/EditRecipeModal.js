import { useState } from "react";

import api from "../api/axios";


function EditRecipeModal({
    recipe,
    onClose,
    onRecipeUpdated
}) {

    const [form, setForm] = useState({

        title: recipe.title,

        source_url: recipe.source_url,

        ingredients_list:
            recipe.ingredients_list

    });


    const [error, setError] = useState("");


    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            const response = await api.put(

                `recipes/${recipe.id}/`,

                form

            );


            onRecipeUpdated(
                response.data
            );


            onClose();


        } catch (error) {

            console.log(error);

            console.log(
                error.response?.data
            );

            setError(
                "Could not update recipe."
            );

        }

    };


    return (

        <div className="modal-overlay">

            <div className="modal">

                <button
                    className="close-button"
                    onClick={onClose}
                >
                    ✕
                </button>


                <h2>
                    Edit Recipe
                </h2>


                <form onSubmit={handleSubmit}>

                    <label>
                        Recipe Title
                    </label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Recipe URL
                    </label>

                    <input
                        name="source_url"
                        value={form.source_url}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Ingredients
                    </label>

                    <textarea
                        name="ingredients_list"
                        value={
                            form.ingredients_list
                        }
                        onChange={handleChange}
                        rows="7"
                        required
                    />


                    {error && (

                        <p className="error">
                            {error}
                        </p>

                    )}


                    <button type="submit">
                        Save Changes
                    </button>

                </form>

            </div>

        </div>

    );

}


export default EditRecipeModal;