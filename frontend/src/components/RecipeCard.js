import { Link } from "react-router-dom";


function RecipeCard({ recipe, onDelete }) {

    return (

        <div className="recipe-card">

            <div>

                <h3>
                    {recipe.title}
                </h3>


                <div className="ingredients">

                    <h4>
                        Ingredients
                    </h4>

                    <p>
                        {recipe.ingredients_list}
                    </p>

                </div>

            </div>


            <div className="card-actions">

                <Link to={`/recipe/${recipe.id}`}>
                    View Recipe
                </Link>


                <button
                    onClick={() =>
                        onDelete(recipe.id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>

    );

}


export default RecipeCard;