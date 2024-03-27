import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();

exports.fetchAndStoreNationalParks = functions.https.onRequest(async (req, res) => {
    const NPS_API_KEY: string = 'hMKzazrfAuzmrgSSV6Dzva9iNPnkCeVLZE2hxyuZ';
    const NPS_API_URL: string = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${NPS_API_KEY}`;

    try {
        const response = await axios.get(NPS_API_URL);
        const nationalParks = response.data.data.filter((park: any) => park.designation === 'National Park');

        const db = admin.firestore();
        const batch = db.batch();

        nationalParks.forEach((park: any) => {
            const docRef = db.collection('nationalParks').doc(park.parkCode);
            batch.set(docRef, {
                name: park.fullName,
                description: park.description,
                latitude: park.latitude,
                longitude: park.longitude,
                state: park.states,
                images: park.images.map((image: { url: string }) => image.url),
            });
        });

        await batch.commit();
        res.send('National Parks data has been stored successfully.');
    } catch (error) {
        console.error('Error fetching or storing National Parks data:', error);
        res.status(500).send('Error fetching or storing data');
    }
});
