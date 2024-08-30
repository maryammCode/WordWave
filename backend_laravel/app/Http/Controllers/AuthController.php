<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        //validate
        $fields=$request->validate([
            'name'=>['required','max:192','unique:users'], //unique fe tableau de users dans la bd
            'email'=>['required','max:192','email','unique:users'],
            'password'=>['required','min:6','confirmed']

        ]);
        //register
        $user=User::create($fields); //or create(['name'=>$request->name])....

        //just in api
        $token=$user->createToken($request->name); //the function createToken is looking for a string so we can put the name or email
        return [
           'user'=>$user,
           'token'=>$token->plainTextToken
        ];
    }
    
    public function login(Request $request){
       $request->validate([
           
            'email'=>['required','max:192','email','exists:users'],
            'password'=>['required']

        ]);
    //just in api
    $user= User::where('email',$request->email)->first();//where looks for 2 arguments the field and the actual value //we use first because the function will return an array and we need the first thing in the array
            if(!$user|| !Hash::check($request->password,$user->password)){
                return[
                    'errors'=>[
                        'email'=>['credentials are incorrect']
                    ]
                ];
            }

            //just in api
        $token=$user->createToken($user->name); //the function createToken is looking for a string so we can put the name or email
        return [
           'user'=>$user,
           'token'=>$token->plainTextToken
        ];

    } 
    public function logout(Request $request){

        //just api
       $request->user()->tokens()->delete(); //the user function will give us the athenticated user

       return[
        'message'=>'you are logged out'
    ];
    } 
}
