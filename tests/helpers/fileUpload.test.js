import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'edmo777',
    api_key: '481989895898952',
    api_secret: 'aApMc4-0I497QMT8dDvXLz4uBHc',
    secure: true,
});


describe('fileUpload test', () => {

    test('should load a file to claudinarry', async () => {
        const imageUrl = 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // console.log(url);

        // Delete image by id
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        const cloudResponse = await cloudinary.api.delete_resources(['journalApp/' + imageId], {
            resource_type: 'image'
        });
    }, 10000);

    test('should return null', async () => {
        const file = new File([], 'foto');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    }, 10000);
});


