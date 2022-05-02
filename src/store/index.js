import Vue from 'vue';
import Vuex from 'vuex';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from '@firebase/firestore';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@firebase/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userError: null,
    isAuthenticated: false,
    courses: [],
  },
  actions: {
    async LogIn(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
        .catch((error) => error.message);
      if (res.accessToken) {
        context.commit('setUser', res);
        const docSnap = await getDoc(doc(db, 'users', res.uid));
        if (docSnap.exists()) {
          context.commit('setCourses', docSnap.data().courses);
        } else {
          return { message: 'No data' };
        }
      } else context.commit('setUserError', res);
    },
    async Register(context, { name, email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
        .catch((error) => error.message);
      if (res.accessToken) {
        context.commit('setUser', res);
        await setDoc(doc(db, 'users', res.uid), {
          name,
          email,
          photoURL: null,
          role: 'user',
          courses: [],
        });
      } else context.commit('setUserError', res);
    },
    async LogOut(context) {
      await signOut(auth);
      context.commit('setUser', null);
    },
    async GetAllCourses(context) {
      const courseCollection = collection(db, 'courses');
      // const docRef = doc(db, 'courses');
      const docSnap = await getDocs(courseCollection);
      // docSnap.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, ' => ', doc.data());
      // });
      // if (docSnap.exists()) {
      //   console.log(docSnap.data());
      // }
      const data = docSnap.docs.map((doc) => doc.data());
    },
    async RegisterCourse(context, { course, userId }) {
      const docRef = doc(db, 'users', userId);

      await updateDoc(docRef, { courses: arrayUnion(course.id) });
      this.commit('setRegistedCourse', course.id);
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserError(state, payload) {
      state.userError = payload;
    },
    setCourses(state, payload) {
      state.courses = payload;
    },
    setRegistedCourse(state, payload) {
      const arr = [...state.courses];
      arr.push(payload);
      state.courses = arr;
    },
  },
  getters: {
    userId(state) {
      return state.user.uid;
    },
  },
});
