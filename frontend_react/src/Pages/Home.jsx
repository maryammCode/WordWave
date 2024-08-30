import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";


export default function Home(){

    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }
    
    const[posts,setPosts]=useState([]);

    async function getPosts(){

        {/*the request is get thats why we don't need to specify any options*/}
        const res = await fetch('/api/posts');
        const data = await res.json();
       

        if (res.ok) {
            setPosts(data);
            
        }

    }

 {/* call the getPosts function once when we enter to the home page*/}
    useEffect(()=>{getPosts()},[]);
   
    return (
        <>
            <h1 className="text-center text-2xl font-bold my-6">Latest Posts</h1>

            <div className="max-w-4xl mx-auto space-y-8" >
                {posts.length > 0 ? posts.map(post => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <div className="text-gray-500 text-sm mb-4">
                            <span className="block">
                                Created by <span className="font-medium">{post.user.name}</span>
                            </span>
                            <span>
                                on {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-4 dark:text-white">{truncateText(post.body, 30)}</p>

                         {/*here we use {} and  instead of "" because we have the id  (not a normal link)*/}

                         <Link to={`/posts/${post.id}`} className="inline-flex items-center text-blue-600 hover:underline">
                            Read More
                            <HiArrowNarrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                )) : <p className="text-center text-gray-500">No posts available</p> 

                 }

            </div>

        </>
    )
}