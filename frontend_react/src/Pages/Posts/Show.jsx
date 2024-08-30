import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Button } from "flowbite-react";

export default function Show(){

    {/* when we use console.log(useParams()) this gives us the id*/}

   const {id} = useParams();
   const{user,token}=useContext(AppContext);

   const[post,setPost]=useState(null);
   const navigate=useNavigate();

   async function getPost(){

    {/*the request is get thats why we don't need to specify any options*/}
    const res = await fetch(`/api/posts/${id}`);  {/*this id is the useParams*/}
    const data = await res.json();
   
    
    if (res.ok) {
       setPost(data.post);
        
     }

}
async function handleDelete(e){
    e.preventDefault();
    if (user && user.id===post.user_id) {
        const res = await fetch(`/api/posts/${id}`,{      
            method:'delete',
            headers:{
                Authorization:`Bearer ${token}`,
    
            },
           
        })
        const data = await res.json();
        if (res.ok) {
            navigate('/');
        }
       
        
    }
   

}
useEffect(()=>{
    getPost();
},[])

    return (
        <>
       

{post ? (
    <div key={post.id}>
        <div> 
            <div> 
                {/* <h2>{post.title} </h2>
                <small className="font-medium" >Created by {post.user.name} on {new Date(post.created_at).toLocaleTimeString()}</small> */}
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <div className="text-gray-500 text-sm mb-4">
                            <span className="block">
                                Created by <span className="font-medium"> {post.user.name} </span> 
                                on {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
            </div>
        </div>
        <p className="text-gray-800 mb-4 dark:text-white"> {post.body} </p>

        {user && user.id === post.user_id && <div className="flex space-x-4 items-center">
        
            <Link to={`/posts/update/${post.id}`} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 hover:from-green-500 hover:to-green-700 rounded-lg focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out">Update</Link>
            <form onSubmit={handleDelete}>
            <Button type="submit" gradientMonochrome="failure"  className="transition-transform duration-300 hover:scale-105 hover:bg-red-600">Delete</Button>
            </form>
       
        </div>}
    </div>
) : ( <p>post not found</p>)}

        </>
    
);
}