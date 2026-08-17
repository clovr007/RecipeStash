import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";

import NavBar from "../components/NavBar";

import RecipeGrid from "../components/RecipeGrid";

import AddRecipeModal from "../components/AddRecipeModal";


function Home() {

    const [recipes, setRecipes] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);


    // GET ALL RECIPES
    const fetchRecipes = async () => {

        try {

            const response = await api.get("recipes/");

            console.log(
                "RECIPES FROM DJANGO:",
                response.data
            );

            setRecipes(response.data);

        } catch (error) {

            console.log(
                "ERROR FETCHING RECIPES:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // FETCH RECIPES WHEN PAGE OPENS
    useEffect(() => {

        fetchRecipes();

    }, []);


    // ADD NEW RECIPE TO THE SCREEN
    const handleRecipeAdded = (newRecipe) => {

        console.log(
            "NEW RECIPE:",
            newRecipe
        );

        setRecipes((previousRecipes) => [

            ...previousRecipes,

            newRecipe

        ]);

        setShowModal(false);

    };


    // DELETE RECIPE
    const handleDelete = async (id) => {

        try {

            await api.delete(
                `recipes/${id}/`
            );


            setRecipes((previousRecipes) =>

                previousRecipes.filter(
                    (recipe) =>
                        recipe.id !== id
                )

            );

        } catch (error) {

            console.log(
                "ERROR DELETING RECIPE:",
                error
            );

        }

    };


    return (

        <div className="home">

            <NavBar />


            <main>

                <div className="recipe-header">

                    <div>

                        <h2>
                            My Recipes
                        </h2>

                        <p>
                            Your saved recipes
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            setShowModal(true)
                        }
                    >
                        + Add Recipe
                    </button>

                </div>


                {loading ? (

                    <div className="empty">

                        <h3>
                            Loading recipes...
                        </h3>

                    </div>

                ) : (

                    <RecipeGrid
                        recipes={recipes}
                        onDelete={handleDelete}
                    />

                )}


                {showModal && (

                    <AddRecipeModal

                        onClose={() =>
                            setShowModal(false)
                        }

                        onRecipeAdded={
                            handleRecipeAdded
                        }

                    />

                )}

            </main>

        </div>

    );

}


export default Home;