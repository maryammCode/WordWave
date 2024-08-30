<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\controllers\HasMiddleware;
use Illuminate\Routing\controllers\Middleware;
use Illuminate\Support\Facades\Gate;




class PostController extends Controller implements HasMiddleware
{

    public static function middleware(){

        return[
            new Middleware('auth:sanctum',except:['index','show'])
            //or  new Middleware('auth:sanctum',only:['store']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //with is a method in laravel which takes the model (as a string) that has a relation ship with the model tha we are returning
        return Post::with('user')->latest()->get();
       
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields=$request->validate([
            'title'=> 'required|max:192',
            'body'=>'required',
        ]);

        $post=$request->user()->posts()->create($fields); //user() is the authenticated user and posts() is the function we ceated in user model
        return['post'=>$post,'user'=>$post->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return['post'=>$post,'user'=>$post->user];
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

         //authorizing the action its not yours 
         Gate::authorize('modify',$post); // we have two argument in the modify func which is in policy so we must pass them here . we pass the pst and the user will be automatically passed

        $fields=$request->validate([
            'title'=> 'required|max:255',
            'body'=>'required'
        ]);

        $post->update($fields);

        return['post'=>$post,'user'=>$post->user];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify',$post);
        $post->delete();
        return['message'=>'was deleted'];
    }
}
