import React, { useEffect, useState } from 'react';
import authApi from "../apiClient.ts";
import AddItemForm from './AddItemForm';
import { useAuth0 } from "@auth0/auth0-react";



interface item {
  name: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<item[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const fetchItems = async () => {
    try {
      const response = await authApi.get('/items', getAccessTokenSilently);
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching Items", error);
    }
  };

  const addItem = async (itemName: string) => {
    try {
      await authApi.post('/items', { name: itemName }, getAccessTokenSilently);
      fetchItems(); 
    } catch (error) {
      console.error("Error adding Item", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <AddItemForm addItem={addItem} />
    </div>
  );
};

export default ItemList;