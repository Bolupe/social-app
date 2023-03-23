import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Posts } from "./post";

// interface types according to typescript, properties types to be exported also
export interface Post {
id: string;
userId: string;
title: string;
username: string;
description: string;
}

// main function that displays posts as an array
export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null)
    
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
       const data = await getDocs(postsRef)
       setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as Post[]);
    }

     useEffect(() => {
        getPosts()
     }, [])

     
    return (
    <div>
      {postsList?.map((post) => (<Posts post={post}/>))}
    </div>
    )
}