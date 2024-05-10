import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

class PurchaseService {
    getRefencedFieldPath(RefencedFieldPathObj) {
        return RefencedFieldPathObj._key.path.segments.join('/').split('/documents/')[1];
    }

    async getAll() {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        let purchases = [];

        if (userSnap.exists()) {
            purchases = userSnap.data().purchases;

            await Promise.all(purchases.map(async (purchase, purchaseIndex) => {
                let docPath = this.getRefencedFieldPath(purchase)
                const purchaseRef = doc(db, docPath);
                const purchaseSnapshot = await getDoc(purchaseRef);

                if (purchaseSnapshot.exists()) {
                    purchases[purchaseIndex] = purchaseSnapshot.data();
                    const items = purchases[purchaseIndex].items;

                    await Promise.all(items.map(async (item, index) => {
                        let docPath = this.getRefencedFieldPath(item.product)
                        const productRef = doc(db, docPath);
                        const productSnapshot = await getDoc(productRef);

                        purchases[purchaseIndex].items[index].product = productSnapshot.data();
                    }));
                } else {
                    console.log("No such document!");
                }
            }));
        } else {
            console.log("No such document!");
        }

        return purchases;
    }


    async getLast() {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        let purchase;

        if (userSnap.exists()) {
            purchase = userSnap.data().purchases.slice(-1);

            let docPath = this.getRefencedFieldPath(purchase[0])
            const purchaseRef = doc(db, docPath);
            const purchaseSnapshot = await getDoc(purchaseRef);

            if (purchaseSnapshot.exists()) {
                purchase = purchaseSnapshot.data();
                const items = purchase.items;

                await Promise.all(items.map(async (item, index) => {
                    let docPath = this.getRefencedFieldPath(item.product)
                    const productRef = doc(db, docPath);
                    const productSnapshot = await getDoc(productRef);

                    purchase.items[index].product = productSnapshot.data();
                }));
            } else {
                console.log("No such document!");
            }
        }

        return purchase;
    }
}

const purchaseService = new PurchaseService();
export { purchaseService };