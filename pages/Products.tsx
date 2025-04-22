
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Calendar, Pill } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { products } from '@/data/mockData';

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const results = products.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.activeIngredient.toLowerCase().includes(query)
      );
      setFilteredProducts(results);
    }
  };

  const filterByCategory = (category: string) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground">Manage your product information and marketing materials.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" onClick={() => filterByCategory('all')}>All Products</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category} 
              onClick={() => filterByCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-pharma-primary" />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <Badge variant="secondary" className="mt-1">{product.category}</Badge>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-pharma-secondary flex items-center justify-center">
                      <Pill className="h-5 w-5 text-pharma-primary" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-3">{product.description}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Ingredient:</span>
                      <span className="font-medium">{product.activeIngredient}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dosage Form:</span>
                      <span className="font-medium">{product.dosageForm}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Strength:</span>
                      <span className="font-medium">{product.strength}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Approved: {new Date(product.approvalDate).toLocaleDateString()}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <Button variant="outline" size="sm">Details</Button>
                    <Button size="sm">Marketing Materials</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Each category tab shows same content but filtered */}
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-2 bg-pharma-primary" />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <Badge variant="secondary" className="mt-1">{product.category}</Badge>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-pharma-secondary flex items-center justify-center">
                        <Pill className="h-5 w-5 text-pharma-primary" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3">{product.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Ingredient:</span>
                        <span className="font-medium">{product.activeIngredient}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dosage Form:</span>
                        <span className="font-medium">{product.dosageForm}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Strength:</span>
                        <span className="font-medium">{product.strength}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Approved: {new Date(product.approvalDate).toLocaleDateString()}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button size="sm">Marketing Materials</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Products;
