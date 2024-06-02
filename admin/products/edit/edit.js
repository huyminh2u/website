import { app, db } from "/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import {
  collection,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const addForm = document.getElementById("add-form");

const params = new URLSearchParams(document.location.search);
const productID = params.get("id");

const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const image = document.getElementById("image");
const category = document.getElementById("category");

let docSnap;

if (productID) {
  const docRef = doc(db, "products", productID);
  docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    name.value = docSnap.data().name;
    price.value = docSnap.data().price;
    description.value = docSnap.data().description;
    category.value = docSnap.data().category;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

addForm.onsubmit = async function (event) {
  event.preventDefault();

  let updateProducts = {
    name: name.value,
    price: Number(price.value),
    description: description.value,
    category: category.value,
    image: docSnap.data().image,
  };

  if (image.files[0]) {
    // user update image
    const storage = getStorage();
    const imagePath = "products/" + new Date().valueOf();
    const storageRef = ref(storage, imagePath);

    uploadBytes(storageRef, image.files[0]).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");
      const url = await getDownloadURL(storageRef);
      updateProducts.image = url;
      await setDoc(doc(db, "products", productID), updateProducts),
        alert("Added" + name.value);
      window.location.href = "/admin/products";
    });
  } else {
    // Add a new document with a generated id.
    await setDoc(doc(db, "products", productID), updateProducts),
      alert("Added" + name.value);
    window.location.href = "/admin/products";
  }
  // 'file' comes from the Blob or File API
};
