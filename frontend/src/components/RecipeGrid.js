import RecipeCard from "./RecipeCard";


function RecipeGrid({ recipes, onDelete }) {

    if (recipes.length === 0) {

        return (
            <div className="empty">

                <h3>
                    No recipes yet 🍽️
                </h3>

                <p>
                    Add your first recipe!
                </p>

            </div>
        );

    }


    return (

        <div className="recipe-grid">

            {recipes.map((recipe) => (

                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}


export default RecipeGrid;