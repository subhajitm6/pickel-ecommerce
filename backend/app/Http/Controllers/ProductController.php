<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    public function show($id)
    {
        $product = Product::with('category')->where('id', $id)->orWhere('slug', $id)->first();
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function featured()
    {
        return response()->json(Product::with('category')->where('featured', true)->get());
    }

    public function search(Request $request)
    {
        $query = $request->query('q');
        
        if (!$query) {
            return response()->json([]);
        }

        $products = Product::with('category')
            ->where('title', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->get();

        return response()->json($products);
    }
}
