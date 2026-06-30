<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'shipping_address' => 'required|array',
            'shipping_address.full_name' => 'required|string',
            'shipping_address.phone' => 'required|string',
            'shipping_address.address' => 'required|string',
            'shipping_address.city' => 'required|string',
            'shipping_address.state' => 'required|string',
            'shipping_address.postal_code' => 'required|string',
        ]);

        $user = $request->user();
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        try {
            DB::beginTransaction();

            $subtotal = 0;
            foreach ($cartItems as $item) {
                $price = $item->product->discount_price ?? $item->product->price;
                $subtotal += $price * $item->quantity;
            }

            $shipping = 0; // Or calculate based on distance/weight
            $tax = 0; // Calculate tax if needed
            $discount = 0;
            $total = $subtotal + $shipping + $tax - $discount;

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => strtoupper(Str::random(10)),
                'subtotal' => $subtotal,
                'shipping' => $shipping,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'order_status' => 'placed',
            ]);

            foreach ($cartItems as $item) {
                $price = $item->product->discount_price ?? $item->product->price;
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $price,
                ]);
            }

            // Save Address (Optional depending on how you relate it, assuming address is associated with user for now)
            $user->addresses()->create($request->shipping_address);

            // Clear Cart
            Cart::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order->load('items.product')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Checkout failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function myOrders(Request $request)
    {
        $orders = Order::with('items.product')->where('user_id', $request->user()->id)->get();
        return response()->json($orders);
    }

    public function show(Request $request, $id)
    {
        $order = Order::with('items.product')->where('user_id', $request->user()->id)->findOrFail($id);
        return response()->json($order);
    }

    public function track(Request $request, $id)
    {
        $order = Order::where('user_id', $request->user()->id)->findOrFail($id);
        return response()->json(['order_status' => $order->order_status]);
    }
}
