<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $category = Category::create([
            'name' => 'Classic Pickles',
            'slug' => 'classic-pickles',
            'image' => 'http://localhost:8000/images/category_classic_pickles_1782401693473.png'
        ]);

        Product::create([
            'title' => 'Mango Pickle',
            'slug' => 'mango-pickle',
            'description' => 'A traditional and tangy mango pickle made with premium spices.',
            'price' => 199.00,
            'rating' => 4.5,
            'category_id' => $category->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_mango_pickle_1782401708242.png',
            'ingredients' => json_encode(['Mango', 'Salt', 'Mustard Oil', 'Spices']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '100'], ['label' => 'Fat', 'value' => '5g']]),
        ]);

        Product::create([
            'title' => 'Lemon Pickle',
            'slug' => 'lemon-pickle',
            'description' => 'Zesty and flavorful lemon pickle.',
            'price' => 149.00,
            'rating' => 4.8,
            'category_id' => $category->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_lemon_pickle_1782401719928.png',
            'ingredients' => json_encode(['Lemon', 'Salt', 'Mustard Oil', 'Spices']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '80'], ['label' => 'Fat', 'value' => '3g']]),
        ]);

        Product::create([
            'title' => 'Garlic Pickle',
            'slug' => 'garlic-pickle',
            'description' => 'Spicy and aromatic garlic pickle.',
            'price' => 249.00,
            'rating' => 4.2,
            'category_id' => $category->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_garlic_pickle_1782401732404.png',
            'ingredients' => json_encode(['Garlic', 'Salt', 'Mustard Oil', 'Chili']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '120'], ['label' => 'Fat', 'value' => '8g']]),
        ]);
        $spicyCategory = Category::create([
            'name' => 'Spicy Pickles',
            'slug' => 'spicy-pickles',
            'image' => 'http://localhost:8000/images/category_spicy_pickles_1782402043611.png'
        ]);

        Product::create([
            'title' => 'Red Chili Pickle',
            'slug' => 'red-chili-pickle',
            'description' => 'Fiery red chili pickle for spice lovers.',
            'price' => 199.00,
            'rating' => 4.6,
            'category_id' => $spicyCategory->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_red_chili_1782402065937.png',
            'ingredients' => json_encode(['Red Chili', 'Salt', 'Spices', 'Oil']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '90'], ['label' => 'Fat', 'value' => '6g']]),
        ]);

        Product::create([
            'title' => 'Spicy Mixed Pickle',
            'slug' => 'spicy-mixed-pickle',
            'description' => 'A perfect blend of assorted vegetables in fiery spices.',
            'price' => 179.00,
            'rating' => 4.4,
            'category_id' => $spicyCategory->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_spicy_mixed_1782402078952.png',
            'ingredients' => json_encode(['Mixed Veg', 'Salt', 'Spices', 'Oil']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '85'], ['label' => 'Fat', 'value' => '5g']]),
        ]);

        Product::create([
            'title' => 'Green Chili Pickle',
            'slug' => 'green-chili-pickle',
            'description' => 'Tangy and hot green chili pickle.',
            'price' => 159.00,
            'rating' => 4.7,
            'category_id' => $spicyCategory->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_green_chili_1782402090872.png',
            'ingredients' => json_encode(['Green Chili', 'Salt', 'Mustard', 'Lemon']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '70'], ['label' => 'Fat', 'value' => '4g']]),
        ]);

        Product::create([
            'title' => 'Extra Spicy Garlic',
            'slug' => 'extra-spicy-garlic',
            'description' => 'For those who love extreme heat and garlic flavors.',
            'price' => 259.00,
            'rating' => 4.9,
            'category_id' => $spicyCategory->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_extra_spicy_garlic_1782402105965.png',
            'ingredients' => json_encode(['Garlic', 'Extra Chili', 'Salt', 'Oil']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '130'], ['label' => 'Fat', 'value' => '10g']]),
        ]);

        $sweetCategory = Category::create([
            'name' => 'Sweet Pickles',
            'slug' => 'sweet-pickles',
            'image' => 'http://localhost:8000/images/category_sweet_pickles_1782402054036.png'
        ]);

        Product::create([
            'title' => 'Sweet Mango Pickle',
            'slug' => 'sweet-mango-pickle',
            'description' => 'A sweet and tangy variation of the classic mango pickle.',
            'price' => 189.00,
            'rating' => 4.3,
            'category_id' => $sweetCategory->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_sweet_mango_1782402121261.png',
            'ingredients' => json_encode(['Mango', 'Jaggery', 'Salt', 'Spices']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '150'], ['label' => 'Fat', 'value' => '2g']]),
        ]);

        Product::create([
            'title' => 'Sweet Lemon Pickle',
            'slug' => 'sweet-lemon-pickle',
            'description' => 'A beautifully balanced sweet lemon pickle.',
            'price' => 169.00,
            'rating' => 4.8,
            'category_id' => $sweetCategory->id,
            'featured' => true,
            'image' => 'http://localhost:8000/images/product_sweet_lemon_1782402134188.png',
            'ingredients' => json_encode(['Lemon', 'Sugar', 'Salt', 'Spices']),
            'nutrition' => json_encode([['label' => 'Calories', 'value' => '140'], ['label' => 'Fat', 'value' => '1g']]),
        ]);
    }
}
