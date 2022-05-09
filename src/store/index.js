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
    courses: [],
    message: {
      content: null,
      type: null,
    },
  },
  actions: {
    //Login Action
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
          context.commit('setMessage', { content: `Welcome ${this.state.user.name}`, type: 'success' });
        } else {
          return { message: 'No data', type: 'error' };
        }
      } else context.commit('setMesssage', res);
    },

    //Register Action
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
      } else context.commit('setMessage', { content: res, type: 'error' });
    },

    //Logout Action
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

    //User Register Course Action
    async RegisterCourse(context, { course, userId }) {
      const docRef = doc(db, 'users', userId);

      await updateDoc(docRef, { courses: arrayUnion({ id: course.id }) });
      context.commit('setRegistedCourse', { id: course.id });
      context.commit('setMessage', { type: 'success', content: 'Registered this course' });
    },

    //User Save Course Result Action
    async SaveCourseDetail(context, { arr, id }) {
      const ind = this.state.courses.findIndex((item) => item.id === id);
      const courses = [...this.state.courses];
      courses[ind] = { ...courses[ind], voca: arr };
      const docRef = doc(db, 'users', this.state.user.uid);
      await updateDoc(docRef, { courses })
        .then(() => {
          context.commit('setCourseDetail', courses);
          context.commit('setMessage', { type: 'success', content: 'Saved your course' });
        })
        .catch((error) => context.commit('setMessage', { content: error, type: 'error' }));
    },

    //User Change Name Action
    async ChangeName(context, { name, userId }) {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { name });
      context.commit('setUserName', name);
      context.commit('setMessage', { content: 'Change Name Successfully', type: 'success' });
    },

    //User Change Password Action
    async ChangePassword(context, { password, id }) {
      const user = auth.currentUser;
      await updatePassword(user, password)
        .then(async () => {
          await updateDoc(doc(db, 'users', id), {
            password,
          });
          context.commit('setMessage', { content: 'Change Password Successfully', type: 'success' });
        })
        .catch((error) => {
          context.commit('setMessage', { content: error, type: 'error' });
        });
    },

    //User Change Avatar URL Action
    async ChangeAvatar(context, { url, userId }) {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { photoURL: url })
        .then(() => {
          context.commit('setUserPhotoURL', url);
          context.commit('setMessage', { content: 'Change Avatar Successfully', type: 'success' });
        })
        .catch((error) => context.commit('setMessage', { content: error, type: 'error' }));
    },

    //Admin Upload Course Action
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
    },
    setMessage(state, payload) {
      state.message = {
        content: payload.content,
        type: payload.type,
      };
    },
  },
  getters: {
    userId(state) {
      return state.user.uid;
    },
  },
});
