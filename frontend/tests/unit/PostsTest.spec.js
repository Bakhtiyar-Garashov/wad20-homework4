import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";
import moment from 'moment';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

//Create dummy store
const store = new Vuex.Store({
    state: {
        user: {
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test',
            avatar: 'test',
        }
    },
    getters: {
        user: (state) => state.user,
    }
});

//Create dummy routes
const routes = [
    {
        path: '/',
        name: 'posts',
    },
    {
        path: '/profiles',
        name: 'profiles'
    }
];

const router = new VueRouter({routes});

const testData = [
    {
        id: 1,
        text: "I think it's going to rain",
        createTime: "2020-12-05 13:53:23",
        likes: 0,
        liked: false,
        media: {
            url: "test-image.jpg",
            type: "image"
        },
        author: {
            id: 2,
            firstname: "Gordon",
            lastname: "Freeman",
            avatar: 'avatar.url'
        }
    },
    {
        id: 2,
        text: "Which weighs more, a pound of feathers or a pound of bricks?",
        createTime: "2020-12-05 13:53:23",
        likes: 1,
        liked: true,
        media: null,
        author: {
            id: 3,
            firstname: "Sarah",
            lastname: "Connor",
            avatar: 'avatar.url'
        }
    },
    {
        id: 4,
        text: null,
        createTime: "2020-12-05 13:53:23",
        likes: 3,
        liked: false,
        media: {
            url: "test-video.mp4",
            type: "video"
        },
        author: {
            id: 5,
            firstname: "Richard",
            lastname: "Stallman",
            avatar: 'avatar.url'
        }
    }
];

//Mock axios.get method that our Component calls in mounted event
jest.mock("axios", () => ({
    get: () => Promise.resolve({
        data: testData
    })
}));

describe('Posts', () => {

    // TASK #4

    const wrapper = mount(Posts, {router, store, localVue});

    it('renders the correct amount of posts', function () {

        const items = wrapper.findAll('.post');

        expect(items.length).toBe(testData.length);
    });



    it('has correct media properties', function () {

        const media = wrapper.findAll(".post-media");
        const images = wrapper.findAll(".post-image");
        const videos = wrapper.findAll(".post-video");

        expect(media.length).toBe(testData.filter(item => item.media != null).length);
        expect(images.length).toBe(testData.filter(item => item.media != null && item.media.type === "image").length);
        expect(videos.length).toBe(testData.filter(item => item.media != null && item.media.type === "video").length);

    });

    it('creates time in correct format', function () {

        const dates = wrapper.findAll('.post-date');

        function formatDate(value) {
            return moment(value).format('LLLL');
        }

        for (let i = 0; i < dates.length; i++) {
            const dateItem = dates.at(i).text();

            expect(dateItem).toBe(formatDate(testData[0].createTime));
        }
    });
});