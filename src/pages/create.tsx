/* eslint-disable prefer-const */
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { FaTrash, FaUpload } from "react-icons/fa";
import { toast } from 'react-toastify';
import { categories } from "utils/data";
import { saveItem } from "utils/firebaseFunction";
import { ProductInterface } from "utils/Interfaces";
import { stringToSlug } from "utils/slugFunction";

import Layout from "@/components/layout/Layout";

import { storage } from "../../firebase";

const Create = () => {
  const { data: session } = useSession()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [productImg, setProductImg] = useState<string[]>([])
  const [category, setCategory] = useState("ferns")
  const [desc, setDesc] = useState("")
  const [tag, setTag] = useState("")

  const uploadImgs = (selectedFile: FileList | any) => {
    
    // eslint-disable-next-line prefer-const
 
    let promises: any[] = []
    const files = [...selectedFile]
    console.log("Files: ", files)
    files.map((i: File)=> {
      const storageRef = ref(storage, `Images/${Date.now()}-${i.name}`);
     
      const uploadTask = uploadBytesResumable(storageRef, i); promises.push(uploadTask)
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
        console.log("Upload is " + progress + "% done")
      },
      error => {
        
         
      switch (error.code) {
      case 'storage/unauthorized':
          toast.error("Unauthorized access")
        // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
          toast.error("Upload cancelled")
        // User canceled the upload
          break;
        case 'storage/unknown':
          toast.error("Unknown error occurred")
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
      },
      () => {
      // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      toast.success("Product image uploaded sucessfully")
     let imgs = productImg
     imgs.push(downloadURL)
     setProductImg(imgs)
    });
    })
    })
    Promise.all(promises)
            .then(() => alert('All images uploaded'))
            .then(err => console.log(err))

    };
    
  const clearData = () => {
    setName('');
    setProductImg(['']);
    setDesc('');
    setPrice('');
    setCategory('ferns');
    setTag('')
  }

  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("saving")
    try {
      const data: ProductInterface = {
        id: `${Date.now()}`,
        name,
        addImg: productImg,
        price:[price],
        category,
        desc,
        slug: stringToSlug(name),
        tag,
        variable:[""]
      }
      console.log({...data})
      saveItem(data)
      toast.success("Product created successfully")
      clearData()
    } catch (err) {
      console.log(err)
      toast.error("Error while saving. Please try again.")
    }
  }
   
  const deleteImg = (i:number) => {
    // Create a reference to the file to delete
    const imgRef = ref(storage, productImg[i]);
        // Delete the file
    deleteObject(imgRef).then(() => {
      // File deleted successfully
      toast.success("Image deleted successfully")
      let imgs = productImg
      imgs.filter(img=>img!==productImg[i])
      setProductImg(imgs)
    }).catch((error) => {
      console.log(error)
      // Uh-oh, an error occurred!
      toast.error("Failed to delete image")
  
    });
  }

  return (
    <Layout>
    
      {session?.user?.email!="jocxyen@gmail.com"&& <div className="flex items-center pt-36 h-[80vh] flex-col">
        <AiOutlineStop className="text-9xl text-red-600 font-bold" />
        <p className="font-bold text-4xl" >Unauthorized Access</p>
      </div>}
     <div className="flex w-full p-20">
        <form className="flex flex-col gap-4 w-full" onSubmit={e=>saveData(e)}>
          
          <div className="flex flex-col gap-1 w-full">

            <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 text-gray-700 font-semibold">Product Name</label>
            <input
              type="text"
              name="product_name"
              id="name"
              className="shadow rounded appearance-none bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 border-2 py-2 px-4 transition
        ease-in-out"
              onChange={(e) => setName(e.target.value)}
              placeholder="Lucky Succulent"
              value={name}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">

            <label htmlFor="tag" className="form-label inline-block mb-2 text-gray-700 font-semibold">Tagging</label>
            <input
              type="text"
              name="product tag"
              id="tag"
              className="shadow rounded appearance-none bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 border-2 py-2 px-4 transition
        ease-in-out"
              onChange={(e) => setTag(e.target.value)}
              placeholder="trending"
              value={tag}
    
            />
          </div>
          <div className="flex flex-col gap-1 w-full">

            <label htmlFor="product image" className="form-label inline-block mb-2 text-gray-700 font-semibold">Product Images</label>
            <div className="flex flex-col h-44 w-full justify-center rounded items-center border-dotted border-2 md:h-420 border-gray-300 py-8">
            
                {productImg.length==0?(<>

                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 hover:text-gray-700 text-gray-500 transition-all ease-in">

                      <FaUpload  className=" text-3xl " />
                      <p>
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                     onChange={e=>uploadImgs(e.target.files)}
                      className="w-0 h-0"
                    multiple
                    />
                </label>
              </>) : productImg.map((i,index)=>(
                  <div className="relative h-full" key={index}>
                    <img src={i} alt={name} className="w-full h-full object-cover" />
                    <button type="button" className="bg-red-500 cursor-pointer absolute p-3 bottom-3 right-3 rounded text-xl outline-none hover:shadow-md  duration-500 transition-all ease-in-out" onClick={()=>deleteImg(index)}>
                      <FaTrash className="text-white" />
                    </button>
                  </div>
                ))}

              
          </div>
          </div>
          <div className="flex flex-col gap-1 w-full">

            <label
              htmlFor="category"
              className="form-label inline-block mb-2 text-gray-700 font-semibold transition
        ease-in-out"
            >Category
            </label>
            <select
              name="category"
              id="category"
              className="focus:outline-none focus:border-blue-500 border-2 py-2 px-4 transition ease-in-out rounded"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >

              {categories && categories.map((c) => <option value={c.urlParamName} key={c.id}>{ c.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">

            <label htmlFor="description" className="form-label inline-block mb-2 text-gray-700 font-semibold">Description</label>
            <textarea
              name="product_desc"
              id="desc"
              className="shadow rounded appearance-none bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 border-2 py-2 px-4 h-56 transition
        ease-in-out"
              placeholder="Provides some infomation about the product"
              required
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">

            <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 text-gray-700 font-semibold">Price</label>
            <input
              type="number"
              name="product_price"
              id="price"
              step="0.01"
              className="shadow rounded appearance-none bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 border-2 py-2 px-4 transition
        ease-in-out"
              onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0.00"
              
              required
              />
          </div>
                
          <button type="submit"  className="px-4 p-2 bg-green-600 text-white rounded">Add Product</button>
        </form>
      </div>
    </Layout>
  )
}

export default Create