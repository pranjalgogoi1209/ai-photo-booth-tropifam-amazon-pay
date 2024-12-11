import {
  getStorage,
  getDownloadURL,
  uploadString,
  ref,
} from "firebase/storage";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const storage = getStorage();

function getUID() {
  return Date.now().toString(36);
}

export const uploadImage = async (base64) => {
  // console.log(base64);
  const dataURL = base64;
  try {
    const storageRef = ref(
      storage,
      `tropifam/tropifam_images_${Date.now()}.png`
    );
    // console.log(storageRef)
    await uploadString(storageRef, dataURL, "base64");
    const downloadURL = await getDownloadURL(storageRef);
    const valueRef = collection(db, "tropifam_qr_urls");
    await addDoc(valueRef, {
      imageUrl: downloadURL,
      createdAt: Date.now(),
    });
    // console.log(downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image or saving to Firestore:", error);
  } finally {
    //   setLoading(false);
  }
};
