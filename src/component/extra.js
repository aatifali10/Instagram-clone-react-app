// collection(db,"posts",orderBy("currentTime", "desc"));
// getDoc(posts){

// }

//   const docRef = doc(db, "posts", "posts");
//   const data =getDoc(docRef)={
//            setPosts({
//             id: id,
//             title: title,
//             image: image,
//             username: username,
//  });

// };

// if (docSnap.exists()) {
//   console.log("Document data:", setPosts.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// const data =
//   (collection(db, "posts"),
//   orderBy("currentTime", "desc"),
//   endAt(collection, (snap) => ({
//     id: snap.id,
//     title: snap.data().title,
//     image: snap.data().image,
//     username: snap.data().username,
//   })));
// console.log("this is data",data);

// const q = query(posts, orderBy("currentTime", "desc"), limit(3));
// console.log("this is query ", q);
// orderBy("currentTime", "desc").onValue(collection, (snapshot) => {
//   setPosts(
//     snapshot.docs.map((doc) => ({
//       id: doc.id,
//       title: doc.data().title,
//       image: doc.data().image,
//       username: doc.data().username,
//     }))
//   );
