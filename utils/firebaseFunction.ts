import { collection, doc, getDocs, orderBy, query, setDoc, where } from "@firebase/firestore"
import { ProductInterface } from "utils/Interfaces";

import { db } from "../firebase";

export const saveItem = async (data: ProductInterface) => {
  await setDoc(doc(db, 'houseplant',`${Date.now()}`),data,{merge:true})
}

export const getAllItems = async () => {
  const items = await getDocs(query(collection(db, 'houseplant'), orderBy('id', 'desc')));
  console.log("Item: ",{...items.docs})
  return items.docs.map((d) => d.data());
};

export const queryItems = async (type: string, details: string | undefined) => {
  const itemRef = collection(db, "houseplant");

    const q = query(itemRef, where(type, "==", details));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((d) => d.data());
};

export const getUserOrders = async (email:string) => {
  const orders = await getDocs(query(collection(db, `customers/${email}/orders`), orderBy('timestamp')));
  
  return orders.docs.map((d) => d.data()) 
 
};