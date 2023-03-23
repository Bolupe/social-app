import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// interface types according to typescript
interface CreateFormData {
  title: string;
  description: string;
}

// create form function used
export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // schema form validation and error messages
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  // database (db) for posts
  const postsRef = collection(db, "posts");

  // stores data such as the username and Id of who creates a post
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

// content in JSX, which takes in all required info to crete a post
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red" }}> {errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{ color: "red" }}> {errors.description?.message}</p>

      <input type="submit" className="submitform" />
    </form>
  );
};
