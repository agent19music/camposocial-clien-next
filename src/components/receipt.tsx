"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Download, Store } from "lucide-react";
import html2canvas from "html2canvas";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/authcontext";
import { toast } from "react-hot-toast";

const Stamp = () => (
  <div className="absolute top-8 right-8 rotate-12 select-none">
    <div className="relative">
      <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-sm"></div>
      <svg width="120" height="120" viewBox="0 0 120 120" className="text-green-600">
        <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M60 20 A40 40 0 0 1 60 100 A40 40 0 0 1 60 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="60"
          y="45"
          fontFamily=""
          fontSize="14"
          fill="currentColor"
          textAnchor="middle"
          className="uppercase tracking-widest font-bold"
        >
          Paid
        </text>
        <text
          x="60"
          y="65"
          fontFamily="Monaco"
          fontSize="10"
          fill="currentColor"
          textAnchor="middle"
          className="uppercase tracking-wider"
        >
          {format(new Date(), "dd MMM yyyy")}
        </text>
      </svg>
    </div>
  </div>
);

const DottedPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)",
        backgroundSize: "4px 4px",
      }}
    ></div>
  </div>
);

interface CartItem {
  product_title: string;
  quantity: number;
  price_per_item: number;
  total_item_price: number;
  images: string[];
  id: string;
}

type CurrentUser = {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
} | null

interface CartResponse {
  cart_items: CartItem[];
}

export default function Receipt() {
  const orderNumber = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  const orderDate = format(new Date(), "dd MMM yyyy");
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const handleDownload = async () => {
    const receipt = document.getElementById("receipt");
    if (receipt) {
      const canvas = await html2canvas(receipt, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `receipt-${orderNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const getCartItems = async (userId: string): Promise<CartItem[]> => {
    try {
      const response = await fetch(`${apiEndpoint}/cart/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data: CartResponse = await response.json();
      return data.cart_items;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cart items");
      return [];
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      const fetchCartItems = async () => {
        setLoading(true);
        const items = await getCartItems(currentUser.id);
        setCartItems(items);
        setLoading(false);
      };
      fetchCartItems();
    }
  }, [currentUser]);

  const total = cartItems.reduce((sum, item) => sum + item.total_item_price, 0);

  if (loading) {
    return <div>Loading receipt...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Card id="receipt" className="w-full max-w-md bg-[#fffcf8] relative overflow-hidden font-mono text-sm shadow-xl">
        <DottedPattern />
        <div className="relative">
          <Stamp />
          <CardHeader className="text-center border-b border-dashed pt-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Store className="w-6 h-6" />
              <h2 className="text-2xl font-bold tracking-tight">VINTAGE STORE</h2>
            </div>
            <p className="text-gray-500 text-sm">123 Retro Street, Fashion District</p>
          </CardHeader>
          <CardContent className="space-y-4 mt-6 px-8">
            <div className="flex justify-between text-sm">
              <span>Order Number:</span>
              <span className="font-bold font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Date:</span>
              <span className="font-mono">{orderDate}</span>
            </div>
            <Separator className="my-4 border-dashed" />
            <div className="space-y-2">
              <h3 className="font-bold">Customer Details:</h3>
              <div className="text-sm">
                Name: {currentUser?.first_name} {currentUser?.last_name}
              </div>
              <div className="text-sm">Email: {currentUser?.email}</div>
            </div>
            <Separator className="my-4 border-dashed" />
            <div className="space-y-3">
              <h3 className="font-bold">Order Items:</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product_title} × {item.quantity}
                  </span>
                  <span className="font-mono">${item.total_item_price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4 border-dashed" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center text-center text-gray-500 mt-4 pb-8">
            <p className="text-sm">Keep this receipt for your records.</p>
            <p className="text-xs mt-1">Thank you for shopping with us! 🛍️</p>
          </CardFooter>
        </div>
        <div className="h-4 bg-gray-100 relative">
          <div className="absolute bottom-full left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#e5e7eb_8px,#e5e7eb_16px)]"></div>
        </div>
      </Card>
      <Button onClick={handleDownload} className="mt-6 gap-2" variant="outline">
        <Download className="w-4 h-4" />
        Download Receipt
      </Button>
    </div>
  );
}
