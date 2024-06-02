import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function fetchProduct() {
  tbody.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  let i = 1;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    const product = { ...doc.data(), id: doc.id, order: i };
    renderProduct(product);
    i++;
  });
}
fetchProduct();

function renderProduct(product) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  tr.innerHTML = `
  <tr>
              <th scope="row">1</th>
              <td>
                <img
                  width="100"
                  height="100"
                  style="object-fit: cover"
                  src="${product.image}"
                  alt=""
                />
              </td>
              <td>${product.name}</td>
              <td>$${product.price}</td>
              <td>${product.description}</td>
              <td>${product.category}</td>
              <td>
                <a href="./edit/index.html?id=${product.id}" class="btn-sm btn-secondary">edit</a>
                <button class="btn-sm btn-danger btn-secondary delete-btn">delete</button>
              </td>
            </tr>
  `;

  const deleteBtn =
    document.getElementsByClassName("delete-btn")[product.order - 1];
  deleteBtn.onclick = function () {
    deleteProduct(product);
  };
}

async function deleteProduct(product) {
  const isConfirm = confirm("Are you sure you want to delete " + product.name);
  if (!isConfirm) {
    return;
  }

  await deleteDoc(doc(db, "products", product.id));
  fetchProduct();
}
