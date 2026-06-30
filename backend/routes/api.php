<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\SubscriptionController;
Route::post('/subscribe', [SubscriptionController::class, 'store']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/featured-products', [ProductController::class, 'featured']);
Route::get('/search', [ProductController::class, 'search']);

Route::get('/categories', [CategoryController::class, 'index']);

use App\Http\Controllers\CartController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/my-orders', [OrderController::class, 'myOrders']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::get('/track-order/{id}', [OrderController::class, 'track']);

    // Admin Routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/stats', [App\Http\Controllers\AdminController::class, 'stats']);
        
        Route::post('/products', [App\Http\Controllers\AdminController::class, 'storeProduct']);
        Route::put('/products/{id}', [App\Http\Controllers\AdminController::class, 'updateProduct']);
        Route::delete('/products/{id}', [App\Http\Controllers\AdminController::class, 'destroyProduct']);
        
        Route::post('/categories', [App\Http\Controllers\AdminController::class, 'storeCategory']);
        Route::put('/categories/{id}', [App\Http\Controllers\AdminController::class, 'updateCategory']);
        Route::delete('/categories/{id}', [App\Http\Controllers\AdminController::class, 'destroyCategory']);
        
        Route::get('/orders', [App\Http\Controllers\AdminController::class, 'getAllOrders']);
        Route::put('/orders/{id}/status', [App\Http\Controllers\AdminController::class, 'updateOrderStatus']);
        
        Route::get('/users', [App\Http\Controllers\AdminController::class, 'getAllUsers']);
    });
});
