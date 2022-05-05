import Vue from 'vue';
import Vuex from 'vuex';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, addDoc, collection, getDocs } from '@firebase/firestore';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updatePassword } from '@firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      accessToken: null,
      uid: null,
      name: null,
      email: null,
      photoURL: null,
      role: null,
      password: null,
    },
    userError: null,
    courses: [],
    courseError: null,
  },
  actions: {
    async LogIn(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
        .catch((error) => error.message);
      if (res.accessToken) {
        context.commit('setAccessToken', res.accessToken);
        context.commit('setUserId', res.uid);
        context.commit('setUserEmail', res.email);
        const docSnap = await getDoc(doc(db, 'users', res.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          context.commit('setUserName', data.name);
          context.commit('setUserPhotoURL', data.photoURL);
          context.commit('setUserRole', data.role);
          context.commit('setUserPassword', data.password);
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
        context.commit('setAccessToken', res.accessToken);
        context.commit('setUserId', res.uid);
        context.commit('setUserEmail', res.email);
        context.commit('setUserPassword', password);
        context.commit('setUserName', name);
        context.commit('setUserRole', 'user');
        await setDoc(doc(db, 'users', res.uid), {
          name,
          email,
          password,
          photoURL: null,
          role: 'user',
          courses: [],
        });
      } else context.commit('setUserError', res);
    },
    async LogOut(context) {
      await signOut(auth);
      context.commit('setAccessToken', null);
      context.commit('setUserName', null);
      context.commit('setUserPhotoURL', null);
      context.commit('setUserRole', null);
      context.commit('setUserId', null);
      context.commit('setUserEmail', null);
      context.commit('setCourses', []);
      context.commit('setUserPassword', null);
    },
    async RegisterCourse(context, { course, userId }) {
      const docRef = doc(db, 'users', userId);

      await updateDoc(docRef, { courses: arrayUnion({ id: course.id }) });
      context.commit('setRegistedCourse', { id: course.id });
    },
    async SaveCourseDetail(context, { arr, id }) {
      const ind = this.state.courses.findIndex((item) => item.id === id);
      const courses = [...this.state.courses];
      courses[ind] = { ...courses[ind], voca: arr };
      const docRef = doc(db, 'users', this.state.user.uid);
      await updateDoc(docRef, { courses })
        .then(() => {
          context.commit('setCourseDetail', courses);
        })
        .catch((error) => console.log(error));
    },
    async ChangeName(context, { name, userId }) {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { name });
      context.commit('setUserName', name);
    },
    async ChangePassword(context, { password }) {
      const user = auth.currentUser;
      await updatePassword(user, password)
        .then(() => {
          alert('Updated Password Successfully');
        })
        .catch((error) => {
          alert(error);
        });
    },
    async ChangeAvatar(context, { url, userId }) {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { photoURL: url })
        .then(() => {
          context.commit('setUserPhotoURL', url);
          alert('Change Avatar Successfully');
        })
        .catch((error) => alert(error));
    },
    async UploadCourse(context, { topic, data, id }) {
      console.log(data, topic);
      await setDoc(collection(db, 'courses', 'ui8aLQQWxLRlwX9d6Wae'), {
        topic: topic,
        // id: id + 1 || null,
        lessions: data,
      });
    },
  },
  mutations: {
    initialiseStore(state, payload) {
      const user = localStorage.getItem('vuex');
      if (user.accessToken) {
        state.user = user;
      }
    },
    setAccessToken(state, payload) {
      state.user.accessToken = payload;
    },
    setUserId(state, payload) {
      state.user.uid = payload;
    },
    setUserEmail(state, payload) {
      state.user.email = payload;
    },
    setUserPassword(state, payload) {
      state.user.password = payload;
    },
    setUserRole(state, payload) {
      state.user.role = payload;
    },
    setUserPhotoURL(state, payload) {
      state.user.photoURL = payload;
    },
    setUserName(state, payload) {
      state.user.name = payload;
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
    setUserCourses(state, payload) {
      state.courses = payload;
    },
    setCourseError(state, payload) {
      state.courseError = payload;
    },
    setCourseDetail(state, payload) {
      state.courses = payload;
      alert('Successfully Save Detail');
    },
  },
  getters: {
    userId(state) {
      return state.user.uid;
    },
  },
});
