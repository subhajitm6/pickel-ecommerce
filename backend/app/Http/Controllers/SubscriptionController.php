<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'plan' => 'required|string',
        ]);

        $validatedData['user_id'] = auth('sanctum')->check() ? auth('sanctum')->id() : null;

        $subscription = \App\Models\Subscription::create($validatedData);

        return response()->json([
            'message' => 'Subscription created successfully!',
            'subscription' => $subscription
        ], 201);
    }
}
