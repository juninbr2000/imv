import { useState, useEffect, useReducer } from "react";
import { db, storageService } from "../firebase/config";
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document, images) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createDat: Timestamp.now() };

      const docRef = await addDoc(collection(db, docCollection), newDocument);

      if (images.length > 0) {
        // Upload de imagens
        const imageUrls = await Promise.all(
          images.map(async (image) => {
            const imageRef = ref(storageService, `imagens/${image.name}`);
            await uploadBytes(imageRef, image);
            return getDownloadURL(imageRef);
          })
        );

        await updateDoc(docRef, { imagens: imageUrls });
      }

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: docRef,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
