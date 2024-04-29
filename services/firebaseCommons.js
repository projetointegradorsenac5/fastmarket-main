class FirebaseCommons {
    
    getRefencedFieldPath(RefencedFieldPathObj) {
        return RefencedFieldPathObj._key.path.segments.join('/').split('/documents/')[1];
    }
}

const firebaseCommons = new FirebaseCommons()

export { firebaseCommons };