import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../api/axios";

import EditRecipeModal from "../components/EditRecipeModal";


function RecipeDetail() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [recipe, setRecipe] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showEditModal, setShowEditModal] =
        useState(false);


    // GET SINGLE RECIPE
    useEffect(() => {

        const fetchRecipe = async () => {

            try {

                const response = await api.get(
                    `recipes/${id}/`
                );

                console.log(
                    "RECIPE DETAILS:",
                    response.data
                );

                setRecipe(response.data);

            } catch (error) {

                console.log(
                    "ERROR FETCHING RECIPE:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchRecipe();

    }, [id]);


    // DELETE RECIPE
    const handleDelete = async () => {

        try {

            await api.delete(
                `recipes/${id}/`
            );

            navigate("/");

        } catch (error) {

            console.log(
                "ERROR DELETING RECIPE:",
                error
            );

        }

    };


    // UPDATE RECIPE ON SCREEN
    const handleRecipeUpdated = (updatedRecipe) => {

        setRecipe(updatedRecipe);

    };


    // LOADING
    if (loading) {

        return (

            <div className="recipe-detail">

                <p>
                    Loading recipe...
                </p>

            </div>

        );

    }


    // RECIPE NOT FOUND
    if (!recipe) {

        return (

            <div className="recipe-detail">

                <h2>
                    Recipe not found
                </h2>


                <Link to="/">
                    ← Back to recipes
                </Link>

            </div>

        );

    }


    // RECIPE PAGE
    return (

        <>

            <div className="recipe-detail">

                {/* BACK BUTTON */}

                <Link to="/">
                    ← Back to recipes
                </Link>


                {/* RECIPE TITLE */}

                <h1>
                    {recipe.title}
                </h1>


                {/* INGREDIENTS */}

                <section>

                    <h2>
                        Ingredients
                    </h2>


                    <p className="ingredients-text">

                        {recipe.ingredients_list}

                    </p>

                </section>


                {/* ACTION BUTTONS */}

                <div className="recipe-actions">


                    {/* ORIGINAL RECIPE */}

                    <a
                        href={recipe.source_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open Original Recipe
                    </a>


                    {/* EDIT */}

                    <button
                        onClick={() =>
                            setShowEditModal(true)
                        }
                    >
                        Edit Recipe
                    </button>


                    {/* DELETE */}

                    <button
                        onClick={handleDelete}
                    >
                        Delete Recipe
                    </button>


                </div>

            </div>


            {/* EDIT MODAL */}

            {showEditModal && (

                <EditRecipeModal

                    recipe={recipe}

                    onClose={() =>
                        setShowEditModal(false)
                    }

                    onRecipeUpdated={
                        handleRecipeUpdated
                    }

                />

            )}

        </>

    );

}


export default RecipeDetail;