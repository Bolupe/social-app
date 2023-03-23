import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { number } from "yup";
import { auth, db } from "../config/firebase";
import { Post as IPost } from "./home";


// interface types according to typescript
// interface type imported from home.tsx file named Post there but imported as Ipost 
interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Posts = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

// function to set a like
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

// function to add a like to a post
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

// function to remove a like from a post
  const removeLike = async () => {
    try {
      const likesToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likesToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);

      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  // JSX for post page
  return (
    <div>
    <div className="posts-page">
      <div className="post-title">
        <h1> {post.title} </h1>
      </div>
      <div className="post-description">
        <p> {post.description} </p>
      </div>
      <div className="footer">
        <p className="username"> @{post.username} </p>
        <button  className="like-emoji" onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} {""}
        </button>
        {likes && <p className="likes">Likes: {likes?.length}</p>}
      </div>
    </div>
    </div>
  );
};
