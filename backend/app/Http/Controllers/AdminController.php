<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Dashboard Stats
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'total_products' => Product::count(),
            'total_revenue' => Order::sum('total'),
        ]);
    }

    // Products Management
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:products',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            // add other validation rules as needed
        ]);

        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    public function destroyProduct($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    // Categories Management
    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories',
        ]);
        
        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }

    public function destroyCategory($id)
    {
        Category::findOrFail($id)->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    // Orders Management
    public function getAllOrders()
    {
        return response()->json(Order::with('user', 'items')->get());
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'order_status' => 'required|string',
        ]);

        $order = Order::findOrFail($id);
        $order->order_status = $request->order_status;
        $order->save();

        return response()->json($order);
    }

    // Users Management
    public function getAllUsers()
    {
        return response()->json(User::all());
    }
}
