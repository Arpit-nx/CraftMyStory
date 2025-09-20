import React from 'react';
import { Eye, Heart, Play, Sparkles } from 'lucide-react';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent mb-4">
  Featured Artwork
</h2>

        <p className="text-gray-600 max-w-2xl font-bold mx-auto">
          Discover amazing artwork from our community of talented artists, including AI-generated content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => onProductClick(product)}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.aiGenerated && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                  
                </div>
              )}
              {product.videoReel && (
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-full">
                  <Play className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </div>
                <div className="flex items-center space-x-4 text-gray-500">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">{product.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="text-sm">{product.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}