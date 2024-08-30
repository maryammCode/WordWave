import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Label,Button, TextInput, Textarea } from "flowbite-react";

export default function Update(){

    const {id} = useParams();

    const{token,user}=useContext(AppContext);
    const[errors,setErrors]=useState({});
    const navigate=useNavigate();
    const[formData,setFormData]=useState({
        
        title:'',
        body:'',
        
    });

    async function getPost(){

       
        const res = await fetch(`/api/posts/${id}`);  {/*this id is the useParams*/}
        const data = await res.json();
       
        
        if (res.ok) {
            if (data.post.user_id !== user.id) {

                  navigate('/');
                
            }
           setFormData({
            title:data.post.title,
            body:data.post.body,
           })
            
         }
    
    }
    

    async function handleUpdate(e){ {/* handle the submission of the form*/}

       {/* fetch by default perform a get request but this end point(api/register) is expecting a post request with the values in the body of our request thats why we add the method...*/}
        {/*we need to convert the formdata from an object to a json forma that why we use json stringify */}
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`,{      
            method:'put',
            headers:{
                Authorization:`Bearer ${token}`,

            },
            body:JSON.stringify(formData),
        });
        {/* await gives us a promise*/}

        {/* the errors we use here is the property in the data variable which is the response*/}
        const data= await res.json()
        console.log(data);
       

        if (data.errors){
            setErrors(data.errors)
            
        }else{
           
            
            navigate('/');
           
        }
    }

    useEffect(()=>{
        getPost();
    },[])
    return(
        <>

        <h1 className="text-center text-2xl font-bold mt-5 mb-6">Update your post</h1>
           <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6 flex max-w-md flex-col gap-4">
               <div  className="max-w-md">
                  <div className="mb-2 block">
                     <Label htmlFor="postTitle" value="Title" />
                  </div>
                     <TextInput id="postTitle" type="text" placeholder="Title..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="block w-full p-2.5 text-lg border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>

                     {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}

                </div>

                <div className="max-w-md">
                   <div className="mb-2 block">
                     <Label htmlFor="postContent" value="post content" />
                   </div>
                     <Textarea id="postContent" rows="8" placeholder="Text..." value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                     </Textarea>

                     {errors.body && <p className="text-red-600 mt-1">{errors.body}</p>}

                </div>

                <Button type="submit" gradientDuoTone="pinkToOrange" className="text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-md hover:scale-105 hover:bg-gradient-to-l hover:from-pink-500 hover:to-orange-500 transition duration-300">
                   Update
                </Button>

        </form>
        </>
    );

}