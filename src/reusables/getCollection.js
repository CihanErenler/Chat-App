import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import { formatDistanceToNow } from "date-fns";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  const unsub = collectionRef.onSnapshot((snap) => {
    let results = [];
    snap.docs.forEach((s) => {
      s.data().createdAt &&
        results.push({
          ...s.data(),
          id: s.id,
          createdAt: formatDistanceToNow(s.data().createdAt.toDate()),
        });
    });

    documents.value = results;
    error.value = null;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
