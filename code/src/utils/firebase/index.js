import firebase from 'react-native-firebase';
import { displayConsole } from '../helper';
import moment from 'moment';
import Language from '../localization';
import Constant from '../constants';
var voucher_codes = require('voucher-code-generator');
var RSAKey = require('react-native-rsa');
var rsa = new RSAKey();
const bits = 1024;
const exponent = '10001';
const mySecretSalt = 'klit280391';
let lang = Language.en;
export function createUser(obj) {
  try {
    displayConsole('\n\n--------------***** createUser Start *********-----------');
    displayConsole('obj', obj);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(obj.email, obj.password)
      .then(function(success) {
        const { user } = success;
        displayConsole('success', success);
        displayConsole('user', user.uid);
        displayConsole('--------------***** createUser End *********-----------\n\n');
        return user;
      })
      .catch(function(error) {
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        displayConsole('--------------***** createUser End *********-----------\n\n');
        return error;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------***** createUser End *********-----------\n\n');
    return false;
  }
}

export function loginInWithFirebase(obj) {
  try {
    displayConsole(
      '\n\n--------------***** loginInWithFirebase Start *********-----------'
    );
    displayConsole('obj', obj);
    return firebase
      .auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .then(function(success) {
        const { user } = success;
        displayConsole('success', success);
        displayConsole('user', user.uid);
        displayConsole(
          '--------------***** loginInWithFirebase End *********-----------\n\n'
        );
        return user;
      })
      .catch(function(error) {
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        displayConsole(
          '--------------***** loginInWithFirebase End *********-----------\n\n'
        );
        return error;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------***** loginInWithFirebase End *********-----------\n\n'
    );
    return false;
  }
}

export function uploadImage(obj, success, error) {
  try {
    displayConsole('\n\n--------------***** uploadImage Start *********-----------');
    displayConsole('obj', obj);
    const result = firebase
      .storage()
      .ref(`Kliit/${obj.filename}`)
      .putFile(obj.file);
    return result
      .then(data => {
        displayConsole('---data--', data);
        displayConsole('--------------***** uploadImage End *********-----------\n\n');
        const obj = {
          success: true,
          data,
        };
        return obj;
      })
      .catch(error => {
        const { message } = error;
        displayConsole('---message--', message);
        displayConsole('--------------***** uploadImage End *********-----------\n\n');
        const obj = {
          success: true,
          message,
        };
        return obj;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------***** uploadImage End *********-----------\n\n');
    return false;
  }
}

export function addUserData(obj) {
  try {
    displayConsole('\n\n--------------**** addUserData Start ********-----------');
    displayConsole('obj', obj);
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', obj.uid)
      .get()
      .then(querySnapshot => {
        displayConsole('querySnapshot', querySnapshot);
        var userData;
        querySnapshot.docs.forEach(element => {
          userData = element.data();
        });
        displayConsole('userData', userData);
        return userData
          ? firebase
              .firestore()
              .collection('users')
              .doc(obj.uid)
              .update(obj)
              .then(
                function() {
                  displayConsole('success', true);
                  displayConsole(
                    '--------------***** addUserData End *********-----------\n\n'
                  );
                  const data = {
                    success: true,
                  };
                  return data;
                },
                error => {
                  const { message, code } = error;
                  displayConsole('error message', message);
                  displayConsole('error code', code);
                  const data = {
                    success: false,
                    message: message,
                  };
                  displayConsole(
                    '--------------***** addUserData End *********-----------\n\n'
                  );
                  return data;
                }
              )
          : firebase
              .firestore()
              .collection('users')
              .doc(obj.uid)
              .set(obj)
              .then(
                function() {
                  displayConsole('success', true);
                  displayConsole(
                    '--------------***** addUserData End *********-----------\n\n'
                  );
                  const data = {
                    success: true,
                  };
                  return data;
                },
                error => {
                  const { message, code } = error;
                  displayConsole('error message', message);
                  displayConsole('error code', code);
                  const data = {
                    success: false,
                    message: message,
                  };
                  displayConsole(
                    '--------------***** addUserData End *********-----------\n\n'
                  );
                  return data;
                }
              );
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole('--------------**** getSecretKey End ********-----------\n\n');
        return data;
      });
  } catch (error) {
    const data = {
      success: false,
    };
    displayConsole('Crash error', error);
    displayConsole('--------------**** addUserData End ********-----------\n\n');
    return data;
  }
}

// export function addUserData(obj) {
//     try {
//         displayConsole('\n\n--------------**** addUserData Start ********-----------');
//         displayConsole('obj', obj);
//         firebase.firestore().doc(`${obj.tableName}/${obj.uid}`).get();
//         return firebase.firestore().collection('users').doc(obj.uid).set(obj)
//             .then(function () {
//                 displayConsole("success", true);
//                 displayConsole('--------------***** addUserData End *********-----------\n\n');
//                 const data = {
//                     success: true
//                 };
//                 return data;
//             }, error => {
//                 const { message, code } = error;
//                 displayConsole("error message", message);
//                 displayConsole("error code", code);
//                 const data = {
//                     success: false,
//                     message: message,
//                 };
//                 displayConsole('--------------***** addUserData End *********-----------\n\n');
//                 return data;
//             })
//     } catch (error) {
//         const data = {
//             success: false,
//         };
//         displayConsole("Crash error", error);
//         displayConsole('--------------**** addUserData End ********-----------\n\n');
//         return data;
//     }
// }

export function getUserData(obj, success, error) {
  try {
    displayConsole('\n\n--------------**** getUserData Start ********-----------');
    displayConsole('obj', obj);
    let userRef = firebase.firestore().doc(`${obj.tableName}/${obj.uid}`);
    return userRef.onSnapshot(success, error);
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** getUserData End ********-----------\n\n');
    return false;
  }
}

export function getDataFromTable(obj) {
  try {
    displayConsole('\n\n--------------**** getDataFromTable Start ********-----------');
    displayConsole('obj', obj);
    let userRef = firebase
      .firestore()
      .doc(`${obj.tableName}/${obj.uid}`)
      .get();
    return userRef
      .then(doc => {
        displayConsole('doc', doc);
        displayConsole('doc.data()', doc.data());
        displayConsole('--------------**** getDataFromTable End ********-----------\n\n');
        return doc.data();
      })
      .catch(e => {
        displayConsole('e', e);
        return false;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** getDataFromTable End ********-----------\n\n');
    return false;
  }
}

export function getCollectionData(obj) {
  try {
    displayConsole('\n\n--------------**** getCollectionData Start ********-----------');
    displayConsole('obj', obj);
    let userRef = firebase
      .firestore()
      .collection(obj.tableName)
      .get();
    return userRef
      .then(querySnapshot => {
        displayConsole('querySnapshot', querySnapshot);
        const arr = [];
        querySnapshot.docs.forEach(element => {
          arr.push(element.data());
        });
        const data = {
          success: true,
          data: arr,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getCollectionData End ********-----------\n\n'
        );
        return data;
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getCollectionDataWithCondition End ********-----------\n\n'
        );
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------**** getCollectionDataWithCondition End ********-----------\n\n'
    );
    return false;
  }
}

export function getCollectionDataWithCondition(obj) {
  try {
    displayConsole(
      '\n\n--------------**** getCollectionDataWithCondition Start ********-----------'
    );
    displayConsole('obj', obj);
    let userRef = firebase
      .firestore()
      .collection(obj.tableName)
      .where(obj.key, '==', obj.value)
      .get();
    return userRef
      .then(querySnapshot => {
        displayConsole('querySnapshot', querySnapshot);
        const arr = [];
        querySnapshot.docs.forEach(element => {
          arr.push(element.data());
        });
        const data = {
          success: true,
          data: arr,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getCollectionDataWithCondition End ********-----------\n\n'
        );
        return data;
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getCollectionDataWithCondition End ********-----------\n\n'
        );
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------**** getCollectionDataWithCondition End ********-----------\n\n'
    );
    return false;
  }
}

export function getQuestionsData(obj, success, error) {
  try {
    displayConsole('\n\n--------------**** getQuestionsData Start ********-----------');
    displayConsole('obj', obj);
    let ref;
    if (obj.value) {
      ref = firebase
        .firestore()
        .collection(obj.tableName)
        .where(obj.key, '==', obj.value)
        .where('isRated', '==', true)
        .where(obj.userConditionKey, '==', obj.uid);
    } else {
      ref = firebase
        .firestore()
        .collection(obj.tableName)
        .where('isRated', '==', false)
        .where(obj.userConditionKey, '==', obj.uid);
    }
    // let ref = firebase.firestore().collection(obj.tableName).where(obj.key, "==", obj.value).where(obj.userConditionKey, "==", obj.uid);
    // let ref = firebase.firestore().collection(obj.tableName).where(obj.key, "==", obj.value).where("isRated", "==", "false").where(obj.userConditionKey, "==", obj.uid);
    return ref.onSnapshot(success, error);
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------**** getChildCollectionDataWithCondition End ********-----------\n\n'
    );
    return false;
  }
}

export function getExpertQuestionsData(obj, success, error) {
  try {
    displayConsole(
      '\n\n--------------**** getExpertQuestionsData Start ********-----------'
    );
    displayConsole('obj', obj);
    let ref = firebase
      .firestore()
      .collection(obj.tableName)
      .where(obj.key, '==', obj.value)
      .where(obj.userConditionKey, '==', obj.uid);
    return ref.onSnapshot(success, error);
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------**** getExpertQuestionsData End ********-----------\n\n'
    );
    return false;
  }
}

export function logout(userData) {
  try {
    displayConsole('--------------***** logout Start *********-----------\n\n');
    displayConsole('userData', userData);
    return firebase
      .auth()
      .signOut()
      .then(
        function() {
          displayConsole('success', true);
          displayConsole('--------------***** logout End *********-----------\n\n');
          const data = {
            success: true,
          };
          return data;
        },
        error => {
          let data = {};
          const { message, code } = error;
          displayConsole('error message', message);
          displayConsole('error code', code);
          if (code === 'auth/no-current-user') {
            data = {
              success: true,
            };
          } else {
            data = {
              success: false,
              message,
            };
          }
          displayConsole('--------------***** logout End *********-----------\n\n');
          return data;
        }
      );
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** logout End ********-----------\n\n');
    return false;
  }
}

export function resetPassword(email) {
  try {
    return firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then(function() {
        displayConsole('success', true);
        displayConsole('--------------***** forgotPassword End *********-----------\n\n');
        const data = {
          success: true,
        };
        return data;
      })
      .catch(function(error) {
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('--------------***** forgotPassword End *********-----------\n\n');
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** forgotPassword End ********-----------\n\n');
    return false;
  }
}

export function getFilterDataWithCondition(obj) {
  try {
    displayConsole(
      '--------------**** getFilterDataWithCondition Start ********-----------\n\n'
    );
    displayConsole('obj********', obj);
    var db = firebase.firestore();
    let collection = db.collection(obj.tableName);
    collection = collection.where(obj.roleKey, '==', obj.roleValue);
    if (obj.genderKey && obj.genderValue) {
      collection = collection.where(obj.genderKey, '==', obj.genderValue);
    }
    return collection
      .get()
      .then(querySnapshot => {
        displayConsole('querySnapshotS********', querySnapshot);
        const arr = [];
        querySnapshot.docs.forEach(element => {
          if (
            obj.professions &&
            obj.professions.length > 0 &&
            obj.languages &&
            obj.languages.length > 0
          ) {
            let isLanguagesMatch = false;
            let isProfessionMatch = false;

            obj.professions.forEach(profession => {
              if (element.data().profileInfo.profession.fullName == profession) {
                isProfessionMatch = true;
              }
            });
            obj.languages.forEach(language => {
              element.data().profileInfo.languages.forEach(elementLanguage => {
                if (elementLanguage.code == language.code) {
                  isLanguagesMatch = true;
                }
              });
            });
            if (isLanguagesMatch && isProfessionMatch) {
              arr.push(element.data());
            }
          } else if (obj.professions && obj.professions.length > 0) {
            obj.professions.forEach(profession => {
              if (element.data().profileInfo.profession.fullName == profession) {
                arr.push(element.data());
              }
            });
          } else if (obj.languages && obj.languages.length > 0) {
            obj.languages.forEach(language => {
              element.data().profileInfo.languages.forEach(elementLanguage => {
                if (elementLanguage.code == language.code) {
                  arr.push(element.data());
                }
              });
            });
          } else {
            arr.push(element.data());
          }
        });
        const data = {
          success: true,
          data: arr,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getFilterDataWithCondition End ********-----------\n\n'
        );
        return data;
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getFilterDataWithCondition End ********-----------\n\n'
        );
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------**** getFilterDataWithCondition End ********-----------\n\n'
    );
    return false;
  }
}

export function reAunthenticate(userProvidedPassword) {
  try {
    displayConsole('--------------**** reAunthenticate Start ********-----------\n\n');
    displayConsole('userProvidedPassword********', userProvidedPassword);
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      userProvidedPassword
    );
    return user
      .reauthenticateWithCredential(credential)
      .then(function() {
        const data = {
          success: true,
        };
        displayConsole('data', data);
        displayConsole('--------------**** reAunthenticate End ********-----------\n\n');
        return data;
      })
      .catch(function(error) {
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message,
        };
        displayConsole('data', data);
        displayConsole('--------------**** reAunthenticate End ********-----------\n\n');
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** reAunthenticate End ********-----------\n\n');
    return false;
  }
}

export function changePassword(newPassword) {
  try {
    displayConsole('newPassword', newPassword);
    displayConsole('--------------**** changePassword Start ********-----------\n\n');
    var user = firebase.auth().currentUser;
    return user
      .updatePassword(newPassword)
      .then(function() {
        const data = {
          success: true,
        };
        displayConsole('data', data);
        displayConsole('--------------**** changePassword End ********-----------\n\n');
        return reAunthenticate(newPassword);
      })
      .catch(function(error) {
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message,
        };
        displayConsole('data', data);
        displayConsole('--------------**** changePassword End ********-----------\n\n');
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** logout End ********-----------\n\n');
    return false;
  }
}

export const cipher = salt => {
  let textToChars = text => text.split('').map(c => c.charCodeAt(0));
  let byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
  let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text =>
    text
      .split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
};

export const decipher = salt => {
  let textToChars = text => text.split('').map(c => c.charCodeAt(0));
  let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded =>
    encoded
      .match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
};

export function sendEncryptedKeyToFirebase() {
  displayConsole(
    '--------------**** sendEncryptedKeyToFirebase Start ********-----------\n\n'
  );
  let Keyref = firebase
    .firestore()
    .collection('EncryptedKeys')
    .doc('EncryptedKeysDoc')
    .get();
  return Keyref.then(doc => {
    if (doc.exists) {
      displayConsole('Keyref doc', doc._data.salt.key);
      let myDecipher = decipher(mySecretSalt);
      displayConsole(
        'sendEncryptedKeyToFirebase Decrypt',
        JSON.parse(myDecipher(doc._data.salt.key))
      );
      displayConsole(
        '--------------**** sendEncryptedKeyToFirebase End ********-----------\n\n'
      );
      return JSON.parse(myDecipher(doc._data.salt.key));
    } else {
      rsa.generate(bits, exponent);
      const publicKey = rsa.getPublicString();
      const privateKey = rsa.getPrivateString();
      const keys = {
        publicKey: JSON.stringify(publicKey),
        privateKey: JSON.stringify(privateKey),
      };
      // Encrypt keys using cipher
      let myCipher = cipher(mySecretSalt);
      // Save Key to FireStore Db
      firebase
        .firestore()
        .collection('EncryptedKeys')
        .doc('EncryptedKeysDoc')
        .set({
          salt: {
            key: myCipher(JSON.stringify(keys)),
          },
        })
        .then(
          function() {
            displayConsole('success', true);
            displayConsole(
              '--------------**** sendEncryptedKeyToFirebase End ********-----------\n\n'
            );
            return JSON.parse(JSON.stringify(keys));
          },
          error => {
            const { message, code } = error;
            displayConsole('message', message);
            displayConsole('code', code);
          }
        );
    }
  }).catch(e => {
    displayConsole('e', e);
    return false;
  });
}

export const deleteEncryptedKeyCollection = () => {
  firebase
    .firestore()
    .collection('EncryptedKeys')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        displayConsole('deleteCollection doc', doc);
        doc.ref.delete();
      });
    });
};

export const sendMessage = obj => {
  try {
    displayConsole('--------------**** sendMessage Start ********-----------\n\n');
    displayConsole('obj', obj);
    firebase
      .firestore()
      .collection(Constant.App.firebaseTableNames.messages)
      .doc(obj.id)
      .collection('chat')
      .doc()
      .set(obj.messageParams);
    console.log('--------------**** sendMessage End ********-----------\n\n');
    displayConsole('--------------**** update question Start ********-----------\n\n');
    const { userUnreadCount, expertUnreadCount } = obj.unreadCount;
    const updateData = {
      lastMessage: obj.lastMessage,
      modifiedDate: moment().unix(),
      userUnreadCount: userUnreadCount ? userUnreadCount : 0,
      expertUnreadCount: expertUnreadCount ? expertUnreadCount : 0,
    };
    firebase
      .firestore()
      .collection(Constant.App.firebaseTableNames.questions)
      .doc(obj.questionId)
      .update(updateData);
    displayConsole('--------------**** update question end ********-----------\n\n');
  } catch (error) {
    displayConsole('Crash error', error);
    console.log('--------------*** sendMessage End *******-----------\n\n');
  }
};

export const loadMessages = (obj, success, error) => {
  displayConsole('--------------**** loadMessages Start ********-----------\n\n');
  displayConsole('obj', obj);
  let ref = firebase
    .firestore()
    .collection(Constant.App.firebaseTableNames.messages)
    .doc(`${obj.id}`)
    .collection('chat')
    .orderBy('createdAt', 'desc');
  return ref.onSnapshot(success, error);
};

export const checkStatus = (obj, success, error) => {
  displayConsole('--------------**** checkStatus Start ********-----------\n\n');
  displayConsole('obj', obj);
  let ref = firebase
    .firestore()
    .collection('users')
    .doc(`${obj.id}`);
  return ref.onSnapshot(success, error);
};

export const checkQuestionStatus = (obj, success, error) => {
  displayConsole('--------------**** checkQuestionStatus Start ********-----------\n\n');
  displayConsole('obj', obj);
  let ref = firebase
    .firestore()
    .collection(Constant.App.firebaseTableNames.questions)
    .doc(`${obj.id}`);
  return ref.onSnapshot(success, error);
};
export const updateRefrealcodeForAllUsers = (uid, data) => {
  console.log('updateRefrealcodeForAllUsers', uid);
  displayConsole(
    '--------------**** updateRefrealcodeForAllUsers Start ********-----------\n\n'
  );
  firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .set(data, { merge: true })
    .then(
      function() {
        displayConsole('updateRefrealcodeForAllUsers success', true);
        console.log(
          '--------------**** updateRefrealcodeForAllUsers Id End ********-----------\n\n'
        );
      },
      error => {
        const { message, code } = error;
        displayConsole('updateRefrealcodeForAllUsers error message', message);
        displayConsole('updateRefrealcodeForAllUserserror code', code);
      }
    );
  displayConsole(
    '--------------**** updateRefrealcodeForAllUsers End ********-----------\n\n'
  );
};
export const updateStatus = obj => {
  displayConsole('--------------**** updateStatusCredit Start ********-----------\n\n');
  displayConsole('obj', obj);
  firebase
    .firestore()
    .collection('users')
    .doc(obj.uid)
    .update(obj.updatedData);
  console.log('--------------**** updateStatusCredit End ********-----------\n\n');
};

export const updateUnreadCount = obj => {
  displayConsole('--------------**** updateUnreadCount Start ********-----------\n\n');
  displayConsole('obj', obj);
  firebase
    .firestore()
    .collection(Constant.App.firebaseTableNames.questions)
    .doc(obj.questionData.questionId)
    .update(obj.updateData);
};

export function saveQuestion(obj) {
  try {
    displayConsole('\n\n--------------**** saveQuestion Start ********-----------');
    displayConsole('obj', obj);
    return firebase
      .firestore()
      .collection(Constant.App.firebaseTableNames.questions)
      .add(obj)
      .then(
        function(success) {
          displayConsole('success', success);
          displayConsole('documentID', success.id);
          displayConsole('--------------***** saveQuestion End *********-----------\n\n');
          obj.messageId = `${success.id}${obj.userInfo.uid}${obj.expertInfo.uid}`;
          obj.questionId = success.id;
          return firebase
            .firestore()
            .collection(Constant.App.firebaseTableNames.questions)
            .doc(success.id)
            .set(obj)
            .then(
              function() {
                displayConsole('success', true);
                const data = {
                  success: true,
                  data: obj,
                };
                displayConsole('data', data);
                console.log(
                  '--------------**** saveQuestion Id End ********-----------\n\n'
                );
                return data;
              },
              error => {
                const { message, code } = error;
                displayConsole('error message', message);
                displayConsole('error code', code);
                const data = {
                  success: false,
                  message: message,
                };
                displayConsole('data', data);
                console.log(
                  '--------------**** saveQuestion Id End ********-----------\n\n'
                );
                return data;
              }
            );
        },
        error => {
          const { message, code } = error;
          displayConsole('error message', message);
          displayConsole('error code', code);
          const data = {
            success: false,
            message: message,
          };
          displayConsole('data', data);
          displayConsole('--------------***** saveQuestion End *********-----------\n\n');
          return data;
        }
      );
  } catch (error) {
    const data = {
      success: false,
    };
    displayConsole('Crash error', error);
    displayConsole('--------------**** testAddData End ********-----------\n\n');
    return data;
  }
}

export function resolvedQuestion(obj) {
  try {
    displayConsole('\n\n--------------**** resolvedQuestion Start ********-----------');
    displayConsole('obj', obj);
    return firebase
      .firestore()
      .collection(Constant.App.firebaseTableNames.questions)
      .doc(`${obj.questionId}`)
      .set(obj)
      .then(
        function(success) {
          displayConsole('success', true);
          displayConsole('docref', success);
          const data = {
            success: true,
          };
          displayConsole('data', data);
          console.log('--------------**** resolvedQuestion End ********-----------\n\n');
          return data;
        },
        error => {
          const { message, code } = error;
          displayConsole('error message', message);
          displayConsole('error code', code);
          const data = {
            success: false,
            message: message,
          };
          displayConsole('data', data);
          displayConsole(
            '--------------***** resolvedQuestion End *********-----------\n\n'
          );
          return data;
        }
      );
  } catch (error) {
    const data = {
      success: false,
    };
    displayConsole('Crash error', error);
    displayConsole('--------------**** resolvedQuestion End ********-----------\n\n');
    return data;
  }
}

export function updateReadMessageStatus(obj) {
  try {
    displayConsole(
      '\n\n--------------**** updateReadMessageStatus Start ********-----------'
    );
    displayConsole('obj', obj);
    let batch = firebase.firestore().batch();
    let questionDocRef = firebase
      .firestore()
      .collection(Constant.App.firebaseTableNames.messages)
      .doc(obj.id)
      .collection('chat')
      .where(obj.key, '==', obj.value)
      .get();
    questionDocRef
      .then(querySnapshotQuestionDoc => {
        displayConsole('querySnapshotQuestionDoc', querySnapshotQuestionDoc);
        querySnapshotQuestionDoc.docs.forEach(element => {
          displayConsole('element', element.data());
          displayConsole('element', element.id);
          batch.update(element._ref, {
            isRead: true,
          });
        });
        batch
          .commit()
          .then(response => {
            displayConsole('response', response);
            const data = {
              success: true,
            };
            displayConsole('response', data);
            displayConsole(
              '--------------**** updateReadMessageStatus End ********-----------\n\n'
            );
          })
          .catch(error => {
            displayConsole('batch error', error);
            const { message, code } = error;
            displayConsole('batch error message', message);
            displayConsole('batch error code', code);
            const data = {
              success: false,
              message: message,
            };
            displayConsole('response', data);
            displayConsole(
              '--------------**** updateReadMessageStatus End ********-----------\n\n'
            );
          });
      })
      .catch(error => {
        displayConsole('questionDocRef error', error);
        const { message, code } = error;
        displayConsole('questionDocRef error message', message);
        displayConsole('questionDocRef error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole(
          '--------------**** updateReadMessageStatus End ********-----------\n\n'
        );
      });
  } catch (error) {
    const data = {
      success: false,
    };
    displayConsole('Crash error', error);
    displayConsole('--------------**** testAddData End ********-----------\n\n');
    return data;
  }
}
export function makeid() {
  var result = '';
  // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // var charactersLength = characters.length;
  // for (var i = 0; i < 5; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  // }
  result = voucher_codes.generate({
    length: 8,
  });
  return result[0];
}

export function checkSecretKey(obj) {
  try {
    displayConsole('\n\n--------------**** getSecretKey Start ********-----------');
    displayConsole('obj', obj);
    let userRef = firebase
      .firestore()
      .collection('userSecretKey')
      .where('secretKey', '==', obj.secretKey)
      .get();
    return userRef
      .then(querySnapshot => {
        displayConsole('querySnapshot', querySnapshot);
        var secretKeyData;
        querySnapshot.docs.forEach(element => {
          secretKeyData = element.data();
        });
        const data = {
          success: true,
          data: secretKeyData,
        };
        displayConsole('data', data);
        displayConsole('--------------**** getSecretKey End ********-----------\n\n');
        return data;
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole('--------------**** getSecretKey End ********-----------\n\n');
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** getSecretKey End ********-----------\n\n');
    return false;
  }
}

export function checkReferedUserData(obj) {
  try {
    displayConsole('\n\n--------------**** getReferedUserData Start ********-----------');
    displayConsole('obj', obj);
    let userRef = firebase
      .firestore()
      .collection('users')
      .where('referalCode', '==', obj.referralCode)
      .get();
    return userRef
      .then(querySnapshot => {
        displayConsole('querySnapshot', querySnapshot);
        var userData;
        querySnapshot.docs.forEach(element => {
          userData = element.data();
        });
        const data = {
          success: true,
          data: userData,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getReferedUserData End ********-----------\n\n'
        );
        return data;
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getReferedUserData End ********-----------\n\n'
        );
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** getReferedUserData End ********-----------\n\n');
    return false;
  }
}

export function setDataTesting() {
  try {
    displayConsole('\n\n--------------**** addUserData Start ********-----------');
    firebase
      .firestore()
      .doc('userSecretKey/bc8uTx6LvbqkvhTrGVHY')
      .get();
    return firebase
      .firestore()
      .collection('userSecretKey')
      .doc('bc8uTx6LvbqkvhTrGVHY')
      .update({ secretKey: 'Admin123#' })
      .then(
        function() {
          displayConsole('success', true);
          displayConsole('--------------***** addUserData End *********-----------\n\n');
          const data = {
            success: true,
          };
          return data;
        },
        error => {
          const { message, code } = error;
          displayConsole('error message', message);
          displayConsole('error code', code);
          const data = {
            success: false,
            message: message,
          };
          displayConsole('--------------***** addUserData End *********-----------\n\n');
          return data;
        }
      );
  } catch (error) {
    const data = {
      success: false,
    };
    displayConsole('Crash error', error);
    displayConsole('--------------**** addUserData End ********-----------\n\n');
    return data;
  }
}

export function deleteUser() {
  try {
    displayConsole('--------------***** deleteUser Start *********-----------\n\n');
    return firebase
      .auth()
      .currentUser.delete()
      .then(
        function() {
          displayConsole('success', true);
          displayConsole('--------------***** deleteUser End *********-----------\n\n');
          const data = {
            success: true,
          };
          return data;
        },
        function(error) {
          let data = {};
          const { message, code } = error;
          displayConsole('error message', message);
          displayConsole('error code', code);
          if (code === 'auth/no-current-user') {
            data = {
              success: true,
            };
          } else {
            firebase.auth().signOut();
            data = {
              success: false,
              message,
            };
          }
          displayConsole('--------------***** deleteUser End *********-----------\n\n');
          return data;
        }
      );
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole('--------------**** deleteUser End ********-----------\n\n');
    return false;
  }
}

export function getRecentExpertsData(obj, success, error) {
  try {
    displayConsole(
      '\n\n--------------**** getRecentExpertsData Start ********-----------'
    );
    displayConsole('obj', obj);
    let ref = firebase
      .firestore()
      .collection(obj.tableName)
      .where(obj.key, '==', obj.value);
    return ref.onSnapshot(success, error);
  } catch (error) {
    return false;
  }
}

export function getExpertsData(obj, success, error) {
  try {
    displayConsole('\n\n--------------**** getExpertsData Start ********-----------');
    displayConsole('obj', obj);
    // let ref = firebase.firestore().collection(obj.tableName).where(obj.roleKey, "==", obj.roleValue);
    var db = firebase.firestore();
    let collection = db.collection(obj.tableName);
    collection = collection.where(obj.roleKey, '==', obj.roleValue);
    if (obj.genderKey && obj.genderValue) {
      collection = collection.where(obj.genderKey, '==', obj.genderValue);
    }
    return collection.onSnapshot(success, error);
  } catch (error) {
    return false;
  }
}

export function getFiltersDataWithCondition(obj) {
  try {
    displayConsole(
      '--------------**** getFilterDataWithCondition Start ********-----------\n\n'
    );
    displayConsole('obj********', obj);
    var db = firebase.firestore();
    let collection = db.collection(obj.tableName);
    collection = collection.where(obj.roleKey, '==', obj.roleValue);
    if (obj.genderKey && obj.genderValue) {
      collection = collection.where(obj.genderKey, '==', obj.genderValue);
    }
    return collection
      .get()
      .then(querySnapshot => {
        displayConsole('querySnapshotS********', querySnapshot);
        const arr = [];
        querySnapshot.docs.forEach(element => {
          if (
            obj.professions &&
            obj.professions.length > 0 &&
            obj.languages &&
            obj.languages.length > 0
          ) {
            let isLanguagesMatch = false;
            let isProfessionMatch = false;

            obj.professions.forEach(profession => {
              if (element.data().profileInfo.profession.fullName == profession) {
                isProfessionMatch = true;
              }
            });
            obj.languages.forEach(language => {
              element.data().profileInfo.languages.forEach(elementLanguage => {
                if (elementLanguage.code == language.code) {
                  isLanguagesMatch = true;
                }
              });
            });
            if (isLanguagesMatch && isProfessionMatch) {
              arr.push(element.data());
            }
          } else if (obj.professions && obj.professions.length > 0) {
            obj.professions.forEach(profession => {
              if (element.data().profileInfo.profession.fullName == profession) {
                arr.push(element.data());
              }
            });
          } else if (obj.languages && obj.languages.length > 0) {
            obj.languages.forEach(language => {
              element.data().profileInfo.languages.forEach(elementLanguage => {
                if (elementLanguage.code == language.code) {
                  arr.push(element.data());
                }
              });
            });
          } else {
            arr.push(element.data());
          }
        });
        const data = {
          success: true,
          data: arr,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getFilterDataWithCondition End ********-----------\n\n'
        );
        return data;
      })
      .catch(error => {
        displayConsole('e', error);
        const { message, code } = error;
        displayConsole('error message', message);
        displayConsole('error code', code);
        const data = {
          success: false,
          message: message,
        };
        displayConsole('data', data);
        displayConsole(
          '--------------**** getFilterDataWithCondition End ********-----------\n\n'
        );
        return data;
      });
  } catch (error) {
    displayConsole('Crash error', error);
    displayConsole(
      '--------------**** getFilterDataWithCondition End ********-----------\n\n'
    );
    return false;
  }
}

export async function getCreditAmountsData() {
  try {
    await firebase.config().fetch(0);
    await firebase.config().activateFetched();
    const snapshot = await firebase.config().getValue('credit_amounts');
    return snapshot ? snapshot.val() : null;
  } catch (error) {
    return null;
  }
}

export async function addNewPaymentCard(obj) {
  try {
    const { card_number, exp_month, exp_year, cvc } = obj;
    await firebase.functions().httpsCallable('apiPaymentsAddCard')({
      card_number: card_number,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: cvc,
    });
    return { ok: true, data: null };
  } catch (err) {
    let status = err.status ? err.status : 'internal';
    return { ok: false, status };
  }
}

export async function getPaymentMethods() {
  try {
    const response = await firebase.functions().httpsCallable('apiPaymentsListCards')();
    if (response.data.data) {
      return {
        ok: true,
        data: response.data.data.map(data => ({ ...data.card, id: data.id })),
      };
    } else {
      return {
        ok: true,
        data: [],
      };
    }
  } catch (err) {
    console.log('ERRROROROROROROROROROR', err);
    let status = err.status ? err.status : 'internal';
    return { ok: false, status };
  }
}

export async function payAmount(cardID, amount) {
  try {
    const amountInCents = Number(amount) * 100;
    const response = await firebase.functions().httpsCallable('apiPaymentsPayAmount')({
      card_id: cardID,
      amount: amountInCents,
    });
    return { ok: response };
  } catch (err) {
    let status = err.status ? err.status : 'internal';
    return { ok: false, status };
  }
}

export async function payAmountWithToken(tokenID, amount) {
  try {
    const amountInCents = Number(amount) * 100;
    const response = await firebase
      .functions()
      .httpsCallable('apiPaymentsPayAmountApplePay')({
      token_id: tokenID,
      amount: amountInCents,
    });
    return { ok: response };
  } catch (err) {
    let status = err.status ? err.status : 'internal';
    return { ok: false, status };
  }
}

export async function addUserCredits(credits) {
  try {
    const userID = firebase.auth().currentUser.uid;
    const docData = await firebase
      .firestore()
      .collection('users')
      .doc(userID)
      .get();
    const userData = docData.data();
    await firebase
      .firestore()
      .collection('users')
      .doc(userID)
      .update({
        credits: userData.credits + credits,
      });
    return { ok: true, newCredits:  userData.credits + credits };
  } catch (err) {
    return { ok: false, status: 'internal' };
  }
}

export async function getPayPalAccessToken() {
  try {
    const response = await firebase
      .functions()
      .httpsCallable('apiPaymentsGetPaypalAccesstoken')();
    return { ok: true, data: response };
  } catch (err) {
    let status = err.status ? err.status : 'internal';
    return { ok: false, status };
  }
}
